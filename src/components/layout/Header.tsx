import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Index', path: '/' },
  { name: 'Work', path: '/work' },
  { name: 'About', path: '/about' },
];

/**
 * Editorial header: monogram on the left, navigation right, mono availability
 * tag below at the rightmost edge. Becomes a thin frosted bar after scroll.
 */
export function Header() {
  const location = useLocation();
  const { isScrolled } = useScrollPosition();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-500',
        isScrolled
          ? 'border-b border-border bg-background/70 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-10">
        {/* Monogram */}
        <Link
          to="/"
          className="font-mono text-[11px] uppercase tracking-[0.28em] text-foreground transition-opacity hover:opacity-70"
          aria-label={`${profile.name} — home`}
        >
          <span className="inline-flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-primary" />
            Shaurya / Goyal
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const active =
              link.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className="group relative font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-foreground"
              >
                <span className="relative">
                  {link.name}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-0 h-px bg-primary transition-all duration-500',
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </span>
              </Link>
            );
          })}
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
            <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-primary align-middle" />
            {profile.availability}
          </span>
        </nav>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="flex size-10 items-center justify-center rounded-full border border-border text-foreground"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full border-l-border bg-background p-0 sm:w-96">
              <div className="flex h-full flex-col justify-between p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/70">
                    Menu
                  </span>
                </div>
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className="font-display text-5xl italic text-foreground transition-opacity hover:opacity-60"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
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
