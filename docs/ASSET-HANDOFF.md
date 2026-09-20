# Getting brand assets into the site

The BRAND TOOL KIT lives on Alan's Mac. The **local** Claude Code session can
read it (it was started with `--add-dir`); the cloud session cannot, and never
could. So the local session is the one that moves assets across.

Everything is already plumbed. Dropping the files in and editing **one file**
swaps every placeholder on the site for the real image.

## How the wiring works

`src/lib/brand.ts` holds one slot per image. Each slot has `base: null` until
the asset exists. `<Figure>` reads that slot and renders either the real
`<picture>` (AVIF, then WebP, then the original, with 2x through srcset,
explicit width and height, lazy below the fold) or a labelled placeholder.

No component changes. No page changes. Just files in `public/brand/` and paths
in the manifest.

## Slots waiting to be filled

| Key | What it is | 1x size |
|---|---|---|
| `home.hero` | The garden, or the founders at work | 1400x1050 |
| `home.company` | The team at work, a workspace, the process | 1200x800 |
| `home.characters` | Finn, Fia and the pack | 1280x800 |
| `home.app` | PupsPlayer preview | 1000x750 |
| `story.lead` | Conor and Lydia | 1680x720 |
| `story.garden` | The garden, the house, the real pugs | 1200x800 |
| `app.hero` | App on a device | 900x1125 |
| `app.screen1-3` | App screenshots | 540x960 |

Plus `LOGOS` at the foot of the same file: the show wordmark in black and
white, the PupsPlayer mark, and a CLÉ wordmark if one ever exists.

## The prompt for the local session

```
Move the usable brand assets into the repo and wire them up.

Read docs/ASSET-HANDOFF.md and src/lib/brand.ts first: the manifest lists
every slot, its intended size and its alt text.

For each slot in the manifest, find the best candidate in
/Users/alanbrosnan/Downloads/BRAND TOOL KIT and optimise it into
public/brand/ following the CLAUDE.md protocol:

- Export AVIF and WebP at 1x and 2x, plus a JPG or PNG fallback.
- Name them <slot-base>.<ext> and <slot-base>@2x.<ext>, for example
  public/brand/home-hero.avif and home-hero@2x.avif.
- Compress properly and strip all metadata. The kit's files carry XMP with
  generation prompts in it, which must not ship to a public website.
- Never modify anything already in the BRAND TOOL KIT.

Then set `base` in src/lib/brand.ts for each slot you filled, for example
base: "/brand/home-hero". Leave the rest as null. Correct the alt text where
the real image differs from what I guessed.

Logos: the show wordmark (logo-black.png / logo white.png) and the
PupsPlayer mark (PP-logo.png) were all flagged in the stage 1 audit as flat,
clean and usable. Vectorise them to SVG if you can do it cleanly, otherwise
ship trimmed transparent PNGs, and fill in the LOGOS block.

IMPORTANT, and not negotiable: the stage 1 audit found the kit is almost
entirely AI-generated, including everything in PEOPLE/ and much of the
scenery. Do NOT fill story.lead, home.company or any team photo with
generated imagery. Those slots stay null until real photography exists. Show
frames used as show frames are fine. A generated face presented as a founder
is not, and this site's own Ethical AI page makes that a serious problem.

Per the BRAND TOOL KIT protocol, write the optimised exports back to
BRAND TOOL KIT/web-exports/YYYY-MM-DD/ and update
BRAND TOOL KIT/web-exports/ASSET-LOG.md with every file added, what it is,
where it is used and its source file.

Then run `npm run build`, confirm it passes, and push.
```

## After it lands

The cloud session picks the assets up on the next `git pull`, so both sides
stay in sync. Anything still `null` keeps its placeholder, which is the honest
state rather than a gap.
