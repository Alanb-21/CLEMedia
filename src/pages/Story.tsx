import { Seo } from "@/components/Seo";
import { AssetPlaceholder, CopyNeeded } from "@/components/AssetPlaceholder";
import { Container, Kicker, Lead, Section } from "@/components/ui";

const SECTIONS = [
  { id: "becoming-parents", label: "Becoming parents" },
  { id: "what-we-saw", label: "What we saw" },
  { id: "what-was-missing", label: "What was missing" },
  { id: "building-it", label: "Building it" },
];

export default function Story() {
  return (
    <>
      <Seo
        title="Our story"
        description="Why Conor and Lydia started CLÉ Family Media: becoming parents, looking at what young children were being handed, and deciding to make something better."
        path="/story"
      />

      <Section className="!pb-10">
        <Container>
          <div className="max-w-[46ch]">
            <Kicker>Our story</Kicker>
            <h1 className="mt-5 text-[length:var(--text-h1)]">
              It started the way most of these things start — with our own children.
            </h1>
          </div>
          <Lead className="mt-6">
            The founders' account of what they saw, what they couldn't find, and why they decided to
            build it themselves.
          </Lead>
        </Container>
      </Section>

      <Container>
        <AssetPlaceholder
          label="Lead photograph — Conor and Lydia. Real photography only; no generated or stock imagery on this site."
          ref="CONTENT-NEEDED · Photography"
          ratio="21/9"
        />
      </Container>

      <Section className="!pt-14">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            {/* Scroll anchors */}
            <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                On this page
              </p>
              <ul className="mt-3 space-y-2 border-l border-hairline pl-4">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="font-body text-[14px] text-body hover:text-ink">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <article className="max-w-[65ch] space-y-14">
              {SECTIONS.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="text-[length:var(--text-h2)]">{s.label}</h2>
                  <div className="mt-5">
                    <CopyNeeded
                      label={`Founder story, part ${i + 1} of 4: "${s.label}". Needs either interview material with Conor and Lydia, or a written piece.`}
                      ref="QUESTIONS.md #6"
                      lines={5}
                    />
                  </div>
                  {i === 1 && (
                    <figure className="mt-8">
                      <AssetPlaceholder
                        label="Supporting photograph — the garden, the house, early sketches, the real pugs"
                        ref="CONTENT-NEEDED · Photography"
                        ratio="3/2"
                        tone="cream"
                      />
                      <figcaption className="mt-2 font-body text-[13px] text-muted">
                        Caption to be supplied.
                      </figcaption>
                    </figure>
                  )}
                  {i === 2 && (
                    <blockquote className="mt-8 border-l-[3px] border-red pl-6">
                      <p className="font-display text-[length:var(--text-h3)] leading-snug text-ink">
                        Pull quote — a line from the founders that carries the emotional weight of
                        the page.
                      </p>
                      <footer className="mt-3 font-body text-[13px] uppercase tracking-wider text-muted">
                        Attribution to be confirmed
                      </footer>
                    </blockquote>
                  )}
                </section>
              ))}
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
