# Build prompts — stages 2 to 13

Paste these into the local Claude Code session, one per stage, in order.

**How to run them:**

- `/clear` between stages. `CLAUDE.md` reloads automatically, so nothing is lost
  and each stage starts fast.
- `git push -u origin claude/kind-feynman-7qidb7` after each stage. Work that
  only exists on one laptop isn't delivered.
- Stages 3 and 9 end at a **client gate**. Do not start the next stage until the
  client has actually answered.
- If a prompt's stage is blocked on missing content, build it with marked
  placeholders and move on. Never invent copy, claims, bios or imagery.

---

## 0. Correction — run this first

The stage 1 audit concluded that no brand colour passes AA as text. That is
wrong, and the error makes the client conversation harder than it needs to be.

```
Correct DESIGN-TOKENS.md. The claim that no brand colour passes WCAG AA as text is
wrong. I verified all 25 text/background combinations independently:

               white    cream    clay     red      pups
  ink        17.97+   12.41+   7.16+    2.56-   12.98+
  body       11.45+    7.91+   4.57+    1.63-    8.27+
  muted       7.56+    5.23+   3.02~    1.08-    5.47+
  red         7.01+    4.85+   2.80-    1.00-    5.07+
  white       1.00-    1.45-   2.51-    7.01+    1.38-

  + = AA body (4.5:1)   ~ = AA large/UI only (3:1)   - = fails

Two things follow:

1. Brand red #A32E32 is 7.01:1 on white — it passes AAA for body text, and white
   on red is also 7.01:1, so red is a valid button fill. The palette DOES have an
   accessible text colour. Reframe the finding as "clay and cream cannot carry
   text; red can."

2. Add pairing rules to DESIGN-TOKENS.md. Clay is the difficult surface: it takes
   --ink comfortably (7.16), --body is marginal (4.57), --muted is large-text-only
   (3.02) and --red fails on it (2.80). Cream and PupsPlayer blue take everything.
   Red is never used on clay.

Update QUESTIONS.md #20 to match, then commit and push.
```

---

## Stage 2 — Scaffold, schema, deploy pipeline

No gate. Run this now; it doesn't depend on the client approving tokens.

```
Stage 2. Scaffold the project, build the Supabase schema, and get a blank shell
deployed. No page content yet — that's stage 3 onwards.

Scaffold:
- Vite + React + TypeScript, Tailwind, shadcn/ui, react-router-dom,
  react-helmet-async. Nothing else unless it's genuinely needed.
- Design tokens from DESIGN-TOKENS.md as CSS custom properties, surfaced through
  the Tailwind theme so components use token names, never raw hex.
- Self-host Calistoga and Montserrat as WOFF2 from the files already in
  web-exports/. Do not use the Google CDN — it leaks visitor IPs and this site's
  positioning makes that a bad look. font-display: swap, preload the two faces
  actually used above the fold.
- Routes for every path in the CLAUDE.md sitemap, each rendering a bare stub.
- An <AssetPlaceholder> component: flat brand-colour block, exact dimensions via
  props, visible label naming what belongs there. This is what every missing
  asset renders as for the rest of the build.

Supabase — exactly the nine tables in CLAUDE.md, no more:
content_blocks, posts, categories, people, media_items, products, orders,
enquiries, settings.

- Migrations as SQL files in supabase/migrations/, not clicked into the dashboard.
- RLS enabled on every table with no exceptions. Public read only on genuinely
  public data (published posts, visible people, active products, public content
  blocks, settings). Writes only for the authenticated admin. orders and enquiries
  are never publicly readable.
- Buckets: public-media (public) and product-files (PRIVATE — never publicly
  readable, served only through short-lived signed URLs).
- Seed settings with the app launch flag defaulting to false.

Deploy:
- Vercel, connected to this branch.
- .env.example committed with every variable named and no values. Real keys never
  enter the repo. Confirm .env is gitignored before the first commit.

Verify before you call it done: npm run build passes, the deployed URL serves the
shell, and every table rejects an anonymous write. Show me the RLS policies and the
deploy URL. Then commit and push.
```

