import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  max?: number;
  /** Inner counter-shift in pixels for parallax depth. */
  parallax?: number;
}

/**
 * 3D tilt + inner-image parallax driven by cursor position. Children
 * receive a CSS variable `--tilt-inner-x/y` they can opt into via the
 * `data-tilt-inner` attribute (set by consumers on the image element).
 */
export function TiltCard({
  children,
  className = '',
  max = 6,
  parallax = 12,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);   // -1..1
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 200, damping: 22, mass: 0.5 });

  const rotateY = useTransform(sx, (v) => v * max);
  const rotateX = useTransform(sy, (v) => -v * max);
  const innerX = useTransform(sx, (v) => v * parallax);
  const innerY = useTransform(sy, (v) => v * parallax);

  const handleMove = (e: React.PointerEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1200,
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ x: innerX, y: innerY }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
