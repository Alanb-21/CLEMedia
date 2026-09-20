import { Seo } from "@/components/Seo";
import { Figure } from "@/components/Figure";
import { Button, Container, Kicker, Lead, Panel, Section } from "@/components/ui";
import { SITE } from "@/lib/site";

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
        description="Why Conor and Lydia founded CLÉ Family Media: becoming parents, looking closely at what young children are handed, and deciding to make something better."
        path="/story"
      />

      <Section className="!pb-10">
        <Container>
          <div className="max-w-[46ch]">
            <Kicker>Our story</Kicker>
            <h1 className="mt-5 text-[length:var(--text-h1)]">
              It started the way most of these things start, with our own children.
            </h1>
          </div>
          <Lead className="mt-6">
            Conor and Lydia on what they saw, what they could not find, and why they decided to
            build it themselves.
          </Lead>
        </Container>
      </Section>

      <Container>
        <Figure asset="story.lead" priority sizes="100vw" />
      </Container>

      <Section className="!pt-14">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
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

            <article className="max-w-[65ch] space-y-14 font-body text-[16.5px] leading-[1.75]">
              <section id="becoming-parents" className="scroll-mt-28 space-y-5">
                <h2 className="text-[length:var(--text-h2)]">Becoming parents</h2>
                <p>
                  Nobody warns you how quickly the screen question arrives. One week you are
                  bargaining over vegetables, the next there is a tablet on the kitchen table and a
                  small person who has worked out exactly how to ask for it.
                </p>
                <p>
                  We did what every parent does. We handed it over, we felt uneasy about handing it
                  over, and we told ourselves we would look properly at what was on it later. Then,
                  eventually, we looked properly.
                </p>
              </section>

              <section id="what-we-saw" className="scroll-mt-28 space-y-5">
                <h2 className="text-[length:var(--text-h2)]">What we saw</h2>
                <p>
                  What struck us was not that any of it was bad exactly. It was the speed. Cuts
                  every second and a half. Colours turned up past anything in the real world. A new
                  hook before the last one had finished landing. Content built by people who clearly
                  understood, with some precision, how to keep a three year old from looking away.
                </p>
                <p>
                  You could see the logic. Attention is what gets measured, so attention is what
                  gets designed for. But watching a small child come off forty minutes of it, wired
                  and brittle and somehow tired, it was hard to believe that was the only way to
                  make something a child loves.
                </p>
                <figure className="!my-9">
                  <Figure asset="story.garden" tone="cream" />
                  <figcaption className="mt-2.5 font-body text-[13px] text-muted">
                    The garden that became the world of the show.
                  </figcaption>
                </figure>
              </section>

              <section id="what-was-missing" className="scroll-mt-28 space-y-5">
                <h2 className="text-[length:var(--text-h2)]">What was missing</h2>
                <p>
                  So we went looking for the alternative, and there was less of it than we expected.
                  Plenty of shows were gentle. Plenty were educational. Very few were both, and
                  fewer still were honest with parents about what was actually in them or how any of
                  it had been made.
                </p>
                <Panel tone="warm" className="!my-9 border-l-[3px] !border-l-red p-7">
                  <p className="font-display text-[length:var(--text-h3)] leading-snug text-ink">
                    We were not looking for something to keep her quiet. We were looking for
                    something we would be glad she had watched.
                  </p>
                </Panel>
                <p>
                  That turned out to be the whole brief. Not less screen time, but screen time worth
                  having. Something calm enough to leave a child settled rather than strung out,
                  with enough underneath it that the twenty minutes counted for something.
                </p>
              </section>

              <section id="building-it" className="scroll-mt-28 space-y-5">
                <h2 className="text-[length:var(--text-h2)]">Building it</h2>
                <p>
                  <em>The Pawsitive Pugs &amp; Pals</em> grew out of a garden and two real pugs, which
                  is a more ordinary beginning than most origin stories admit to. The world came
                  first, the characters came from the animals already in it, and the learning was
                  built in from the start rather than added once the scripts were finished.
                </p>
                <p>
                  We brought in people who knew far more than we did. Early years specialists who
                  could tell us where our instincts were right and where they were only comfortable.
                  A creative director who had made this kind of work before. The company grew around
                  that group rather than the other way around.
                </p>
                <p>
                  CLÉ Family Media is what that turned into: a small studio making calm, purposeful
                  content, with an app to hold it, a journal to think out loud in, and a standing
                  commitment to tell parents plainly how the work gets made. Parents helping parents
                  is not a tagline we arrived at in a meeting. It is just an accurate description of
                  who is doing this and why.
                </p>
              </section>

              <div className="flex flex-wrap gap-3 border-t border-hairline pt-9">
                <Button to="/team">Meet the team</Button>
                <Button href={SITE.showUrl} variant="secondary">Visit the show site</Button>
              </div>
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
