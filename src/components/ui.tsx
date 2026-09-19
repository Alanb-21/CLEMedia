import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  tone = "paper",
  as: Tag = "section",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "cream" | "clay";
  as?: "section" | "div";
  labelledBy?: string;
}) {
  // Clay takes --ink only; see the pairing rules in DESIGN-TOKENS.md.
  const tones = {
    paper: "bg-paper text-body",
    cream: "bg-cream text-body",
    clay: "bg-clay text-ink",
  } as const;
  return (
    <Tag aria-labelledby={labelledBy} className={`${tones[tone]} py-16 sm:py-20 lg:py-24 ${className}`}>
      {children}
    </Tag>
  );
}

export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-red-deep ${className}`}>
      {children}
    </p>
  );
}

export function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`max-w-[58ch] font-body text-[length:var(--text-lead)] leading-relaxed text-body ${className}`}>
      {children}
    </p>
  );
}

export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[65ch] space-y-5 font-body text-body ${className}`}>{children}</div>;
}

type ButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

/** Primary is red with white text — 7.01:1, the verified button pattern. */
export function Button({ children, to, href, variant = "primary", type = "button", onClick, disabled, className = "" }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 font-body text-[14.5px] font-semibold transition-colors disabled:opacity-60";
  const styles = {
    primary: "bg-red text-paper hover:bg-red-deep",
    secondary: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  } as const;
  const cls = `${base} ${styles[variant]} ${className}`;

  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

export function SectionHeading({
  kicker,
  title,
  lead,
  id,
  className = "",
}: {
  kicker?: string;
  title: string;
  lead?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-[46ch] ${className}`}>
      {kicker && <Kicker className="mb-3">{kicker}</Kicker>}
      <h2 id={id} className="text-[length:var(--text-h2)]">{title}</h2>
      {lead && <Lead className="mt-4">{lead}</Lead>}
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-dashed border-hairline bg-cream/30 px-6 py-12 text-center">
      <p className="font-display text-[length:var(--text-h3)] text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-[42ch] font-body text-[14.5px] text-muted">{body}</p>
    </div>
  );
}
