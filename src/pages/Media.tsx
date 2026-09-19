import { Seo } from "@/components/Seo";
import { Container, EmptyState, Kicker, Lead, Section } from "@/components/ui";

export default function Media() {
  /* media_items is empty. A UK podcast appearance is expected in December, so
     the empty state ships first and has to stand on its own. */
  return (
    <>
      <Seo
        title="Media and podcast"
        description="Press coverage, interviews and podcast appearances featuring CLÉ Family Media and the team behind The Pawsitive Pugs & Pals."
        path="/media"
      />

      <Section className="!pb-10">
        <Container>
          <div className="max-w-[44ch]">
            <Kicker>Media</Kicker>
            <h1 className="mt-5 text-[length:var(--text-h1)]">Press and appearances</h1>
          </div>
          <Lead className="mt-6">
            Interviews, podcast appearances and coverage of the company and the show.
          </Lead>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container>
          <EmptyState
            title="Nothing to show just yet"
            body="Press, interviews and podcast appearances will be listed here as they happen. Entries are added from the admin panel and can carry a link or an embedded player."
          />
        </Container>
      </Section>
    </>
  );
}
