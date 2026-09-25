import { useEffect, useState, type ReactNode } from "react";
import { ReactLenis } from "lenis/react";

/**
 * Momentum-smoothed scrolling.
 *
 * Driving the five reference sites headless found this on three of them, and
 * it was the single thing separating them from a well-built ordinary page:
 * award sites do not use native scroll. Nothing else reads as expensive until
 * this is in place.
 *
 * Two non-negotiables:
 *
 * 1. It must yield to scroll it did not originate. Keyboard PageDown, Home,
 *    End, anchor links and scrollbar drags all have to work, or this is an
 *    accessibility failure rather than a rough edge. Lenis handles wheel and
 *    touch and leaves the rest to the platform, which is why the library is
 *    used here instead of a hand-rolled rAF loop.
 * 2. It switches off entirely under prefers-reduced-motion. A smoothed scroll
 *    is vestibular motion the visitor did not ask for.
 *
 * `duration` is deliberately short. This brand argues that children's media is
 * too slow to respond and too eager to hold attention, so the scroll should
 * feel weighted, not floaty.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        duration: 0.9,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        // Touch devices already have momentum from the platform, and doubling
        // it reads as lag on a phone.
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
