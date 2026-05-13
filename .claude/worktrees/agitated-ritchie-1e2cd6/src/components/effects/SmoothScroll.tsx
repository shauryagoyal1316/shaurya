import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis-driven inertial smooth scroll. Drives `window.scrollY` via rAF so
 * Framer Motion's `useScroll` and any scroll listener still work — but with
 * a buttery, momentum-based feel instead of native step-scroll.
 *
 * Honours `prefers-reduced-motion` *reactively*: if the user toggles the OS
 * setting at runtime (or it changes for any other reason), Lenis is torn
 * down and re-spun without requiring a page reload.
 */
export function SmoothScroll() {
  useEffect(() => {
    const mql =
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;

    let lenis: Lenis | undefined;
    let frame = 0;

    const start = () => {
      if (mql?.matches) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        lerp: 0.1,
      });
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis = undefined;
    };

    start();

    const onChange = () => {
      stop();
      start();
    };
    mql?.addEventListener('change', onChange);

    return () => {
      mql?.removeEventListener('change', onChange);
      stop();
    };
  }, []);

  return null;
}
