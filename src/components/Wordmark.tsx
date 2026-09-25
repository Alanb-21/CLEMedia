/**
 * Interim CLÉ Family Media lockup.
 *
 * The brand kit contains no vector company mark: only a 3D felted render and a
 * rendered monogram, neither of which survives a favicon or a small footer
 * lockup. This is a typographic stand-in built from the two faces the brand
 * already uses, set the way the show site sets them: the name in Calistoga,
 * the descriptor in the widely tracked uppercase micro-voice.
 *
 * It is deliberately not a monogram in a coloured tile. That shape reads as a
 * placeholder logo on every site that has ever used it, and inventing a mark
 * would pre-empt the real one. See QUESTIONS.md #21.
 */

export function Wordmark({
  className = "",
  size = 21,
  /** Fills the name with the wool metallic. The brand's lettering is
   *  needle-felted, so its wordmark carries the sheen wool has under a light
   *  rather than sitting as flat ink. */
  wool = false,
}: {
  className?: string;
  size?: number;
  wool?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-baseline gap-[0.5em] font-display leading-none ${className}`}
      style={{ fontSize: size, letterSpacing: "-0.015em" }}
    >
      <span className={wool ? "wool-fill wool-animate" : undefined}>CLÉ</span>
      <span
        className="font-body font-bold uppercase opacity-70"
        style={{ fontSize: size * 0.42, letterSpacing: "0.3em" }}
      >
        Family Media
      </span>
    </span>
  );
}
