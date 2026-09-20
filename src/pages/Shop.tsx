import { Seo } from "@/components/Seo";
import { Container, Kicker, Lead, Panel, Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { IconCard, IconDownload, IconPrint } from "@/components/icons";

const STEPS = [
  { icon: IconPrint, n: "01", t: "Pick your printable", b: "Colouring books, puzzle packs and activity sheets built around the series." },
  { icon: IconCard, n: "02", t: "Pay with card", b: "Handled by Stripe. No account, no sign up, no password to forget." },
  { icon: IconDownload, n: "03", t: "Download it there and then", b: "Your file is ready immediately. Save it somewhere safe and print it as often as you like." },
];

export default function Shop() {
  return (
    <>
      <Seo
        title="Shop"
        description="Printable activity books, puzzles and quizzes from The Pawsitive Pugs and Pals. Instant download, no account needed."
        path="/shop"
      />
      <Section className="!pb-10">
        <Container>
          <div className="max-w-[44ch]">
            <Kicker>Shop</Kicker>
            <h1 className="mt-5 text-[length:var(--text-h1)]">Printables and activities</h1>
          </div>
          <Lead className="mt-6">
            Colouring books, puzzles and quizzes to print at home or in the classroom. Buy it,
            download it, keep it. No account, no sign up, and buying something never puts you on a
            mailing list.
          </Lead>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container>
          <ol className="grid gap-5 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 80}>
                <Panel className="h-full p-7 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <span className="wash-cream hairline-ring flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] text-red-deep">
                      <s.icon size={21} />
                    </span>
                    <span className="font-display text-[14px] text-clay" aria-hidden="true">{s.n}</span>
                  </div>
                  <h2 className="mt-4 text-[length:var(--text-h3)]">{s.t}</h2>
                  <p className="mt-2.5 font-body text-[14.5px] leading-relaxed text-body">{s.b}</p>
                </Panel>
              </Reveal>
            ))}
          </ol>

          <Panel tone="warm" className="mt-8 px-6 py-12 text-center">
            <p className="font-display text-[length:var(--text-h3)] text-ink">
              The first printables are on their way
            </p>
            <p className="mx-auto mt-3 max-w-[46ch] font-body text-[14.5px] text-muted">
              Products are added from the admin panel with their file attached. Each one gets its
              own page and a direct download the moment payment clears.
            </p>
          </Panel>

          <p className="mt-8 max-w-[58ch] font-body text-[14px] text-muted">
            Interactive activities live inside the PupsPlayer app. This shop is for the things you
            print and put on the table.
          </p>
        </Container>
      </Section>
    </>
  );
}
