import { profile } from '@/data/profile';

/**
 * Editorial footer: oversized name as the visual anchor, mono metadata
 * row underneath. No contact form — by design.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[2] border-t border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-24 lg:px-10 lg:pt-32">
        {/* Big name */}
        <div className="mb-16 select-none">
          <h2 className="font-display text-[20vw] leading-[0.85] tracking-tight text-foreground/95 sm:text-[16vw] md:text-[14vw] lg:text-[12vw]">
            <span className="block">Shaurya</span>
            <span className="block italic text-foreground/60">Goyal.</span>
          </h2>
        </div>

        {/* Metadata row */}
        <div className="grid gap-8 border-t border-border pt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/60 md:grid-cols-4">
          <div>
            <div className="mb-2 text-foreground/40">© {year}</div>
            <div className="text-foreground">All rights reserved</div>
          </div>
          <div>
            <div className="mb-2 text-foreground/40">Status</div>
            <div className="text-foreground">
              <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-primary align-middle" />
              {profile.availability}
            </div>
          </div>
          <div>
            <div className="mb-2 text-foreground/40">Based</div>
            <div className="text-foreground">{profile.location}</div>
          </div>
          <div>
            <div className="mb-2 text-foreground/40">More work</div>
            <a
              href="https://github.com/shauryagoyal1316"
              target="_blank"
              rel="noreferrer"
              className="break-all text-foreground transition-colors hover:text-primary"
            >
              Some projects may be on GitHub: github.com/shauryagoyal1316
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
