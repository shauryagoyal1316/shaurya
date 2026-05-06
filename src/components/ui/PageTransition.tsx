import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { EASE } from '@/lib/motion';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Layered curtain page transition. Two thin slabs sweep off-screen as the
 * new route mounts (one accent, one foreground, slightly delayed) while the
 * content cross-fades up with a blur falloff. The slabs use scaleX from a
 * fixed origin so transforms stay GPU-cheap and the layers never intercept
 * clicks. The exit phase fades content gracefully so the curtain on the
 * incoming page reads as the visual "cut".
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {/* Curtain layer 1 — primary accent slab sweeps off to the right */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80] origin-right bg-primary"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.65, ease: EASE.snappy }}
      />
      {/* Curtain layer 2 — foreground slab follows, slightly delayed for depth */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[79] origin-right bg-foreground"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.7, ease: EASE.snappy, delay: 0.08 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
        transition={{ duration: 0.6, ease: EASE.snappy, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
}
