import { useEffect } from 'react';
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from 'framer-motion';

/**
 * Pointer-parallax source for hero depth. Returns spring-smoothed x/y in
 * roughly [-1, 1] (fraction of the distance from viewport centre to edge).
 * Consumers scale to px per layer — a nearer layer uses a larger factor, so
 * layers separate in depth as the cursor moves.
 *
 * No-op — static zeros, no listener — under reduced motion or a coarse
 * (touch) pointer, so phones pay nothing and the entrance carries the
 * impression there instead.
 */
export function usePointerParallax(): {
  x: MotionValue<number>;
  y: MotionValue<number>;
} {
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 55, damping: 18, mass: 0.7 });
  const y = useSpring(rawY, { stiffness: 55, damping: 18, mass: 0.7 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced, rawX, rawY]);

  return { x, y };
}
