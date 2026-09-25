import { Seo } from "@/components/Seo";
import { AssetPlaceholder } from "@/components/AssetPlaceholder";
import { Container, Kicker, Lead, Panel, Section, SectionHeading } from "@/components/ui";
import { Settle } from "@/components/Settle";
import { WaveDivider } from "@/components/graphics";
import type { Person } from "@/lib/types";

/**
 * Roles are taken from the company's own account of how an episode is made and
 * reviewed. Every entry stays flagged unconfirmed until each person has
 * approved their own role description, as the client's handoff requires.
 */
const SEED: Person[] = [
  {
    id: "1",
    name: "Conor Sexton",
    role: "Founder",
    bio:
      "Conor founded the company and sets each episode's concept and story alongside Al. He leads strategy, partnerships and the commercial side of the studio, and is usually the person on the other end of a partnership enquiry. He came to this as a parent before anything else.",
    photo: null, type: "team", sort_order: 1, visible: true, unconfirmed: true,
  },
  {
    id: "2",
    name: "Al Compton",
    role: "Creative Director",
    bio:
      "Al develops the script and directs production, working with Conor to set the concept. The look of the world, the performance of the characters and the pace of an episode are his call, and the pace in particular is the thing he holds the line on.",
    photo: null, type: "team", sort_order: 2, visible: true, unconfirmed: true,
  },
  {
    id: "3",
    name: "Dr Paula Walshe",
    role: "Education",
    bio:
      "Paula reviews the learning intent of every episode and the offline activities that follow it. Her review happens before scripting rather than after, which is why the learning objective exists before the story does instead of being fitted around it.",
    photo: null, type: "team", sort_order: 3, visible: true, unconfirmed: true,
  },
  {
    id: "4",
    name: "Lydia Harding",
    role: "Co-Producer",
    bio:
      "Lydia co-produces the series and brings a parent's perspective to script and production review. She reads each episode the way a parent watching alongside a child would, which catches things a production read does not.",
    photo: null, type: "team", sort_order: 4, visible: true, unconfirmed: true,
  },
  {
    id: "5",
    name: "Kirstie Harding",
    role: "Early Years",
    bio:
      "Kirstie brings an early years perspective to script and production review, with a particular eye on how young children actually receive what they are shown: pace, comprehension, and the difference between holding a child's attention and earning it.",
    photo: null, type: "team", sort_order: 5, visible: true, unconfirmed: true,
  },
  {
    id: "6",
    name: "Mansi",
    role: "Production Coordination",
    bio:
      "Mansi supports production coordination across the schedule, keeping the review stages connected to the work in progress so that a note from one review reaches the people who need to act on it.",
    photo: null, type: "team", sort_order: 6, visible: true, unconfirmed: true,
  },
];

function PersonCard({ p, advisor = false }: { p: Person; advisor?: boolean }) {
  return (
    <Settle as="li">
      <Panel className="flex h-full flex-col overflow-hidden">
        <div className={advisor ? "flex gap-5 p-6" : "flex flex-col"}>
          <div className={advisor ? "w-[88px] shrink-0" : ""}>
            {p.photo ? (
              <img src={p.photo} alt={p.name} width={600} height={750} loading="lazy"
                className={advisor ? "rounded-[var(--radius-md)]" : "w-full object-cover"} />
            ) : (
              <AssetPlaceholder
                label={advisor ? "Headshot" : `Photograph of ${p.name}`}
                ratio={advisor ? "1/1" : "4/3"}
                tone={advisor ? "cream" : "clay"}
                rounded={advisor ? "rounded-[var(--radius-md)]" : "rounded-none"}
                className={advisor ? "" : "!shadow-none"}
              />
            )}
          </div>
          <div className={advisor ? "min-w-0" : "p-6"}>
            <h3 className="t-h3">{p.name}</h3>
            <p className="mt-1 text-[12.5px] font-semibold uppercase tracking-wider text-red-deep">
              {p.role}
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-slate">{p.bio}</p>
          </div>
        </div>
      </Panel>
    </Settle>
  );
}

export default function Team() {
  const team = SEED.filter((p) => p.type === "team");

  return (
    <>
      <Seo
        title="Team and advisors"
        description="The people behind CLÉ Family Media: the core team and the early years advisory board who shape the educational model."
        path="/team"
      />

      <Section className="!pb-10">
        <Container>
          <div className="max-w-[44ch]">
            <Kicker>Team and advisors</Kicker>
            <h1 className="mt-5 t-h1 font-display">The people making it</h1>
          </div>
          <Lead className="mt-6">
            A small core team. Between them they decide what gets made, how it gets made, and
            what it is supposed to do for the child watching. Each person named here appears in the
            production and review sequence, not just on an about page.
          </Lead>
        </Container>
      </Section>

      <Section className="!pt-4" labelledBy="core-h">
        <Container>
          <SectionHeading id="core-h" kicker="Core team" title="Who runs the company" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((p) => <PersonCard key={p.id} p={p} />)}
          </ul>
        </Container>
      </Section>

      <div className="text-[#F3E7D6]"><WaveDivider /></div>

      <Section tone="cream" labelledBy="advisors-h" className="!pt-10">
        <Container>
          <SectionHeading
            id="advisors-h"
            kicker="Strategic advisers"
            title="Input within a defined remit"
            lead="Advisers give input within their actual remit. They are not employees, and they are shown separately for exactly that reason."
          />
          <Panel tone="warm" className="mt-10 p-8">
            <p className="max-w-[62ch] text-[15px] leading-relaxed text-ink">
              Our strategic advisers are shown as a separate group from the core team, with each
              person's name, title and role described only as they have approved it. Those
              confirmations are being collected now, so this section is deliberately empty rather
              than provisional.
            </p>
          </Panel>
        </Container>
      </Section>
    </>
  );
}
