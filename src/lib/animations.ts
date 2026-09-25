import type { Variants } from "framer-motion"

// House easing - critically damped, no overshoot. Never bouncy springs.
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Reveal once, with 200px pre-roll so content is in before it scrolls into view.
export const VIEWPORT = { once: true, margin: "200px", amount: "some" } as const

// Literal hex for any colour that ANIMATES (framer-motion can't tween CSS vars).
// Revalue these to match your @theme accents in index.css.
export const HEX = {
  ink: "#1A1614",
  accent: "#A32E32",
  accent2: "#1F325B",
  snow: "#FFFAF0",
} as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.95, ease: EASE } },
}

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
})

export const charContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.026 } },
}
export const charReveal: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
}

// SVG path draw-in (stroke reveals along its length). Used for signature line motifs.
export const drawPath = (duration = 1, delay = 0): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration, ease: EASE, delay },
      opacity: { duration: 0.01, delay },
    },
  },
})

export const cardCascade: Variants = {
  hidden: { rotateX: 8, opacity: 0, scale: 0.97 },
  visible: { rotateX: 0, opacity: 1, scale: 1, transition: { duration: 0.85, ease: EASE } },
}