---

## Stage 3 — Three home page directions → CLIENT GATE

```
Stage 3. Build three genuinely different home page directions at /preview/a,
/preview/b and /preview/c, using the real tokens from DESIGN-TOKENS.md.

They must be different designs, not three colourways of one layout — different
grids, different type treatment, different rhythm. The client will pick one or mix
components across them.

A. Garden Light — photography led. Full-bleed hero, editorial type over image,
   generous white space, photography carrying the emotion.
B. Watercolour Studio — illustrative and crafted. Paper texture, watercolour
   washes between sections, type-led hero on a painted backdrop, characters as
   small painted accents.
C. Corporate Warm — closest to m.ind.coach. Structured, quiet, type-first, tight
   grid, colour sparingly as accent, photography in disciplined framed blocks.

All three cover the same home sections so they're comparable: hero with
positioning and two CTAs · the problem parents face · Watch Play Learn · the
company at a glance · featured module slot · research and credibility strip · the
show handoff to pawsitivepugs.com · latest from the journal · partnership CTA.

Constraints:
- Every photograph is an <AssetPlaceholder>. There is no usable photography and
  none may be invented, generated or sourced from stock.
- The research and credibility strip has no supplied claims. Render the structure
  with placeholders — no invented statistics, testimonials, logos or awards.
- Honour the pairing rules: clay only takes --ink for body text, red never on clay.
- Hard rules from CLAUDE.md: mobile first, no gradients, no blanket shadows, no
  bouncing, no auto-rotating carousels, fades and short scroll reveals only,
  prefers-reduced-motion respected.
- Characters may appear in the show handoff module. Nowhere else, and never
  leading a section.
- Check contrast on every text element against the matrix. Do not assume.

Write real copy where the brief supplies the positioning, and placeholders where it
doesn't. Test all three from 320px up. Deploy and give me the three URLs.

Then STOP. The client picks a direction before stage 4.
```

---

## Stage 4 — Design system and global layout

Only after the client has picked. Replace the bracket with what they chose.

```
Stage 4. The client picked [DIRECTION — and any components to carry over from the
others]. Lock the design system and global layout.

- Type scale as named tokens, derived from the specimen. Calistoga is one weight
  with no italic, so hierarchy comes from size, case and colour; Montserrat's
  variable axis carries weight contrast.
- Spacing scale, radius, border and section rhythm as tokens.
- Sticky header: CLÉ wordmark (AssetPlaceholder until supplied), nav, and a clear
  link out to the show site. Header uses top: env(safe-area-inset-top, 0px).
- Footer: company details, email, social, both-site cross-links, copyright.
- The shadcn components actually needed, themed to the tokens. Don't install the
  whole library.
- Full keyboard navigation and visible focus states on every interactive element.
- Semantic landmarks: header, nav, main, footer, and a skip link.

Once this shell is approved it doesn't get restructured without flagging it first.
Show me the header and footer at 320px, 768px and 1440px. Commit and push.
```

---

## Stage 5 — Home, final

```
Stage 5. Build the final home page on the locked design system, every section from
the CLAUDE.md sitemap.

- Every editable headline, body block and image reads from content_blocks, with
  the copy that exists as seeded defaults.
- The show handoff module is a proper piece of design, not a link in a paragraph.
  Characters allowed here. Use the show logo from the kit — it's flat, clean and
  vectorises.
- Latest from the journal pulls the three most recent published posts, with a real
  empty state before any exist.
- Featured module slot is CMS controlled.
- Use ® on The Pawsitive Pugs & Pals and ™ on PupsPlayer at first use on the page.
- Credibility strip stays empty with placeholders until the client supplies claims.

Lighthouse on mobile before you call it done — report the four scores rather than
asserting they're fine. Commit and push.
```

---

## Stage 6 — Story, Team, Ethical AI

