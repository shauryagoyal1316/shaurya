import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive behavior
 * @param query - Media query string (e.g., '(min-width: 768px)')
 */
export const useMediaQuery = (query: string): boolean => {
  // Read synchronously so the FIRST render is already correct. A false
  // start here means every consumer renders one desktop frame on mobile —
  // ScrollDrift once painted its full 56px offset (widening the phone
  // layout viewport) because nothing re-triggered the value after the
  // effect flipped the flag.
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Sync in case the environment changed between render and effect
    setMatches(mediaQuery.matches);

    // Listen for changes
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);

    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
};

// Convenience hooks for common breakpoints
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
