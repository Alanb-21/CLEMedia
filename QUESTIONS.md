# QUESTIONS — CLÉ Family Media corporate site

Running list of things to confirm rather than guess. Add, never delete —
mark answered inline with the date and the answer.

Status key: **BLOCKING** stops work now · **OPEN** needed before a named stage · **PARKED** nice to have

---

## Blocking now

### 1. BRAND TOOL KIT — where is it, and how do I get it into the build environment?
**BLOCKING — stage 1 (asset audit and design tokens) cannot start.**

The folder is not present. Searched, and found nothing:
- the whole container filesystem, for `BRAND TOOL KIT` and close variants
- the repo (`Alanb-21/CLEMedia` is empty — zero commits)
- Google Drive on `brosnanalan48@gmail.com`: folders named `*BRAND*`, titles
  containing `CLE` / `Pawsitive` / `Pugs` / `Tool Kit` / `Toolkit` / `Sexton`,
  all folders shared with the account, and a full-text search for
  `Pawsitive` / `CLÉ Family` / `PupsPlayer`
- any font, image or design source file (`.otf .ttf .woff .ai .psd .svg .png .jpg .sketch .fig`)
  anywhere in the user areas of the container

Two separate things are needed:
1. **The path or location** of the kit.
2. **A delivery route.** This build runs in an ephemeral cloud container, so a
   folder on a local Mac or PC is not reachable from here. Workable options:
   share the Drive folder with the build account, commit the kit to a branch of
   the repo, or upload it into the session.

Note: the original client handoff doc lists the brand kit under *"Content/assets
expected from Connor"*, alongside the image folder, team details and garden
imagery — so it may simply not have been delivered yet. Worth confirming with
Conor before hunting further.

**ANSWERED 2026-09-19.** Delivered. Kit is on Alan's Mac at
`/Users/alanbrosnan/Downloads/BRAND TOOL KIT` and reachable from the build
session as an additional working directory. 741MB, 355 files, 13 top-level
folders. Audited in full. The earlier "not present" note was written from a
cloud container that could not see it. **Resolved.**

### 2. Live show site review — blocked by network policy
**BLOCKING for design fidelity, not for scaffolding.**

`pawsitivepugs.com` and the reference site `m.ind.coach` are both refused by
this environment's egress proxy (`CONNECT tunnel failed, 403`). I cannot read
either directly to extract tone, palette, typography or the current people list.

Need either: the domains allowlisted on the environment, or a set of full-page
screenshots plus the current team/advisor copy pasted in.

---

## Open — needed before the stage named

**ANSWERED 2026-09-19.** Egress works from this machine. `pawsitivepugs.com`
fetched (200, Wix-hosted). Brand fonts and palette pulled from its live CSS and
folded into `DESIGN-TOKENS.md`. `m.ind.coach` still worth a look for feel, but
no longer blocking. **Resolved.**

### 3. Exact hex values and font files, confirmed from the kit
Blocks stage 1. Also: **are the typefaces licensed for web embedding?** If the
show site uses a desktop-only licence, a webfont licence has to be bought or a
substitute agreed. Do not assume the show site's usage is compliant.

**ANSWERED 2026-09-19.** Both halves resolved, see `DESIGN-TOKENS.md`.

Hex: `--cle-clay #BC9E86`, `--cle-cream #E6D4BC`, `--cle-red #A32E32`,
`--pups-blue #B5E2F6`. Agreed across the live site CSS and the flat swatches in
`OTHER IMAGES/wall 000.jpg`.

Fonts: **Calistoga** (display, one weight) + **Montserrat** (body, variable).
Both **SIL OFL 1.1** via Google Fonts, so web embedding is free and permitted.
No webfont licence to buy, no substitute needed. Self-host as WOFF2 rather than
using the Google CDN, to keep visitor IPs out of Google's hands.

One consequence that needs a decision, carried as **#20** below: the brand
palette contains no colour that passes WCAG AA as text.

### 4. The UX designer's proposed colour direction — replacing or extending?
Blocks stage 1. The brief says retain the existing palette; a separate designer
colour direction is also referenced. These conflict unless one extends the
other. Which governs?

