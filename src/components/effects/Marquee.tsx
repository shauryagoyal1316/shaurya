import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MarqueeProps {
  children: ReactNode;
  /** Duration of one full loop in seconds. Lower = faster. */
  duration?: number;
  /** Reverse direction. */
  reverse?: boolean;
  className?: string;
}

/**
 * Infinite horizontal marquee. Duplicates its children once and translates
 * the inner track by -50% to create a seamless loop. CSS-driven so it
 * survives even when the tab is throttled.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className = '',
}: MarqueeProps) {
  const reduced = useReducedMotion();

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max gap-12 will-change-transform"
        animate={
          reduced
            ? undefined
            : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }
        }
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
        }}
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
