import { useState } from 'react';
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
  { id: 'home', name: 'Home', path: '/' },
  { id: 'services', name: 'Services', path: '/services' },
  { id: 'about', name: 'About', path: '/about' },
];

/**
 * Plain header: name on the left, three links on the right. The current
 * page gets a wavy red-pencil underline — that's the whole system.
 */
export function Header() {
  const location = useLocation();
  const { isScrolled } = useScrollPosition();
  const [open, setOpen] = useState(false);

  const activeId =
    location.pathname === '/'
      ? 'home'
      : location.pathname.startsWith('/services')
        ? 'services'
        : location.pathname.startsWith('/about')
          ? 'about'
          : '';

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        isScrolled
          ? 'paper border-[var(--border-strong)]'
          : 'border-transparent bg-transparent'
      )}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-10">
        <Link
          to="/"
          data-cursor="hover"
          aria-label={`${profile.name} — home`}
          className="flex items-center gap-2.5 font-display text-[15px] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {/* White plate + ink border so the mark reads as a pasted label on
              the drawing in both themes (the artwork has a white ground). */}
          <img
            src={`${import.meta.env.BASE_URL}logo-mark.png`}
            alt=""
            width={28}
            height={28}
            className="size-7 border border-[var(--border-strong)] bg-white p-[3px]"
          />
          Shaurya Goyal
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const active = activeId === link.id;
            return (
              <Link
                key={link.id}
                to={link.path}
                aria-current={active ? 'page' : undefined}
                data-cursor="hover"
                className={cn(
                  'text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  active
                    ? 'text-foreground underline decoration-[var(--water)] decoration-wavy decoration-2 underline-offset-8'
                    : 'text-foreground/60 hover:text-foreground'
                )}
              >
                {link.name}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>

        {/* Mobile trigger */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="flex size-9 items-center justify-center border border-[var(--border-strong)] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="paper w-full border-l-[var(--border-strong)] p-0 sm:w-[min(90vw,400px)]"
            >
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <SheetDescription className="sr-only">
                Primary site navigation links
              </SheetDescription>
              <div className="flex h-full flex-col justify-between p-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/70">Menu</span>
                  <ThemeToggle />
                </div>
                <nav className="flex flex-col">
                  {navLinks.map((link) => {
                    const active = activeId === link.id;
                    return (
                      <Link
                        key={link.id}
                        to={link.path}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'border-t border-[var(--border-strong)] py-5 font-display text-4xl transition-colors last:border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
                          active ? 'text-primary' : 'text-foreground'
                        )}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>
                <div className="text-sm text-foreground/60">
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
