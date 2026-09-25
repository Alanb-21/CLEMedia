import { Seo } from "@/components/Seo";
import { Button, Container, Section } from "@/components/ui";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="That page doesn't exist." path="/404" noIndex />
      <Section>
        <Container>
          <div className="max-w-[50ch]">
            <p className="font-display text-[clamp(3.5rem,12vw,6rem)] leading-none text-clay">404</p>
            <h1 className="mt-5 display-page font-display">That page has wandered off</h1>
            <p className="mt-4 text-[length:clamp(1.0625rem,1rem+0.4vw,1.25rem)] leading-relaxed">
              The link may be old, or we may have moved something. If you were looking for episodes,
              characters or colouring pages, those all live on the show site.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/">Back to home</Button>
              <Button href={SITE.showUrl} variant="secondary">Visit the show site</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
