import { adminClient, json } from "./_lib/admin";

const ROUTES = ["general", "partnership", "press", "notify"] as const;
type Route = (typeof ROUTES)[number];

/**
 * Receives a contact or notify-me submission, stores it and sends a
 * notification. Validated server side. Client-side validation is a courtesy
 * to the user, not a control.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  // Honeypot. A real person never fills a field they cannot see.
  if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
    return json({ ok: true });
  }

  const route = String(body.route ?? "") as Route;
  if (!ROUTES.includes(route)) return json({ error: "Unknown enquiry type." }, 400);

  const email = String(body.email ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "A valid email address is required." }, 400);
  }

  const name = String(body.name ?? "").trim().slice(0, 200);
  const organisation = String(body.organisation ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim().slice(0, 5000);

  if (route !== "notify" && message.length < 2) {
    return json({ error: "A message is required." }, 400);
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
    return json({ ok: true });
  } catch (err) {
    console.error("contact failed", err);
    return json({ error: "Could not send your message. Please try again." }, 500);
  }
}

/** Best effort. A failed notification must not lose the enquiry, which is
 *  already safely stored by the time this runs. */
async function notify(e: { route: string; name: string; email: string; organisation: string; message: string }) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_NOTIFY_TO;
  if (!key || !to) return;

  const subject =
    e.route === "partnership"
      ? `Partnership enquiry from ${e.name || e.email}`
      : `${e.route} enquiry from ${e.name || e.email}`;

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
          `Name: ${e.name || "Not given"}`,
          `Email: ${e.email}`,
          `Organisation: ${e.organisation || "Not given"}`,
          "",
          e.message || "(no message)",
        ].join("\n"),
      }),
    });
  } catch (err) {
    console.error("Enquiry stored but notification failed", err);
  }
}