### 5. Final team and advisor list, with bios and photographs
Blocks stage 6 (`/team`).
Starting point taken from the live show site, **all to be confirmed and
expanded, none treated as final copy**: Conor and Lydia Sexton (Executive
Producers, founders), Paula Walshe (Education Director), Kirstie Harding (Early
Learning Advisor), Al Compton (Creative Director).
Need: correct spellings and role titles, who is core team vs advisory board,
substantive bios, cleared photographs, and any advisor not on the show site.
The creative director's track record needs its own supplied copy.

**PARTIALLY ANSWERED 2026-09-19 — and the starting list above is wrong.** The
show's own end-credit cards (`CREDITS/01–07.png`) give names and roles that
contradict what was inferred from the show site:

| Name | Credited role |
|---|---|
| Conor Sexton | Created by · Executive Producer |
| **Lydia Harding** | Co-Producer |
| Kirstie Harding | Early Learning Advisor |
| Paula Walshe | Educational Content Advisor |
| Al Compton | Written & Directed By |

Three corrections: **Lydia is credited as Lydia Harding, not Lydia Sexton**, and
as Co-Producer, not Executive Producer. Paula Walshe is **Educational Content
Advisor**, not Education Director. Al Compton is credited **Written & Directed
By**, not Creative Director. Lydia Harding and Kirstie Harding share a surname;
whether they are related is not stated and is not being guessed at.

Credits are a stronger source than the site, but they are show credits, not
company roles. **Still needed:** confirmation of each person's CLÉ title, who is
core team vs advisory board, written bios, and cleared photographs. See #21 —
no usable photograph of any of these people exists in the kit.

### 6. Founder story source material
Blocks stage 6 (`/story`). Does interview material or a written piece exist, or
does this need to be written? If written — by whom?

### 7. Who is writing the site copy, and by when?
Blocks stages 5–10. Every page needs real copy. Nothing will be invented, so
unwritten sections ship as marked placeholders.

### 8. The four journal categories, named — and the first four posts
Blocks stage 7.

### 9. Garden imagery — does usable photography exist, and who owns the rights?
Blocks stages 3 and 5. This is a candidate hero and full-bleed section break, so
resolution and orientation matter. Commercial use must be cleared.

### 10. Real-dog photography — available, and cleared for commercial use?
Blocks stage 5. The handoff doc mentions "the real pugs that inspired the
characters" as a content theme.

### 11. Stripe account details, and VAT treatment on digital goods
Blocks stage 9. Test keys to build against; live keys at launch.
**VAT is a question for the client and their accountant, not for me** — EU
digital-goods VAT on B2C sales has place-of-supply rules I will not guess at.
Confirm whether Stripe Tax should be switched on.

### 12. The first set of shop products, priced, with final PDFs
Blocks stage 9. Roughly €3–4 each per the brief.

### 13. mSocial — exact workflow with David
Blocks the integration flag. Automatic publish or approval-gated? Is there an
actual API and docs? Are Instagram and Facebook in scope, or LinkedIn only?
Until answered, this ships as a documented outbound webhook, flagged off.

### 14. App — store links, screenshots, confirmed launch date, and who flips the switch
Blocks stage 8. Target is mid-October 2026, launching with the site.

### 15. Domain for this site, and where is DNS managed?
Blocks stage 13. Also decides the canonical strategy that keeps this site from
competing with `pawsitivepugs.com` in search.

### 16. Analytics — Plausible or GA4?
Blocks stage 12. The answer determines whether a cookie consent banner is
required: Plausible is cookieless and generally needs none, GA4 does. This is a
GDPR question for an Irish company, so the client should decide deliberately.

---

## Parked

### 17. Press kit — do downloadable assets exist for `/contact`?

### 18. Email notifications — Resend, or Supabase functions?
Resend needs an account and a verified sending domain. Whose?

### 19. Is there a second admin user at launch, or Conor only?
Schema supports more; the question is what to seed.

---

## Raised by the stage 1 asset audit — 2026-09-19

### 20. The brand palette has no accessible *neutral*. Approve the added ink ramp?
**BLOCKING — stage 1 token gate.**

**Corrected 2026-09-19** — the first version of this entry said the palette had
no accessible colour at all. That was wrong. Brand red `#A32E32` is **7.01:1 on
white**, which passes AAA, and white on red is also 7.01:1, so red works as text
and as a button fill.

The real gap is narrower and still real: there is no accessible **neutral**.
Clay `#BC9E86` on white is **2.51:1**, cream `#E6D4BC` on white is **1.45:1**;
WCAG 2.1 AA needs 4.5:1. Red is the rationed accent, so it cannot carry body
copy either — a page set in red is unreadable whatever the ratio says.

