import { Seo } from "@/components/Seo";
import { AssetPlaceholder } from "@/components/AssetPlaceholder";
import { Container, Kicker, Lead, Section, SectionHeading } from "@/components/ui";
import type { Person } from "@/lib/types";

/**
 * Seeded from the credits in the brand kit. Every entry is marked unconfirmed:
 * a film credit is not necessarily how someone wants to be named on a company
 * site, and no bio has been supplied. QUESTIONS.md #5.
 *
 * Nothing here is invented. Where a bio is absent it stays absent.
 */
const SEED: Person[] = [
  { id: "1", name: "Conor Sexton", role: "Founder · Director of Business Strategy", bio: null, photo: null, type: "team", sort_order: 1, visible: true, unconfirmed: true },
  { id: "2", name: "Lydia Harding", role: "Co-Producer", bio: null, photo: null, type: "team", sort_order: 2, visible: true, unconfirmed: true },
  { id: "3", name: "Al Compton", role: "Creative Director · Written & Directed By", bio: null, photo: null, type: "team", sort_order: 3, visible: true, unconfirmed: true },
  { id: "4", name: "Paula Walshe", role: "Educational Content Advisor", bio: null, photo: null, type: "advisor", sort_order: 1, visible: true, unconfirmed: true },
  { id: "5", name: "Kirstie Harding", role: "Early Learning Advisor", bio: null, photo: null, type: "advisor", sort_order: 2, visible: true, unconfirmed: true },
];

function PersonCard({ p, advisor = false }: { p: Person; advisor?: boolean }) {
  return (
    <li className={advisor ? "flex gap-5 border-t border-hairline pt-6" : ""}>
      <div className={advisor ? "w-[92px] shrink-0" : ""}>
        {p.photo ? (
          <img src={p.photo} alt={p.name} width={600} height={750} className="w-full object-cover" loading="lazy" />
        ) : (
          <AssetPlaceholder
            label={advisor ? "Headshot" : `Photograph of ${p.name}`}
            ref={advisor ? undefined : "CONTENT-NEEDED · Photography"}
            ratio={advisor ? "1/1" : "4/5"}
            tone={advisor ? "cream" : "clay"}
          />
        )}
      </div>
      <div className={advisor ? "min-w-0" : "mt-4"}>
        <h3 className="text-[length:var(--text-h3)]">{p.name}</h3>
        <p className="mt-1 font-body text-[13.5px] font-medium uppercase tracking-wider text-red-deep">
          {p.role}
        </p>
        {p.bio ? (
          <p className="mt-3 font-body text-[14.5px] leading-relaxed text-body">{p.bio}</p>
        ) : (
          <p className="mt-3 font-body text-[13.5px] italic text-muted">
            Biography to be supplied.
          </p>
        )}
        {p.unconfirmed && (
          <p className="mt-2 font-body text-[11px] uppercase tracking-wider text-muted">
            Name and role unconfirmed
          </p>
        )}
      </div>
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
        description="The people behind CLÉ Family Media — the core team and the early-years advisory board who shape the educational model."
        path="/team"
      />

      <Section className="!pb-10">
        <Container>
          <div className="max-w-[44ch]">
            <Kicker>Team and advisors</Kicker>
            <h1 className="mt-5 text-[length:var(--text-h1)]">The people making it</h1>
          </div>
          <Lead className="mt-6">
            A small core team, working with early-years specialists rather than in isolation. Every
            name, role and biography on this page is pending confirmation from the client.
          </Lead>
        </Container>
      </Section>

      <Section className="!pt-4" labelledBy="core-h">
        <Container>
          <SectionHeading id="core-h" kicker="Core team" title="Who runs the company" />
          <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
            lead="Advisors shape the pedagogy and review the content. They are not employees, and they are shown separately for that reason."
          />
          <ul className="mt-10 grid gap-7 lg:grid-cols-2">
            {advisors.map((p) => <PersonCard key={p.id} p={p} advisor />)}
          </ul>
        </Container>
      </Section>
    </>
  );
}
