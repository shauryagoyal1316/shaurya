import { ReactNode, Children } from 'react';

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
 * Children are duplicated 4× so the loop reads seamless across viewports.
 */
export function Marquee({
  children,
  className = '',
  duration = 38,
  reverse = false,
}: MarqueeProps) {
  const items = Children.toArray(children);
  return (
    <div
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
