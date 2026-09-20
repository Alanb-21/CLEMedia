import { Seo } from "@/components/Seo";
import { CopyNeeded } from "@/components/AssetPlaceholder";
import { Container, Kicker, Section } from "@/components/ui";

const DOCS = {
  privacy: {
    title: "Privacy policy",
    description: "How CLÉ Family Media handles personal data.",
    sections: ["Who we are", "What we collect", "Why we collect it", "Legal basis", "Who we share it with", "How long we keep it", "Your rights under GDPR", "Contact and complaints"],
  },
  terms: {
    title: "Terms",
    description: "The terms covering use of this site and the sale of digital goods.",
    sections: ["Using this site", "Buying a digital product", "Licence and permitted use", "Refunds and the right of withdrawal", "Intellectual property", "Liability", "Governing law"],
  },
  cookies: {
    title: "Cookie policy",
    description: "What this site stores in your browser and why.",
    sections: ["What we use", "Analytics", "Managing cookies", "Changes to this policy"],
  },
} as const;

export default function Legal({ doc }: { doc: keyof typeof DOCS }) {
  const d = DOCS[doc];
  return (
    <>
      <Seo title={d.title} description={d.description} path={`/${doc}`} />
      <Section>
        <Container>
          <div className="max-w-[65ch]">
            <Kicker>Legal</Kicker>
            <h1 className="mt-5 text-[length:var(--text-h1)]">{d.title}</h1>

            <div className="mt-8 border border-red/30 bg-cream/40 p-5">
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-red-deep">
                Needs legal review
              </p>
              <p className="mt-2 font-body text-[14.5px] text-ink">
                The structure below is in place. The content has deliberately not been drafted — an
                Irish company selling digital goods into the EU needs this written or reviewed by a
                solicitor, not generated.
              </p>
            </div>

            <div className="mt-10 space-y-8">
              {d.sections.map((s) => (
                <section key={s}>
                  <h2 className="text-[length:var(--text-h3)]">{s}</h2>
                  <div className="mt-3">
                    <CopyNeeded label={`${d.title} — "${s}"`} source="CONTENT-NEEDED · Legal" lines={2} />
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
