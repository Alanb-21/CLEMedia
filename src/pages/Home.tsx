import { Link } from "react-router-dom";
import { Seo, organizationJsonLd } from "@/components/Seo";
import { AssetPlaceholder } from "@/components/AssetPlaceholder";
import { Button, Container, Kicker, Lead, Panel, Section, SectionHeading } from "@/components/ui";
import { SITE } from "@/lib/site";

const MODEL = [
  {
    step: "Watch",
    body:
      "Calm, purposeful animation, paced for how young children actually take things in. Stories that hold attention without racing for it, and that a parent can sit through without wincing.",
  },
  {
    step: "Play",
    body:
      "Interactive follow-on that turns a story into something a child does rather than only sees. Play that continues away from the screen as readily as on it.",
  },
  {
    step: "Learn",
    body:
      "An educational spine running through the whole thing, shaped with early years specialists from the first idea rather than bolted on once the episode is finished.",
  },
];

const PILLARS = [
  {
    title: "Parents helping parents",
    body:
      "CLÉ was started by two parents who could not find what they were looking for. That is still who makes the decisions here, and it is why the company talks to parents as equals rather than as a market.",
  },
  {
    title: "Human led, always",
    body:
      "Production tools have a place in modern animation. Deciding what a child learns, writing what they hear and approving what they see are not among them. A person is accountable at every one of those points.",
  },
  {
    title: "Research underneath",
    body:
      "The Watch, Play, Learn model is built on early years practice and reviewed by specialists. The thinking behind it is published openly in our journal rather than kept as a selling point.",
  },
];

