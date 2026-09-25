import { useState, type FormEvent } from "react";
import { Seo, organizationJsonLd } from "@/components/Seo";
import { Figure } from "@/components/Figure";
import { Settle } from "@/components/Settle";
import { ReviewGateScene } from "@/components/home/ReviewGateScene";
import {
  Button, Card, Container, Kicker, Lead, Rail, Section,
  SectionHeading, TextLink, Tile, type RailItem,
} from "@/components/ui";
import { IconArrow, IconExternal, IconMail } from "@/components/icons";
import { SITE } from "@/lib/site";

/* ============================================================================
   THE RULE THIS PAGE WAS REBUILT ON.

   Five real images exist in public/brand/: the felted CLÉ mark, the felted
   Pawsitive Pugs wordmark, the hen and pugs, the tree swing, the bluebells.
   An earlier version of this page used NONE of them, and rendered nine empty
   placeholder frames instead, including a placeholder for the felted wordmark
   that is already in the repo. That is why the page read as a blank sheet.

   So: the artwork is the content. It is used large and full bleed, because
   that is how pawsitivepugs.com carries its own pages. And an empty frame is
   never rendered on this page. Where an asset is missing, the section is built
   from what exists instead, and the gap is listed in CONTENT-NEEDED.md.
   ========================================================================== */

const MODEL: RailItem[] = [
  { index: "01", title: "Watch", body: "An episode, together. Calm stories paced for how young children actually take things in, with nothing autoplaying into something nobody chose." },
  { index: "02", title: "Play", body: "A pause for a movement or breathing prompt, so the episode becomes something a child does rather than only sees." },
  { index: "03", title: "Learn", body: "A printable or an educator-designed activity afterwards, moving the learning off the screen entirely." },
];

/* Titles and synopses are the show's own, from its site. Runtime, age range and
   theme are not known and are not invented. */
const EPISODES = [
  { n: "001", title: "The Feather", line: "A drifting feather leads Finn and Fia on a garden adventure where slowing down helps them discover the hidden beauty of the tiny world around them." },
  { n: "002", title: "Chicken Vision", line: "Finn and Fia meet a hen who sees the garden differently, and discover the world can look magical in many different ways." },
  { n: "003", title: "The Strawberry", line: "After a rainy night in the garden, Finn and Fia help a tiny field mouse reach a strawberry just out of reach." },
  { n: "004", title: "Cuckoo", line: "Finn and Fia go on a new adventure and meet a cuckoo who has travelled a very long way to get back to the garden." },
];

/* No portraits. Four empty portrait frames were four more blank rectangles on a
   page that had too many already. Names, roles and what each person actually
   checks carry the section until real photography exists. */
