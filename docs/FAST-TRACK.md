# Fast track — build everything, placeholders where content is missing

Supersedes the pacing in `BUILD-PROMPTS.md`. The stage detail there still applies;
this file changes **what you wait for** and **how the work is batched**.

## The rule

**Nothing waits on Conor.** Every route, every section, every CMS field and every
admin control gets built now. Anything with no supplied content renders as a
labelled placeholder and gets a line in `CONTENT-NEEDED.md`.

"Nothing is missing" means, concretely:

- Every route in the sitemap resolves. No 404s on our own links, no dead nav items.
- Every section specified in the brief exists on the page it belongs to.
- Every CMS field Conor needs is present and works, including the ones with nothing
  in them yet.
- Every gap is a **visible, labelled placeholder** at the correct dimensions —
  never a blank space, never a silently collapsed section, never an invented
  substitute.
- `CONTENT-NEEDED.md` matches reality exactly, so the remaining work is a list
  rather than a hunt.

Placeholders are fine. Fabrications are not. That distinction does not relax under
deadline: no invented copy, statistics, testimonials, bios, logos or awards, no
stock photography, and no AI-generated imagery anywhere on this site.

## Seven runs

`/clear` between each. `CLAUDE.md` reloads automatically. Push after every run.

| Run | Stages | Builds |
|---|---|---|
| A | 2 | Scaffold, schema, RLS, deploy |
| B | 3 + 4 | Three previews, then lock the system |
| C | 5 + 6 | Home, Story, Team, Ethical AI |
| D | 7 + 8 | Journal, App, Media |
| E | 9 | Shop and Stripe |
| F | 10 + 11 | Contact, utility, 404, Admin |
| G | 12 + 13 | SEO, performance, accessibility, handover |

## The direction decision — don't wait for it

Stage 3 was gated on Conor picking a direction. Don't wait.

**Default to C, Corporate Warm.** The reasoning is practical, not aesthetic: no
photography exists. Direction A is photography-led, so with placeholder blocks
where every image goes there is nothing to actually judge. Direction B needs
watercolour artwork nobody has made. C is type-led and structural — it is the one
direction that looks finished with placeholders in it, and it is closest to the
`m.ind.coach` reference the brief named.

All three previews still get built and stay live at `/preview/a|b|c`, so Conor can
still choose. If he picks A or B later, the tokens, components, schema, CMS and
every page's content structure carry over — it's a reskin of the layer above, not
a rebuild.

## Where speed is not allowed

Two places. Everywhere else, move fast.

1. **RLS.** Every table, no exceptions, verified by actually attempting an
   anonymous write. A public `orders` or `enquiries` table leaks customer data.
2. **Stripe and the private bucket.** Price read from the database and never from
   the client. Webhook signature verified before anything is written. Idempotent
   handling, because Stripe retries and a retry must not mint a second download
   token. Product files never publicly readable.

Those two carry money, personal data and the client's liability. The rest of the
site is recoverable from a mistake; those aren't.

---

# Run A — stage 2

```
Stage 2 from docs/BUILD-PROMPTS.md. Scaffold, Supabase schema, deploy pipeline.

Build it exactly as that prompt specifies. Two emphases given the deadline:

- RLS on all nine tables, and verify it by actually attempting an anonymous write
  against each one. Show me the result. orders and enquiries must never be publicly
  readable. product-files must never be publicly readable.
- The <AssetPlaceholder> component matters more than usual now, because the whole
  site will be built on it. Flat brand-colour block, exact dimensions via props,
  visible label naming what belongs there and its CONTENT-NEEDED.md line. It should
  be obvious at a glance, never subtle.

Every route in the sitemap resolves to a stub. No dead links.

Verify npm run build passes and the deploy serves. Commit and push.
```

# Run B — stages 3 and 4

```
Stages 3 and 4 from docs/BUILD-PROMPTS.md, run straight through. Do not stop for
the client gate.

Build all three preview directions at /preview/a, /preview/b and /preview/c —
genuinely different designs, not three colourways of one layout.

Then lock the design system on direction C, Corporate Warm. Reason: no photography
exists, so A can't be fairly judged with placeholder blocks where every image goes,
and B needs watercolour artwork nobody has made. C is type-led and reads as
finished with placeholders in it. The previews stay live so Conor can still choose;
if he picks another the tokens, components and content structure all carry over.

Then stage 4: type scale, spacing, radius and section rhythm as tokens; sticky
header with the CLÉ wordmark placeholder and the link out to the show site; footer
with company details, social, both-site cross-links; only the shadcn components
actually needed; keyboard navigation, visible focus, semantic landmarks, skip link.

Honour the pairing rules — clay only takes --ink for body text, red never on clay.
Mobile first, no gradients, no blanket shadows, fades and short scroll reveals only,
prefers-reduced-motion respected.

Show me the three preview URLs and the locked header/footer at 320px and 1440px.
Commit and push.
```

