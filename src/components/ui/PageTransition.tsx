import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';
import { EASE } from '@/lib/motion';

/**
 * Route transition: a primary-colored curtain wipes up to cover the outgoing
 * page, then peels away upward off the incoming one while the content rises
 * in underneath. Reduced motion falls back to the original plain fade.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE.smooth }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div initial="initial" animate="enter" exit="exit">
      <motion.div
        variants={{
          initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
          enter: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.65, delay: 0.25, ease: EASE.snappy },
          },
          exit: {
            opacity: 0,
            y: -14,
            filter: 'blur(6px)',
            transition: { duration: 0.32, ease: EASE.smooth },
          },
        }}
      >
        {children}
      </motion.div>

      {/* Curtain — covers on exit (rises from bottom), peels upward on enter. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9990] bg-primary"
        variants={{
          initial: { clipPath: 'inset(0 0 0 0)' },
          enter: {
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.6, delay: 0.05, ease: EASE.snappy },
          },
          exit: {
            clipPath: 'inset(0 0 0 0)',
            transition: { duration: 0.38, ease: EASE.smooth },
          },
        }}
        style={{ clipPath: 'inset(100% 0 0 0)' }}
      />
    </motion.div>
  );
}
