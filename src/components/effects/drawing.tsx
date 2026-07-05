import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '@/lib/motion';

/**
 * The Working Drawing language — annotations, stamps, rules, and dimension
 * marks that make every page read as an engineer's drawing of itself.
 */

/** Red-pencil ellipse drawn around a word when it scrolls into view. */
export function Annotate({
  children,
  note,
  className = '',
}: {
  children: ReactNode;
  /** Optional hand-written margin note, hidden on small screens. */
  note?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={`relative inline-block whitespace-nowrap ${className}`}>
      {children}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-x-[7%] -inset-y-[14%] h-[128%] w-[114%] -rotate-2"
      >
        <motion.ellipse
          cx="50"
          cy="50"
          rx="47"
          ry="42"
          fill="none"
          stroke="var(--water)"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 0.9 : 0 }}
          whileInView={{ pathLength: 1, opacity: 0.9 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE.smooth }}
        />
      </svg>
      {note && (
        <motion.span
          aria-hidden
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.6, delay: 1.1, ease: EASE.snappy }}
          className="font-note redline absolute -right-4 -top-9 hidden translate-x-full whitespace-nowrap text-base leading-none md:block"
        >
          ↖ {note}
        </motion.span>
      )}
    </span>
  );
}

/** Rubber stamp that slaps down on scroll. */
export function Stamp({
  text,
  ink = 'red',
  rotate = -7,
  delay = 0,
  className = '',
}: {
  text: string;
  ink?: 'red' | 'blue';
  rotate?: number;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const color = ink === 'red' ? 'var(--water)' : 'var(--primary)';
  return (
    <motion.span
      // Rest at scale 1 and only pass through 1.6 via keyframes once in
      // view: an off-screen stamp parked at scale 1.6 bloats its transform
      // bounds, and near a page edge that widens the mobile layout
      // viewport (Safari zooms the whole page out).
      initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 1 }}
      whileInView={
        reduced ? { opacity: 1 } : { opacity: [0, 0.92], scale: [1.6, 1] }
      }
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={
        reduced
          ? { duration: 0 }
          : { type: 'spring', stiffness: 380, damping: 16, delay }
      }
      style={{
        rotate,
        color,
        borderColor: color,
        boxShadow: `inset 0 0 0 1.5px ${color}`,
      }}
      className={`inline-block select-none border-[2.5px] px-3 py-1.5 font-display text-[13px] tracking-[0.14em] ${className}`}
    >
      {text}
    </motion.span>
  );
}

/** A rule that draws itself, left to right. */
export function DrawnRule({
  className = '',
  delay = 0,
  strong = false,
}: {
  className?: string;
  delay?: number;
  strong?: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, delay, ease: EASE.snappy }}
      className={`h-px origin-left ${className}`}
      style={{
        backgroundColor: strong ? 'var(--border-strong)' : 'var(--border)',
      }}
    />
  );
}

/** Dimension mark: |←—— LABEL ——→| under a measured element. */
export function DimensionLine({
  label,
  className = '',
}: {
  label: string;
  className?: string;
}) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, delay: 0.5, ease: EASE.smooth }}
      className={`flex w-full items-center gap-2 text-[color:var(--text-tertiary)] ${className}`}
    >
      <span className="h-3 w-px shrink-0 bg-[var(--border-strong)]" />
      <span className="-ml-1 shrink-0 font-mono text-[10px]">◀</span>
      <span className="h-px flex-1 bg-[var(--border-strong)]" />
      <span className="shrink-0 whitespace-nowrap font-mono text-[11px] tracking-[0.04em]">
        {label}
      </span>
      <span className="h-px flex-1 bg-[var(--border-strong)]" />
      <span className="-mr-1 shrink-0 font-mono text-[10px]">▶</span>
      <span className="h-3 w-px shrink-0 bg-[var(--border-strong)]" />
    </motion.div>
  );
}

/** Small hand-written aside — the only section marker this site uses. */
export function HandNote({
  children,
  className = '',
  rotate = -2,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: EASE.snappy }}
      style={{ rotate }}
      className={`font-note redline inline-block text-lg leading-snug ${className}`}
    >
      {children}
    </motion.div>
  );
}
