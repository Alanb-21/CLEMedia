import { useState, type FormEvent } from "react";
import { Seo } from "@/components/Seo";
import { AssetPlaceholder } from "@/components/AssetPlaceholder";
import { Button, Container, Kicker, Lead, Panel, Section, SectionHeading } from "@/components/ui";

/**
 * Two states behind one flag in `settings`. The client flips it in /admin at
 * launch: no redeploy, no developer.
 */
const APP_LAUNCHED = false;

const FEATURES = [
  {
    title: "Every episode, ad free",
    body:
      "The full run of The Pawsitive Pugs & Pals in one place, with nothing competing for your child's attention around it. No autoplay into something you did not choose.",
  },
  {
    title: "Play that follows the story",
    body:
      "Each episode has activities built from what just happened in it, so the play reinforces the idea rather than sitting beside it as a separate game.",
  },
  {
    title: "Printables for off screen",
    body:
      "Colouring, puzzles and activity sheets you can print and take to the table, because not all of this should happen on a screen.",
  },
  {
    title: "Built for small hands",
    body:
      "Large targets, simple navigation and no dark patterns. A young child can find their way around it, and cannot accidentally find their way out of it.",
  },
  {
    title: "Parents stay in control",
    body:
      "Clear settings, no surprise purchases inside the app, and no advertising to children anywhere in it.",
  },
  {
    title: "Grounded in the learning",
    body:
      "Every activity maps back to the early years objective behind its episode, reviewed by the same advisors who shape the series.",
  },
];

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
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

  if (sent) {
    return (
      <Panel tone="warm" className="px-5 py-4">
        <p role="status" className="font-body text-[14.5px] text-ink">
          Thanks. We will email you once, when it is live, and not for anything else.
        </p>
      </Panel>
    );
  }

  return (
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
          className="glass w-full rounded-[var(--radius-pill)] px-5 py-3 font-body text-[15px] text-ink placeholder:text-muted/70"
        />
      </div>
      <Button type="submit" disabled={busy}>{busy ? "Signing up" : "Notify me"}</Button>
      {error && <p role="alert" className="font-body text-[13.5px] text-red-deep sm:basis-full">{error}</p>}
    </form>
  );
}

function FeatureGrid() {
  return (
    <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((f) => (
        <li key={f.title}>
          <Panel className="h-full p-7">
            <h3 className="text-[length:var(--text-h3)]">{f.title}</h3>
            <p className="mt-2.5 font-body text-[14.5px] leading-relaxed text-body">{f.body}</p>
          </Panel>
        </li>
      ))}
    </ul>
  );
}

function PreLaunch() {
  return (
    <>
      <Section className="!pb-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Kicker>PupsPlayer™ · Coming October 2026</Kicker>
              <h1 className="mt-5 text-[length:var(--text-h1)]">The app is on the way</h1>
              <Lead className="mt-6">
                PupsPlayer™ brings the whole Watch, Play, Learn model into one place: the episodes,
                the play that follows them, and the learning running underneath. We are targeting
                mid October 2026, launching alongside this site.
              </Lead>
              <div className="mt-8 max-w-[34rem]">
                <p className="mb-3 font-body text-[14px] font-semibold text-ink">
                  Want to know the day it lands?
                </p>
                <NotifyForm />
                <p className="mt-2.5 font-body text-[12.5px] text-muted">
                  One email, at launch. No list, no marketing, no sharing it with anyone.
                </p>
              </div>
            </div>
            <AssetPlaceholder
              label="PupsPlayer™ app preview, device mockup or key screen"
              source="App"
              ratio="4/5"
              tone="cream"
            />
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <SectionHeading
            kicker="What's coming"
            title="What the app will do"
            lead="The shape of it is settled. The detail below is what we are building towards for launch."
          />
          <FeatureGrid />
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
                Episodes of <em>The Pawsitive Pugs &amp; Pals</em>®, the play that follows each one,
                and the learning underneath. Built for young children and the adults beside them.
              </Lead>
              <div className="mt-8 flex flex-wrap gap-3">
                <AssetPlaceholder label="App Store badge" source="App" ratio="3/1" className="!w-[150px]" tone="cream" />
                <AssetPlaceholder label="Google Play badge" source="App" ratio="3/1" className="!w-[150px]" tone="cream" />
              </div>
            </div>
            <AssetPlaceholder label="App hero, device mockup" source="App" ratio="4/5" tone="cream" />
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <SectionHeading kicker="Inside the app" title="What you get" />
          <FeatureGrid />
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <li key={i}>
                <AssetPlaceholder label={`App screenshot ${i}`} source="App" ratio="9/16" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}

export default function AppPage() {
  return (
    <>
      <Seo
        title={APP_LAUNCHED ? "PupsPlayer app" : "PupsPlayer app, coming soon"}
        description="PupsPlayer™ from CLÉ Family Media: episodes, interactive play and early years learning in one app built for young children."
        path="/app"
      />
      {APP_LAUNCHED ? <Launched /> : <PreLaunch />}
    </>
  );
}
