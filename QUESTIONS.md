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

### 2. Live show site review — blocked by network policy
**BLOCKING for design fidelity, not for scaffolding.**

`pawsitivepugs.com` and the reference site `m.ind.coach` are both refused by
this environment's egress proxy (`CONNECT tunnel failed, 403`). I cannot read
either directly to extract tone, palette, typography or the current people list.

Need either: the domains allowlisted on the environment, or a set of full-page
screenshots plus the current team/advisor copy pasted in.

---

## Open — needed before the stage named

### 3. Exact hex values and font files, confirmed from the kit
Blocks stage 1. Also: **are the typefaces licensed for web embedding?** If the
show site uses a desktop-only licence, a webfont licence has to be bought or a
substitute agreed. Do not assume the show site's usage is compliant.

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
