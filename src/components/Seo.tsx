import { Helmet } from "react-helmet-async";
import { SITE } from "@/lib/site";

interface Props {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown>;
  noIndex?: boolean;
}

export function Seo({ title, description, path, image, type = "website", jsonLd, noIndex }: Props) {
  const url = `${SITE.url}${path}`;
  const full = path === "/" ? `${SITE.name} · ${SITE.tagline}` : `${title} · ${SITE.name}`;
  const img = image ?? `${SITE.url}/brand/og-default.png`;

  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="en_IE" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={full} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}

/** Organization JSON-LD. Claims stay minimal, nothing asserted that the client
 *  has not supplied. No founding date, no employee count, no awards. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  description:
    "Irish children's media company behind The Pawsitive Pugs & Pals. Edutainment built on a Watch, Play, Learn model and a human-led production process.",
  sameAs: [SITE.showUrl],
};
