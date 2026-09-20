import type { VercelRequest, VercelResponse } from "@vercel/node";
import { adminClient } from "./_lib/admin";

const SIGNED_URL_SECONDS = 120;

/**
 * Exchanges a download token for a short-lived signed URL.
 *
 * Runs server side because the product-files bucket has no public read policy
 * and the anon key cannot reach it. The browser never sees a durable file URL.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = (req.query.token ?? "") as string;
  if (!token) return res.status(400).json({ error: "Missing token." });

  try {
    const supabase = adminClient();

    const { data: order } = await supabase
      .from("orders")
      .select("id, product_id, expires_at, download_count, max_downloads")
      .eq("download_token", token)
      .maybeSingle();

    if (!order) return res.status(404).json({ error: "not_found" });

    if (new Date(order.expires_at) < new Date()) {
      return res.status(410).json({ error: "expired" });
    }
    if (order.download_count >= order.max_downloads) {
      return res.status(429).json({ error: "exhausted" });
    }

    const { data: product } = await supabase
      .from("products")
      .select("title, file_path")
      .eq("id", order.product_id)
      .single();

    if (!product) return res.status(404).json({ error: "not_found" });

    const { data: signed, error: signErr } = await supabase.storage
      .from("product-files")
      .createSignedUrl(product.file_path, SIGNED_URL_SECONDS, { download: true });

    if (signErr || !signed) throw signErr ?? new Error("Could not sign URL");

    // Counted only once the URL has actually been issued.
    await supabase
      .from("orders")
      .update({ download_count: order.download_count + 1 })
      .eq("id", order.id);

    return res.status(200).json({
      url: signed.signedUrl,
      title: product.title,
      downloadsUsed: order.download_count + 1,
      downloadsAllowed: order.max_downloads,
      expiresAt: order.expires_at,
    });
  } catch (err) {
    console.error("download failed", err);
    return res.status(500).json({ error: "server_error" });
  }
}
