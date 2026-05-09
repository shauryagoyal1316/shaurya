import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Index', path: '/' },
  { name: 'Work', path: '/work' },
  { name: 'About', path: '/about' },
];

/**
 * Editorial header that compresses as the user scrolls — height shrinks,
 * monogram scales down, and the bar gets a frosted background. All driven
 * by `useScroll` so it tracks momentum smoothly with the Lenis scroll.
 */
export function Header() {
  const location = useLocation();
  const { isScrolled } = useScrollPosition();
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 200, damping: 30, mass: 0.4 });
  const headerHeight = useTransform(smoothY, [0, 220], [76, 56]);
  const monogramScale = useTransform(smoothY, [0, 220], [1, 0.9]);
  const barOpacity = useTransform(smoothY, [0, 60, 220], [0, 0.55, 0.78]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[border-color] duration-500',
        isScrolled ? 'border-b border-border' : 'border-b border-transparent'
      )}
      style={{ height: headerHeight }}
    >
      {/* Frosted backdrop — opacity follows scroll for a smooth fade-in */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 backdrop-blur-md"
        style={{ background: `hsla(0, 0%, 4%, ${0})`, opacity: barOpacity }}
      >
        <div className="absolute inset-0 bg-background" />
      </motion.div>

      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 lg:px-10">
        {/* Monogram */}
        <motion.div style={{ scale: monogramScale }} className="origin-left">
          <Link
            to="/"
            className="rounded-sm font-mono text-[11px] uppercase tracking-[0.28em] text-foreground transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-inset"
            aria-label={`${profile.name} — home`}
          >
            <span className="inline-flex items-center gap-2">
              <span className="inline-block size-1.5 rounded-full bg-primary" />
              Shaurya / Goyal
            </span>
          </Link>
        </motion.div>

        {/* Right cluster: desktop nav + status badge as siblings (status is
            kept *outside* <nav> so screen readers don't read "Available for
            select work · 2026" as a navigation link). */}
        <div className="hidden items-center gap-10 md:flex">
        <nav aria-label="Primary" className="flex items-center gap-10">
          {navLinks.map((link) => {
            const active =
              link.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={active ? 'page' : undefined}
                className="group relative rounded-sm font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-inset"
              >
                <span className="relative inline-block overflow-hidden">
                  <motion.span
                    className="inline-block"
                    initial={false}
                    whileHover={{ y: '-100%' }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {link.name}
                  </motion.span>
                  <motion.span
                    aria-hidden
                    className="absolute left-0 top-full inline-block text-primary"
                    initial={false}
                    whileHover={{ y: '-100%' }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {link.name}
                  </motion.span>
                </span>
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-px bg-primary transition-all duration-500',
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <span
          role="status"
          className="inline-flex items-center font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50"
        >
          <span aria-hidden className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-primary" />
          {profile.availability}
        </span>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="flex size-10 items-center justify-center rounded-full border border-border text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-inset"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full border-l-border bg-background p-0 sm:w-96">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <SheetDescription className="sr-only">Primary site navigation links</SheetDescription>
              <div className="flex h-full flex-col justify-between p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/70">
                    Menu
                  </span>
                </div>
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => {
                    const active =
                      link.path === '/'
                        ? location.pathname === '/'
                        : location.pathname.startsWith(link.path);
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className="rounded-sm font-display text-5xl italic text-foreground transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-inset"
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
                  <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-primary align-middle" />
                  <span className="text-foreground/40">Status — </span>
                  {profile.availability}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
