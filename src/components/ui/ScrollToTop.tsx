import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type LenisLike = {
  scrollTo: (target: number, options?: { immediate?: boolean }) => void;
};

/**
 * Reset scroll position on every route change.
 *
 * Lenis (smooth scroll) tracks its own targetScroll, so a plain
 * `window.scrollTo(0)` gets overridden on the next rAF tick. When Lenis is
 * available we call its scrollTo with `immediate: true`. We only fall back
 * to the native call if Lenis isn't there — calling both fights the engine.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(0, { immediate: true });
        return;
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    } catch {
      // Non-fatal — never let scroll-reset break the app.
    }
  }, [pathname]);

  return null;
}
