import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { hasFinePointer, prefersReducedMotion } from '@/lib/motion';

/**
 * Custom magnetic cursor — a small dot plus a larger trailing ring that
 * grows when hovering interactive elements. Hides on touch devices and
 * when the user prefers reduced motion.
 *
 * Drives interactive growth by listening for `pointerover/out` on elements
 * matching `[data-cursor]` or `a, button` selectors.
 */
export function MagneticCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<'default' | 'hover' | 'view'>('default');

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Spring the ring; the inner dot tracks 1:1 for snappiness.
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;

    setEnabled(true);
    document.body.dataset.cursor = 'custom';

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const cursorAttr = t.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr === 'view') {
        setVariant('view');
        return;
      }
      if (t.closest('a, button, [role="button"], input, textarea, select, [data-cursor="hover"]')) {
        setVariant('hover');
      }
    };

    const onOut = () => setVariant('default');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerout', onOut, { passive: true });

    return () => {
      delete document.body.dataset.cursor;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerout', onOut);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = variant === 'view' ? 96 : variant === 'hover' ? 56 : 28;

  return (
    <>
      {/* Inner dot — 1:1 with pointer */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        style={{ x, y }}
      >
        <div
          className="rounded-full bg-white"
          style={{
            width: 6,
            height: 6,
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>

      {/* Trailing ring — springs to the pointer */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="rounded-full border border-white/80"
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: variant === 'view' ? 1 : 0.7,
          }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          {variant === 'view' && (
            <span className="flex h-full w-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-white">
              View
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
