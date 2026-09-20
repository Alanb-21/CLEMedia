import { Seo } from "@/components/Seo";
import { Container, Kicker, Lead, Panel, Section, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { IconArrow, IconCheck, IconHands, IconHuman, IconLock, IconNoAds, IconResearch } from "@/components/icons";

/**
 * The stages are the ones named in the client brief. What a human decides at
 * each stage is stated structurally; the specific tooling and the detail of each
 * step still need the client's confirmation before they can be asserted as fact.
 */
const STAGES = [
  {
    n: "01",
    title: "Concept",
    human: "A person decides what the episode is about, what a child should take from it, and which early-years objective it serves.",
    tool: "No tool involvement. Nothing generates a story idea.",
  },
  {
    n: "02",
    title: "Educational review",
    human: "An early-years advisor checks the concept against the learning framework before a word of script is written.",
    tool: "None.",
  },
  {
    n: "03",
    title: "Scripting",
    human: "A person writes the script. Dialogue, pacing and the emotional shape of the episode are authored, not generated.",
    tool: "Assistive only: drafting support and reference lookups. Every line that reaches the screen is written or rewritten by a person.",
  },
  {
    n: "04",
    title: "Creative development",
    human: "Art direction, character performance, colour, staging and sound are directed by the creative team against an established style.",
    tool: "Production tooling assists with rendering and iteration inside a style people defined and control.",
  },
  {
    n: "05",
    title: "Review and sign-off",
    human: "Every finished asset is reviewed by a person against both the educational objective and the content standards before it ships.",
    tool: "None. No output reaches a child without a human having approved it.",
  },
];

const LINES = [
  {
    icon: IconHands,
    title: "AI never authors the story",
    body: "Narrative, characters and dialogue are written by people. A generative tool is never the source of what a child is being told.",
  },
  {
    icon: IconCheck,
    title: "Nothing reaches a child unreviewed",
    body: "There is no path from a tool's output to a screen that does not pass through a person who is accountable for it.",
  },
  {
    icon: IconNoAds,
    title: "No synthetic children, no synthetic people",
    body: "We do not generate images of children, and we do not present generated imagery of real people as photography.",
  },
  {
    icon: IconResearch,
    title: "Educational integrity comes first",
    body: "Where a tool would make production faster but weaken the learning outcome, the learning outcome wins.",
  },
  {
    icon: IconLock,
    title: "We will say what we use",
    body: "If our production process changes, this page changes with it. Ambiguity about this is itself a failure.",
  },
];

export default function EthicalAi() {
  return (
    <>
      <Seo
        title="Ethical AI"
        description="How CLÉ Family Media uses AI in production: as a tool inside a human-led process, never as the author of children's content. The process, stage by stage, and the lines we will not cross."
        path="/ethical-ai"
      />

      <Section className="!pb-10">
        <Container>
          <div className="max-w-[48ch]">
            <Kicker>Ethical AI</Kicker>
            <h1 className="mt-5 text-[length:var(--text-h1)]">
              A tool in the process. Never the author.
            </h1>
          </div>
          <Lead className="mt-6">
            AI is part of how modern animation gets made, and pretending otherwise would be the
            quickest way to lose a parent's trust. So here is exactly where it sits in our process,
            where a person decides instead, and what we will not do.
          </Lead>
        </Container>
      </Section>

      {/* ── Position ────────────────────────────────────────────────────── */}
      <Section tone="cream" className="!py-14" labelledBy="position-h">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <h2 id="position-h" className="text-[length:var(--text-h2)]">
              Our position
            </h2>
            <div className="max-w-[62ch] space-y-5 font-body">
              <p className="text-[length:var(--text-lead)] leading-relaxed text-ink">
                Generative tools are used in our production pipeline. They are used the way a studio
                uses any production tool, to iterate faster inside a creative direction that people
                set and control.
              </p>
              <p>
                They are not used to decide what a child should learn, to write what a child is
                told, or to approve what a child sees. Those are judgements with consequences, and a
                person is accountable for every one of them.
              </p>
              <p className="text-ink">
                The distinction we hold to is simple: a tool may help make the thing. It may never
                be the thing's author.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── The process ─────────────────────────────────────────────────── */}
      <Section labelledBy="process-h">
        <Container>
          <SectionHeading
            id="process-h"
            kicker="The process"
            title="Five stages, and who decides at each one"
            lead="Read down the left for what a person does. Read down the right for what a tool is permitted to do."
          />

          <ol className="mt-12">
            {STAGES.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 60} className="relative grid gap-5 border-t border-hairline/70 py-8 sm:grid-cols-[64px_1fr_1fr] sm:gap-8">
                <div className="flex items-start gap-3 sm:block">
                  <span className="font-display text-[26px] leading-none text-clay" aria-hidden="true">
                    {s.n}
                  </span>
                  {i < STAGES.length - 1 && (
                    <span aria-hidden="true" className="mt-3 hidden h-[calc(100%-2.5rem)] w-px bg-hairline sm:block sm:translate-x-3" />
                  )}
                  <h3 className="text-[length:var(--text-h3)] sm:hidden">{s.title}</h3>
                </div>

                <div>
                  <h3 className="hidden text-[length:var(--text-h3)] sm:block">{s.title}</h3>
                  <p className="mt-2 inline-flex items-center gap-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-red-deep">
                    <IconHuman size={14} />
                    A person decides
                  </p>
                  <p className="mt-2 max-w-[42ch] font-body text-[14.5px] leading-relaxed text-body">
                    {s.human}
                  </p>
                </div>

                <div className="border-l border-hairline pl-5 sm:mt-[2.1rem]">
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    A tool may assist
                  </p>
                  <p className="mt-2 max-w-[42ch] font-body text-[14.5px] leading-relaxed text-muted">
                    {s.tool}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Panel tone="warm" className="mt-12 p-7">
            <p className="max-w-[68ch] font-body text-[15px] leading-relaxed text-ink">
              If that reads as a narrow role for the technology, it is meant to. The tools speed up
              iteration inside a look and a story that people have already decided on. They do not
              choose the objective, they do not write the words, and they never sign anything off.
            </p>
          </Panel>
        </Container>
      </Section>

      {/* ── The lines ───────────────────────────────────────────────────── */}
      <Section tone="clay" labelledBy="lines-h">
        <Container>
          <SectionHeading
            id="lines-h"
            kicker="Safeguards"
            title="The lines we will not cross"
            className="[&_h2]:text-ink [&_p]:text-ink"
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {LINES.map((l, i) => (
              <Reveal as="li" key={l.title} delay={i * 70}
                className="rounded-[var(--radius-lg)] border border-white/45 bg-white/25 p-7 backdrop-blur-sm">
                <h3 className="flex items-start gap-3 text-[length:var(--text-h3)]">
                  <span className="mt-0.5 shrink-0"><l.icon size={20} /></span>
                  {l.title}
                </h3>
                <p className="mt-2.5 pl-[32px] font-body text-[14.5px] leading-relaxed text-ink/90">
                  {l.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="ask-h">
        <Container>
          <div className="max-w-[54ch]">
            <h2 id="ask-h" className="text-[length:var(--text-h2)]">
              Ask us about it
            </h2>
            <p className="mt-4 font-body text-[length:var(--text-lead)] leading-relaxed">
              If you're an educator, a distributor or a parent and something on this page doesn't
              satisfy you, we would genuinely rather have the conversation than have you assume.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 font-body text-[15px] font-semibold text-red-deep underline underline-offset-4"
            >
              Get in touch
              <IconArrow size={16} />
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
