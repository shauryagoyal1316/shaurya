import { useEffect, useState } from 'react';
import { profile } from '@/data/profile';

/** Live local-time readout — a small signal that someone is at the desk. */
function LocalTime() {
  const [now, setNow] = useState(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  useEffect(() => {
    const t = setInterval(
      () =>
        setNow(
          new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        ),
      30_000
    );
    return () => clearInterval(t);
  }, []);
  return <span className="tabular-nums">{now}</span>;
}

/**
 * Footer: the name, one way to reach me, and the time at my desk.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="paper relative z-[2] border-t border-[var(--border-strong)]">
      <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-20 lg:px-10 lg:pt-24">
        <h2 className="font-display text-[clamp(56px,13vw,220px)] leading-[0.82] text-foreground">
          Goyal<span className="text-[color:var(--water)]">.</span>
        </h2>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-10">
          <div>
            <p className="max-w-md text-lg leading-relaxed text-[color:var(--text-secondary)]">
              Have a business that deserves a better website? Tell me about it.
            </p>
            <a
              href="mailto:seekshaurya@gmail.com"
              data-cursor="view"
              data-cursor-label="Email"
              className="mt-4 inline-block text-xl font-medium text-foreground underline decoration-[var(--water)] decoration-wavy decoration-2 underline-offset-8 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background md:text-2xl"
            >
              seekshaurya@gmail.com
            </a>
          </div>

          <div className="flex flex-col items-start gap-1.5 text-sm text-foreground/60 md:items-end">
            <a
              href="https://github.com/shauryagoyal1316"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="text-foreground/70 transition-colors hover:text-primary"
            >
              GitHub ↗
            </a>
            <span>{profile.availability}</span>
            <span>
              At the desk it's <LocalTime />
            </span>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-strong)] pt-4 text-[13px] text-foreground/50">
          <div>© {year} Shaurya Goyal</div>
          <div>{profile.location}</div>
        </div>
      </div>
    </footer>
  );
}
