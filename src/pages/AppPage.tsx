import { useState, type FormEvent } from "react";
import { Seo } from "@/components/Seo";
import { AssetPlaceholder } from "@/components/AssetPlaceholder";
import { Figure } from "@/components/Figure";
import { Button, Container, Kicker, Lead, Panel, Section, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { IconBell, IconCheck, IconDevice, IconLock, IconNoAds, IconPlay, IconPrint, IconResearch } from "@/components/icons";

/**
 * Two states behind one flag in `settings`. The client flips it in /admin at
 * launch: no redeploy, no developer.
 */
const APP_LAUNCHED = false;

const FEATURES = [
  {
    icon: IconNoAds,
    title: "Every episode, ad free",
    body:
      "The full run of The Pawsitive Pugs & Pals in one place, with nothing competing for your child's attention around it. No autoplay into something you did not choose.",
  },
  {
    icon: IconPlay,
    title: "Play that follows the story",
    body:
      "Each episode has activities built from what just happened in it, so the play reinforces the idea rather than sitting beside it as a separate game.",
  },
  {
    icon: IconPrint,
    title: "Printables for off screen",
    body:
      "Colouring, puzzles and activity sheets you can print and take to the table, because not all of this should happen on a screen.",
  },
  {
    icon: IconDevice,
    title: "Built for small hands",
    body:
      "Large targets, simple navigation and no dark patterns. A young child can find their way around it, and cannot accidentally find their way out of it.",
  },
  {
    icon: IconLock,
    title: "Parents stay in control",
    body:
      "Clear settings, no surprise purchases inside the app, and no advertising to children anywhere in it.",
  },
  {
    icon: IconResearch,
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
        <p role="status" className="flex items-center gap-2.5 font-body text-[14.5px] text-ink">
          <span className="text-red-deep"><IconCheck size={18} /></span>
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
      <Button type="submit" disabled={busy}>{busy ? "Signing up" : "Notify me"}<IconBell size={16} /></Button>
      {error && <p role="alert" className="font-body text-[13.5px] text-red-deep sm:basis-full">{error}</p>}
    </form>
  );
}

function FeatureGrid() {
  return (
    <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((f, i) => (
        <Reveal as="li" key={f.title} delay={(i % 3) * 80}>
          <Panel className="h-full p-7 transition-transform duration-300 hover:-translate-y-1">
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-white/70 text-red-deep hairline-ring">
              <f.icon size={21} />
            </span>
            <h3 className="text-[length:var(--text-h3)]">{f.title}</h3>
            <p className="mt-2.5 font-body text-[14.5px] leading-relaxed text-body">{f.body}</p>
          </Panel>
        </Reveal>
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
              <Kicker>PupsPlayer™ · In development</Kicker>
              <h1 className="mt-5 text-[length:var(--text-h1)]">A product experience, in development</h1>
              <Lead className="mt-6">
                We are building a product experience to hold the whole Watch, Play, Learn model in
                one place: ad-free episodes, the play that follows them, and the offline activities
                underneath. It is in development and not yet available. The detail below is what we
                are building towards, not a list of what exists today.
              </Lead>
              <div className="mt-8 max-w-[34rem]">
                <p className="mb-3 font-body text-[14px] font-semibold text-ink">
                  Want to know when it is ready?
                </p>
                <NotifyForm />
                <p className="mt-2.5 font-body text-[12.5px] text-muted">
                  One email when it is available. No list, no marketing, no sharing it with anyone.
                </p>
              </div>
            </div>
            <Figure asset="app.hero" tone="cream" />
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <SectionHeading
            kicker="What's coming"
            title="What the app will do"
            lead="Planned features. Each one is what we are building towards rather than something you can use today."
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
            <Figure asset="app.hero" tone="cream" />
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <SectionHeading kicker="Inside the app" title="What you get" />
          <FeatureGrid />
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {(["app.screen1", "app.screen2", "app.screen3"] as const).map((k, i) => (
              <Reveal as="li" key={k} delay={i * 80}>
                <Figure asset={k} sizes="(min-width: 640px) 33vw, 100vw" />
              </Reveal>
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
        title={APP_LAUNCHED ? "PupsPlayer app" : "PupsPlayer app, in development"}
        description="PupsPlayer™ from CLÉ Family Media: a product experience in development, bringing ad-free episodes, interactive play and offline early years activities together."
        path="/app"
      />
      {APP_LAUNCHED ? <Launched /> : <PreLaunch />}
    </>
  );
}