```
Stage 6. Build /story, /team and /ethical-ai.

/story — long-form editorial. Pull quotes, generous measure, scroll-based section
anchors. Real photography placeholders throughout. If no founder story copy has
been supplied, structure the page fully and mark every copy block as needed.

/team — profiles from the people table, CMS managed and reorderable. Advisors
visually distinguished from core team. The creative director's track record gets
proper space. Use the credited names pending confirmation, and flag in the page
that they're unconfirmed rather than silently presenting them as final:
Conor Sexton, Lydia Harding (Co-Producer), Paula Walshe (Educational Content
Advisor), Al Compton (Written & Directed By). Do not invent a single line of bio.

/ethical-ai — the most important trust page on the site. Three parts: the position
(AI as a production tool inside a human-led process, never the author of children's
content), the process step by step showing where a human decides and where a tool
assists, and the safeguards and the lines the company will not cross. Build the
process as a real diagram or numbered stages — inline SVG or a proper staged
layout, not three paragraphs of text. Where the client hasn't supplied the actual
process detail, build the structure and mark the content as needed.

Nothing on this page may be AI-generated imagery. Commit and push.
```

---

## Stage 7 — Journal

```
Stage 7. Build the journal end to end.

/journal — index with category filtering across the four rotating categories, real
empty state before any posts exist.
/journal/:slug — hero image, author, date, category, share links, related posts.

CMS: create, edit, schedule, publish, unpublish, categorise. Scheduled posts don't
appear publicly until published_at passes.

Per post: Article JSON-LD, Open Graph and Twitter cards, a generated OG image.
Category names are still unconfirmed — build the system to take four and seed
placeholders rather than inventing names.

Commit and push.
```

---

## Stage 8 — App page, launch toggle, Media

```
Stage 8. Build /app and /media.

/app — the full page (what it does, screens, features, age range, availability,
store links, screenshots) behind the settings.app_launched flag. While the flag is
false the route serves the pre-launch page: what's coming, the target window, and a
notify-me capture writing to enquiries.

The client flips one toggle in /admin at launch. No developer involvement, no
redeploy, no rebuild. Test both states.

Store links and screenshots don't exist yet — placeholders, and add them to
CONTENT-NEEDED.md.

/media — CMS-editable press, interviews and podcast appearances from media_items.
Each entry: title, outlet, date, description, thumbnail, external link, optional
embed (Spotify, Apple, YouTube). Lazy-load embeds so they don't cost page weight
before interaction. A UK podcast appearance is expected in December, so the empty
state has to be graceful — it ships before the first entry exists.

Commit and push.
```

---

## Stage 9 — Shop and Stripe → CLIENT GATE

```
Stage 9. Build the shop and Stripe checkout end to end.

/shop and /shop/:slug from the products table.

/api/create-checkout-session — creates the Stripe Checkout session server side.
Price comes from the database, never from the client request. Validate the product
is active before creating a session.

/api/stripe-webhook — verifies the Stripe signature before doing anything. On
checkout.session.completed, creates an orders row and a single-use download token.
Idempotent: Stripe retries, and a retry must not mint a second token.

/download/:token — serves a short-lived signed URL from the private product-files
bucket. Token valid 24 hours, capped at five downloads, counter incremented
server side. Clear "save this file now" message. Expired and exhausted tokens get
a helpful page, not a stack trace.

No account, no email gate, no signup. Stripe collects email for its own receipt; we
don't require it and never add anyone to a mailing list from a purchase.

Handle failed and abandoned payments cleanly.

Test mode keys only, in env vars. Test the full path with Stripe test cards
including a decline, and verify that a direct request to the product file URL
without a token is refused.

Then STOP. This gets demonstrated purchase-to-download in front of the client
before anything goes live.
```

---

## Stage 10 — Contact, utility, 404

```
Stage 10. Build /contact, the utility pages and the 404.

/contact — three split paths: general enquiry, partnership and distribution, press.
Partnership is the priority route and should feel like a serious business contact
page, not a support form. Posts to enquiries typed by route, plus an email
notification. Press kit download only if assets exist — omit the block otherwise.

Validate server side as well as client side. Honeypot or similar against bots, no
CAPTCHA that hurts accessibility.

/privacy, /terms, /cookies — structure and headings only. Do not draft legal copy;
these need a solicitor, and terms have to cover the sale of digital goods. Mark
them in CONTENT-NEEDED.md as needing legal review.

404 — fits the brand, gives people a route back, no dead end.

Commit and push.
```

