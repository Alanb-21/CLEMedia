import { useParams } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Button, Container, Section } from "@/components/ui";

export default function Download() {
  const { token } = useParams();
  /* Verifies the token server-side and returns a short-lived signed URL.
     24 hours, five downloads. Wired in the Stripe run. */
  return (
    <>
      <Seo title="Your download" description="Download your purchase." path={`/download/${token ?? ""}`} noIndex />
      <Section>
        <Container>
          <div className="max-w-[52ch]">
            <h1 className="text-[length:var(--text-h1)]">Your download</h1>
            <p className="mt-4 font-body text-[length:var(--text-lead)] leading-relaxed">
              This link is valid for 24 hours and up to five downloads.{" "}
              <strong className="text-ink">Save the file somewhere safe now</strong> — we don't keep
              an account for you to come back to.
            </p>
            <div className="mt-8">
              <Button to="/shop" variant="secondary">Back to the shop</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
