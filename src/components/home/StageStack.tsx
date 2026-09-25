import type { ReactNode } from "react";

/* ============================================================================
   Watch, Play, Learn, as a stack.

   The three stages are the one genuine sequence on the page, so they are the
   one thing that pins: each card sticks to the viewport and the next slides
   over it. The form argues the content, which is the only reason to hijack a
   scroll at all.

   Built on `position: sticky` rather than a scroll library. No rAF loop, no
   ScrollTrigger, nothing to fight Lenis, and it degrades to a plain stack
   wherever sticky is unsupported or reduced motion is on.

   Each card is offset slightly further down than the last so the ones beneath
   stay visible as a stepped edge, which is what makes it read as a deck rather
   than a single moving card.
   ========================================================================== */

export interface Stage {
  n: string;
  title: string;
  body: string;
  aside?: ReactNode;
}

export function StageStack({ stages }: { stages: Stage[] }) {
  return (
    <ol className="stage-stack">
      {stages.map((s, i) => (
        <li
          key={s.n}
          className="stage-stack-item"
          style={{ "--n": i, zIndex: i + 1 } as React.CSSProperties}
        >
          <div className="card rounded-[var(--radius-lg)] p-8 sm:p-12">
            <div className="flex items-baseline gap-5">
              <span className="tnum font-mono text-[13px] tracking-[0.16em] text-red-deep">{s.n}</span>
              <h3 className="t-h2 font-display">{s.title}</h3>
            </div>
            <p className="t-lead mt-6 max-w-[52ch] text-slate">{s.body}</p>
            {s.aside}
          </div>
        </li>
      ))}
    </ol>
  );
}
