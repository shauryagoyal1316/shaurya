/**
 * Easing curve tokens — must match the values in index.css :root vars.
 * Used by Framer Motion (which expects cubic-bezier arrays) and GSAP timelines.
 */
export const EASE = {
  snappy: [0.16, 1, 0.3, 1] as const,   // confident, default for transitions
  smooth: [0.4, 0, 0.2, 1] as const,    // refined, ambient
  bounce: [0.34, 1.56, 0.64, 1] as const,
};

export const DURATION = {
  micro: 0.18,
  short: 0.28,
  base:  0.45,
  long:  0.7,
  hero:  1.1,
};

/**
 * Kept as 0 so SplitTextReveal fires on viewport intersection like the
 * design does — the curtain that this used to wait for is gone.
 */
export const PAGE_TRANSITION_REVEAL_DELAY = 0;

/** Hook-friendly check for users who prefer reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Detect if the user's primary input is fine (mouse/trackpad). */
export function hasFinePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}
