import { motion } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * Page transition matching Portfolio.html's pageIn / pageOut keyframes:
 *   in  — 700ms, ease-snappy: opacity 0→1, blur(10px→0), translateY(16px→0)
 *   out — 360ms, ease-soft:   opacity 1→0, blur(0→8px),  translateY(0→-12px)
 * No curtain layers — the design just fades the content directly.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
