import { useState } from "react";
import { Seo } from "@/components/Seo";
import { Button, Container, Kicker, Lead, Panel, Section, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { IconArrow, IconCheck, IconHands, IconHuman, IconLearn, IconLock, IconResearch } from "@/components/icons";

/** The two platforms currently in use, named because vagueness reads worse. */
const TOOLS = [
  { name: "Runway", role: "Supports elements of visual production and animation." },
  { name: "ElevenLabs", role: "Supports elements of audio and voice production." },
];

/** The real sequence, from the company's own production workflow. */
const STAGES = [
  {
    n: "01",
    title: "Concept and story",
    who: "Conor and Al",
    body: "The episode concept, the story and the learning goal are set by people, before any production begins.",
  },
  {
    n: "02",
    title: "Script and direction",
    who: "Al",
    body: "The script is written and production is directed. Assets are specified and selected by the team, not accepted as they arrive.",
  },
  {
    n: "03",
    title: "Educational review",
    who: "Dr Paula Walshe",
    body: "Learning intent and the offline activities that follow the episode are reviewed against early years practice.",
  },
  {
    n: "04",
    title: "Parent and early years review",
    who: "Lydia and Kirstie",
    body: "Script and production are read again from a parent's point of view and an early years point of view.",
  },
  {
    n: "05",
    title: "Quality and suitability checks",
    who: "The production team",
    body: "Voices and visuals are checked for quality, consistency and suitability for the children watching.",
  },
  {
    n: "06",
    title: "Final review and approval",
    who: "The team",
    body: "The finished episode is inspected and changes are requested where needed. A release can be delayed. Nothing is generated and published automatically.",
  },
];

const PRINCIPLES = [
  {
    icon: IconHands,
    title: "Human creativity comes first",
    body:
      "Characters, stories, educational objectives, scripts and creative direction all begin with people. Tools can help bring those ideas to screen. They do not decide what a story should teach, how a character should behave, or what is appropriate for the children watching.",
  },
  {
    icon: IconCheck,
    title: "Human oversight at every stage",
    body:
      "Using AI does not remove responsibility. Our team reviews, directs and refines the work throughout production. Outputs are not automatically generated and published.",
  },
  {
    icon: IconLock,
    title: "Protecting original IP",
    body:
      "The Pawsitive Pugs & Pals®, its characters and its world are original intellectual property. We do not intentionally use AI to reproduce the identifiable style, characters or IP of other creators or children's brands. The aim is to build our own world, not imitate somebody else's.",
  },
  {
    icon: IconHuman,
    title: "Children's interests come before technology",
    body:
      "The fact that technology can do something does not mean we should. Decisions are guided by the child's experience first: calm, age-appropriate content that moves a child beyond passive viewing into play, conversation and offline learning.",
  },
  {
    icon: IconLearn,
    title: "Education requires human judgement",
    body:
      "Educational content deserves more than an automated check. Decisions about learning objectives, activities, language and child development stay with qualified people.",
  },
  {
    icon: IconResearch,
    title: "Transparency matters",
    body:
      "We will not pretend AI is absent from our process. Equally, calling our programmes simply AI-generated misrepresents the human development, direction and review involved. We prefer a clearer description, which is the line at the top of this page.",
  },
];

const FAQ = [
  {
    q: "Which tools are used?",
    a: "Runway, for elements of visual production and animation, and ElevenLabs, for elements of audio and voice production. Both sit inside a human-led workflow rather than operating as autonomous content creators. As the technology changes we will keep reviewing the platforms we use, their commercial terms, and how they align with our standards on intellectual property, consent and responsible production.",
  },
  {
    q: "Who writes and approves the stories?",
    a: "Conor and Al set the concept and the story. Al writes the script and directs production. The finished episode is reviewed by the team before release, and any of them can ask for changes.",
  },
  {
    q: "How are educational decisions made?",
    a: "Dr Paula Walshe reviews the learning intent of each episode and the activities that follow it. Lydia and Kirstie bring parent and early years perspectives to script and production review. Those judgements are made by people, and we do not automate them.",
  },
  {
    q: "What happens when a review identifies a problem?",
    a: "The work is revised and re-reviewed before it goes out. A release can be delayed to make that possible, and has been. Getting an episode right matters more to us than getting it out on the original date.",
  },
];

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <Panel className="overflow-hidden">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex w-full items-center gap-4 p-6 text-left font-body text-[16px] font-semibold text-ink"
        >
          {q}
          <span
            aria-hidden="true"
            className="ml-auto shrink-0 text-red-deep transition-transform duration-300"
            style={{ transform: open ? "rotate(90deg)" : "none" }}
          >
            <IconArrow size={18} />
          </span>
        </button>
      </h3>
      {open && (
        <p className="border-t border-hairline/60 px-6 pb-6 pt-4 font-body text-[14.5px] leading-relaxed text-body">
          {a}
        </p>
      )}
    </Panel>
  );
}

