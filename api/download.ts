import { adminClient, json } from "./_lib/admin";

const SIGNED_URL_SECONDS = 120;

/**
 * Exchanges a download token for a short-lived signed URL.
 *
 * Runs server side because product-files has no public read policy and the
 * anon key cannot reach it. The browser never receives a durable file URL.
 */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) return json({ error: "not_found" }, 400);

  try {
    const supabase = adminClient();

    const { data: order } = await supabase
      .from("orders")
      .select("id, product_id, expires_at, download_count, max_downloads")
      .eq("download_token", token)
      .maybeSingle();

    if (!order) return json({ error: "not_found" }, 404);
    if (new Date(order.expires_at) < new Date()) return json({ error: "expired" }, 410);
    if (order.download_count >= order.max_downloads) return json({ error: "exhausted" }, 429);

    const { data: product } = await supabase
      .from("products")
      .select("title, file_path")
      .eq("id", order.product_id)
      .single();

    if (!product) return json({ error: "not_found" }, 404);

    const { data: signed, error: signErr } = await supabase.storage
      .from("product-files")
      .createSignedUrl(product.file_path, SIGNED_URL_SECONDS, { download: true });

    if (signErr || !signed) throw signErr ?? new Error("Could not sign URL");

    // Counted only once the URL has actually been issued.
    await supabase
      .from("orders")
      .update({ download_count: order.download_count + 1 })
      .eq("id", order.id);

    return json({
      url: signed.signedUrl,
      title: product.title,
      downloadsUsed: order.download_count + 1,
      downloadsAllowed: order.max_downloads,
      expiresAt: order.expires_at,
    });
  } catch (err) {
    console.error("download failed", err);
    return json({ error: "server_error" }, 500);
  }
}
