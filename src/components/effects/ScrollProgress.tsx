import { motion, useScroll } from 'framer-motion';

/**
 * Top 2px accent rail that fills as the user scrolls. Uses raw scroll
 * progress (no spring) to match Portfolio.html's `scaleX(${p})`.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-primary"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
