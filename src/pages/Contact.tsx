import { useState } from "react";
import { Seo } from "@/components/Seo";
import { Button, Container, Kicker, Lead, Section } from "@/components/ui";
import { IconMail } from "@/components/icons";
import { Panel } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Bluebell, PawTrail, RouteEducator, RouteGeneral, RoutePartnership, RoutePress } from "@/components/graphics";

type Route = "partnership" | "educator" | "press" | "general";

const ROUTES: { id: Route; label: string; blurb: string; Art: () => JSX.Element }[] = [
  {
    id: "partnership",
    label: "Partnerships and distribution",
    blurb: "Studios, distribution, broadcast and licensing. The route we watch most closely.",
    Art: RoutePartnership,
  },
  {
    id: "educator",
    label: "Educators and case studies",
    blurb: "Early years settings, schools and anyone interested in taking part in a case study.",
    Art: RouteEducator,
  },
  {
    id: "press",
    label: "Press",
    blurb: "Interviews, podcast bookings, media requests and the press pack.",
    Art: RoutePress,
  },
  {
    id: "general",
    label: "General enquiry",
    blurb: "Anything else about the company, the series or the work.",
    Art: RouteGeneral,
  },
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

      <Section className="relative overflow-hidden !pb-10">
        <Bluebell size={58} className="pointer-events-none absolute right-6 top-4 text-clay/40 drift sm:right-16" />
        <PawTrail className="pointer-events-none absolute -left-8 bottom-0 h-[150px] w-[260px] text-clay/15" />
        <Container className="relative">
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
                  What is this about?
                </legend>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {ROUTES.map((r, i) => (
                    <Reveal key={r.id} delay={i * 70}>
                      <label
                        className={`flex cursor-pointer items-center gap-4 rounded-[var(--radius-lg)] p-3.5 transition-all ${
                          route === r.id ? "glass-warm ring-1 ring-red/30" : "glass hover:bg-white/90"
                        }`}
                      >
                        <input
                          type="radio" name="route" value={r.id}
                          checked={route === r.id}
                          onChange={() => setRoute(r.id)}
                          className="sr-only"
                        />
                        <span className="h-[62px] w-[84px] shrink-0 overflow-hidden rounded-[var(--radius-md)]">
                          <r.Art />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-body text-[15px] font-semibold text-ink">{r.label}</span>
                          <span className="mt-0.5 block font-body text-[13px] leading-relaxed text-muted">
                            {r.blurb}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className={`ml-auto mr-1 h-4 w-4 shrink-0 rounded-full border-2 transition-colors ${
                            route === r.id ? "border-red bg-red" : "border-hairline"
                          }`}
                        />
                      </label>
                    </Reveal>
                  ))}
                </div>
              </fieldset>

              <Panel tone="warm" className="mt-6 p-5">
                <p className="font-body text-[13.5px] leading-relaxed text-ink">
                  Partnership enquiries are read first and answered first. Everything reaches a
                  person, not a queue.
                </p>
              </Panel>
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
