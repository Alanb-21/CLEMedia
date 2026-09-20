import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Stagger within a group, in milliseconds. Keep it small. */
  delay?: number;
  /** Direction of the short travel. "none" fades only. */
  from?: "up" | "left" | "right" | "none";
  as?: ElementType;
  className?: string;
}

/**
 * A short, one-shot reveal as an element enters the viewport.
 *
 * Three rules this follows deliberately:
 *  - Anyone who has asked for reduced motion gets the content immediately,
 *    with no transition at all.
 *  - It reveals once and then disconnects. Nothing re-animates on scroll back,
 *    which is the thing that makes a site feel fidgety rather than alive.
 *  - The travel is 14px and the fade is 560ms. Enough to register, not enough
 *    to make anyone wait for the page.
 */
export function Reveal({ children, delay = 0, from = "up", as: Tag = "div", className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const offset = { up: "translateY(14px)", left: "translateX(-14px)", right: "translateX(14px)", none: "none" }[from];

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : offset,
        transition: `opacity var(--dur-slow, 560ms) var(--ease-house) ${delay}ms, transform var(--dur-slow, 560ms) var(--ease-house) ${delay}ms`,
        willChange: shown ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}

/** Reveals children in sequence. Stagger stays tight so a row of three does
 *  not turn into a queue the reader has to wait through. */
export function RevealGroup({
  children,
  step = 70,
  from = "up",
  as: Tag = "div",
  className = "",
  childAs = "div",
}: {
  children: ReactNode[];
  step?: number;
  from?: Props["from"];
  as?: ElementType;
  className?: string;
  childAs?: ElementType;
}) {
  return (
    <Tag className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * step} from={from} as={childAs}>
          {child}
        </Reveal>
      ))}
    </Tag>
  );
}
