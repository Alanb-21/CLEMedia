import { useState } from "react";
import { Seo } from "@/components/Seo";
import { Container, Kicker, Lead, Panel, Section } from "@/components/ui";
import { Settle } from "@/components/Settle";

/**
 * Four rotating strands, one published per week. Names drafted from the
 * company's own themes and open for the client to rename in the admin panel.
 */
const CATEGORIES = [
  { slug: "all", name: "All", blurb: "" },
  {
    slug: "research",
    name: "The Research",
    blurb: "Early years practice, child development and the thinking behind Watch, Play, Learn.",
  },
  {
    slug: "process",
    name: "How It's Made",
    blurb: "Inside production: writing, animation, sound, and where the technology does and does not sit.",
  },
  {
    slug: "parents",
    name: "Parents Helping Parents",
    blurb: "Practical, judgement free writing for the people doing the watching alongside.",
  },
  {
    slug: "company",
    name: "Building CLÉ",
    blurb: "The business of making children's media in Ireland, told honestly as it happens.",
  },
];

export default function Journal() {
  const [active, setActive] = useState("all");
  const shown = CATEGORIES.filter((c) => c.slug !== "all" && (active === "all" || c.slug === active));

  return (
    <>
      <Seo
        title="Journal"
        description="Writing from CLÉ Family Media on children's media, early years education, responsible use of AI in production, and building a family media company in Ireland."
        path="/journal"
      />

      <Section className="!pb-10">
        <Container>
          <div className="max-w-[44ch]">
            <Kicker>Journal</Kicker>
            <h1 className="mt-5 display-page font-display">Notes from the studio</h1>
          </div>
          <Lead className="mt-6">
            Four strands, one post a week. We write about the research, the process, the parenting
            and the business, partly to be useful and partly because a company that asks for trust
            should be willing to show its working.
          </Lead>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container>
          <nav aria-label="Filter by category">
            <ul className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <button
                    type="button"
                    onClick={() => setActive(c.slug)}
                    aria-current={active === c.slug ? "true" : undefined}
                    className={`rounded-full px-4 py-2 text-[13.5px] transition-all ${
                      active === c.slug
                        ? "bg-red text-paper shadow-[0_8px_20px_-12px_rgba(163,46,50,0.8)]"
                        : "glass text-slate hover:bg-white/95"
                    }`}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {shown.map((c) => (
              <Settle as="li" key={c.slug}>
                <Panel className="h-full p-7 transition-transform duration-300 hover:-translate-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-red-deep">
                    {c.name}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate">{c.blurb}</p>
                  <p className="mt-5 text-[13px] text-deep">
                    First post arriving shortly.
                  </p>
                </Panel>
              </Settle>
            ))}
          </ul>

          <p className="mt-8 max-w-[58ch] text-[14px] text-deep">
            Posts are written and published from the admin panel. Once the first pieces go live they
            appear here, newest first, filtered by strand.
          </p>
        </Container>
      </Section>
    </>
  );
}
