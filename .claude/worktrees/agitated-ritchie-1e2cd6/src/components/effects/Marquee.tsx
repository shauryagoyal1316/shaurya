import { ReactNode, Children } from 'react';

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Kept for compatibility with old call sites; ignored otherwise. */
  speed?: number;
  reverse?: boolean;
  duration?: number;
}

/**
 * Plain CSS marquee matching Portfolio.html exactly:
 *   - `animation: marquee 38s linear infinite` (-50% wrap)
 *   - hover pauses the track
 *   - edge mask fades both sides
 * Children are duplicated 4× so the loop reads seamless across viewports.
 */
export function Marquee({ children, className = '' }: MarqueeProps) {
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
        className="flex animate-marquee will-change-transform [&:hover]:[animation-play-state:paused]"
        style={{ animationDuration: '38s' }}
      >
        {[...items, ...items, ...items, ...items].map((c, i) => (
          <div
            key={i}
            className="inline-flex shrink-0 items-center"
            style={{ gap: 56, marginRight: 56 }}
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}
