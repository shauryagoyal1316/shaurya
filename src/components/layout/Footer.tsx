import { Link } from 'react-router-dom';
import { profile } from '@/data/profile';

const footerNav = [
  { name: 'Index', path: '/' },
  { name: 'Work', path: '/work' },
  { name: 'About', path: '/about' },
];

/**
 * Editorial footer: oversized name as the visual anchor, mono metadata
 * row underneath, plus a small site-nav so users at the bottom of a long
 * case study aren't forced to scroll back up to navigate.
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

        {/* Site nav — repeats the header so the bottom of any page is also
            navigable without scrolling back up. Hidden on mobile because
            the hamburger menu in the header already covers this and a
            bottom-of-page nav just adds scroll depth on small screens. */}
        <nav
          aria-label="Footer navigation"
          className="mb-10 hidden flex-wrap gap-x-10 gap-y-3 border-t border-border pt-8 font-mono text-[11px] uppercase tracking-[0.22em] md:flex"
        >
          {footerNav.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="rounded-sm text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {link.name}
            </Link>
          ))}
        </nav>

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
            <div className="mb-2 text-foreground/40">GitHub</div>
            <a
              href="https://github.com/shauryagoyal1316"
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              github.com/shauryagoyal1316
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