export default function EthicalAi() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <Seo
        title="Responsible AI"
        description="Human-led children's media, produced with the responsible support of AI-enabled technology. How CLÉ Family Media uses Runway and ElevenLabs inside a human-led production workflow, and who reviews the work before release."
        path="/ethical-ai"
      />

      <Section className="!pb-10">
        <Container>
          <div className="max-w-[50ch]">
            <Kicker>Responsible AI</Kicker>
            <h1 className="mt-5 text-[length:var(--text-h1)]">
              Human-led. AI-enabled. Built responsibly.
            </h1>
          </div>
          <Lead className="mt-6">
            Technology should expand what a creative team can achieve, not replace the people,
            judgement and responsibility behind children's content. AI-enabled production tools let
            a small independent studio make ambitious original work. Our team stays accountable for
            every decision and every release.
          </Lead>
        </Container>
      </Section>

      {/* The position, stated plainly */}
      <Section tone="cream" className="!py-14" labelledBy="position-h">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <h2 id="position-h" className="text-[length:var(--text-h2)]">Our position</h2>
            <div className="max-w-[62ch] space-y-5 font-body">
              <p className="font-display text-[length:var(--text-h3)] leading-snug text-ink">
                AI is a production tool. People remain responsible for the work.
              </p>
              <p>
                Our creative and educational decisions are made by people. In final production we
                use Runway for visual production and ElevenLabs for voice production. Our team
                directs, reviews and approves the work before publication.
              </p>
              <p className="text-ink">
                We would rather describe that accurately than flatter ourselves in either direction.
                Calling this work handmade would be untrue. Calling it AI-generated would erase the
                people who actually make the decisions.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Tools, named */}
      <Section className="!py-14" labelledBy="tools-h">
        <Container>
          <SectionHeading
            id="tools-h"
            kicker="The tools"
            title="What we currently use, by name"
            lead="Two platforms, both inside final production, neither operating on its own."
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {TOOLS.map((t, i) => (
              <Reveal as="li" key={t.name} delay={i * 80}>
                <Panel className="h-full p-7">
                  <h3 className="font-display text-[length:var(--text-h3)] text-ink">{t.name}</h3>
                  <p className="mt-2 font-body text-[14.5px] leading-relaxed text-body">{t.role}</p>
                </Panel>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 max-w-[64ch] font-body text-[13.5px] text-muted">
            Naming the platforms does not imply that either provider endorses CLÉ Family Media.
          </p>
        </Container>
      </Section>

      {/* The sequence */}
      <Section tone="cream" labelledBy="process-h">
        <Container>
          <SectionHeading
            id="process-h"
            kicker="The workflow"
            title="Six stages, each with a person accountable for it"
          />
          <ol className="mt-12">
            {STAGES.map((s, i) => (
              <Reveal
                as="li"
                key={s.n}
                delay={i * 60}
                className="grid gap-4 border-t border-hairline/70 py-7 sm:grid-cols-[68px_1fr_1.25fr] sm:gap-8"
              >
                <span className="font-display text-[24px] leading-none text-clay" aria-hidden="true">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-[length:var(--text-h3)]">{s.title}</h3>
                  <p className="mt-1.5 font-body text-[13px] font-semibold uppercase tracking-wider text-red-deep">
                    {s.who}
                  </p>
                </div>
                <p className="max-w-[48ch] font-body text-[14.5px] leading-relaxed text-body">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Principles */}
      <Section labelledBy="principles-h">
        <Container>
          <SectionHeading
            id="principles-h"
            kicker="Our principles"
            title="The standards we hold ourselves to"
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 70}>
                <Panel className="h-full p-7">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-white/70 text-red-deep hairline-ring">
                    <p.icon size={21} />
                  </span>
                  <h3 className="text-[length:var(--text-h3)]">{p.title}</h3>
                  <p className="mt-2.5 font-body text-[14.5px] leading-relaxed text-body">{p.body}</p>
                </Panel>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="cream" labelledBy="faq-h">
        <Container>
          <SectionHeading id="faq-h" kicker="Questions" title="The ones we are asked most" />
          <div className="mt-8 grid max-w-[62rem] gap-4">
            {FAQ.map((f, i) => (
              <FaqItem
                key={f.q}
                q={f.q}
                a={f.a}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Commitment */}
      <Section labelledBy="commit-h">
        <Container>
          <div className="max-w-[60ch]">
            <Kicker>Our commitment</Kicker>
            <h2 id="commit-h" className="mt-4 text-[length:var(--text-h2)]">
              The technology will keep changing. The responsibility will not.
            </h2>
            <p className="mt-5 font-body text-[length:var(--text-lead)] leading-relaxed">
              As the company grows we will keep reviewing our practice around human creative
              authorship, intellectual property and commercial rights, performer and voice consent,
              tool selection, transparency with audiences and partners, child safety, educational
              integrity, and making sure technology supports rather than replaces meaningful human
              creativity.
            </p>
            <p className="mt-5 max-w-[56ch] font-body text-[15.5px] leading-relaxed text-ink">
              If something here does not satisfy you, whether you are a parent, an educator or a
              distribution partner, we would genuinely rather have the conversation than have you
              assume.
            </p>
            <Button to="/contact" className="mt-8">
              Get in touch
              <IconArrow size={17} />
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
