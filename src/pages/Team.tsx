import { Seo } from "@/components/Seo";
import { AssetPlaceholder } from "@/components/AssetPlaceholder";
import { Container, Kicker, Lead, Panel, Section, SectionHeading } from "@/components/ui";
import type { Person } from "@/lib/types";

/**
 * Seeded from the credits in the brand kit. Bios are drafted from the
 * company's own positioning and are marked for confirmation: a film credit is
 * not necessarily how someone wants to be described on a company site.
 */
const SEED: Person[] = [
  {
    id: "1",
    name: "Conor Sexton",
    role: "Founder and Director of Business Strategy",
    bio:
      "Conor leads the company's strategy, partnerships and commercial direction. He started CLÉ after looking hard at what his own children were being handed and deciding the gap was worth building a company around. He handles the conversations with investors, broadcasters and distributors, and is usually the person on the other end of a partnership enquiry.",
    photo: null, type: "team", sort_order: 1, visible: true, unconfirmed: true,
  },
  {
    id: "2",
    name: "Lydia Harding",
    role: "Co-Producer",
    bio:
      "Lydia co-produces The Pawsitive Pugs & Pals and co-founded the company. She works across production and the day to day shape of the slate, keeping the pace and tone of each episode honest to what the show is meant to do. Like Conor, she came to this as a parent first.",
    photo: null, type: "team", sort_order: 2, visible: true, unconfirmed: true,
  },
  {
    id: "3",
    name: "Al Compton",
    role: "Creative Director",
    bio:
      "Al writes and directs the series and sets its creative direction: the look of the world, the performance of the characters and the rhythm of an episode. He is the reason the show moves at the pace it does rather than the pace the market expects, and he holds the line on it.",
    photo: null, type: "team", sort_order: 3, visible: true, unconfirmed: true,
  },
  {
    id: "4",
    name: "Paula Walshe",
    role: "Educational Content Advisor",
    bio:
      "Paula advises on the educational substance of the work, checking each concept against early years practice before scripting begins. She is the reason the learning objective exists before the story does, rather than being fitted around it afterwards.",
    photo: null, type: "advisor", sort_order: 1, visible: true, unconfirmed: true,
  },
  {
    id: "5",
    name: "Kirstie Harding",
    role: "Early Learning Advisor",
    bio:
      "Kirstie advises on early learning and child development, with a particular eye on how young children actually receive what they are shown. She reviews content for pace, comprehension and the difference between holding a child's attention and earning it.",
    photo: null, type: "advisor", sort_order: 2, visible: true, unconfirmed: true,
  },
];

function PersonCard({ p, advisor = false }: { p: Person; advisor?: boolean }) {
  return (
    <li>
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
            <h3 className="text-[length:var(--text-h3)]">{p.name}</h3>
            <p className="mt-1 font-body text-[12.5px] font-semibold uppercase tracking-wider text-red-deep">
              {p.role}
            </p>
            <p className="mt-3 font-body text-[14.5px] leading-relaxed text-body">{p.bio}</p>
          </div>
        </div>
      </Panel>
    </li>
  );
}

export default function Team() {
  const team = SEED.filter((p) => p.type === "team");
  const advisors = SEED.filter((p) => p.type === "advisor");

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
            <h1 className="mt-5 text-[length:var(--text-h1)]">The people making it</h1>
          </div>
          <Lead className="mt-6">
            A small core team, working closely with early years specialists rather than in
            isolation. Between them they decide what gets made, how it gets made, and what it is
            supposed to do for the child watching.
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

      <Section tone="cream" labelledBy="advisors-h">
        <Container>
          <SectionHeading
            id="advisors-h"
            kicker="Advisory board"
            title="The specialists behind the educational model"
            lead="Advisors shape the pedagogy and review the content. They are not employees, and they are shown separately for exactly that reason."
          />
          <ul className="mt-10 grid gap-6 lg:grid-cols-2">
            {advisors.map((p) => <PersonCard key={p.id} p={p} advisor />)}
          </ul>
        </Container>
      </Section>
    </>
  );
}
