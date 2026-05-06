import { ReactNode, useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  wrap,
} from 'framer-motion';

interface MarqueeProps {
  children: ReactNode;
  /** Base velocity in pixels per second. */
  speed?: number;
  /** Reverse direction. */
  reverse?: boolean;
  className?: string;
  /**
   * Legacy prop kept for compatibility — interpreted as a duration to derive
   * a base speed if `speed` is not supplied.
   */
  duration?: number;
}

/**
 * Scroll-velocity-responsive marquee. Tracks scroll velocity through a
 * spring so quick scrolls accelerate the track and a stationary page
 * settles back to the base speed. The track wraps cleanly on a -50%
 * boundary; children are duplicated once for a seamless loop.
 */
export function Marquee({
  children,
  speed,
  reverse = false,
  className = '',
  duration,
}: MarqueeProps) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef<1 | -1>(reverse ? -1 : 1);

  // Derive a default base speed if only `duration` was supplied.
  const basePxPerSec = speed ?? (duration ? Math.max(40, 1600 / duration) : 50);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    [0, 1000],
    [0, 5],
    { clamp: false }
  );

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = direction.current * basePxPerSec * (delta / 1000);

    // Scroll-driven velocity boost — and direction flips when the user
    // scrolls fast enough in reverse, so the track reacts to the user.
    if (velocityFactor.get() < 0) {
      direction.current = reverse ? 1 : -1;
    } else if (velocityFactor.get() > 0) {
      direction.current = reverse ? -1 : 1;
    }
    moveBy += direction.current * moveBy * velocityFactor.get();

    // Scale into a percentage of total track width (children-duplicated).
    baseX.set(baseX.get() + moveBy * 0.05);
  });

  // Reset on mount so SSR + hydration agree.
  useEffect(() => {
    baseX.set(0);
  }, [baseX]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max gap-12 will-change-transform"
        style={reduced ? undefined : { x }}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-12">
          {children}
        </div>
      </motion.div>

      {/* Edge fade masks for polish */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
