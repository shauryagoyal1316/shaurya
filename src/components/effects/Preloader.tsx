import { useEffect, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue } from 'framer-motion';
import { EASE, prefersReducedMotion } from '@/lib/motion';

const SEEN_KEY = 'sg-intro-seen';

/**
 * Extra entrance delay (seconds) pages should add to their mount animations
 * when the intro is about to play over them, so reveals don't fire hidden
 * behind the preloader panel. 0 on return visits / reduced motion.
 */
export function getIntroOffset(): number {
  return typeof window !== 'undefined' &&
    sessionStorage.getItem(SEEN_KEY) !== '1' &&
    !prefersReducedMotion()
    ? 1.9
    : 0;
}

/**
 * First-visit intro: mono counter runs 0→100 while the name mask-reveals,
 * then the whole panel wipes upward into the page. Session-gated — return
 * visits and reduced-motion users go straight to the hero.
 */
export function Preloader() {
  const [active, setActive] = useState(
    () =>
      typeof window !== 'undefined' &&
      sessionStorage.getItem(SEEN_KEY) !== '1' &&
      !prefersReducedMotion()
  );
  const [counterDone, setCounterDone] = useState(false);
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = 'hidden';
    const controls = animate(count, 100, {
      duration: 1.1,
      delay: 0.25,
      ease: EASE.snappy,
      onUpdate: (v) => setDisplay(Math.round(v)),
      onComplete: () => setCounterDone(true),
    });
    return () => {
      controls.stop();
      document.body.style.overflow = '';
    };
  }, [active, count]);

  useEffect(() => {
    if (!counterDone) return;
    // Brief hold at 100 so the number registers before the wipe.
    const t = setTimeout(() => {
      sessionStorage.setItem(SEEN_KEY, '1');
      document.body.style.overflow = '';
      setActive(false);
    }, 250);
    return () => clearTimeout(t);
  }, [counterDone]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden
          exit={{ y: '-102%' }}
          transition={{ duration: 0.75, ease: EASE.snappy }}
          className="paper fixed inset-0 z-[10001] flex flex-col justify-between px-6 py-8 md:px-10"
        >
          {/* Top rail */}
          <div className="flex items-center justify-between text-[13px] text-foreground/50">
            <span>Shaurya Goyal</span>
            <span>2026</span>
          </div>

          {/* Center name reveal */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-baseline justify-center overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE.snappy }}
                className="select-none font-display text-[clamp(44px,8.5vw,130px)] leading-[0.9] text-foreground"
              >
                Shaurya
                <span className="text-[color:var(--text-tertiary)]"> Goyal</span>
                <span className="ml-[0.05em] inline-block size-[0.09em] bg-[var(--water)] align-baseline" />
              </motion.h1>
            </div>
            {/* Plotter line — draws with the counter */}
            <div className="h-px w-[min(70vw,720px)] bg-[var(--border)]">
              <div
                className="h-px bg-primary"
                style={{ width: `${display}%`, transition: 'width 80ms linear' }}
              />
            </div>
          </div>

          {/* Bottom counter */}
          <div className="flex items-end justify-between">
            <span className="font-note text-base text-foreground/50" style={{ rotate: '-1.5deg' }}>
              printing…
            </span>
            <span className="font-display text-[clamp(40px,6vw,88px)] leading-none tabular-nums text-foreground">
              {String(display).padStart(2, '0')}
              <span className="text-[color:var(--water)]">%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
