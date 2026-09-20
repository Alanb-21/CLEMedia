/** Single source of truth for cross-site links and company details. */
export const SITE = {
  name: "CLÉ Family Media",
  showName: "The Pawsitive Pugs & Pals",
  playerName: "PupsPlayer",
  url: import.meta.env.VITE_SITE_URL ?? "https://example.com",
  /** Fixed destination. Not env-driven: the show site is not going to move,
   *  and an unset variable must never silently break the cross-link. */
  showUrl: "https://www.pawsitivepugs.com",
  tagline: "Watch, Play, Learn.",
} as const;

export const NAV = [
  { to: "/story", label: "Our story" },
  { to: "/team", label: "Team" },
  { to: "/ethical-ai", label: "Ethical AI" },
  { to: "/journal", label: "Journal" },
  { to: "/app", label: "App" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
] as const;
