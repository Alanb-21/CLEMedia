# CONTENT NEEDED — CLÉ Family Media corporate site

Everything the site needs that has not been supplied. Each entry ships as a
clearly marked placeholder until it arrives: a flat brand-colour block at the
required dimensions with a visible label.

**Hard rules, no exceptions:** no stock photography of families or children, no
AI-generated imagery anywhere on this site, no fabricated photograph of a real
person, and no invented statistics, testimonials, "trusted by" logos, awards,
user numbers or research findings. A credibility block with no supplied claim
stays empty and gets listed here.

Status: ❌ not supplied · ⚠️ partial or unconfirmed · ✅ received

---

## Brand assets — BRAND TOOL KIT received and audited 2026-09-19

Kit audited in full: 741MB, 355 files, 13 folders. Palette and typefaces are
resolved (`DESIGN-TOKENS.md`). The logo is not.

| Item | Status | Needed for | Notes |
|---|---|---|---|
| Brand colour palette, exact hex | ✅ | Design tokens, stage 1 gate | `#BC9E86` clay · `#E6D4BC` cream · `#A32E32` red · `#B5E2F6` PupsPlayer. Confirmed against live site CSS + `wall 000.jpg` |
| Typefaces + web-licensed font files | ✅ | Type scale, stage 1 gate | **Calistoga** + **Montserrat**, both SIL OFL 1.1. Free to embed and self-host. No licence to buy |
| Accessible neutral text colours | ⚠️ | Every page | Brand red `#A32E32` passes AAA on white (7.01:1), but clay and cream carry no text at any size and red is the rationed accent. Ink ramp proposed, awaiting approval. QUESTIONS.md #20 |
| Show logo, mono (Pawsitive Pugs & Pals) | ✅ | Show cross-link, footer | `logo-black.png` 1000×333, `logo white.png` 1871×523. Flat, clean, vectorises fine |
| PupsPlayer™ mark | ✅ | `/app` | `PP-logo.png` 2713×2681, flat `#B5E2F6`, 95.7% single colour |
| **CLÉ Family Media logo, vector** | ❌ | Header, footer, OG, favicon | **Does not exist in any usable form.** Only a 3D felted render and an AI 3D monogram. Zero SVG/AI/EPS in the entire kit. QUESTIONS.md #21 |
| CLÉ wordmark, flat / mono | ❌ | Header, small sizes, dark grounds | Same gap. Needs supplying or approval to draw one |
| Favicon / app icon source | ❌ | Favicon set | Blocked on the CLÉ mark above |
| Character art (Finn, Fia, others) | ✅ | Show handoff module, small accents | Plentiful in `GENERAL EPISODE STILLS/`. Supporting cast only |

## Photography — none exists

**There is no photograph anywhere in the BRAND TOOL KIT.** Every image is
AI-generated or a render; filenames and XMP carry the prompts. See QUESTIONS.md
#22 and #23.

| Item | Status | Needed for | Notes |
|---|---|---|---|
| Garden photography | ⚠️ | Home hero, section breaks | The "garden" stills are AI-generated. Cannot be used as the real garden |
| Founder photography — Conor, Lydia | ❌ | `/story`, `/team` | `PEOPLE/` holds five AI cartoon avatars. Unusable under the brief's hard rules |
| Team and advisor headshots | ❌ | `/team` | None exist. Shoot or supplied headshots required |
| Process / behind-the-scenes / workspace | ❌ | `/story`, `/ethical-ai` | None exist |
| Real-dog photography | ❌ | Show handoff, `/story` | The pugs in the kit are animated characters, not the real dogs |

## Copy

