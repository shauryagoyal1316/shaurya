import { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';

const navLinks = [
  { id: 'home', name: 'Index', path: '/' },
  { id: 'work', name: 'Work', path: '/work' },
  { id: 'about', name: 'About', path: '/about' },
];

/**
 * Editorial header reskinned to match the Portfolio.html design:
 *  - Brand on the left ("● Shaurya Goyal." with italic surname)
 *  - Pill-shaped nav with a sliding active/hover indicator (transform + width
 *    spring out of the active link's measured box)
 *  - Theme toggle on the right
 *  - Fixed so navigation and theme controls stay reachable while scrolling
 *
 * The sliding pill is measured per-render with `getBoundingClientRect` and
 * re-syncs on resize and after fonts settle (two delayed re-syncs) so it
 * doesn't anchor to a stale width while web fonts are still swapping.
 */
export function Header() {
  const location = useLocation();
  const { isScrolled } = useScrollPosition();
  const [open, setOpen] = useState(false);

  // Active id derived from the current pathname so it survives both
  // direct navigation and the back/forward buttons.
  const activeId =
    location.pathname === '/'
      ? 'home'
      : location.pathname.startsWith('/work')
        ? 'work'
        : location.pathname.startsWith('/about')
          ? 'about'
          : '';

  // Measured pill state — driven by getBoundingClientRect so it stays
  // pixel-accurate even when fonts swap or the viewport resizes.
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pill, setPill] = useState<{ x: number; w: number; ready: boolean }>(
    { x: 0, w: 0, ready: false }
  );
  const [hoverId, setHoverId] = useState<string | null>(null);

  const measure = useCallback((id: string) => {
    const container = navRef.current;
    const target = linkRefs.current[id];
    if (!container || !target) return null;
    const cr = container.getBoundingClientRect();
    const tr = target.getBoundingClientRect();
    return { x: tr.left - cr.left, w: tr.width };
  }, []);

  useLayoutEffect(() => {
    const sync = () => {
      const id = hoverId || activeId;
      if (!id) return;
      const m = measure(id);
      if (m) setPill({ x: m.x, w: m.w, ready: true });
    };
    sync();
    // Run again after fonts settle so widths are correct (Geist swaps in
    // a frame or two later than the layout pass).
    const t1 = setTimeout(sync, 80);
    const t2 = setTimeout(sync, 400);
    window.addEventListener('resize', sync);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', sync);
    };
  }, [activeId, hoverId, measure]);

  // If the user lands on a route that isn't in the nav (404), don't show a
  // floating pill — hide it instead of pointing at nothing.
  const showPill = pill.ready && Boolean(activeId || hoverId);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
        'flex items-center justify-between px-6 py-4 md:px-10',
        isScrolled
          ? 'border-b border-border bg-background/70 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      {/* Brand */}
      <Link
        to="/"
        data-cursor="hover"
        aria-label={`${profile.name} — home`}
        className="inline-flex items-baseline gap-1.5 rounded-sm font-display text-[22px] leading-none tracking-[-0.01em] text-foreground transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span
          aria-hidden
          className="inline-block size-1.5 -translate-y-[2px] rounded-full bg-primary"
        />
        <span>Shaurya</span>
        <span className="italic text-foreground/60">Goyal.</span>
      </Link>

      {/* Desktop pill nav */}
      <div
        ref={navRef}
        onMouseLeave={() => setHoverId(null)}
        className="relative hidden items-center gap-1 rounded-full border border-border bg-background/60 p-1 backdrop-blur-md md:inline-flex"
      >
        {/* Sliding indicator */}
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute left-0 top-1 h-[calc(100%-0.5rem)] rounded-full bg-foreground will-change-transform',
            showPill ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            width: pill.w,
            transform: `translate3d(${pill.x}px, 0, 0)`,
            transition:
              'transform 620ms var(--ease-pill), width 620ms var(--ease-pill), opacity 240ms var(--ease-smooth)',
          }}
        />
        <nav aria-label="Primary" className="relative z-[1] inline-flex items-center gap-1">
          {navLinks.map((link) => {
            const active = activeId === link.id;
            return (
              <Link
                key={link.id}
                to={link.path}
                ref={(el) => {
                  linkRefs.current[link.id] = el;
                }}
                aria-current={active ? 'page' : undefined}
                data-cursor="hover"
                onMouseEnter={() => setHoverId(link.id)}
                className={cn(
                  'rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
                  active
                    ? 'text-background'
                    : 'text-foreground/70 hover:text-foreground'
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Right cluster — theme toggle on desktop, menu on mobile.
          (Design keeps availability in the footer only, not the header.) */}
      <div className="flex items-center gap-3">
        <ThemeToggle className="hidden md:inline-flex" />

        {/* Mobile sheet */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="flex size-9 items-center justify-center rounded-full border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l-border bg-background p-0 sm:w-96"
            >
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <SheetDescription className="sr-only">
                Primary site navigation links
              </SheetDescription>
              <div className="flex h-full flex-col justify-between p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/70">
                    Menu
                  </span>
                  <ThemeToggle />
                </div>
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => {
                    const active = activeId === link.id;
                    return (
                      <Link
                        key={link.id}
                        to={link.path}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'rounded-sm font-display text-5xl italic transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
                          active ? 'text-foreground' : 'text-foreground/70'
                        )}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60">
                  <span
                    aria-hidden
                    className="mr-2 inline-block size-1.5 rounded-full bg-primary align-middle"
                    style={{
                      boxShadow:
                        '0 0 0 4px color-mix(in oklch, var(--primary) 18%, transparent)',
                    }}
                  />
                  <span className="text-foreground/40">Status — </span>
                  {profile.availability}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

