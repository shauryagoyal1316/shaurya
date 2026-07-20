import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks/useMediaQuery';

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
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.35'],
  });
  // A 48-56px shift reads as a nudge on desktop but as misalignment on a
  // 390px screen — and a rightward offset pushes content past the viewport
  // edge, which mobile browsers answer by widening the layout viewport.
  const dist = isMobile ? Math.sign(from) * Math.min(20, Math.abs(from)) : from;
  const x = useTransform(scrollYProgress, [0, 1], [dist, 0]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ x }} className={`relative ${className ?? ''}`}>
      {children}
    </motion.div>
  );
}
