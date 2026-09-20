/**
 * Brand asset manifest.
 *
 * One slot per image the site needs. `null` means the asset has not been
 * supplied yet and the slot renders a labelled placeholder instead.
 *
 * To wire a real image: drop the optimised files into `public/brand/` and set
 * `base` to the path without an extension. <Figure> then serves
 * `<base>.avif`, `<base>.webp` and `<base>.jpg` in that order, with the 2x
 * variants (`<base>@2x.*`) offered through srcset.
 *
 * Nothing else in the codebase needs to change when assets land. This file is
 * the entire integration point.
 */

export interface BrandAsset {
  /** Public path without extension, e.g. "/brand/home-hero". Null until supplied. */
  base: string | null;
  /** Alt text. Required, and written here so it is never an afterthought. */
  alt: string;
  /** Intrinsic size of the 1x file. Prevents layout shift. */
  width: number;
  height: number;
  /** What belongs here, shown on the placeholder while base is null. */
  label: string;
  /** Extension of the fallback file. */
  fallback?: "jpg" | "png";
}

const assets = {
  "home.hero": {
    base: null,
    alt: "The garden that inspired the world of The Pawsitive Pugs and Pals",
    width: 1400, height: 1050,
    label: "The garden that inspired the show's world, or the founders at work",
  },
  "home.company": {
    base: null,
    alt: "The CLÉ Family Media team at work",
    width: 1200, height: 800,
    label: "The team at work, a workspace, or the production process",
  },
  "home.characters": {
    base: null,
    alt: "Finn, Fia and the rest of the pack from The Pawsitive Pugs and Pals",
    width: 1280, height: 800,
    label: "Character art: Finn, Fia and the rest of the pack",
    fallback: "png",
  },
  "home.app": {
    base: null,
    alt: "The PupsPlayer app shown on a tablet",
    width: 1000, height: 750,
    label: "PupsPlayer app preview",
    fallback: "png",
  },
  "story.lead": {
    base: null,
    alt: "Conor Sexton and Lydia Harding, founders of CLÉ Family Media",
    width: 1680, height: 720,
    label: "Conor and Lydia. Real photography only.",
  },
  "story.garden": {
    base: null,
    alt: "The garden where the world of the show began",
    width: 1200, height: 800,
    label: "The garden, the house, early sketches, or the real pugs",
  },
  "app.hero": {
    base: null,
    alt: "The PupsPlayer app on a phone",
    width: 900, height: 1125,
    label: "PupsPlayer app preview, device mockup or key screen",
    fallback: "png",
  },
  "app.screen1": { base: null, alt: "PupsPlayer episode library", width: 540, height: 960, label: "App screenshot 1", fallback: "png" },
  "app.screen2": { base: null, alt: "PupsPlayer play activity", width: 540, height: 960, label: "App screenshot 2", fallback: "png" },
  "app.screen3": { base: null, alt: "PupsPlayer parent controls", width: 540, height: 960, label: "App screenshot 3", fallback: "png" },
} satisfies Record<string, BrandAsset>;

export type AssetKey = keyof typeof assets;

/** Widened so `base` stays `string | null` once a path is filled in. */
export const ASSETS: Record<AssetKey, BrandAsset> = assets;

/**
 * Logos are separate: they are flat single-colour marks, so they ship as SVG
 * (or PNG until vectorised) with no responsive variants.
 */
export const LOGOS = {
  /** The show wordmark, black on light. Flat and clean in the kit. */
  showBlack: null as string | null,
  /** The show wordmark, white on dark. */
  showWhite: null as string | null,
  /** The PupsPlayer paw-and-play mark, flat #B5E2F6. */
  pupsPlayer: null as string | null,
  /** A vector CLÉ Family Media wordmark. Does not exist in the kit yet. */
  cle: null as string | null,
};
