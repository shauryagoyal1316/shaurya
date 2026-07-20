import { ReactNode, Children, useEffect, useRef, useState } from 'react';

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Seconds per loop — lower is faster. */
  duration?: number;
  reverse?: boolean;
}

/**
 * Plain CSS marquee:
 *   - `animation: marquee <duration>s linear infinite` (-50% wrap)
 *   - hover pauses the track
 *   - edge mask fades both sides
 *   - the track pauses entirely while off-screen, so an endless
 *     animation never competes for frames with the visible page
 * Children are duplicated 4× so the loop reads seamless across viewports.
 */
export function Marquee({
  children,
  className = '',
  duration = 38,
  reverse = false,
}: MarqueeProps) {
  const items = Children.toArray(children);
  const rootRef = useRef<HTMLDivElement>(null);
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { rootMargin: '120px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`relative flex w-full overflow-hidden ${className}`}
      style={{
        maskImage:
          'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <div
        className="flex animate-marquee will-change-transform"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : undefined,
          animationPlayState: offscreen ? 'paused' : undefined,
        }}
      >
        {[...items, ...items, ...items, ...items].map((c, i) => (
          <div
            key={i}
            className="inline-flex shrink-0 items-center whitespace-nowrap"
            style={{ marginRight: 72 }}
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}
