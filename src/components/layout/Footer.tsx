import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/profile';

/** Live local-time readout — a small editorial signal that someone is here. */
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
 * Editorial footer reskinned to match Portfolio.html:
 *  - Oversized "Shaurya Goyal." glyph as the visual anchor
 *  - Two-column row underneath: contact CTA on the left, "Elsewhere" + status
 *    on the right
 *  - Hairline rules separating the glyph and the meta strip
 *  - Repeats the primary nav so a user at the bottom of a long page can move
 *    sideways without scrolling back up (hidden on mobile — the hamburger
 *    menu in the header already covers that, and a bottom nav just adds
 *    scroll depth on small screens).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[2] border-t border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-24 lg:px-10 lg:pt-32">
        {/* Big name */}
        <div className="mb-12 select-none">
          <h2 className="font-display text-[clamp(80px,18vw,320px)] leading-[0.85] tracking-[-0.03em] text-foreground">
            Shaurya
            <span className="italic text-foreground/40"> Goyal.</span>
          </h2>
        </div>

        <div className="h-px w-full bg-border" />

        {/* Contact + Elsewhere row */}
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
              <span className="text-primary">/</span> Get in touch
            </div>
            <div className="mb-7 font-display text-[clamp(28px,4vw,44px)] leading-[1.1] text-foreground">
              Have a website that needs{' '}
              <span className="italic text-foreground/60">
                building or rethinking?
              </span>
            </div>
            <a
              href="mailto:seekshaurya@gmail.com"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 rounded-full border border-border px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Contact
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="flex flex-col gap-7">
            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50">
                Elsewhere
              </div>
              <ul className="flex flex-col gap-2.5 font-mono text-[13px]">
                <li>
                  <a
                    href="https://github.com/shauryagoyal1316"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    GitHub →
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50">
                Status
              </div>
              <div className="inline-flex items-center gap-2.5 font-mono text-[12px] text-foreground">
                <span
                  aria-hidden
                  className="size-[7px] rounded-full bg-primary"
                  style={{
                    boxShadow:
                      '0 0 0 4px color-mix(in oklch, var(--primary) 18%, transparent)',
                  }}
                />
                {profile.availability}
              </div>
              <div className="mt-3 font-mono text-[12px] text-foreground/60">
                <span className="text-foreground/40">Local time — </span>
                <LocalTime />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright row */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50">
          <div>© {year} Shaurya Goyal</div>
          <div>Built with care · {profile.location}</div>
        </div>
      </div>
    </footer>
  );
}
