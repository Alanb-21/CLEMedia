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
  tone?: "paper" | "cream" | "clay" | "pups";
  as?: "section" | "div";
  labelledBy?: string;
}) {
  // Clay takes --ink only. See the pairing rules in DESIGN-TOKENS.md.
  const tones = {
    paper: "text-body",
    cream: "wash-cream text-body",
    clay: "wash-clay text-ink",
    pups: "wash-pups text-ink",
  } as const;
  return (
    <Tag aria-labelledby={labelledBy} className={`${tones[tone]} py-16 sm:py-20 lg:py-24 ${className}`}>
      {children}
    </Tag>
  );
}

/** A rounded, glassy panel. The default surface for grouped content. */
export function Panel({
  children,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "warm";
}) {
  return (
    <div className={`${tone === "warm" ? "glass-warm" : "glass"} rounded-[var(--radius-lg)] ${className}`}>
      {children}
    </div>
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

type ButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

/** Primary is red with white text at 7.01:1, the verified button pattern. */
export function Button({
  children,
  to,
  href,
  variant = "primary",
  type = "button",
  onClick,
  disabled,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-6 py-3 font-body text-[14.5px] font-semibold transition-all duration-200 disabled:opacity-60";
  const styles = {
    primary:
      "bg-red text-paper shadow-[0_10px_24px_-12px_rgba(163,46,50,0.75)] hover:bg-red-deep hover:shadow-[0_14px_30px_-12px_rgba(163,46,50,0.8)]",
    secondary:
      "glass text-ink hover:bg-white/90",
    ghost: "text-ink hover:bg-white/60",
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
    <Panel tone="warm" className="px-6 py-12 text-center">
      <p className="font-display text-[length:var(--text-h3)] text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-[44ch] font-body text-[14.5px] text-muted">{body}</p>
    </Panel>
  );
}
