import { useParams } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Container, Button, Section } from "@/components/ui";

export default function JournalPost() {
  const { slug } = useParams();

  /* No posts exist yet. Once the CMS is connected this fetches by slug and
     renders hero, author, date, category, share links and related posts, with
     Article JSON-LD and a generated OG image. */
  return (
    <>
      <Seo
        title="Post not found"
        description="This journal post could not be found."
        path={`/journal/${slug ?? ""}`}
        noIndex
      />
      <Section>
        <Container>
          <div className="max-w-[52ch]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-red-deep">
              Journal
            </p>
            <h1 className="mt-4 display-page font-display">We couldn't find that post</h1>
            <p className="mt-4 text-[length:clamp(1.0625rem,1rem+0.4vw,1.25rem)] leading-relaxed">
              It may have been unpublished, or the link may be wrong. The journal index has
              everything that's live.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/journal">Back to the journal</Button>
              <Button to="/" variant="secondary">Home</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
