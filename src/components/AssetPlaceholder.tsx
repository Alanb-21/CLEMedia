interface Props {
  /** What belongs here, in plain words. Shown on the block. */
  label: string;
  /** The CONTENT-NEEDED.md row this traces to. */
  ref?: string;
  /** CSS aspect-ratio, e.g. "16/9". */
  ratio?: string;
  className?: string;
  tone?: "clay" | "cream";
}

/**
 * A deliberately visible stand-in for an asset that does not exist yet.
 *
 * Never subtle. Someone scanning the site must be able to see instantly what is
 * still outstanding. Every instance has a matching row in CONTENT-NEEDED.md.
 *
 * This is NOT a loading skeleton and never renders a fabricated image.
 */
export function AssetPlaceholder({ label, ref: contentRef, ratio = "16/9", className = "", tone = "clay" }: Props) {
  const bg = tone === "clay" ? "bg-clay" : "bg-cream";
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}. This asset has not been supplied yet.`}
      style={{ aspectRatio: ratio }}
      className={`${bg} relative flex max-w-full items-center justify-center overflow-hidden border border-ink/15 ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #1A1614 0 1px, transparent 1px 10px)",
        }}
      />
      <div className="relative px-4 py-3 text-center">
        <p className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/70">
          Asset needed
        </p>
        <p className="mt-1.5 max-w-[24ch] font-body text-[13px] font-medium leading-snug text-ink">
          {label}
        </p>
        {contentRef && (
          <p className="mt-1 font-body text-[10px] uppercase tracking-wider text-ink/55">{contentRef}</p>
        )}
      </div>
    </div>
  );
}

/**
 * Copy the client has not supplied. Same principle: visible, never invented.
 */
export function CopyNeeded({ label, ref: contentRef, lines = 3 }: { label: string; ref?: string; lines?: number }) {
  return (
    <div className="border-l-[3px] border-red/60 bg-cream/40 px-4 py-3">
      <p className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-red-deep">
        Copy needed{contentRef ? ` · ${contentRef}` : ""}
      </p>
      <p className="mt-1 font-body text-sm font-medium text-ink">{label}</p>
      <div aria-hidden="true" className="mt-2.5 space-y-1.5">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-2 rounded-sm bg-hairline" style={{ width: `${92 - i * 13}%` }} />
        ))}
      </div>
    </div>
  );
}
