import { Seo } from "@/components/Seo";
import { Figure } from "@/components/Figure";
import { Button, Container, Kicker, Lead, Panel, Section } from "@/components/ui";
import { Settle } from "@/components/Settle";
import { IconArrow, IconExternal } from "@/components/icons";
import { SITE } from "@/lib/site";

const SECTIONS = [
  { id: "what-i-saw", label: "What I saw" },
  { id: "becoming-a-parent", label: "Becoming a parent" },
  { id: "building-it", label: "Building an alternative" },
  { id: "how-it-reaches-you", label: "How it reaches you" },
];

export default function Story() {
  return (
    <>
      <Seo
        title="Our story"
        description="Conor Sexton on why he founded CLÉ Family Media: the media young children encounter, becoming a parent, and building a practical alternative with creative and education specialists."
        path="/story"
      />

      <Section className="!pb-10">
        <Container>
          <div className="max-w-[48ch]">
            <Kicker>Our story</Kicker>
            <h1 className="mt-5 display-page font-display">
              I did not set out to start a media company.
            </h1>
          </div>
          <Lead className="mt-6">
            Conor Sexton on what he saw, what he could not find, and what it took to build the
            alternative.
          </Lead>
        </Container>
      </Section>

      <Container>
        <Figure asset="story.lead" priority sizes="100vw" />
      </Container>

      <Section className="!pt-14">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[210px_1fr] lg:gap-16">
            <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-deep">
                On this page
              </p>
              <ul className="mt-3 space-y-2 border-l border-hairline pl-4">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-[14px] text-slate hover:text-ink">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <article className="max-w-[65ch] space-y-14 text-[16.5px] leading-[1.75]">
              <Settle as="section" className="scroll-mt-28 space-y-5">
                <div id="what-i-saw" className="scroll-mt-28" />
                <h2 className="display-section font-display">What I saw</h2>
                <p>
                  I started paying proper attention to children's media the way most people do, by
                  sitting beside a small child who was watching it. What struck me was the speed.
                  Cuts every second or so. Colours turned up past anything in the real world. A new
                  hook arriving before the last one had finished landing.
                </p>
                <p>
                  None of it was malicious. You could see the logic plainly enough: attention is
                  what gets measured, so attention is what gets designed for. But watching a child
                  come off forty minutes of it, wired and brittle and somehow tired at the same
                  time, I could not accept that this was simply how children's content had to work.
                </p>
              </Settle>

              <Settle as="section" className="scroll-mt-28 space-y-5">
                <div id="becoming-a-parent" className="scroll-mt-28" />
                <h2 className="display-section font-display">Becoming a parent</h2>
                <p>
                  Becoming a parent changes the question from an interesting one into an urgent one.
                  It stops being about media in general and becomes about the specific twenty
                  minutes in front of you, and whether you are glad about them afterwards.
                </p>
                <Panel tone="warm" className="!my-9 border-l-[3px] !border-l-red p-7">
                  <p className="font-display text-[18px] font-semibold leading-snug text-ink">
                    I was not looking for something to keep her quiet. I was looking for something I
                    would be glad she had watched.
                  </p>
                </Panel>
                <p>
                  So I went looking, and there was less of it than I expected. Plenty of shows were
                  gentle. Plenty were educational. Very few were both, and fewer still would tell
                  you anything about who had made them or who had checked them before they reached
                  a child.
                </p>
                <figure className="!my-9">
                  <Figure asset="story.garden" tone="cream" />
                  <figcaption className="mt-2.5 text-[13px] text-deep">
                    A frame from The Pawsitive Pugs &amp; Pals.
                  </figcaption>
                </figure>
              </Settle>

              <Settle as="section" className="scroll-mt-28 space-y-5">
                <div id="building-it" className="scroll-mt-28" />
                <h2 className="display-section font-display">Building an alternative</h2>
                <p>
                  I could not have made this on my own, and I did not try. The company came
                  together around people who knew far more than I did: Al on the creative side,
                  who writes and directs and sets the pace of an episode; Paula on the educational
                  side, who reviews the learning intent before a script exists; Lydia and Kirstie
                  bringing the parent and early years perspectives that catch what a production read
                  misses.
                </p>
                <p>
                  <em>The Pawsitive Pugs &amp; Pals</em> is our first original series. Finn, the fawn
                  pug, and Fia, the black pug, came out of that work. The learning was built in from
                  the start rather than added once the scripts were finished, which is a slower way
                  to make a show and, as far as we can tell, the only way to make this one.
                </p>
                <p>
                  Being a small studio is not something we are apologising for. It means the people
                  who set the story are the same people who check it before release, and that any
                  of them can hold a release back. That is worth more to me than volume.
                </p>
              </Settle>

              <Settle as="section" className="scroll-mt-28 space-y-5">
                <div id="how-it-reaches-you" className="scroll-mt-28" />
                <h2 className="display-section font-display">How it reaches you</h2>
                <p>
                  The model is Watch, Play, Learn, and it is more literal than it sounds. Watch an
                  episode together. Pause for a movement or a breathing prompt. Then carry on with a
                  printable or an educator-designed activity, away from the screen entirely. The
                  episode is the beginning of the thing, not the whole of it.
                </p>
                <p>
                  In practice, most families find us free on YouTube, which is simply where
                  discovery happens for a series like ours. The show's own site is where the
                  episodes and the family activities properly live, and we are building a product
                  experience to support ad-free viewing and the offline activities together. That
                  is in development rather than available, and we will say so plainly until the day
                  it is not.
                </p>
              </Settle>

              <div className="flex flex-wrap gap-3 border-t border-hairline pt-9">
                <Button to="/ethical-ai">
                  How we make and review the work
                  <IconArrow size={17} />
                </Button>
                <Button href={SITE.showUrl} variant="secondary">
                  Visit the show site
                  <IconExternal size={16} />
                </Button>
              </div>
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
