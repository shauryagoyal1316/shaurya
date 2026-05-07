import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll to the top on every route change. Lenis intercepts wheel
 * events and tracks its own `targetScroll`, so a plain `window.scrollTo(0)`
 * is overridden on the next rAF tick. We call Lenis's own `scrollTo` (with
 * `immediate: true`) when it's available, and fall back to the native call
 * when it isn't (reduced-motion users, or before Lenis has mounted).
 */
type LenisLike = {
  scrollTo: (target: number, options?: { immediate?: boolean; force?: boolean }) => void;
};

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname]);

  return null;
}
