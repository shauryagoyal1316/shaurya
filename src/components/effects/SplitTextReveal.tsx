import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';
import { EASE } from '@/lib/motion';

interface SplitTextRevealProps {
  text: string;
  /** Tag to render — defaults to span so it can sit inside any heading. */
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
  className?: string;
  /** Delay before the first letter animates in. */
  delay?: number;
  /** Time between each letter, in seconds. */
  stagger?: number;
  /** Animate when in view (true) or immediately on mount (false). */
  once?: boolean;
  /** Slot for trailing content (e.g. an icon) inside the same line box. */
  children?: ReactNode;
}

/**
 * Apple-grade type reveal: each character sits in an overflow-hidden mask
 * and rises from below the baseline with a spring-like easing. The mask is
 * what sells it — letters appear as if they were always there, just hidden
 * by the line above. Words stay whole so wrapping is natural.
 */
export function SplitTextReveal({
  text,
  as: Tag = 'span',
  className,
  delay = 0,
  stagger = 0.035,
  once = true,
  children,
}: SplitTextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(' ');

  if (reduced) {
    return <Tag className={className}>{text}{children}</Tag>;
  }

  let charIndex = 0;

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline">
        {words.map((word, wi) => (
          <span
            key={wi}
            className="inline-block whitespace-nowrap align-baseline"
            style={{ overflow: 'hidden', verticalAlign: 'top' }}
          >
            {word.split('').map((char, ci) => {
              const i = charIndex++;
              return (
                <motion.span
                  key={ci}
                  className="inline-block will-change-transform"
                  initial={{ y: '110%', opacity: 0, rotate: 4 }}
                  whileInView={once ? { y: 0, opacity: 1, rotate: 0 } : undefined}
                  animate={!once ? { y: 0, opacity: 1, rotate: 0 } : undefined}
                  viewport={once ? { once: true, margin: '-10% 0px' } : undefined}
                  transition={{
                    duration: 0.95,
                    ease: EASE.snappy,
                    delay: delay + i * stagger,
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
            {wi < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </span>
      {children}
    </Tag>
  );
}
