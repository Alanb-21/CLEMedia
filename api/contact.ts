import type { VercelRequest, VercelResponse } from "@vercel/node";
import { adminClient } from "./_lib/admin";

const ROUTES = ["general", "partnership", "press", "notify"] as const;
type Route = (typeof ROUTES)[number];

/**
 * Receives a contact or notify-me submission, stores it and sends a
 * notification. Validated server side — client-side validation is a courtesy
 * to the user, not a control.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot. A real person never fills a field they cannot see.
  if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
    return res.status(200).json({ ok: true });
  }

  const route = String(body.route ?? "") as Route;
  if (!ROUTES.includes(route)) return res.status(400).json({ error: "Unknown enquiry type." });

  const email = String(body.email ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "A valid email address is required." });
  }

  const name = String(body.name ?? "").trim().slice(0, 200);
  const organisation = String(body.organisation ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim().slice(0, 5000);

  if (route !== "notify" && message.length < 2) {
    return res.status(400).json({ error: "A message is required." });
  }

  try {
    const supabase = adminClient();
    const { error } = await supabase.from("enquiries").insert({
      route,
      name: name || null,
      email,
      organisation: organisation || null,
      message: message || null,
    });
    if (error) throw error;

    await notify({ route, name, email, organisation, message });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact failed", err);
    return res.status(500).json({ error: "Could not send your message. Please try again." });
  }
}

/** Best effort — a failed notification must not lose the enquiry, which is
 *  already safely stored by the time this runs. */
async function notify(e: { route: string; name: string; email: string; organisation: string; message: string }) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_NOTIFY_TO;
  if (!key || !to) return;

  const subject =
    e.route === "partnership"
      ? `Partnership enquiry — ${e.name || e.email}`
      : `${e.route} enquiry — ${e.name || e.email}`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "CLÉ Family Media <notifications@example.com>",
        to: [to],
        reply_to: e.email,
        subject,
        text: [
          `Type: ${e.route}`,
          `Name: ${e.name || "—"}`,
          `Email: ${e.email}`,
          `Organisation: ${e.organisation || "—"}`,
          "",
          e.message || "(no message)",
        ].join("\n"),
      }),
    });
  } catch (err) {
    console.error("Enquiry stored but notification failed", err);
  }
}
