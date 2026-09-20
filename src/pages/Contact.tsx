import { useState } from "react";
import { Seo } from "@/components/Seo";
import { Button, Container, Kicker, Lead, Section } from "@/components/ui";
import { IconMail } from "@/components/icons";

type Route = "partnership" | "general" | "press";

const ROUTES: { id: Route; label: string; blurb: string }[] = [
  { id: "partnership", label: "Partnership and distribution", blurb: "Investment, distribution, broadcast, licensing and educational partnerships. This is the route we watch most closely." },
  { id: "general", label: "General enquiry", blurb: "Questions about the company, the show or the app." },
  { id: "press", label: "Press", blurb: "Interviews, podcast bookings and media requests." },
];

export default function Contact() {
  const [route, setRoute] = useState<Route>("partnership");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const active = ROUTES.find((r) => r.id === route)!;

  return (
    <>
      <Seo
        title="Contact and partnerships"
        description="Get in touch with CLÉ Family Media about partnership, distribution and investment, press enquiries, or anything else."
        path="/contact"
      />

      <Section className="!pb-10">
        <Container>
          <div className="max-w-[44ch]">
            <Kicker>Contact</Kicker>
            <h1 className="mt-5 text-[length:var(--text-h1)]">Let's talk</h1>
          </div>
          <Lead className="mt-6">
            Tell us which of these you are and the message reaches the right person directly.
          </Lead>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <fieldset>
                <legend className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  What's this about?
                </legend>
                <div className="mt-4 space-y-3">
                  {ROUTES.map((r) => (
                    <label
                      key={r.id}
                      className={`flex cursor-pointer gap-3 p-4 transition-all rounded-[var(--radius-md)] ${
                        route === r.id ? "glass-warm" : "glass hover:bg-white/90"
                      }`}
                    >
                      <input
                        type="radio"
                        name="route"
                        value={r.id}
                        checked={route === r.id}
                        onChange={() => setRoute(r.id)}
                        className="mt-1 accent-[#A32E32]"
                      />
                      <span>
                        <span className="block font-body text-[15px] font-semibold text-ink">{r.label}</span>
                        <span className="mt-1 block font-body text-[13.5px] leading-relaxed text-muted">{r.blurb}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <p className="mt-6 font-body text-[13px] text-muted">
                Partnership enquiries are read first and answered first.
              </p>
            </div>

            <div>
              {sent ? (
                <div role="status" className="glass-warm rounded-[var(--radius-lg)] p-8">
                  <h2 className="text-[length:var(--text-h3)]">Message sent</h2>
                  <p className="mt-3 font-body text-[15px]">
                    Thanks, we will come back to you. Partnership enquiries are answered first.
                  </p>
                </div>
              ) : (
                <form
                  className="space-y-5"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setBusy(true);
                    setError(null);
                    const fd = new FormData(e.currentTarget);
                    try {
                      const r = await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ route, ...Object.fromEntries(fd) }),
                      });
                      if (!r.ok) {
                        const d = await r.json().catch(() => ({}));
                        setError(d.error ?? "Could not send your message. Please try again.");
                      } else {
                        setSent(true);
                      }
                    } catch {
                      setError("Could not send your message. Please check your connection.");
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  <p className="font-body text-[13.5px] text-muted">
                    Sending as: <strong className="text-ink">{active.label}</strong>
                  </p>

                  {/* Honeypot, no CAPTCHA, which would cost us accessibility. */}
                  <div aria-hidden="true" className="absolute left-[-9999px]">
                    <label htmlFor="company-website">Leave this empty</label>
                    <input id="company-website" name="company_website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block font-body text-[13.5px] font-medium text-ink">Name</label>
                      <input id="name" name="name" required className="glass mt-1.5 w-full rounded-[var(--radius-sm)] px-4 py-3 font-body text-[15px] text-ink" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-body text-[13.5px] font-medium text-ink">Email</label>
                      <input id="email" name="email" type="email" required className="glass mt-1.5 w-full rounded-[var(--radius-sm)] px-4 py-3 font-body text-[15px] text-ink" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="organisation" className="block font-body text-[13.5px] font-medium text-ink">
                      Organisation <span className="font-normal text-muted">(optional)</span>
                    </label>
                    <input id="organisation" name="organisation" className="glass mt-1.5 w-full rounded-[var(--radius-sm)] px-4 py-3 font-body text-[15px] text-ink" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-body text-[13.5px] font-medium text-ink">Message</label>
                    <textarea id="message" name="message" rows={6} required className="glass mt-1.5 w-full rounded-[var(--radius-sm)] px-4 py-3 font-body text-[15px] text-ink" />
                  </div>

                  {error && (
                    <p role="alert" className="font-body text-[14px] text-red-deep">{error}</p>
                  )}
                  <Button type="submit" disabled={busy}>
                    {busy ? "Sending" : "Send message"}<IconMail size={16} />
                  </Button>
                  <p className="font-body text-[12.5px] text-muted">
                    We use what you send here to reply to you, and nothing else.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
