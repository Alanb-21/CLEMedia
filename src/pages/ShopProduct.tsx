import { useParams } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Button, Container, Section } from "@/components/ui";

export default function ShopProduct() {
  const { slug } = useParams();
  return (
    <>
      <Seo title="Product not found" description="This product could not be found." path={`/shop/${slug ?? ""}`} noIndex />
      <Section>
        <Container>
          <div className="max-w-[52ch]">
            <h1 className="text-[length:var(--text-h1)]">We couldn't find that</h1>
            <p className="mt-4 font-body text-[length:var(--text-lead)] leading-relaxed">
              It may have been taken down, or the link may be wrong.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/shop">Back to the shop</Button>
              <Button to="/" variant="secondary">Home</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
