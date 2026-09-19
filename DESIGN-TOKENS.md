# DESIGN TOKENS — CLÉ Family Media

**Stage 1 gate artifact. Proposed, not approved.** Nothing here ships until Conor
signs off. Source: `BRAND TOOL KIT` (741MB, 355 files) + the live show site CSS
at `pawsitivepugs.com`.

Audit date: 2026-09-19.

---

## Provenance

Every value below is traced to a source. Three independent sources agreed on the
two core colours, which is why they are proposed as authoritative:

| Source | Weight |
|---|---|
| Live show site CSS (`pawsitivepugs.com`, Wix) | **Authoritative** — the declared values, unaffected by compression |
| `OTHER IMAGES/wall 000.jpg`, `wall 001.jpg` | Flat two-tone brand swatches. JPEG drift of 1–3 per channel |
| `OTHER IMAGES/header-frame.jpg`, `GRADIENTS/header background.png` | Applied usage |

---

## Colour

### Core brand — taken from the kit, unchanged

| Token | Hex | Source | Role |
|---|---|---|---|
| `--cle-clay` | `#BC9E86` | Live site CSS; swatches read `#B99A85`–`#BD9F87` | Primary warm neutral. Surfaces, rules, fills |
| `--cle-cream` | `#E6D4BC` | Live site CSS; swatches read `#E6D1BC`–`#E7D2BD` | Page background, cards |
| `--cle-red` | `#A32E32` | Live site CSS (also `#A32E30`) | The single rationed accent |
| `--pups-blue` | `#B5E2F6` | `LOGOS + ICONS/PP-logo.png`, 95.7% flat | PupsPlayer™ mark only. Not a site colour |

### Added — required, because the brand palette has no accessible text colour

**This is the one real decision in this document and it needs explicit approval.**

Clay on white is **2.51:1**. Cream on white is **1.45:1**. Neither is usable for
text at any size. The show site gets away with it because text there sits on
white or black; a type-led corporate site cannot. So the palette needs a dark
ink and a darkened clay ramp derived from the brand hue, not invented from
nowhere.

| Token | Hex | On white | On cream `#E6D4BC` | Role |
|---|---|---|---|---|
| `--ink` | `#1A1614` | 17.97:1 AAA | 12.41:1 AAA | Headings, strong text |
| `--body` | `#4A352A` | 11.45:1 AAA | 7.91:1 AAA | Body copy |
| `--muted` | `#6B4E3A` | 7.56:1 AAA | 5.23:1 AA | Secondary text, captions |
| `--hairline` | `#D8C6AE` | — | — | Rules, dividers, table borders |
| `--red-deep` | `#8E2428` | 8.63:1 AAA | 5.96:1 AA | Red when it carries text |

`--muted` is the floor. Nothing lighter carries text anywhere on the site.

### Rules

- 60 cream / 30 clay + neutrals / 10 red. Red is rationed: kickers, one hero
  keyword, active states. Never a section heading fill.
- `--pups-blue` appears only on the PupsPlayer mark and the show cross-link
  module. It is the show's colour, not CLÉ's.
- No gradients (project hard rule). `GRADIENTS/` is excluded from this build.

---

## Type

Both faces confirmed from the live site's CSS, not guessed. The rest of the
site's font stack (Madefor, Helvetica Neue W01/W02, alfabet, DIN Next, Acumin
Pro) is Wix platform chrome, not brand.

| Role | Face | Weights | Licence |
|---|---|---|---|
| Display | **Calistoga** | 400 only | **SIL OFL 1.1** — `google/fonts/ofl/calistoga` |
| Body | **Montserrat** | Variable `[wght]` | **SIL OFL 1.1** — `google/fonts/ofl/montserrat` |

### Licensing — clear

Both are in Google Fonts' `ofl/` tree, so SIL Open Font License 1.1. Web
embedding, self-hosting and modification are all permitted with no fee and no
webfont licence to buy. **QUESTIONS.md #3 is answered: there is no licensing
blocker.** Self-host both as WOFF2 rather than hitting the Google CDN, for
performance and to avoid the GDPR question of leaking visitor IPs to Google.

### The Calistoga constraint

Calistoga ships **one weight and no italic**. Hierarchy has to come from size,
case and colour, not weight. That suits the editorial direction, but it means no
"semibold heading" option exists. Montserrat's variable axis carries all the
weight contrast.

### What the logos are set in

Neither. The wordmarks and credit cards are **custom rendered 3D lettering**
(felted wool, plastic), not live type. Calistoga and Montserrat are the
typographic brand; the logo art is separate. Do not try to reset the logo in
Calistoga.

---

## Motion

House easing only, per project rules: fades and short scroll reveals.

| Token | Value |
|---|---|
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--dur-fast` | `160ms` |
| `--dur-base` | `320ms` |
| `--dur-slow` | `560ms` |

All wrapped in `prefers-reduced-motion: reduce`.

---

## Tailwind v4 `@theme` block

```css
@theme {
  --color-clay:     #BC9E86;
  --color-cream:    #E6D4BC;
  --color-red:      #A32E32;
  --color-red-deep: #8E2428;
  --color-ink:      #1A1614;
  --color-body:     #4A352A;
  --color-muted:    #6B4E3A;
  --color-hairline: #D8C6AE;
  --color-pups:     #B5E2F6;

  --font-display: "Calistoga", Georgia, serif;
  --font-body:    "Montserrat", system-ui, sans-serif;

  --ease-house: cubic-bezier(0.22, 1, 0.36, 1);
}
```