---

## Stage 11 — Admin panel

```
Stage 11. Finish and polish /admin.

The test is Conor, on his phone, with no training and no phone call to me. He must
be able to: change any photo, edit any paragraph on any page, change any link,
write and publish a journal post, add a podcast entry, add a product with its PDF,
and flip the app live.

- Supabase Auth, email and password, single admin role, extensible to more users.
- Image upload with crop and required alt text. Refuse to save an image with no alt
  text — it's an accessibility requirement, not a nice-to-have.
- A simple block editor for page copy. Simple. Not a CMS framework.
- Drag to reorder people, media items and products.
- Journal: draft, schedule, publish, unpublish.
- Product files upload to the private bucket only.
- Every destructive action confirms first.
- The whole panel works one-handed on a phone. Test it at 390px, not just resized
  in a desktop browser.

Then write docs/ADMIN-GUIDE.md in plain language — the audience is not technical.

Commit and push.
```

---

## Stage 12 — SEO, performance, accessibility

```
Stage 12. Full SEO, performance and accessibility pass.

SEO:
- Unique title and meta description per page, editable in the CMS.
- OG and Twitter cards everywhere, generated OG images per journal post.
- JSON-LD: Organization sitewide, Article on posts, Product on shop items.
- sitemap.xml and robots.txt, generated and staying current as CMS content changes.
- Canonical tags. Keep this site clear of pawsitivepugs.com in search: the show site
  owns show and episode terms, this site owns the company, the founders, ethical AI
  in children's media and the EdTech angle. Write the separation into docs/SEO.md.

Performance — target Lighthouse 95+ on mobile across all four categories:
- Images lazy-loaded below the fold, explicit width and height, no layout shift.
- AVIF and WebP with fallbacks, 1x and 2x.
- Check the real bundle size and code-split the admin panel out of the public bundle.

Accessibility — WCAG 2.1 AA verified, not assumed:
- Run axe or equivalent on every route and fix what it finds.
- Check every text and UI element against the contrast matrix.
- Full keyboard navigation, visible focus, semantic landmarks, alt text everywhere.
- Test with VoiceOver and fix what's confusing, not just what's technically valid.

Report the actual numbers per page. If something falls short, say so and say why.
Commit and push.
```

---

## Stage 13 — Launch

```
Stage 13. Launch preparation and handover.

- docs/LAUNCH-CHECKLIST.md: DNS cutover, live Stripe keys, webhook endpoint
  re-pointed and re-verified, env vars set in Vercel production, analytics live,
  cookie banner if GA4 was chosen, sitemap submitted.
- Swap Stripe to live keys and re-test one real purchase end to end. The test-mode
  webhook secret is different from the live one — a lot of launches break here.
- Verify both sites link to each other clearly.
- Confirm every placeholder is gone and CONTENT-NEEDED.md is empty. If it isn't,
  list what's still outstanding rather than launching around it.
- docs/: ADMIN-GUIDE.md, INTEGRATIONS.md (including the mSocial webhook payload
  shape — title, excerpt, url, image, category, published_at — documented and
  flagged off by default), ENVIRONMENT.md listing every variable and where it comes
  from.
- Record the walkthrough video for Conor.

Final: confirm no secrets in git history, not just the working tree.
```

---

## Standing rules for every stage

Carried from CLAUDE.md, repeated because they're the ones that get forgotten under
time pressure:

- No AI-generated imagery anywhere on this site. No stock photography of families
  or children. Never fabricate a photo of a real person.
- No invented statistics, testimonials, logos, awards, user numbers or research
  findings. No invented bios.
- Missing content becomes a marked placeholder plus a CONTENT-NEEDED.md entry.
  Never a guess.
- Secrets in environment variables only, never in the repo.
- Don't touch the live show site.
- Ask in QUESTIONS.md rather than deciding something that isn't yours to decide.
