import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { NAV, SITE } from "@/lib/site";
import { Mark, Wordmark } from "@/components/Wordmark";
import { IconExternal, IconMail } from "@/components/icons";

function ShowSiteLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={SITE.showUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 ${className}`}
    >
      Visit the show site
      <IconExternal size={13} />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="glass-bar sticky top-0 z-50 border-b border-white/60">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3.5">
        <Link to="/" className="shrink-0" aria-label={`${SITE.name}, home`}>
          <Wordmark markSize={32} />
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

        <ShowSiteLink className="glass hidden shrink-0 rounded-[var(--radius-pill)] px-4 py-2 font-body text-[13px] font-medium text-ink transition-all hover:bg-white/95 lg:inline-flex" />

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="glass ml-auto flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] lg:hidden"
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
        <nav id="mobile-nav" aria-label="Main" className="glass-bar border-t border-white/60 lg:hidden">
          <ul className="mx-auto max-w-6xl px-5 py-2">
            {NAV.map((item) => (
              <li key={item.to} className="border-b border-white/60 last:border-0">
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
    <footer className="wash-cream mt-24 border-t border-white/60">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Mark size={36} />
            <p className="mt-3 font-display text-[19px] text-ink">CLÉ Family Media</p>
            <p className="mt-2.5 max-w-[28ch] font-body text-[14px] text-muted">
              Calm, purposeful edutainment for young children, built on research and made by people.
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
              Episodes, characters and activities all live over on the show site.
            </p>
            <ShowSiteLink className="mt-3 font-body text-[14px] font-semibold text-red-deep underline underline-offset-4" />
          </div>

          <div>
            <h2 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Contact</h2>
            <p className="mt-3 max-w-[28ch] font-body text-[14px] text-body">
              Partnership, distribution and press enquiries all reach us directly.
            </p>
            <Link to="/contact" className="mt-2.5 inline-flex items-center gap-1.5 font-body text-[14px] font-semibold text-red-deep underline underline-offset-4">
              <IconMail size={15} />
              Partnership enquiries
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-pill)] focus:bg-ink focus:px-5 focus:py-2.5 focus:font-body focus:text-sm focus:text-paper"
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
