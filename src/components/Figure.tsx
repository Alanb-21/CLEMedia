import { ASSETS, type AssetKey } from "@/lib/brand";
import { AssetPlaceholder } from "@/components/AssetPlaceholder";

interface Props {
  asset: AssetKey;
  className?: string;
  rounded?: string;
  tone?: "clay" | "cream";
  /** Override the ratio used by the placeholder. Real images use their own. */
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  /** Stretch to the host column and crop, for a full-bleed band. */
  fill?: boolean;
  /** Where the crop favours, for a band that must keep its subject. */
  position?: string;
}

/**
 * Renders a real brand image when one has been supplied, and a labelled
 * placeholder when it has not.
 *
 * Serving order is AVIF, then WebP, then the original. Width and height are
 * always set so nothing shifts as images load, and everything below the fold
 * is lazy.
 */
export function Figure({
  asset,
  className = "",
  rounded = "rounded-[var(--radius-lg)]",
  tone = "clay",
  ratio,
  priority = false,
  fill = false,
  position,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: Props) {
  const a = ASSETS[asset];

  if (!a.base) {
    return (
      <AssetPlaceholder
        label={a.label}
        source="Photography"
        ratio={fill ? undefined : (ratio ?? `${a.width}/${a.height}`)}
        tone={tone}
        rounded={rounded}
        className={`${fill ? "h-full w-full" : ""} ${className}`}
      />
    );
  }

  const ext = a.fallback ?? "jpg";
  return (
    <picture className={fill ? "block h-full w-full" : undefined}>
      {!a.noAvif && (
        <source
          type="image/avif"
          srcSet={`${a.base}.avif 1x, ${a.base}@2x.avif 2x`}
          sizes={sizes}
        />
      )}
      <source
        type="image/webp"
        srcSet={`${a.base}.webp 1x, ${a.base}@2x.webp 2x`}
        sizes={sizes}
      />
      <img
        src={`${a.base}.${ext}`}
        srcSet={`${a.base}.${ext} 1x, ${a.base}@2x.${ext} 2x`}
        sizes={sizes}
        alt={a.alt}
        width={a.width}
        height={a.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        style={position ? { objectPosition: position } : undefined}
        className={`${fill ? "h-full w-full" : "h-auto w-full"} object-cover ${rounded} ${className}`}
      />
    </picture>
  );
}