# Run C — stages 5 and 6

```
Stages 5 and 6 from docs/BUILD-PROMPTS.md. Home, Founder story, Team, Ethical AI.

Build every section completely. Where copy exists in the brief, write it properly.
Where it doesn't, structure the section fully and put a labelled placeholder in it —
never skip a section because its content hasn't arrived, and never write copy the
client hasn't given us.

Specifically:
- The credibility strip ships with placeholders. No invented statistics or logos.
- /story is structured in full with pull quotes and section anchors, copy marked
  as needed.
- /team uses the credited names with an unconfirmed flag, and no invented bios.
- /ethical-ai gets a real process diagram or numbered stages, not paragraphs.

Every editable block reads from content_blocks. ® on first use of The Pawsitive
Pugs & Pals, ™ on PupsPlayer. Update CONTENT-NEEDED.md as you go. Commit and push.
```

# Run D — stages 7 and 8

```
Stages 7 and 8 from docs/BUILD-PROMPTS.md. Journal, App, Media.

Journal index with category filtering, post template, scheduling, Article JSON-LD,
OG images. Four categories seeded as placeholders since the real names are
unconfirmed.

/app full page behind the settings.app_launched flag, pre-launch page when false.
Test both states — the toggle is the thing Conor flips himself at launch, so it has
to work without a redeploy.

/media from media_items with optional lazy-loaded embeds.

All three ship before any content exists, so the empty states are real work, not an
afterthought. Commit and push.
```

# Run E — stage 9

```
Stage 9 from docs/BUILD-PROMPTS.md. Shop and Stripe, test mode.

This is the one run not to rush. Non-negotiable:
- Price read from the database, never from the client request.
- Webhook signature verified before anything is written.
- Idempotent — Stripe retries, and a retry must not mint a second download token.
- Token single-use logic: 24 hours, capped at five downloads, counted server side.
- product-files never publicly readable; served only via short-lived signed URLs.

Test the full path with Stripe test cards including a decline and an abandoned
checkout. Then verify a direct request to a product file URL without a token is
refused — show me that it fails.

Commit and push.
```

# Run F — stages 10 and 11

```
Stages 10 and 11 from docs/BUILD-PROMPTS.md. Contact, utility pages, 404, Admin.

/contact with the three split paths, partnership as the priority route, posting to
enquiries with email notification and server-side validation.

/privacy, /terms, /cookies as structure and headings only — do not draft legal
copy, flag them for a solicitor in CONTENT-NEEDED.md.

Admin: the test is Conor on his phone with no training. Change any photo, edit any
paragraph, change any link, publish a post, add a podcast entry, add a product with
its PDF, flip the app live. Alt text required on image upload — refuse to save
without it. Test the panel at 390px, not a resized desktop window.

Then write docs/ADMIN-GUIDE.md in plain non-technical language. Commit and push.
```

# Run G — stages 12 and 13

```
Stages 12 and 13 from docs/BUILD-PROMPTS.md. SEO, performance, accessibility,
handover docs.

Run axe on every route and fix what it finds. Check every text and UI element
against the contrast matrix in DESIGN-TOKENS.md. Lighthouse on mobile for each
page — report the actual four numbers per page rather than asserting they're fine,
and if something falls short say so and say why.

Full SEO pass: per-page meta editable in the CMS, OG and Twitter cards, JSON-LD
(Organization, Article, Product), sitemap.xml, robots.txt, canonicals, and
docs/SEO.md recording the term separation from pawsitivepugs.com.

Then the handover docs: ADMIN-GUIDE.md, INTEGRATIONS.md with the mSocial webhook
payload shape flagged off by default, ENVIRONMENT.md, LAUNCH-CHECKLIST.md.

Finally: confirm CONTENT-NEEDED.md exactly matches what is still outstanding, and
confirm no secrets in git history — not just the working tree. Commit and push.
```

---

## When Conor's content lands

None of it is a rebuild. Photography drops into the placeholder slots. Copy goes
into `content_blocks` through the admin panel — Conor can do that himself without
you. The logo replaces one asset and regenerates the favicon set. Bios go into the
`people` table.

That is the point of building it this way: the site is finished and the content is
a fill-in job, rather than the content being a dependency the build is stuck behind.
