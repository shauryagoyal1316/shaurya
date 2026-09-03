import { useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollScrubText } from '@/components/effects/ScrollScrubText';
import { Marquee } from '@/components/effects/Marquee';
import { SheetTitleBlock } from '@/components/effects/TitleBlock';
import { getIntroOffset } from '@/components/effects/Preloader';
import { DrawnRule } from '@/components/effects/drawing';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { usePointerParallax } from '@/hooks/usePointerParallax';
import { EASE } from '@/lib/motion';
import { EMAIL, EMAIL_HREF as CONTACT_HREF, WHATSAPP_HREF } from '@/lib/contact';

const MANIFESTO =
  'Yours should be built for one business, and still hold up in three years.';

/** The service lines. Type at four weights, never cards. */
const services = [
  {
    key: 'direction',
    title: 'Design direction',
    body: 'Type, layout, and pacing chosen for your business.',
  },
  {
    key: 'build',
    title: 'Full-stack build',
    body: 'Front end, back end, and the wiring behind the form. One system, on your own domain.',
  },
  {
    key: 'motion',
    title: 'Motion and feel',
    body: 'Scroll choreography, with restraint where it counts.',
  },
  {
    key: 'aftercare',
    title: 'Launch and aftercare',
    body: 'Domain, hosting, and the groundwork that gets you found.',
  },
];

/**
 * Sheet 01, the cover. Typographic poster grammar: type IS the imagery, and
 * scale contrast does every job photography would have done. Seven acts,
 * roughly 11 viewport-heights, peaking on the title block rebuilding itself.
 *
 * No cards anywhere on this page. The grammar forbids them and the old
 * sticky capability stack was the thing most likely to read as a template.
 */
