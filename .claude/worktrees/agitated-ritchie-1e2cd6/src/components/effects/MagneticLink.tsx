import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

interface MagneticLinkProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  /** How strongly the element follows the cursor (px at edge). */
  strength?: number;
  /** Optional aria-label so it stays accessible if the visible text is decorative. */
  'aria-label'?: string;
}

/**
 * A link/button that subtly drifts toward the user's cursor inside a magnetic
 * field. Disabled for reduced-motion users — falls back to a plain element.
 */
export function MagneticLink({
  children,
  href,
  onClick,
  className = '',
  // Lowered from 18 → 6: stronger pulls were jumping tap targets near the
  // edge of dense layouts and causing mis-clicks on adjacent elements.
  strength = 6,
  'aria-label': ariaLabel,
}: MagneticLinkProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 300, damping: 20, mass: 0.4 });
  const y = useSpring(my, { stiffness: 300, damping: 20, mass: 0.4 });

  // Inner content drifts a bit less than the outer wrapper for depth.
  const innerX = useTransform(x, (v) => v * 0.6);
  const innerY = useTransform(y, (v) => v * 0.6);

  const handleMove = (e: React.PointerEvent) => {
    if (reduced) return;
    // Skip touch / pen — the magnet would compete with the user's tap.
    if (e.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    const max = Math.max(rect.width, rect.height) / 2;
    mx.set((relX / max) * strength);
    my.set((relY / max) * strength);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const Component = (href ? motion.a : motion.button) as typeof motion.a;
  const componentProps = href
    ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: href.startsWith('http') ? 'noopener noreferrer' : undefined }
    : { type: 'button' as const, onClick };

  return (
    <Component
      ref={ref as never}
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      aria-label={ariaLabel}
      {...componentProps}
    >
      <motion.span style={{ x: innerX, y: innerY }} className="inline-flex items-center justify-center gap-2">
        {children}
      </motion.span>
    </Component>
  );
}
