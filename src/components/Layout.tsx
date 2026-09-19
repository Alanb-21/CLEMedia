import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { NAV, SITE } from "@/lib/site";

function ShowSiteLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={SITE.showUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 ${className}`}
    >
      Visit the show site
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M3 9L9 3M9 3H4.5M9 3v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3.5">
        <Link to="/" className="shrink-0" aria-label={`${SITE.name} — home`}>
          {/* No vector CLÉ mark exists in the brand kit. QUESTIONS.md #21. */}
          <span className="font-display text-[19px] leading-none text-ink">
            CLÉ<span className="text-muted"> Family Media</span>
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-6">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `font-body text-[14px] transition-colors hover:text-ink ${
                      isActive ? "text-red-deep" : "text-muted"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <ShowSiteLink className="hidden shrink-0 border border-hairline px-3 py-1.5 font-body text-[13px] text-body transition-colors hover:border-clay hover:text-ink lg:inline-flex" />

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="ml-auto flex h-10 w-10 items-center justify-center border border-hairline lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            {open ? (
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-hairline bg-paper lg:hidden">
          <ul className="mx-auto max-w-6xl px-5 py-2">
            {NAV.map((item) => (
              <li key={item.to} className="border-b border-hairline/60 last:border-0">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block py-3 font-body text-[15px] ${isActive ? "text-red-deep" : "text-body"}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="py-3">
              <ShowSiteLink className="font-body text-[15px] text-ink underline underline-offset-4" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-hairline bg-cream/50">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-[19px] text-ink">CLÉ Family Media</p>
            <p className="mt-2.5 max-w-[28ch] font-body text-[14px] text-muted">
              Edutainment for young children, built on research and made by people.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Company</h2>
            <ul className="mt-3 space-y-2">
              {NAV.map((i) => (
                <li key={i.to}>
                  <Link to={i.to} className="font-body text-[14px] text-body hover:text-ink">{i.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">The show</h2>
            <p className="mt-3 max-w-[30ch] font-body text-[14px] text-body">
              Episodes, characters and activities live on the show site.
            </p>
            <ShowSiteLink className="mt-2.5 font-body text-[14px] font-medium text-red-deep underline underline-offset-4" />
          </div>

          <div>
            <h2 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Contact</h2>
            {/* Company registration details, address, email and social handles
                have not been supplied. CONTENT-NEEDED.md. */}
            <p className="mt-3 font-body text-[13px] text-muted">
              Company details, registered address and social links to be supplied.
            </p>
            <Link to="/contact" className="mt-2.5 inline-block font-body text-[14px] font-medium text-red-deep underline underline-offset-4">
              Partnership enquiries
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-[12.5px] text-muted">
            © {new Date().getFullYear()} CLÉ Family Media. The Pawsitive Pugs &amp; Pals® and PupsPlayer™ are trade marks of CLÉ Family Media.
          </p>
          <ul className="flex gap-5">
            <li><Link to="/privacy" className="font-body text-[12.5px] text-muted hover:text-ink">Privacy</Link></li>
            <li><Link to="/terms" className="font-body text-[12.5px] text-muted hover:text-ink">Terms</Link></li>
            <li><Link to="/cookies" className="font-body text-[12.5px] text-muted hover:text-ink">Cookies</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export function Layout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
