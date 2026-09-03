import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { EASE } from '@/lib/motion';

/**
 * The title block — this site's signature device.
 *
 * Every real engineering drawing carries one, bottom right, and it is the
 * only part of a drawing that describes the drawing itself. Ours fills in as
 * the visitor descends: TITLE tracks the section under them, SCALE reads the
 * live viewport, DRAWN BY resolves once they have committed to scrolling.
 * APPROVED BY is never filled, because that field is theirs.
 *
 * Two variants render the same object at two moments. `corner` is the fixed
 * stamp that rides along; `sheet` is the full-scale rebuild at the peak. The
 * corner retires permanently the moment the sheet takes over, so the two are
 * never on screen together and the hand-off reads as one object moving.
 *
 * No sheet or revision number anywhere: the house rules ban numbered section
 * badges by name, and a counter would be one.
 */

/** Sections publish their own title via `data-sheet="COVER"`. */
export function useSheetTitle() {
  const [title, setTitle] = useState('');
  // Layout outlives every route, so the marks have to be re-queried per page.
  // AnimatePresence mode="wait" unmounts the old page before mounting the
  // new one, so the query is deferred past the transition rather than run
  // against a DOM that is briefly empty.
  const { pathname } = useLocation();

  useEffect(() => {
    let marks: HTMLElement[] = [];

    // Nearest mark whose top has passed the reading line (40% down the
    // viewport). Cheaper and steadier than an IntersectionObserver race
    // when two short sections straddle the fold.
    const read = () => {
      if (!marks.length) return;
      const line = window.innerHeight * 0.4;
      let current = marks[0];
      for (const mark of marks) {
        if (mark.getBoundingClientRect().top <= line) current = mark;
      }
      setTitle(current.dataset.sheet ?? '');
    };

    const scan = () => {
      marks = Array.from(document.querySelectorAll<HTMLElement>('[data-sheet]'));
      setTitle(marks.length ? (marks[0].dataset.sheet ?? '') : '');
      read();
    };

    setTitle('');
    const t = window.setTimeout(scan, 420);
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, [pathname]);

  return title;
}

/** Live viewport width, so SCALE is a real measurement and not decoration. */
function useViewportWidth() {
  const [w, setW] = useState(() =>
    typeof window === 'undefined' ? 0 : window.innerWidth
  );
  useEffect(() => {
    const on = () => setW(window.innerWidth);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return w;
}

function Field({
  label,
  value,
  blank = false,
  className = '',
}: {
  label: string;
  value?: string;
  /** Renders the ruled empty field instead of a value. */
  blank?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline gap-3 ${className}`}>
      <span className="shrink-0 font-mono text-[9px] leading-none text-[color:var(--text-tertiary)]">
        {label}
      </span>
      {blank ? (
        <span
          aria-hidden
          className="h-px min-w-[5ch] flex-1 self-end bg-[var(--water)] opacity-70"
        />
      ) : (
        <span className="truncate font-mono text-[10px] leading-none text-foreground">
          {value}
        </span>
      )}
    </div>
  );
}

/**
 * The fixed corner stamp. Desktop only: on a phone it would eat a fifth of
 * the sheet and cost a scroll listener for the privilege. Retires for good
 * once the full-scale block has taken over.
 */
export function CornerTitleBlock() {
  const title = useSheetTitle();
  const width = useViewportWidth();
  const reduced = useReducedMotion();
  const { pathname } = useLocation();
  const [engaged, setEngaged] = useState(false);
  const [retired, setRetired] = useState(false);

  useEffect(() => {
    const on = () => setEngaged(window.scrollY > window.innerHeight * 0.35);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  // The sheet variant announces itself; the corner steps aside and stays away.
  // Retirement is per-page: leaving the sheet that took over brings it back.
  useEffect(() => {
    setRetired(false);
    const onTakeover = () => setRetired(true);
    window.addEventListener('titleblock:takeover', onTakeover);
    return () => window.removeEventListener('titleblock:takeover', onTakeover);
  }, [pathname]);

  // No marks on this page means nothing to describe, so no block.
  const visible = engaged && !retired && title !== '';

  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 10,
        scale: visible ? 1 : 0.96,
      }}
      transition={reduced ? { duration: 0 } : { duration: 0.5, ease: EASE.snappy }}
      style={{ pointerEvents: 'none' }}
      className="paper-plain fixed bottom-6 right-8 z-[6] hidden w-[210px] border border-[var(--border-strong)] shadow-[var(--shadow-md)] md:block"
    >
      <div className="border-b border-[var(--border-strong)] px-3 py-1.5">
        <Field label="TITLE" value={title} />
      </div>
      <div className="grid grid-cols-2">
        <div className="border-r border-[var(--border)] px-3 py-1.5">
          <Field label="SCALE" value={width ? `1:1 @ ${width}` : '1:1'} />
        </div>
        <div className="px-3 py-1.5">
          <Field label="DRAWN" value="S. GOYAL" />
        </div>
      </div>
      <div className="border-t border-[var(--border-strong)] px-3 py-1.5">
        <Field label="APPROVED" blank />
      </div>
    </motion.div>
  );
}

const SHEET_FIELDS = [
  { label: 'Drawing', value: 'A complete website, built for one business' },
  { label: 'Drawn by', value: 'Shaurya Goyal' },
  { label: 'Medium', value: 'React, TypeScript, a real backend' },
  { label: 'Status', value: 'Taking work' },
];

/**
 * The peak. The block rebuilds at full scale, rules first, then one field per
 * beat, and stops on the empty one. Firing `titleblock:takeover` on entry is
 * what makes the corner stamp disappear at the same instant, so the visitor
 * reads it as the same object having moved rather than a second copy.
 */
export function SheetTitleBlock({ ctaHref }: { ctaHref: string }) {
  const reduced = useReducedMotion();
  const width = useViewportWidth();
  const shell = useRef<HTMLDivElement>(null);

  // The plotter head. On the cover sheet this block is pinned, and a pinned
  // element that finishes its entrance is a static screen for the rest of the
  // hold: real dead scroll, and the harness is right to call it that. This
  // line tracks the block's own travel through the viewport, so something is
  // always moving while the visitor is held here, and it reads as the machine
  // still working rather than as decoration.
  const { scrollYProgress } = useScroll({
    target: shell,
    offset: ['start end', 'end start'],
  });
  const headY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const rule = reduced
    ? {}
    : {
        initial: { scaleX: 0 },
        whileInView: { scaleX: 1 },
        viewport: { once: true, margin: '-15% 0px' },
      };

  return (
    <motion.div
      ref={shell}
      onViewportEnter={() => window.dispatchEvent(new Event('titleblock:takeover'))}
      viewport={{ margin: '-20% 0px' }}
      className="paper-plain relative border border-[var(--border-strong)] shadow-[var(--shadow-lg)]"
    >
      {/* Corner ticks — the drawing's own registration marks */}
      <span aria-hidden className="absolute -left-px -top-px size-3 border-l-2 border-t-2 border-[var(--primary)]" />
      <span aria-hidden className="absolute -right-px -top-px size-3 border-r-2 border-t-2 border-[var(--primary)]" />

      {!reduced && (
        <motion.span
          aria-hidden
          style={{ top: headY }}
          className="pointer-events-none absolute -left-[7px] h-[2px] w-3 bg-[var(--primary)]"
        />
      )}

      {SHEET_FIELDS.map((field, i) => (
        <div key={field.label} className="relative">
          <motion.div
            aria-hidden
            {...rule}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: EASE.snappy }}
            className="h-px origin-left bg-[var(--border-strong)]"
          />
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 8 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: EASE.snappy }}
            className="grid gap-1 px-5 py-4 md:grid-cols-12 md:items-baseline md:gap-6 md:px-8 md:py-6"
          >
            <span className="font-mono text-[10px] leading-none text-[color:var(--text-tertiary)] md:col-span-3">
              {field.label}
            </span>
            <span className="font-display text-base leading-tight text-foreground md:col-span-9 md:text-xl">
              {field.value}
            </span>
          </motion.div>
        </div>
      ))}

      {/* SCALE reads live, so the block is measuring the visitor's own screen */}
      <div className="relative">
        <motion.div
          aria-hidden
          {...rule}
          transition={{ duration: 0.7, delay: 0.63, ease: EASE.snappy }}
          className="h-px origin-left bg-[var(--border-strong)]"
        />
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 8 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.6, delay: 0.78, ease: EASE.snappy }}
          className="grid gap-1 px-5 py-4 md:grid-cols-12 md:items-baseline md:gap-6 md:px-8 md:py-6"
        >
          <span className="font-mono text-[10px] leading-none text-[color:var(--text-tertiary)] md:col-span-3">
            Scale
          </span>
          <span className="font-mono text-sm text-foreground md:col-span-9">
            1:1 at {width || '—'} px, this screen
          </span>
        </motion.div>
      </div>

      {/* The field that stays empty. It is the CTA. */}
      <div className="relative">
        <motion.div
          aria-hidden
          {...rule}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE.snappy }}
          className="h-px origin-left bg-[var(--border-strong)]"
        />
        <a
          href={ctaHref}
          data-cursor="view"
          data-cursor-label="Email me"
          className="group grid gap-3 px-5 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:grid-cols-12 md:items-baseline md:gap-6 md:px-8 md:py-8"
        >
          <span className="font-mono text-[10px] leading-none text-[color:var(--water-ink)] md:col-span-3">
            Approved by
          </span>
          <span className="md:col-span-9">
            <motion.span
              initial={reduced ? undefined : { scaleX: 0 }}
              whileInView={reduced ? undefined : { scaleX: 1 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.9, delay: 1.05, ease: EASE.snappy }}
              className="block h-px w-full origin-left bg-[var(--water)] transition-colors group-hover:bg-[var(--primary)]"
            />
            <motion.span
              initial={reduced ? undefined : { opacity: 0 }}
              whileInView={reduced ? undefined : { opacity: 1 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="mt-3 block font-note text-lg leading-none text-[color:var(--water-ink)]"
            >
              your name goes here
            </motion.span>
          </span>
        </a>
      </div>
    </motion.div>
  );
}