The show site sidesteps this by setting text in black or white. A type-led
corporate site cannot, so `DESIGN-TOKENS.md` proposes a dark ink plus a clay
ramp derived from the brand hue (`--ink #1A1614`, `--body #4A352A`,
`--muted #6B4E3A`). These are additions to the palette, not replacements, and
the brief says retain the existing palette, so Conor should approve them
explicitly rather than have them slipped in.

### 21. There is no usable CLÉ Family Media logo, and no real photography of anyone
**BLOCKING — stages 1, 4, 5, 6.**

Two separate gaps, both serious for a credibility site.

**The company logo.** The kit holds no vector anywhere: 212 PNG, 141 JPG, 2 PSD,
zero SVG/AI/EPS. The only CLÉ company marks are `LOGOS + ICONS/CLE logo.jpg`, a
3D felted render where the letters are a caterpillar, a lion and an elephant,
and a 3D script monogram whose filename is a Nano Banana prompt. Neither
survives a 32px favicon, a mono footer lockup or an OG card, and neither reads
as a corporate mark. Needed: a flat CLÉ Family Media wordmark in vector, or
approval to draw one and set it in Calistoga.

Usable as-is, by contrast: the **show** logo `logo-black.png` / `logo white.png`
is flat, clean mono and vectorises fine, and `PP-logo.png` (the PupsPlayer paw
and play button, flat `#B5E2F6`) does too.

**The people.** `PEOPLE/` contains five **AI-generated 3D cartoon avatars**, not
photographs. There is no photograph of Conor, Lydia or any advisor anywhere in
the kit. The brief requires real photography of founders and team, forbids
AI-generated imagery, and forbids fabricating a photo of a real person, so these
five files cannot be used in any form. A photo shoot or supplied headshots are
the only route to `/team` and `/story`.

### 22. Almost the entire kit is AI-generated. Where is the line on this site?
**BLOCKING for `/ethical-ai`, and a live reputational risk.**

This is not an inference from style. Filenames and XMP carry the prompts:
`Nano Banana 2 - create a close up of the wool butterfly.png`,
`ChatGPT Image Jun 10, 2026...`, and dozens more across `GENERAL EPISODE
STILLS`, `MOCK-UPS`, `FRAMES`, `TITLE SLATES`, `OLDIES INTRO STILLS` and
`LOGOS + ICONS`. The garden that the brief floats as the hero candidate is
AI-generated too, not photography of a real garden.

The site's most important trust page tells investors and educators that AI is a
production tool inside a human-led process and never the author. If a journalist
drops the site's own hero image into a detector, or simply reads the filenames in
the kit, the position has to hold up. It probably does for *show frames* — those
are the animated output of the production pipeline, and a cartoon is not passed
off as a photograph. It does not hold for a **founder's face**, a **company
logo**, or a **photograph of the real garden**.

Proposed line, needs Conor's sign-off before any of it is built:

- **Fine:** show frames and character art used as show frames, clearly the
  animated product, in the show cross-link module and as small accents.
- **Not fine:** anything AI-generated presented as a photograph of a real
  person, a real place or a real product. That means `PEOPLE/`, the felted CLÉ
  logo, the "garden" stills used as if they were the actual garden, and every
  `MOCK-UPS` packshot if the shop sells a physical product.
- **Needs a decision:** whether the show's own AI production pipeline is stated
  plainly on `/ethical-ai`. Hiding it is the bigger risk.

### 23. Do real photographs of the garden, the pugs or the team exist at all?
**BLOCKING — stages 3 and 5.** Follows from #22.

Nothing in the kit is a photograph. If real photography of the garden, the real
pugs behind Finn and Fia, or the team exists on Conor's phone, a camera roll or
a hard drive, it is the single highest-value thing he can send. If it does not
exist, a shoot needs scheduling now, because it gates the home hero, `/story`
and `/team`, and four weeks is not long.

### 24. Is `wall 000.jpg` / `wall 001.jpg` the official palette sheet?
**OPEN — confirms stage 1.** Both are flat two-tone clay-over-cream swatches and
match the live site CSS to within JPEG drift, which is why they were treated as
the palette source. Worth one line of confirmation that they are the intended
brand swatches and not a set dressing texture that happens to match.