const PEOPLE = [
  { name: "Conor Sexton", role: "Founder", line: "Sets each episode's concept and story alongside Al, and leads strategy and partnerships." },
  { name: "Dr Paula Walshe", role: "Education Director", line: "Lecturer at SETU and author of Síolta in Practice. Reviews learning intent against early years practice." },
  { name: "Al Compton", role: "Creative Director", line: "Develops the script and directs production. The look, the performances and the pace are his call." },
  { name: "Lydia Sexton", role: "Executive Producer", line: "Reads script and production from a parent's point of view before anything is released." },
  { name: "Kirstie Harding", role: "Early Learning Advisor", line: "An experienced Special Needs Assistant. Reads every script from the point of view of the children who will watch it." },
  { name: "Mansi", role: "Production Coordination", line: "Holds the schedule together so a note from one review reaches the people who act on it." },
];

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      const r = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ route: "notify", email }),
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        setError(d.error ?? "Could not sign you up. Please try again.");
      } else setSent(true);
    } catch { setError("Could not sign you up. Please check your connection."); }
    finally { setBusy(false); }
  }

  if (sent) return <p role="status" className="t-sm mt-6">Thank you. We will be in touch when there is something worth sending.</p>;

  return (
    <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={submit}>
      <div className="flex-1">
        <label htmlFor="notify-email" className="sr-only">Email address</label>
        <input
          id="notify-email" name="email" type="email" required value={email}
          onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
          className="w-full rounded-full border border-white/25 bg-white/10 px-5 py-3 text-[16px] text-white placeholder:text-white/50"
        />
      </div>
      <Button type="submit" disabled={busy}>{busy ? "Signing up" : "Sign up"}<IconMail size={16} /></Button>
      {error && <p role="alert" className="t-sm sm:basis-full">{error}</p>}
    </form>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="Home"
        description="CLÉ Family Media makes calm, purposeful children's media. Watch, Play, Learn: stories built to move a child off the screen and into play, made by a named team who each review every episode before it is released."
        path="/"
        jsonLd={organizationJsonLd}
      />

      {/* ═══ 1. HERO. The company's own felted mark, large, the way the show
          site opens on its felted wordmark. Then the line, then the art. ═══ */}
      <Section className="!pb-0 !pt-14 sm:!pt-16">
        <Container width="wide">
          <Settle className="text-center">
            <Figure
              asset="brand.cle"
              priority
              rounded="rounded-[var(--radius-xl)]"
              className="mx-auto w-full max-w-[420px]"
              sizes="420px"
            />
            <h1 className="t-display mx-auto mt-10 max-w-[16ch]">
              Children's media made by people
            </h1>
            <Lead className="mx-auto mt-6">
              Calm stories for young children, and the activities that take them off the screen
              afterwards. Every episode is reviewed by a named person before it is released.
            </Lead>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button to="/ethical-ai">How we make it<IconArrow size={16} /></Button>
              <Button href={SITE.showUrl} variant="quiet">Visit the show<IconExternal size={15} /></Button>
            </div>
          </Settle>
        </Container>

        {/* The garden the show is set in, full bleed. */}
        <Settle className="mt-16">
          <Figure
            asset="home.hero" fill position="50% 62%"
            rounded="rounded-none"
            className="h-[42vh] min-h-[280px] w-full sm:h-[52vh]"
            sizes="100vw"
          />
        </Settle>
      </Section>

      {/* ═══ 2. THESIS ═══ */}
      <Section labelledBy="thesis-h">
        <Container width="text">
          <Settle>
            <Kicker>What we believe</Kicker>
            <h2 id="thesis-h" className="t-h1 mt-6">
              We are not going to tell anyone their child watches too much television.
            </h2>
            <div className="t-lead mt-8 space-y-6 text-body">
              <p>
                The gap we saw is narrower than that. Not enough content made at a child's pace,
                with genuine educational intent, and with a clear account of who made it and who
                checked it.
              </p>
              <p>
                Much of what fills the market is fast and loud, built around how long a child keeps
                watching rather than what they take away from it. Attention is what gets measured,
                so attention is what gets designed for.
              </p>
              <p className="text-ink">
                We would rather make the episode the beginning of the thing than the whole of it.
              </p>
            </div>
          </Settle>
        </Container>
      </Section>

      {/* ═══ 3. THE MODEL, against the swing. The art is the left column. ═══ */}
      <Section labelledBy="model-h" className="!py-0">
        <div className="grid items-stretch lg:grid-cols-[0.9fr_1.1fr]">
          <Figure
            asset="story.garden" fill
            rounded="rounded-none"
            className="h-[46vh] min-h-[320px] w-full lg:h-full"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          <div className="px-5 py-20 sm:px-10 lg:px-16 lg:py-28">
            <Settle>
              <SectionHeading
                id="model-h"
                kicker="The model"
                title="One episode, three stages"
                lead="Designed to move a child from the screen into play and conversation, rather than to hold them in front of it."
              />
            </Settle>
            <Settle className="mt-10">
              <Rail items={MODEL} />
            </Settle>
          </div>
        </div>
      </Section>

      {/* ═══ 4. THE SERIES. The felted wordmark leads it, the characters
          carry it, the four episodes sit underneath as text. ═══ */}
      <Section labelledBy="series-h">
        <Container width="wide">
          <Settle className="text-center">
            <Figure
              asset="brand.show"
              rounded="rounded-[var(--radius-lg)]"
              className="mx-auto w-full max-w-[460px]"
              sizes="460px"
            />
            <h2 id="series-h" className="t-h2 mx-auto mt-8 max-w-[20ch]">Our first original series</h2>
            <Lead className="mx-auto mt-5">
              Finn, the fawn pug, and Fia, the black pug, in a garden that rewards slowing down.
              Four episodes released so far.
            </Lead>
          </Settle>

          <Settle className="mt-12">
            <Card className="overflow-hidden p-3">
              <Figure
                asset="home.characters" fill
                rounded="rounded-[var(--radius-md)]"
                className="h-[38vh] min-h-[260px] w-full"
                sizes="(min-width: 1280px) 1100px, 92vw"
              />
            </Card>
          </Settle>

          <Settle className="mt-8 grid gap-4 sm:grid-cols-2">
            {EPISODES.map((ep) => (
              <Tile key={ep.n} className="p-6">
                <p className="eyebrow">Episode {ep.n}</p>
                <h3 className="t-h3 mt-3">{ep.title}</h3>
                <p className="t-body mt-2 text-body">{ep.line}</p>
              </Tile>
            ))}
          </Settle>

          <Settle className="mt-9 text-center">
            <Button href={SITE.showUrl}>Watch the episodes<IconExternal size={15} /></Button>
          </Settle>
        </Container>
      </Section>

      {/* ═══ 5. WHO CHECKS IT ═══ */}
      <Section labelledBy="gates-h">
        <Container width="wide"><ReviewGateScene /></Container>
      </Section>

      {/* ═══ 6. THE PEOPLE. Names and what each one checks. No empty portrait
          frames: Paula is listed second because she is the credential that
          survives a search. ═══ */}
      <Section labelledBy="people-h">
        <Container width="wide">
          <Settle>
            <SectionHeading
              id="people-h"
              kicker="The people behind it"
              title="Named, and answerable"
              lead="Every person here appears in the production and review sequence, not only on an about page."
            />
          </Settle>
          <Settle className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PEOPLE.map((p) => (
              <Card key={p.name} className="p-6">
                <h3 className="t-h3">{p.name}</h3>
                <p className="eyebrow mt-2 !text-[11px]">{p.role}</p>
                <p className="t-body mt-3 text-body">{p.line}</p>
              </Card>
            ))}
          </Settle>
          <Settle className="mt-9">
            <TextLink to="/team">The full team and advisory board<IconArrow size={15} /></TextLink>
          </Settle>
        </Container>
      </Section>

      {/* ═══ 7. THE AI POSITION ═══ */}
      <Section labelledBy="ai-h">
        <Container width="wide">
          <Settle className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading
              id="ai-h"
              kicker="Responsible AI"
              title="AI is a production tool. People remain responsible for the work."
            />
            <Card className="p-8 sm:p-10">
              <div className="t-body space-y-5 text-body">
                <p>
                  Our creative and educational decisions are made by people. In final production we
                  use Runway for visual production and ElevenLabs for voice production. Our team
                  directs, reviews and approves the work before publication.
                </p>
                <p className="text-ink">
                  Calling this work handmade would be untrue. Calling it AI-generated would erase
                  the people who actually make the decisions.
                </p>
                <p>Nothing is generated and published automatically.</p>
              </div>
              <div className="mt-7">
                <TextLink to="/ethical-ai">Read the full position<IconArrow size={15} /></TextLink>
              </div>
            </Card>
          </Settle>
        </Container>
      </Section>

      {/* ═══ 8. CONTACT, the one deep band ═══ */}
      <Section deep labelledBy="cta-h">
        <Container width="wide">
          <Settle className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <h2 id="cta-h" className="t-h2 max-w-[16ch]">Working with CLÉ Family Media</h2>
              <p className="t-lead mt-6 max-w-[46ch] opacity-85">
                We are open to conversations with studios, distribution partners, educators and
                press. If you are assessing the company, we would rather answer your questions
                directly.
              </p>
              <div className="mt-9"><Button to="/contact">Send an enquiry<IconArrow size={16} /></Button></div>
            </div>
            <div>
              <h3 className="t-h3">Occasional updates</h3>
              <p className="t-body mt-3 max-w-[40ch] opacity-80">
                Production notes and company news, for adults. Infrequent, and easy to leave.
              </p>
              <NotifyForm />
            </div>
          </Settle>
        </Container>
      </Section>
    </>
  );
}
