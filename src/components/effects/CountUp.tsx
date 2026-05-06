import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, animate } from 'framer-motion';

interface CountUpProps {
  to: number;
  /** Duration in seconds. */
  duration?: number;
  /** Optional suffix, eg. '+', '%'. */
  suffix?: string;
  /** Optional prefix. */
  prefix?: string;
  className?: string;
}

/** Number that ramps from 0 to `to` once the element enters the viewport. */
export function CountUp({
  to,
  duration = 1.6,
  suffix = '',
  prefix = '',
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const value = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, to, duration, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
