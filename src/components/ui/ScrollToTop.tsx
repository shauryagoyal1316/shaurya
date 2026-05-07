import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll position to the top whenever the route changes. Without this,
 * navigating from a long page (e.g. a case study) to a shorter page leaves
 * the user mid-page on the new route. Uses an instant jump rather than a
 * smooth scroll so it doesn't compete with the page-transition animation.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}
