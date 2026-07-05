import { useRef } from 'react';
import {
  type MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

interface ScrollScrubTextProps {
  text: string;
  className?: string;
}

/**
 * Scroll-linked word scrub: each word resolves from ghosted to solid as the
 * paragraph moves through the viewport, so the copy reads itself at the
 * reader's scroll pace. Reduced motion renders plain text.
 */
export function ScrollScrubText({ text, className }: ScrollScrubTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.4'],
  });
  const words = text.split(' ');

  if (reduced) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
          />
        ))}
      </span>
    </p>
  );
}

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <>
      <motion.span
        style={{ opacity, y }}
        className="inline-block will-change-transform"
      >
        {word}
      </motion.span>{' '}
    </>
  );
}