export default function Home() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  // Frozen at mount: extra delay so the hero entrance plays after the preloader.
  const [intro] = useState(getIntroOffset);
  const heroRef = useRef<HTMLElement>(null);

  // Pointer parallax gives the on-load hero real depth without scroll or
  // WebGL: the headline floats a few px over the static sheet, and the red
  // period floats a touch more (nearest the eye). Zero cost on touch /
  // reduced-motion, where the hook returns static values and never listens.
  const { x: pointerX, y: pointerY } = usePointerParallax();
  const blockX = useTransform(pointerX, (v) => v * 6);
  const blockY = useTransform(pointerY, (v) => v * 6);
  const markX = useTransform(pointerX, (v) => v * 6);
  const markY = useTransform(pointerY, (v) => v * 6);
  const lineX = useTransform(pointerX, (v) => v * -10);

  return (
    <>
      <SEOHead />

      {/* ACT 1 — COVER. Arrest. One statement at viewport scale, struck onto
          the sheet by the datum lines. No scroll cue: they are looking at it. */}
      <section
        ref={heroRef}
        data-sheet="COVER"
        className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden px-6 py-28 md:px-10"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          <motion.div
            initial={reducedMotion ? { scaleX: 1, opacity: 0.14 } : { scaleX: 0, opacity: 0.6 }}
            animate={reducedMotion ? { scaleX: 1, opacity: 0.14 } : { scaleX: 1, opacity: [0.6, 0.6, 0.14] }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { scaleX: { duration: 0.5, delay: intro + 0.05, ease: EASE.snappy }, opacity: { duration: 1.4, delay: intro + 0.05, times: [0, 0.4, 1] } }
            }
            style={reducedMotion ? undefined : { x: lineX }}
            className="absolute inset-x-0 top-[42%] h-[2px] origin-left bg-primary md:h-px"
          />
          <motion.div
            initial={reducedMotion ? { scaleY: 1, opacity: 0.14 } : { scaleY: 0, opacity: 0.6 }}
            animate={reducedMotion ? { scaleY: 1, opacity: 0.14 } : { scaleY: 1, opacity: [0.6, 0.6, 0.14] }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { scaleY: { duration: 0.5, delay: intro + 0.16, ease: EASE.snappy }, opacity: { duration: 1.4, delay: intro + 0.16, times: [0, 0.4, 1] } }
            }
            style={reducedMotion ? undefined : { x: lineX }}
            className="absolute inset-y-0 left-[9%] w-[2px] origin-top bg-primary md:w-px"
          />
          <motion.div
            initial={reducedMotion ? { scale: 1, opacity: 0.45 } : { scale: 0, opacity: 0 }}
            animate={reducedMotion ? { scale: 1, opacity: 0.45 } : { scale: 1, opacity: [0, 1, 0.45] }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.9, delay: intro + 0.42, times: [0, 0.45, 1], ease: EASE.snappy }}
            style={reducedMotion ? undefined : { x: lineX }}
            className="absolute left-[9%] top-[42%] size-3.5 -translate-x-1/2 -translate-y-1/2 border border-primary"
          />
        </div>

        <motion.div
          style={reducedMotion ? undefined : { x: blockX, y: blockY }}
          className="relative z-[2] mx-auto w-full max-w-[1440px]"
        >
          <h1 className="poster select-none font-display text-[clamp(64px,13vw,232px)] leading-[0.82] text-foreground">
            <HeroLine delay={intro + 0.1} still={Boolean(reducedMotion)}>
              Websites,
            </HeroLine>
            <HeroLine
              delay={intro + 0.24}
              still={Boolean(reducedMotion)}
              className="text-[color:var(--text-secondary)]"
            >
              built to
            </HeroLine>
            <HeroLine delay={intro + 0.38} still={Boolean(reducedMotion)}>
              measure
              <span className="relative ml-[0.05em] inline-block size-[0.1em] translate-y-[-0.06em] align-baseline">
                <motion.span
                  initial={reducedMotion ? { scale: 1, opacity: 1 } : { scale: 2.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: intro + 0.8, ease: EASE.snappy }}
                  style={reducedMotion ? undefined : { x: markX, y: markY }}
                  aria-hidden
                  className="absolute inset-0 bg-[var(--water)]"
                />
                {!reducedMotion && (
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 4.2, opacity: [0.55, 0] }}
                    transition={{ duration: 0.7, delay: intro + 0.86, ease: 'easeOut' }}
                    className="absolute inset-0 border border-[var(--water)]"
                  />
                )}
              </span>
            </HeroLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: intro + 1.3, ease: EASE.snappy }}
            className="mt-8 max-w-xl text-base font-light leading-relaxed text-[color:var(--text-secondary)] md:text-lg"
          >
            {profile.heroIntroduction}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: intro + 1.5 }}
          className="absolute inset-x-6 bottom-9 z-[2] flex items-center justify-between font-mono text-[11px] text-foreground/45 md:inset-x-10"
        >
          <span>{profile.location}</span>
          <span>{profile.availability}</span>
        </motion.div>
      </section>

      {/* ACT 2 — THE CLAIM. Recognition. The page's biggest word, corrected in
          red pencil, then the scale collapses straight to reading size. That
          drop is the whole device: no media, just the interval. */}
      <section
        data-sheet="THE CLAIM"
        className="relative z-[3] flex min-h-[104svh] items-center border-t border-[var(--border-strong)] px-6 py-28 md:px-10 md:py-40"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="relative inline-block">
            <motion.h2
              initial={reducedMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 0.9, ease: EASE.snappy }}
              className="poster font-display text-[clamp(56px,15vw,268px)] leading-[0.8] text-foreground"
            >
              Templates
            </motion.h2>
            {/* The correction mark. A red pencil ruled straight through the
                word is the oldest note in drafting, and it does the argument
                without a sentence. */}
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 0.75, delay: 0.55, ease: EASE.snappy }}
              className="absolute left-[-2%] top-1/2 h-[6px] w-[104%] origin-left bg-[var(--water)] md:h-[9px]"
            />
          </div>

          {/* 268px down to 17px in one interval. */}
          <motion.p
            initial={reducedMotion ? undefined : { opacity: 0 }}
            whileInView={reducedMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-14 max-w-[46ch] text-[17px] font-light leading-[1.65] text-[color:var(--text-secondary)]"
          >
            {MANIFESTO}
          </motion.p>
        </div>
      </section>

      {/* ACT 3 — CRAFT. Interest. Four service lines as plain type at four
          anchors, stepping down in scale. Deliberately not a grid, not cards,
          and not four things that weigh the same. */}
      <section
        data-sheet="CRAFT"
        className="relative z-[3] border-t border-[var(--border-strong)] px-6 py-24 md:px-10 md:py-36"
      >
        <div className="mx-auto max-w-[1440px]">
          {services.map((service, i) => (
            <div key={service.key}>
              <DrawnRule strong={i === 0} />
              <motion.article
                initial={reducedMotion ? undefined : { opacity: 0, y: 22 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, ease: EASE.snappy }}
                // Each row sits further right than the last: the block walks
                // across the sheet instead of stacking in a column.
                className="grid gap-4 py-12 md:grid-cols-12 md:items-baseline md:gap-10 md:py-16"
                style={{ paddingLeft: isMobile ? undefined : `${i * 3.5}%` }}
              >
                <h3
                  className="font-display leading-[0.9] text-foreground md:col-span-6"
                  // Scale steps down row by row, so the eye is never given
                  // four things of equal weight.
                  style={{ fontSize: `clamp(${30 - i * 2}px, ${5.4 - i * 0.5}vw, ${76 - i * 8}px)` }}
                >
                  {service.title}
                  <span className="text-[color:var(--water)]">.</span>
                </h3>
                <div className="md:col-span-6">
                  <p className="max-w-[42ch] text-base font-light leading-relaxed text-[color:var(--text-secondary)] md:text-lg">
                    {service.body}
                  </p>
                </div>
              </motion.article>
            </div>
          ))}
          <DrawnRule strong />
        </div>
      </section>

      {/* ACT 4 — SOFTWARE. Substance. Quieter and denser than act 3: the
          stack set as kinetic type, then the second service line stated once.
          The ticker hangs a degree off level, which is a house requirement. */}
      <section
        data-sheet="SOFTWARE"
        className="relative z-[3] overflow-hidden border-t border-[var(--border-strong)] py-14 md:-mx-[1%] md:w-[102%] md:-rotate-1 md:py-20"
      >
        {reducedMotion || isMobile ? (
          <StackTicker />
        ) : (
          <SkewOnVelocity>
            <StackTicker />
          </SkewOnVelocity>
        )}
      </section>

      <section className="relative z-[3] px-6 pb-28 pt-20 md:px-10 md:pb-40 md:pt-28">
        <div className="mx-auto max-w-[1440px] md:flex md:justify-end">
          <div className="md:w-[82%]">
            <ScrollScrubText
              text="Somewhere past the tenth spreadsheet tab, a business stops needing a website and starts needing software. I build the internal tools too: inventory, fleet, compliance, approvals, reporting."
              className="max-w-4xl font-sans text-[clamp(24px,3.6vw,50px)] font-medium leading-[1.2] tracking-[-0.02em] text-foreground"
            />
          </div>
        </div>
      </section>

      {/* ACT 5 — SILENCE. Anticipation. Authored empty sheet. Declared in
          BRIEF.md so a verification pass does not read it as dead scroll. */}
      <section
        data-sheet="—"
        className="relative z-[3] flex min-h-[88svh] items-center border-t border-[var(--border-strong)] px-6 md:px-10"
      >
        <div className="mx-auto w-full max-w-[1440px]">
          <p className="text-lg font-light text-[color:var(--text-tertiary)] md:ml-[38%]">
            Every drawing gets signed off.
          </p>
        </div>
      </section>

      {/* ACT 6 — THE PEAK. Invitation. The corner title block retires and
          rebuilds here at full scale, ruled line by line, stopping on the one
          field it will not fill in. Largest span on the page. */}
      <section
        id="approval"
        data-sheet="APPROVAL"
        className="relative z-[3] border-t border-[var(--border-strong)]"
      >
        {/* The pin. main is overflow-x:clip, which does not create a scroll
            container, so sticky still resolves against the viewport here. */}
        <div className="min-h-[210svh]">
          <div className="sticky top-0 flex min-h-[100svh] items-center px-6 py-24 md:px-10">
            <div className="mx-auto w-full max-w-[1100px]">
              <SheetTitleBlock ctaHref={CONTACT_HREF} />
            </div>
          </div>
        </div>
      </section>

      {/* ACT 7 — CLOSE. Calm. The grammar's inversion: after 268px type, the
          smallest setting on the site and a plain underlined link. The one
          right-aligned moment on the page, which is a house requirement. */}
      <section
        data-sheet="CLOSE"
        className="relative z-[3] px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-[1440px] md:text-right">
          <p className="text-sm font-light leading-relaxed text-[color:var(--text-secondary)] md:ml-auto md:max-w-[38ch]">
            Two service lines, one person drawing both. If your business needs
            either, the fastest route is a short message.
          </p>
          <div className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-3 md:justify-end">
            <a
              href={CONTACT_HREF}
              data-cursor="hover"
              className="text-[15px] text-foreground underline decoration-[var(--water)] decoration-2 underline-offset-[6px] transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {EMAIL}
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="text-[15px] text-[color:var(--text-secondary)] underline decoration-[var(--border-strong)] underline-offset-[6px] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              WhatsApp
            </a>
            <Link
              to="/services"
              data-cursor="hover"
              className="inline-flex items-center gap-1.5 text-[15px] text-[color:var(--text-secondary)] underline decoration-[var(--border-strong)] underline-offset-[6px] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              The services
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/** The technology ticker track, shared by both skewed and plain modes. */
function StackTicker() {
  return (
    <Marquee duration={34}>
      {profile.stack.map((tech, i) => (
        <span
          key={i}
          className="poster inline-flex items-center gap-[0.5em] whitespace-nowrap font-display text-[clamp(34px,6vw,96px)] leading-none text-foreground"
        >
          {tech}
          <span aria-hidden className="text-[0.5em] text-[color:var(--water)]">
            ＋
          </span>
        </span>
      ))}
    </Marquee>
  );
}

/** Velocity-reactive wrapper: fast scrolling skews the track, springs back. */
function SkewOnVelocity({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skewRaw = useTransform(scrollVelocity, [-1400, 1400], [-5, 5]);
  const skewX = useSpring(skewRaw, { stiffness: 220, damping: 28, mass: 0.6 });
  return <motion.div style={{ skewX }}>{children}</motion.div>;
}

/**
 * One headline line that swings up into place from a tilted 3D plane, the
 * entrance's impact beat (real depth via CSS perspective, no WebGL). The
 * outer span carries the perspective; the inner motion span pivots on its
 * bottom edge so the line rotates upright rather than sliding. `still`
 * (reduced motion) renders it flat and instant.
 */
function HeroLine({
  children,
  className = '',
  delay,
  still,
}: {
  children: ReactNode;
  className?: string;
  delay: number;
  still: boolean;
}) {
  if (still) return <span className={`block ${className}`}>{children}</span>;
  return (
    <span className={`block [perspective:1200px] ${className}`}>
      <motion.span
        className="block origin-bottom [transform-style:preserve-3d] will-change-transform"
        initial={{ opacity: 0, rotateX: -72, y: '30%' }}
        animate={{ opacity: 1, rotateX: 0, y: '0%' }}
        transition={{ duration: 0.95, delay, ease: EASE.snappy }}
      >
        {children}
      </motion.span>
    </span>
  );
}
