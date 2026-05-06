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
 * Splits a string into words and letters and animates each letter in with
 * a small Y offset + opacity fade, staggered to feel like type reveal.
 *
 * Words are kept whole (no inter-word breaks mid-letter) and the layout
 * preserves whitespace so wrapping behaves naturally.
 */
export function SplitTextReveal({
  text,
  as: Tag = 'span',
  className,
  delay = 0,
  stagger = 0.04,
  once = true,
  children,
}: SplitTextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(' ');

  if (reduced) {
    return <Tag className={className}>{text}{children}</Tag>;
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline">
        {words.map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.split('').map((char, ci) => (
              <motion.span
                key={ci}
                className="inline-block"
                initial={{ y: '0.6em', opacity: 0 }}
                whileInView={once ? { y: 0, opacity: 1 } : undefined}
                animate={!once ? { y: 0, opacity: 1 } : undefined}
                viewport={once ? { once: true, margin: '-10% 0px' } : undefined}
                transition={{
                  duration: 0.7,
                  ease: EASE.snappy,
                  delay: delay + (wi * 4 + ci) * stagger,
                }}
              >
                {char}
              </motion.span>
            ))}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </span>
      {children}
    </Tag>
  );
}