export default function Home() {
  return (
    <>
      <Seo
        title="Home"
        description="CLÉ Family Media is an Irish children's media company making calm, purposeful edutainment for young children, built on a Watch, Play, Learn model and a human led production process."
        path="/"
        jsonLd={organizationJsonLd}
      />

      {/* Hero */}
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
                content for young children, and for the parents watching alongside them. Built on
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
              label="The garden that inspired the show's world, or the founders at work"
              source="Photography"
              ratio="4/3"
            />
          </div>
        </Container>
      </Section>

      {/* The problem */}
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
                around engagement. The measure of success is how long a child keeps watching, not
                what they leave with.
              </p>
              <p>
                We are not going to tell anyone their child watches too much television, and this is
                not a moral panic. It is a straightforward gap in the market. There is not enough
                content made at a child's pace, with a genuine educational spine, that a parent can
                put on without vetting it first.
              </p>
              <p className="text-ink">
                CLÉ Family Media exists to make that content, and to be open enough about how it is
                made that no parent has to take it on trust.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Watch, Play, Learn */}
      <Section labelledBy="model-h">
        <Container>
          <SectionHeading
            id="model-h"
            kicker="The model"
            title="Watch, Play, Learn"
            lead="Three parts built to work together, rather than a show with activities attached to it afterwards."
          />
          <ol className="mt-12 grid gap-5 sm:grid-cols-3">
            {MODEL.map((m, i) => (
              <li key={m.step}>
                <Panel className="h-full p-7">
                  <span className="font-display text-[15px] text-clay" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-[length:var(--text-h3)]">{m.step}</h3>
                  <p className="mt-2.5 font-body text-[14.5px] leading-relaxed text-body">{m.body}</p>
                </Panel>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* The company at a glance */}
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
                  CLÉ Family Media develops and produces <em>The Pawsitive Pugs &amp; Pals</em>,
                  builds the PupsPlayer™ app around it, and publishes the thinking that sits
                  underneath both. The company was founded by Conor and Lydia, who came to this as
                  parents before anything else.
                </p>
                <p>
                  The team is deliberately small and works closely with early years specialists
                  rather than in isolation. Where most studios would scale headcount, we would
                  rather scale the care that goes into each episode.
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
              label="The team at work, a workspace, or the production process"
              source="Photography"
              ratio="3/2"
            />
          </div>
        </Container>
      </Section>

      {/* Featured */}
      <Section labelledBy="featured-h">
        <Container>
          <Panel className="overflow-hidden">
            <div className="grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
              <div>
                <Kicker>Coming next</Kicker>
                <h2 id="featured-h" className="mt-3 text-[length:var(--text-h2)]">
                  PupsPlayer™ arrives this October
                </h2>
                <p className="mt-4 max-w-[48ch] font-body text-[15.5px] leading-relaxed">
                  One place for the episodes, the play that follows them and the learning underneath.
                  Built for young children and for the adults sitting beside them. We are targeting
                  a mid October 2026 launch, alongside this site.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button to="/app">See what's coming</Button>
                </div>
              </div>
              <AssetPlaceholder
                label="PupsPlayer™ app preview"
                source="App"
                ratio="4/3"
                tone="cream"
              />
            </div>
          </Panel>
        </Container>
      </Section>

      {/* Research and credibility */}
      <Section tone="cream" labelledBy="research-h">
        <Container>
          <SectionHeading
            id="research-h"
            kicker="Why it holds up"
            title="The thinking underneath the model"
            lead="Three things we would want to know if we were assessing this company from the outside."
          />
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <li key={p.title}>
                <Panel className="h-full p-7">
                  <h3 className="text-[length:var(--text-h3)]">{p.title}</h3>
                  <p className="mt-3 font-body text-[14.5px] leading-relaxed text-body">{p.body}</p>
                </Panel>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[64ch] font-body text-[13.5px] text-muted">
            We do not publish audience figures or outcome claims we cannot stand behind. When there
            are results worth reporting, they will appear here with the method attached.
          </p>
        </Container>
      </Section>

      {/* The show handoff */}
      <Section className="!py-10">
        <Container>
          <Panel className="overflow-hidden">
            <div className="grid items-stretch lg:grid-cols-2">
              <div className="wash-pups px-7 py-12 sm:px-10 lg:py-16">
                <Kicker className="!text-ink">The show</Kicker>
                <h2 className="mt-4 text-[length:var(--text-h2)]">
                  Episodes, characters and activities live on the show site
                </h2>
                <p className="mt-4 max-w-[42ch] font-body text-[15px] text-ink">
                  <em>The Pawsitive Pugs &amp; Pals</em> has a home of its own, built for children
                  and the people watching with them. Everything to do with the show stays there:
                  episodes, the characters, colouring and activities.
                </p>
                <Button href={SITE.showUrl} className="mt-7">
                  Go to pawsitivepugs.com
                </Button>
              </div>
              <AssetPlaceholder
                label="Character art: Finn, Fia and the rest of the pack"
                source="Brand assets"
                ratio="16/10"
                tone="cream"
                rounded="rounded-none"
                className="!shadow-none"
              />
            </div>
          </Panel>
        </Container>
      </Section>

      {/* Journal */}
      <Section labelledBy="journal-h">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="journal-h" kicker="Journal" title="Latest writing" />
            <Link to="/journal" className="font-body text-[14.5px] font-semibold text-red-deep underline underline-offset-4">
              All posts
            </Link>
          </div>
          <p className="mt-6 max-w-[58ch] font-body text-[15px] leading-relaxed">
            We write publicly about the research, the production process and the business of making
            children's media in Ireland. Four strands, one post a week, with the first pieces
            arriving shortly.
          </p>
        </Container>
      </Section>

      {/* Partnership CTA */}
      <Section tone="clay" labelledBy="cta-h">
        <Container>
          <div className="max-w-[52ch]">
            <h2 id="cta-h" className="text-[length:var(--text-h2)]">
              Working with CLÉ Family Media
            </h2>
            <p className="mt-4 font-body text-[length:var(--text-lead)] leading-relaxed text-ink">
              We are open to conversations with investors, broadcasters, distributors and
              educational partners. If you are assessing the company, we would far rather answer
              your questions directly than have you piece it together.
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
