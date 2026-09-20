/**
 * Interim CLÉ Family Media lockup.
 *
 * The brand kit contains no vector company mark, only a 3D felted render and a
 * rendered monogram, neither of which survives a favicon or a mono footer
 * lockup. This is a typographic stand-in built from the brand's own display
 * face and palette so the site reads as finished. It is designed to be
 * replaced by a proper mark, not to pre-empt one. See QUESTIONS.md #21.
 */

export function Mark({ size = 34, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-[28%] ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: "linear-gradient(145deg, #B8383C 0%, #A32E32 52%, #8E2428 100%)",
        boxShadow: "0 6px 16px -8px rgba(163,46,50,0.75), inset 0 1px 0 rgba(255,255,255,0.28)",
      }}
    >
      <span
        className="font-display leading-none text-white"
        style={{ fontSize: size * 0.52, transform: "translateY(2%)" }}
      >
        C
      </span>
    </span>
  );
}

export function Wordmark({ className = "", markSize = 32 }: { className?: string; markSize?: number }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark size={markSize} />
      <span className="font-display leading-none text-ink" style={{ fontSize: markSize * 0.56 }}>
        CLÉ<span className="text-muted"> Family Media</span>
      </span>
    </span>
  );
}
