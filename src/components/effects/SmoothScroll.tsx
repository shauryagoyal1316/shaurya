import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Session flag set by the frame-rate governor: once a device proves it
 * can't sustain Lenis's main-thread scroll loop, every page load in the
 * session goes straight to native (compositor-threaded) scrolling.
 */
const NATIVE_KEY = 'sg-native-scroll';

/**
 * Lenis-driven inertial smooth scroll. Drives `window.scrollY` via rAF so
 * Framer Motion's `useScroll` and any scroll listener still work — but with
 * a buttery, momentum-based feel instead of native step-scroll.
 *
 * Adaptive tier: Lenis animates the scroll position from the main thread,
 * so on hardware that can't hold the frame rate the WHOLE page hitches —
 * the one failure mode no amount of animation tuning can fix. A governor
 * samples real frame times shortly after load; a device that can't
 * sustain ~48fps drops to native scrolling for the session, where the
 * compositor thread keeps scrolling smooth no matter what the main
 * thread is doing. Every scroll consumer already has a native fallback.
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

    const nativePreferred = () => {
      try {
        return sessionStorage.getItem(NATIVE_KEY) === '1';
      } catch {
        return false;
      }
    };

    const start = () => {
      if (mql?.matches || nativePreferred()) return;
      // Touch devices scroll natively either way (Lenis only intercepts
      // wheel input), so on phones its rAF loop is pure overhead — skip
      // it and give the main thread every frame back. Mobile-first.
      if (window.matchMedia('(pointer: coarse)').matches) return;
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

    // Frame-rate governor. Waits out the preloader and entrance
    // animations, then takes ~2.5s of frame samples; a median above 21ms
    // (sustained < ~48fps) demotes the session to native scrolling.
    // Deltas over 250ms are tab switches, not frames — discarded.
    let sampleFrame = 0;
    let lastT = 0;
    const samples: number[] = [];
    const sample = (t: number) => {
      if (lastT) {
        const dt = t - lastT;
        if (dt < 250) samples.push(dt);
      }
      lastT = t;
      if (samples.length < 150) {
        sampleFrame = requestAnimationFrame(sample);
        return;
      }
      const median = [...samples].sort((a, b) => a - b)[
        Math.floor(samples.length / 2)
      ];
      if (median > 21 && lenis) {
        try {
          sessionStorage.setItem(NATIVE_KEY, '1');
        } catch {
          /* storage unavailable — demote for this page only */
        }
        stop();
      }
    };
    const governor = setTimeout(() => {
      if (lenis) sampleFrame = requestAnimationFrame(sample);
    }, 3200);

    const onChange = () => {
      stop();
      start();
    };
    mql?.addEventListener('change', onChange);

    return () => {
      clearTimeout(governor);
      cancelAnimationFrame(sampleFrame);
      mql?.removeEventListener('change', onChange);
      stop();
    };
  }, []);

  return null;
}
