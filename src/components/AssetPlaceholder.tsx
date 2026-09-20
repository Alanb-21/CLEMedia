interface Props {
  /** What belongs here, in plain words. Shown on the block. */
  label: string;
  /**
   * The CONTENT-NEEDED.md row this traces to.
   * Deliberately NOT named `ref`: React reserves that, and a string value is
   * treated as a legacy string ref, which throws and unmounts the tree.
   */
  source?: string;
  /** CSS aspect-ratio, for example "16/9". */
  ratio?: string;
  className?: string;
  tone?: "clay" | "cream";
  rounded?: string;
}

/**
 * A stand-in for photography that does not exist yet.
 *
 * Every image on this site has to be real. The brand kit contains no
 * photographs, and both stock imagery and generated imagery are ruled out, so
 * these blocks hold the layout until the client supplies the real thing.
 */
export function AssetPlaceholder({
  label,
  source,
  ratio = "16/9",
  className = "",
  tone = "clay",
  rounded = "rounded-[var(--radius-lg)]",
}: Props) {
  const wash = tone === "clay" ? "wash-clay" : "wash-cream";
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}. This image has not been supplied yet.`}
      style={{ aspectRatio: ratio }}
      className={`${wash} ${rounded} hairline-ring relative flex max-w-full items-center justify-center overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.10]"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, #1A1614 0 1px, transparent 1px 12px)" }}
      />
      <div className="relative mx-4 max-w-[26ch] rounded-[var(--radius-md)] bg-white/55 px-4 py-3 text-center backdrop-blur-sm">
        <p className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/70">
          Photography needed
        </p>
        <p className="mt-1.5 font-body text-[13px] font-medium leading-snug text-ink">{label}</p>
        {source && (
          <p className="mt-1 font-body text-[10px] uppercase tracking-wider text-ink/55">{source}</p>
        )}
      </div>
    </div>
  );
}
