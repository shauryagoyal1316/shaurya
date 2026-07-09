import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * Scroll-linked lateral drift: the block slides the last few pixels into
 * register while it crosses the lower viewport, like a sheet being squared
 * up on the drafting table. Keep the distance small — it should read as
 * paper being nudged, not parallax. Use only below the fold, since the
 * offset is visible until the element has scrolled through its range.
 */
export function ScrollDrift({
  children,
  from = -48,
  className,
}: {
  children: ReactNode;
  /** Horizontal start offset in px; negative slides in from the left. */
  from?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.35'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [from, 0]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ x }} className={className}>
      {children}
    </motion.div>
  );
}
