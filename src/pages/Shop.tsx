import { Seo } from "@/components/Seo";
import { Container, EmptyState, Kicker, Lead, Section } from "@/components/ui";

export default function Shop() {
  /* products is empty — no PDFs supplied yet. QUESTIONS.md #12. */
  return (
    <>
      <Seo
        title="Shop"
        description="Printable activity books, puzzles and quizzes from The Pawsitive Pugs & Pals. Instant download, no account needed."
        path="/shop"
      />
      <Section className="!pb-10">
        <Container>
          <div className="max-w-[44ch]">
            <Kicker>Shop</Kicker>
            <h1 className="mt-5 text-[length:var(--text-h1)]">Printables and activities</h1>
          </div>
          <Lead className="mt-6">
            Colouring books, puzzles and quizzes to print at home. Buy it, download it, keep it —
            no account, no sign-up, no mailing list.
          </Lead>
        </Container>
      </Section>
      <Section className="!pt-0">
        <Container>
          <EmptyState
            title="Nothing for sale yet"
            body="Products are added from the admin panel with their PDF. Each one gets its own page and a direct download after checkout."
          />
          <p className="mt-6 max-w-[58ch] font-body text-[13px] text-muted">
            Interactive activities live in the PupsPlayer™ app. This shop is for things you print.
          </p>
        </Container>
      </Section>
    </>
  );
}
