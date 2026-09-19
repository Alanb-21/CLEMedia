import { Link } from "react-router-dom";
import { Seo, organizationJsonLd } from "@/components/Seo";
import { AssetPlaceholder, CopyNeeded } from "@/components/AssetPlaceholder";
import { Button, Container, EmptyState, Kicker, Lead, Section, SectionHeading } from "@/components/ui";
import { SITE } from "@/lib/site";

/* Watch · Play · Learn — the three-part model. Copy drawn from the client's own
   positioning brief. Nothing here asserts a figure or finding. */
const MODEL = [
  {
    step: "Watch",
    body:
      "Calm, purposeful animation, paced for how young children actually take things in. Stories that hold attention without racing for it.",
  },
  {
    step: "Play",
    body:
      "Interactive follow-on that turns a story into something a child does rather than only sees, inside the app and away from the screen.",
  },
  {
    step: "Learn",
    body:
      "An educational spine underneath the whole thing, built with early-years specialists rather than bolted on afterwards.",
  },
];

export default function Home() {
  return (
    <>
      <Seo
        title="Home"
        description="CLÉ Family Media is an Irish children's media company making calm, purposeful edutainment for young children — built on a Watch, Play, Learn model and a human-led production process."
        path="/"
        jsonLd={organizationJsonLd}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <Section className="!pb-12 !pt-14 sm:!pt-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Kicker>Edutainment · Watch, Play, Learn</Kicker>
              <h1 className="mt-5 text-[length:var(--text-display)]">
                The company behind{" "}
                <span className="text-red-deep">The Pawsitive Pugs &amp; Pals</span>
                <span className="align-super text-[0.4em]">®</span>
              </h1>
              <Lead className="mt-6">
                CLÉ Family Media is an Irish children's media company making calm, purposeful
                content for young children — and for the parents watching alongside them. Built on
                research, made by people.
              </Lead>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/story">Read the founders' story</Button>
                <Button href={SITE.showUrl} variant="secondary">
                  Visit the show site
                </Button>
              </div>
            </div>

            <AssetPlaceholder
              label="Hero photograph — the garden that inspired the show's world, or the founders at work"
              ref="CONTENT-NEEDED · Photography"
              ratio="4/3"
            />
          </div>
        </Container>
      </Section>

      {/* ── The problem ─────────────────────────────────────────────────── */}
      <Section tone="cream" labelledBy="problem-h">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading
              id="problem-h"
              kicker="The problem"
              title="Most children's media is built to hold attention, not to earn it."
            />
            <div className="max-w-[60ch] space-y-5 font-body">
              <p>
                Parents of young children are handed an enormous amount of content and very little
                help judging any of it. Most of what fills the market is fast, loud and designed
                around engagement metrics — the measure of success is how long a child keeps
                watching, not what they leave with.
              </p>
              <p>
                That is not a moral panic, and we are not going to tell anyone their child watches
                too much television. It is a straightforward gap in the market: there is not enough
                content made at a child's pace, with an educational spine, that a parent can put on
                without having to vet it first.
              </p>
              <p className="text-ink">
                CLÉ Family Media exists to make that content, and to be transparent enough about how
                it is made that a parent never has to take it on trust.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Watch, Play, Learn ──────────────────────────────────────────── */}
      <Section labelledBy="model-h">
        <Container>
          <SectionHeading
            id="model-h"
            kicker="The model"
            title="Watch, Play, Learn"
            lead="Three parts that work together, rather than a show with activities attached to it."
          />
          <ol className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
            {MODEL.map((m, i) => (
              <li key={m.step} className="bg-paper p-7">
                <span className="font-display text-[15px] text-muted" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[length:var(--text-h3)]">{m.step}</h3>
                <p className="mt-2.5 font-body text-[14.5px] leading-relaxed text-body">{m.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── The company at a glance ─────────────────────────────────────── */}
      <Section tone="cream" labelledBy="company-h">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                id="company-h"
                kicker="At a glance"
                title="A small Irish studio with a specific brief"
              />
              <div className="mt-6 max-w-[58ch] space-y-5 font-body">
                <p>
                  CLÉ Family Media was founded by Conor and Lydia, who came at this as parents
                  first. The company develops and produces <em>The Pawsitive Pugs &amp; Pals</em>,
                  builds the PupsPlayer™ app around it, and publishes the research thinking that
                  sits underneath both.
                </p>
                <p>
                  The team is deliberately small and works with early-years specialists and
                  advisors rather than in isolation. Parents helping parents is not a slogan here —
                  it describes who is actually making the decisions.
                </p>
              </div>
              <Link
                to="/team"
                className="mt-6 inline-block font-body text-[14.5px] font-semibold text-red-deep underline underline-offset-4"
              >
                Meet the team and advisors
              </Link>
            </div>

            <AssetPlaceholder
              label="Photograph — the team at work, a workspace, or the production process"
              ref="CONTENT-NEEDED · Photography"
              ratio="3/2"
              tone="clay"
            />
          </div>
        </Container>
      </Section>

      {/* ── Featured module (CMS controlled) ────────────────────────────── */}
      <Section labelledBy="featured-h">
        <Container>
          <SectionHeading
            id="featured-h"
            kicker="Featured"
            title="What's happening now"
            lead="A CMS-controlled slot for the app, a news item or a featured piece of content."
          />
          <div className="mt-8">
            <EmptyState
              title="Nothing featured yet"
              body="This slot is controlled from the admin panel. Conor can point it at the app launch, a journal post or a piece of news without a developer."
            />
          </div>
        </Container>
      </Section>

      {/* ── Research and credibility ────────────────────────────────────── */}
      <Section tone="cream" labelledBy="research-h">
        <Container>
          <SectionHeading
            id="research-h"
            kicker="Research"
            title="The thinking underneath the model"
            lead="The educational framework, the specialists involved, and any external validation."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <CopyNeeded
              label="The research basis for the Watch, Play, Learn model — the framework, who developed it, and what it draws on."
              ref="QUESTIONS.md"
              lines={4}
            />
            <CopyNeeded
              label="External validation: accelerator programmes, institutional partners, funding bodies, pilot results. Only claims the client supplies."
              ref="QUESTIONS.md"
              lines={4}
            />
          </div>
          <p className="mt-6 max-w-[62ch] font-body text-[13px] text-muted">
            This section is deliberately empty. No statistic, finding, partner or endorsement will
            be written here until the client supplies it — an unverifiable claim on this page would
            undermine every other page on the site.
          </p>
        </Container>
      </Section>

      {/* ── The show handoff ────────────────────────────────────────────── */}
      <Section className="!py-0">
        <Container className="!px-0">
          <div className="grid items-stretch gap-px bg-hairline lg:grid-cols-2">
            <div className="bg-pups px-6 py-14 sm:px-10 lg:py-20">
              <Kicker className="!text-ink">The show</Kicker>
              <h2 className="mt-4 text-[length:var(--text-h2)]">
                Episodes, characters and activities live on the show site
              </h2>
              <p className="mt-4 max-w-[42ch] font-body text-[15px] text-ink">
                <em>The Pawsitive Pugs &amp; Pals</em> has its own home, built for children and the
                people watching with them. Everything to do with the show — episodes, the
                characters, colouring and activities — stays there.
              </p>
              <Button href={SITE.showUrl} className="mt-7">
                Go to pawsitivepugs.com
              </Button>
            </div>
            <AssetPlaceholder
              label="Character art — Finn, Fia and the rest. Available in the brand kit, supporting role only."
              ref="CONTENT-NEEDED · Brand assets"
              ratio="16/10"
              tone="cream"
              className="!border-0"
            />
          </div>
        </Container>
      </Section>

      {/* ── Latest from the journal ─────────────────────────────────────── */}
      <Section labelledBy="journal-h">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="journal-h" kicker="Journal" title="Latest writing" />
            <Link to="/journal" className="font-body text-[14.5px] font-semibold text-red-deep underline underline-offset-4">
              All posts
            </Link>
          </div>
          <div className="mt-8">
            <EmptyState
              title="No posts published yet"
              body="The journal runs four rotating categories, one post a week. The three most recent will appear here automatically once they're published."
            />
          </div>
        </Container>
      </Section>

      {/* ── Partnership CTA ─────────────────────────────────────────────── */}
      <Section tone="clay" labelledBy="cta-h">
        <Container>
          <div className="max-w-[52ch]">
            <h2 id="cta-h" className="text-[length:var(--text-h2)]">
              Working with CLÉ Family Media
            </h2>
            <p className="mt-4 font-body text-[length:var(--text-lead)] leading-relaxed text-ink">
              We're open to conversations with investors, broadcasters, distributors and educational
              partners. If you're assessing the company, we'd rather answer your questions directly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact">Partnership enquiries</Button>
              <Button to="/ethical-ai" variant="secondary">
                How we use AI
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