| Item | Status | Needed for | Notes |
|---|---|---|---|
| Home hero — positioning line | ❌ | `/` | One line: what CLÉ is and who it is for |
| "The problem" section | ❌ | `/` | Plainly written, no scaremongering |
| Watch · Play · Learn — three blocks | ❌ | `/` | One short block each |
| Company at a glance | ❌ | `/` | What CLÉ is, produces, and where it is going |
| Research and credibility strip | ❌ | `/` | **No claim ships unsupplied.** Empty until provided |
| Founder story, long-form | ❌ | `/story` | Carries the emotional weight of the site |
| Team and advisor bios | ⚠️ | `/team` | Names + credited roles recovered from `CREDITS/`, and they correct the earlier list (Lydia **Harding**, not Sexton). Still no bios. See QUESTIONS.md #5 |
| Ethical AI — position statement | ❌ | `/ethical-ai` | AI as production tool in a human-led process |
| Ethical AI — process stages | ❌ | `/ethical-ai` | Concept → scripting → creative dev → review. Where a human decides, where a tool assists |
| Ethical AI — safeguards and red lines | ❌ | `/ethical-ai` | The lines the company will not cross |
| Journal — four category names | ❌ | `/journal` | One published per week |
| First four journal posts | ❌ | `/journal` | |
| App page content | ❌ | `/app` | Features, screens, age range, availability |
| App pre-launch copy | ❌ | `/app` | What is coming, target window, notify-me |
| App store links and screenshots | ❌ | `/app` | Not available until launch |
| Media / podcast entries | ❌ | `/media` | UK podcast expected December. Empty state handled meanwhile |
| Shop products, copy, prices, PDFs | ❌ | `/shop` | ~€3–4 each |
| Company registration details, address | ❌ | Footer, `/terms` | Irish registered company details |
| Contact email addresses | ❌ | `/contact`, footer | Separate routes for general / partnership / press |
| Social profile links | ❌ | Footer | |
| Privacy policy | ❌ | `/privacy` | Needs legal review — not to be drafted by me |
| Terms | ❌ | `/terms` | Needs legal review. Must cover digital-goods sale |
| Cookie policy | ❌ | `/cookies` | Depends on the analytics choice. See QUESTIONS.md #16 |
| Press kit assets | ❌ | `/contact` | Optional — omitted if none exist |

## Reference material I could not access

| Item | Status | Notes |
|---|---|---|
| `pawsitivepugs.com` full review | ❌ | Blocked by this environment's egress proxy. Need allowlisting or screenshots |
| `m.ind.coach` design reference | ❌ | Same. Needed to match the intended feel |

---

## Placeholder convention

Every gap renders as `<AssetPlaceholder>`: a flat brand-colour block at the
exact final dimensions, labelled with what belongs there and its row in this
file. They are deliberately visible, never subtle — the client should be able
to scan any page and see precisely what is still outstanding. A build that
reaches launch with placeholders still in it has failed, so this list is the
launch checklist for content.


---

## Brand assets wired, 2026-09-20

Three image slots and all three logos are live. See
`BRAND TOOL KIT/web-exports/2026-09-20/` and `src/lib/brand.ts`.

| Slot | State | Note |
|---|---|---|
| `home.hero` | ✅ | Show frame: bluebells in the garden at sunrise |
| `story.garden` | ✅ | Show frame: the garden with a rope swing |
| `home.characters` | ✅ | Show frame: two pugs and a hen |
| `LOGOS.showBlack` / `.showWhite` | ✅ | One vectorised SVG, coloured by CSS |
| `LOGOS.pupsPlayer` | ✅ | Vectorised SVG |
| `story.lead` | ❌ | **Stays empty.** No photograph of Conor or Lydia exists |
| `home.company` | ❌ | **Stays empty.** No photograph of the team exists |
| `app.hero`, `app.screen1-3`, `home.app` | ❌ | No app screenshots exist. QUESTIONS.md #14 |
| `LOGOS.cle` | ❌ | No vector CLÉ mark exists. QUESTIONS.md #21 |

The three filled slots are **frames from the animated show**, not photographs,
and their alt text says so. They are not a substitute for the photography this
file still lists as outstanding.
