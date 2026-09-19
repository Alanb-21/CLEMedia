import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

/** Wrapper for the three client review directions. Noindex — these are not
 *  public pages, they exist for the direction decision. */
export function PreviewChrome({ letter, name, note, children }: { letter: string; name: string; note: string; children: ReactNode }) {
  return (
    <>
      <Helmet>
        <title>{`Direction ${letter}: ${name} · CLÉ`}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="sticky top-0 z-50 flex flex-wrap items-center gap-x-4 gap-y-1 bg-ink px-4 py-2 font-body text-[12.5px] text-[#F6EFE7]">
        <strong className="font-semibold">Direction {letter} — {name}</strong>
        <span className="text-[#F6EFE7]/65">{note}</span>
        <nav aria-label="Other directions" className="ml-auto flex gap-3">
          {["a", "b", "c"].map((l) => (
            <Link
              key={l}
              to={`/preview/${l}`}
              className={`uppercase ${l === letter.toLowerCase() ? "font-semibold text-[#F6EFE7]" : "text-[#F6EFE7]/60 hover:text-[#F6EFE7]"}`}
            >
              {l}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </>
  );
}
