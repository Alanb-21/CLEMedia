import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomBytes } from "node:crypto";
import Stripe from "stripe";
import { adminClient, requireEnv } from "./_lib/admin";

/** Stripe signs the raw body, so it must not be parsed before verification. */
export const config = { api: { bodyParser: false } };

function rawBody(req: VercelRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.setEncoding("utf8");
    req.on("data", (c: string) => { data += c; });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

const TOKEN_HOURS = 24;
const MAX_DOWNLOADS = 5;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }

  const stripe = new Stripe(requireEnv("STRIPE_SECRET_KEY"));
  const signature = req.headers["stripe-signature"];
  let event: Stripe.Event;

  // Verify before trusting anything in the payload. An unverified request is
  // just a stranger claiming a payment happened.
  try {
    event = stripe.webhooks.constructEvent(
      await rawBody(req),
      signature as string,
      requireEnv("STRIPE_WEBHOOK_SECRET")
    );
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return res.status(400).send("Invalid signature");
  }

  if (event.type !== "checkout.session.completed") {
    return res.status(200).json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== "paid") {
    return res.status(200).json({ received: true, ignored: "unpaid" });
  }

  try {
    const supabase = adminClient();

    // Idempotency. Stripe retries deliveries, and a retry must not mint a
    // second download token for one payment. stripe_session_id is unique, so
    // this is also enforced at the database level.
    const { data: existing } = await supabase
      .from("orders")
      .select("id")
      .eq("stripe_session_id", session.id)
      .maybeSingle();

    if (existing) return res.status(200).json({ received: true, duplicate: true });

    const productId = session.metadata?.product_id;
    if (!productId) {
      console.error("checkout.session.completed with no product_id", session.id);
      return res.status(200).json({ received: true, ignored: "no product_id" });
    }

    const expires = new Date(Date.now() + TOKEN_HOURS * 60 * 60 * 1000);

    const { error } = await supabase.from("orders").insert({
      stripe_session_id: session.id,
      product_id: productId,
      download_token: randomBytes(32).toString("base64url"),
      expires_at: expires.toISOString(),
      max_downloads: MAX_DOWNLOADS,
      amount_cents: session.amount_total,
      currency: session.currency,
    });

    // A unique violation means a concurrent delivery won the race. Still fine.
    if (error && error.code !== "23505") throw error;

    return res.status(200).json({ received: true });
  } catch (err) {
    // Non-2xx tells Stripe to retry, which is what we want for a transient fault.
    console.error("Webhook processing failed", err);
    return res.status(500).json({ error: "Processing failed" });
  }
}
