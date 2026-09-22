import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Seo, organizationJsonLd } from "@/components/Seo";
import { Figure } from "@/components/Figure";
import { Button, Container, Kicker, Lead, Panel, Section, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { IconArrow, IconExternal, IconLearn, IconMail, IconPlay, IconWatch } from "@/components/icons";
import { SITE } from "@/lib/site";

/* Watch · Play · Learn, with the worked example the client supplied. */
const MODEL = [
  {
    icon: IconWatch,
    step: "Watch",
    body: "Watch an episode together. Calm stories, paced for how young children actually take things in.",
  },
  {
    icon: IconPlay,
    step: "Play",
    body: "Pause for a movement or breathing prompt, so the episode becomes something a child does rather than only sees.",
  },
  {
    icon: IconLearn,
    step: "Learn",
    body: "Carry on with a printable or an educator-designed activity, moving the learning off the screen entirely.",
  },
];

/* The real production and review sequence, from the client's handoff. */
const PROCESS = [
  { n: "01", who: "Conor and Al", what: "Set the episode concept and the story it is built to tell." },
  { n: "02", who: "Al", what: "Develops the script and directs production." },
  { n: "03", who: "Dr Paula Walshe", what: "Reviews the learning intent and the offline activities that follow." },
  { n: "04", who: "Lydia and Kirstie", what: "Bring parent and early years perspectives to script and production review." },
  { n: "05", who: "Mansi", what: "Supports production coordination across the schedule." },
  { n: "06", who: "The team", what: "Reviews the finished episode, and can delay a release to make changes." },
];

function NewsletterForm() {
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
      } else setSent(true);
    } catch {
      setError("Could not sign you up. Please check your connection.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <p role="status" className="font-body text-[14.5px] text-ink">
        Thank you. We will be in touch when there is something worth sending.
      </p>
    );
  }

  return (
    <form className="flex flex-col gap-3 sm:flex-row" onSubmit={submit}>
      <div className="flex-1">
        <label htmlFor="news-email" className="sr-only">Email address</label>
        <input
          id="news-email" name="email" type="email" required value={email}
          onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
          className="glass w-full rounded-[var(--radius-pill)] px-5 py-3 font-body text-[15px] text-ink placeholder:text-muted/70"
        />
      </div>
      <Button type="submit" disabled={busy}>
        {busy ? "Signing up" : "Sign up"}
        <IconMail size={16} />
      </Button>
      {error && <p role="alert" className="font-body text-[13.5px] text-red-deep sm:basis-full">{error}</p>}
    </form>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="Home"
        description="CLÉ Family Media creates calm stories and learning experiences that help families move from watching to playing and learning together. Human-led children's media, produced with the responsible support of AI-enabled technology."
        path="/"
        jsonLd={organizationJsonLd}
      />

      {/* Hero */}
      <Section className="!pb-12 !pt-14 sm:!pt-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Kicker>Watch · Play · Learn</Kicker>
              <h1 className="mt-5 text-[length:var(--text-display)]">
                Children's media made with care, creativity and human judgment.
              </h1>
              <Lead className="mt-6">
                CLÉ Family Media creates calm stories and learning experiences that help families
                move from watching to playing and learning together.
              </Lead>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/ethical-ai">
                  Explore our approach
                  <IconArrow size={17} />
                </Button>
                <Button href={SITE.showUrl} variant="secondary">
                  Meet The Pawsitive Pugs &amp; Pals
                  <IconExternal size={16} />
                </Button>
              </div>
            </div>

            <Reveal delay={120} from="right">
              <Figure asset="home.hero" priority />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* The problem families describe */}
      <Section tone="cream" labelledBy="problem-h">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading
              id="problem-h"
              kicker="What families tell us"
              title="Plenty to watch. Very little help deciding what is worth watching."
            />
            <Reveal delay={90} className="max-w-[60ch] space-y-5 font-body">
              <p>
                Parents of young children are handed an enormous amount of content and almost no
                help judging any of it. Much of what fills the market is fast and loud, built around
                how long a child keeps watching rather than what they take away from it.
              </p>
              <p>
                We are not going to tell anyone their child watches too much television. The gap we
                saw is narrower than that: not enough content made at a child's pace, with genuine
                educational intent, and with a clear account of who made it and who checked it.
              </p>
              <p className="text-ink">
                So that account is the point of this site. Who makes our work, how we make it, and
                who reviews it before it reaches a child.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Watch · Play · Learn */}
      <Section labelledBy="model-h">
        <Container>
          <SectionHeading
            id="model-h"
            kicker="The model"
            title="Watch · Play · Learn"
            lead="One episode, three stages, designed to move a child from the screen into play and conversation."
          />
          <ol className="mt-12 grid gap-5 sm:grid-cols-3">
            {MODEL.map((m, i) => (
              <Reveal as="li" key={m.step} delay={i * 80}>
                <Panel className="h-full p-7 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <span className="wash-cream hairline-ring flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] text-red-deep">
                      <m.icon size={21} />
                    </span>
                    <span className="font-display text-[14px] text-clay" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[length:var(--text-h3)]">{m.step}</h3>
                  <p className="mt-2.5 font-body text-[14.5px] leading-relaxed text-body">{m.body}</p>
                </Panel>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* How we make and review our work */}
      <Section tone="cream" labelledBy="process-h">
        <Container>
          <SectionHeading
            id="process-h"
            kicker="How the work gets made"
            title="A named person at every stage"
            lead="This is the actual sequence an episode goes through, and who is accountable at each point."
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((p, i) => (
              <Reveal as="li" key={p.n} delay={(i % 3) * 70}>
                <Panel className="h-full p-6">
                  <span className="font-display text-[14px] text-clay" aria-hidden="true">{p.n}</span>
                  <h3 className="mt-2 font-body text-[15.5px] font-semibold text-ink">{p.who}</h3>
                  <p className="mt-1.5 font-body text-[14px] leading-relaxed text-body">{p.what}</p>
                </Panel>
              </Reveal>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/ethical-ai">
              How we use AI, in detail
              <IconArrow size={17} />
            </Button>
            <Button to="/team" variant="secondary">Meet the team</Button>
          </div>
        </Container>
      </Section>

      {/* The flagship series */}
      <Section className="!py-10">
        <Container>
          <Panel className="overflow-hidden">
            <div className="grid items-stretch lg:grid-cols-2">
              <div className="wash-pups px-7 py-12 sm:px-10 lg:py-16">
                <Kicker className="!text-ink">Our first original series</Kicker>
                <h2 className="mt-4 text-[length:var(--text-h2)]">
                  The Pawsitive Pugs &amp; Pals<span className="align-super text-[0.4em]">®</span>
                </h2>
                <p className="mt-4 max-w-[44ch] font-body text-[15px] text-ink">
                  Meet Finn, the fawn pug, and Fia, the black pug. Their world, the episodes and the
                  family activities that go with them all live on the show's own site.
                </p>
                <Button href={SITE.showUrl} className="mt-7">
                  Watch episodes
                  <IconExternal size={16} />
                </Button>
              </div>
              <div className="flex items-center justify-center bg-cream/60 p-8">
                <Figure
                  asset="brand.show"
                  rounded="rounded-[var(--radius-md)]"
                  sizes="(min-width: 1024px) 45vw, 90vw"
                />
              </div>
            </div>
          </Panel>
        </Container>
      </Section>

      {/* Company at a glance, with the corporate mark */}
      <Section tone="cream" labelledBy="company-h">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal from="left">
              <Figure asset="brand.cle" sizes="(min-width: 1024px) 45vw, 90vw" />
            </Reveal>
            <div>
              <SectionHeading
                id="company-h"
                kicker="The company"
                title="A small independent studio, built around the review"
              />
              <div className="mt-6 max-w-[56ch] space-y-5 font-body">
                <p>
                  CLÉ Family Media develops original children's media and the learning experiences
                  that go with it. We are small on purpose. It means the people who set the story
                  are the same people who check it before release.
                </p>
                <p>
                  Technology should expand what a small creative team can achieve, not replace the
                  people and the responsibility behind children's content. That belief shapes how
                  the studio is organised.
                </p>
              </div>
              <Link
                to="/story"
                className="mt-6 inline-flex items-center gap-2 font-body text-[14.5px] font-semibold text-red-deep underline underline-offset-4"
              >
                Read our story
                <IconArrow size={16} />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Evidence */}
      <Section labelledBy="evidence-h">
        <Container>
          <SectionHeading
            id="evidence-h"
            kicker="Evidence"
            title="What we have seen, and what we have not yet measured"
            lead="We keep these two apart on purpose, because a lot of children's media does not."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <Panel className="h-full p-7">
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-red-deep">
                  Observed feedback
                </p>
                <h3 className="mt-3 text-[length:var(--text-h3)]">From families and settings</h3>
                <p className="mt-3 font-body text-[14.5px] leading-relaxed text-body">
                  Responses from parents, educators and early years settings who have used the work.
                  Each entry will carry a date, a source and wording cleared by the person who said
                  it. Until those permissions are confirmed, nothing appears here.
                </p>
              </Panel>
            </Reveal>
            <Reveal delay={80}>
              <Panel className="h-full p-7">
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Formal research
                </p>
                <h3 className="mt-3 text-[length:var(--text-h3)]">Not claimed</h3>
                <p className="mt-3 font-body text-[14.5px] leading-relaxed text-body">
                  We have not run formal studies, so we do not claim developmental outcomes. No
                  activity, expert or tool guarantees a result for a child, and we would rather say
                  that plainly than imply otherwise.
                </p>
              </Panel>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* News */}
      <Section tone="cream" labelledBy="news-h">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="news-h" kicker="News" title="What we are working on" />
            <Link to="/journal" className="font-body text-[14.5px] font-semibold text-red-deep underline underline-offset-4">
              All updates
            </Link>
          </div>
          <p className="mt-6 max-w-[58ch] font-body text-[15px] leading-relaxed">
            Production decisions, product progress, case study milestones and published appearances,
            each with a visible date. The first entries are being prepared now.
          </p>
        </Container>
      </Section>

      {/* Partnership and newsletter */}
      <Section tone="clay" labelledBy="cta-h">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 id="cta-h" className="text-[length:var(--text-h2)]">Working with CLÉ Family Media</h2>
              <p className="mt-4 max-w-[46ch] font-body text-[length:var(--text-lead)] leading-relaxed text-ink">
                We are open to conversations with studios, distribution partners, educators and
                press. If you are assessing the company, we would rather answer your questions
                directly.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/contact">
                  Send a partnership enquiry
                  <IconArrow size={17} />
                </Button>
              </div>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-white/45 bg-white/25 p-7 backdrop-blur-sm">
              <h3 className="text-[length:var(--text-h3)]">Occasional updates</h3>
              <p className="mt-2.5 max-w-[40ch] font-body text-[14.5px] leading-relaxed text-ink">
                Production notes and company news, for adults. Infrequent, and easy to leave.
              </p>
              <div className="mt-5"><NewsletterForm /></div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
