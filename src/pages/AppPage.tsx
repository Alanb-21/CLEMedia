import { useState } from "react";
import { Seo } from "@/components/Seo";
import { AssetPlaceholder, CopyNeeded } from "@/components/AssetPlaceholder";
import { Button, Container, Kicker, Lead, Section, SectionHeading } from "@/components/ui";

/**
 * Two states behind one flag in `settings`. The client flips it in /admin at
 * launch — no redeploy, no developer. Until then this route serves the
 * pre-launch page.
 */
const APP_LAUNCHED = false;

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ route: "notify", email }),
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        setError(d.error ?? "Could not sign you up. Please try again.");
      } else {
        setSent(true);
      }
    } catch {
      setError("Could not sign you up. Please check your connection.");
    } finally {
      setBusy(false);
    }
  }

  return sent ? (
    <p role="status" className="border border-hairline bg-cream/50 px-5 py-4 font-body text-[14.5px] text-ink">
      Thanks — we'll email you once when it's live, and not for anything else.
    </p>
  ) : (
    <form className="flex flex-col gap-3 sm:flex-row" onSubmit={submit}>
      <div className="flex-1">
        <label htmlFor="notify-email" className="sr-only">Email address</label>
        <input
          id="notify-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border border-hairline bg-paper px-4 py-3 font-body text-[15px] text-ink placeholder:text-muted/70"
        />
      </div>
      <Button type="submit" disabled={busy}>{busy ? "…" : "Notify me"}</Button>
      {error && <p role="alert" className="font-body text-[13.5px] text-red-deep sm:basis-full">{error}</p>}
    </form>
  );
}

function PreLaunch() {
  return (
    <>
      <Section className="!pb-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Kicker>PupsPlayer™ · Coming soon</Kicker>
              <h1 className="mt-5 text-[length:var(--text-h1)]">
                The app is on the way
              </h1>
              <Lead className="mt-6">
                PupsPlayer™ brings the Watch, Play, Learn model into one place — episodes, the
                interactive play that follows them, and the learning underneath. Targeting launch
                mid-October 2026, alongside this site.
              </Lead>
              <div className="mt-8 max-w-[34rem]">
                <p className="mb-3 font-body text-[13.5px] font-medium text-ink">
                  Want to know when it's live?
                </p>
                <NotifyForm />
                <p className="mt-2.5 font-body text-[12.5px] text-muted">
                  One email, at launch. No list, no marketing.
                </p>
              </div>
            </div>
            <AssetPlaceholder
              label="PupsPlayer™ app preview — device mockup or key screen"
              ref="CONTENT-NEEDED · App"
              ratio="4/5"
              tone="cream"
            />
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <SectionHeading kicker="What's coming" title="What the app will do" />
          <div className="mt-8 max-w-[62ch]">
            <CopyNeeded
              label="App feature list, screens, age range and availability. Needed before launch."
              ref="QUESTIONS.md #14"
              lines={4}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}

function Launched() {
  return (
    <>
      <Section className="!pb-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Kicker>PupsPlayer™</Kicker>
              <h1 className="mt-5 text-[length:var(--text-h1)]">Watch, play and learn in one place</h1>
              <Lead className="mt-6">
                Episodes of <em>The Pawsitive Pugs &amp; Pals</em>®, the interactive play that
                follows each one, and the learning underneath — built for young children and the
                adults beside them.
              </Lead>
              <div className="mt-8 flex flex-wrap gap-3">
                <AssetPlaceholder label="App Store badge and link" ref="QUESTIONS.md #14" ratio="3/1" className="!w-[150px]" tone="cream" />
                <AssetPlaceholder label="Google Play badge and link" ref="QUESTIONS.md #14" ratio="3/1" className="!w-[150px]" tone="cream" />
              </div>
            </div>
            <AssetPlaceholder label="App hero — device mockup" ref="CONTENT-NEEDED · App" ratio="4/5" tone="cream" />
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <SectionHeading kicker="Screens" title="Inside the app" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <li key={i}>
                <AssetPlaceholder label={`App screenshot ${i}`} ref="QUESTIONS.md #14" ratio="9/16" />
              </li>
            ))}
          </ul>
          <div className="mt-10 max-w-[62ch]">
            <CopyNeeded label="Feature descriptions, age range, device support, pricing and parental controls." ref="QUESTIONS.md #14" lines={4} />
          </div>
        </Container>
      </Section>
    </>
  );
}

export default function AppPage() {
  return (
    <>
      <Seo
        title={APP_LAUNCHED ? "PupsPlayer app" : "PupsPlayer app — coming soon"}
        description="PupsPlayer™ from CLÉ Family Media: episodes, interactive play and early-years learning in one app for young children."
        path="/app"
      />
      {APP_LAUNCHED ? <Launched /> : <PreLaunch />}
    </>
  );
}
