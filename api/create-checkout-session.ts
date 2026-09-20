import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { adminClient, requireEnv } from "./_lib/admin";

/**
 * Creates a Stripe Checkout session for one product.
 *
 * The client sends a slug and nothing else. Price, currency and title are read
 * from the database — a price is never accepted from the browser, because a
 * browser can send any number it likes.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { slug } = (req.body ?? {}) as { slug?: string };
    if (!slug || typeof slug !== "string") {
      return res.status(400).json({ error: "A product slug is required." });
    }

    const supabase = adminClient();
    const { data: product, error } = await supabase
      .from("products")
      .select("id, title, description, price_cents, currency, thumbnail, active")
      .eq("slug", slug)
      .single();

    if (error || !product) return res.status(404).json({ error: "Product not found." });
    if (!product.active) return res.status(409).json({ error: "This product is not on sale." });

    const stripe = new Stripe(requireEnv("STRIPE_SECRET_KEY"));
    const site = process.env.VITE_SITE_URL ?? `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: product.currency,
            unit_amount: product.price_cents,
            product_data: {
              name: product.title,
              ...(product.description ? { description: product.description } : {}),
              ...(product.thumbnail ? { images: [product.thumbnail] } : {}),
            },
          },
        },
      ],
      // Stripe collects an email for its own receipt. We do not require an
      // account, do not gate the download on it, and never add anyone to a
      // mailing list from a purchase.
      metadata: { product_id: product.id, slug },
      success_url: `${site}/download/pending?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/shop/${slug}?checkout=cancelled`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("create-checkout-session failed", err);
    return res.status(500).json({ error: "Could not start checkout. Please try again." });
  }
}
