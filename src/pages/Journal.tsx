import { useState } from "react";
import { Seo } from "@/components/Seo";
import { Container, EmptyState, Kicker, Lead, Section } from "@/components/ui";

/** Four rotating categories, one published per week. Real names unconfirmed —
 *  QUESTIONS.md #8. Slugs are placeholders and will change. */
const CATEGORIES = [
  { slug: "all", name: "All" },
  { slug: "category-1", name: "Category one", placeholder: true },
  { slug: "category-2", name: "Category two", placeholder: true },
  { slug: "category-3", name: "Category three", placeholder: true },
  { slug: "category-4", name: "Category four", placeholder: true },
];

export default function Journal() {
  const [active, setActive] = useState("all");

  return (
    <>
      <Seo
        title="Journal"
        description="Writing from CLÉ Family Media on children's media, early-years education, responsible AI in production, and building a family media company in Ireland."
        path="/journal"
      />

      <Section className="!pb-10">
        <Container>
          <div className="max-w-[44ch]">
            <Kicker>Journal</Kicker>
            <h1 className="mt-5 text-[length:var(--text-h1)]">Notes from the studio</h1>
          </div>
          <Lead className="mt-6">
            Four rotating strands, one post a week — on the research, the process, the business of
            children's media, and what we're learning as we go.
          </Lead>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container>
          <nav aria-label="Filter by category" className="border-y border-hairline py-3">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <button
                    type="button"
                    onClick={() => setActive(c.slug)}
                    aria-current={active === c.slug ? "true" : undefined}
                    className={`font-body text-[14px] transition-colors ${
                      active === c.slug ? "font-semibold text-red-deep" : "text-muted hover:text-ink"
                    }`}
                  >
                    {c.name}
                    {c.placeholder && <span className="ml-1 text-[10px] uppercase tracking-wider text-muted">(name tbc)</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10">
            <EmptyState
              title="No posts published yet"
              body="Posts are written and published from the admin panel. Once the four categories are named and the first posts go live, they'll appear here filtered by strand."
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
