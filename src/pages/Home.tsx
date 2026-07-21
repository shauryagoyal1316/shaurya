import { useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  type MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react';
import { profile } from '@/data/profile';
import { SEOHead } from '@/components/seo/SEOHead';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';
import { ScrollScrubText } from '@/components/effects/ScrollScrubText';
import { Marquee } from '@/components/effects/Marquee';
import { TiltCard } from '@/components/effects/TiltCard';
import { getIntroOffset } from '@/components/effects/Preloader';
import {
  Annotate,
  DimensionLine,
  DrawnRule,
  HandNote,
  Stamp,
} from '@/components/effects/drawing';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { usePointerParallax } from '@/hooks/usePointerParallax';
import { EASE } from '@/lib/motion';
import { EMAIL_HREF as CONTACT_HREF, WHATSAPP_HREF } from '@/lib/contact';

const MANIFESTO =
  'Most business websites are templates wearing a logo. Yours should read like this page does: drawn for one business, then built to last.';

const capabilities = [
  {
    key: 'direction',
    title: 'Design direction',
    body: 'Typography, layout, colour, and pacing chosen for your business. Every page gets composed like a poster.',
    note: 'the part templates skip',
  },
  {
    key: 'build',
    title: 'Full-stack build',
    body: 'Front end, back end, forms, bookings, quote requests. Built as one system, deployed on your own domain, fast on any phone.',
    note: 'yes, the backend too',
  },
  {
    key: 'motion',
    title: 'Motion & feel',
    body: 'The difference between a page and an experience: scroll choreography, and restraint where it counts.',
    note: 'why this page feels alive',
  },
  {
    key: 'aftercare',
    title: 'Launch & aftercare',
    body: 'Domain, hosting, and the basics that make Google notice. Live in about two weeks, and kept alive after launch.',
    note: "I don't vanish after launch",
  },
];

const processSteps = [
  {
    word: 'First',
    title: 'Survey',
    line: 'A 30-minute conversation becomes a one-page brief.',
  },
  {
    word: 'Then',
    title: 'Draft',
    line: 'A working preview link on your phone within days.',
  },
  {
    word: 'Last',
    title: 'Build',
    line: 'Live on your domain. You only take it if you love it.',
  },
];

/**
 * Sheet 01 — the cover sheet. The signature dot-portal survives from the
 * old design (the period expands into a full-screen wash and lands on the
 * offer block); everything around it now reads as a working drawing:
 * dimension lines, red-pencil annotations, stamps, title-block cells.
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
  // reduced-motion — the hook returns static values and never listens.
  const { x: pointerX, y: pointerY } = usePointerParallax();
  const blockX = useTransform(pointerX, (v) => v * 6);
  const blockY = useTransform(pointerY, (v) => v * 6);
  const markX = useTransform(pointerX, (v) => v * 6);
  const markY = useTransform(pointerY, (v) => v * 6);
  const lineX = useTransform(pointerX, (v) => v * -10);

  // Sticky-stack progress for the capability cards.
  const capRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: capProgress } = useScroll({
    target: capRef,
    offset: ['start start', 'end end'],
  });

  return (
    <>
      <SEOHead />
      {/* SHEET 01 — COVER. On-load "plotter" entrance: the sheet is drawn in
          front of the visitor in ~1.5s, then gets out of the way. No scroll
          pin and no scroll-linked work — the hero is a normal screen and the
          content below is one short scroll away. */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden px-6 py-28 md:px-10"
      >
        {/* Construction crosshair STRIKES across the sheet — bold drafting
            blue sweeping full-bleed, then settling to a quiet guide. The
            instrument hitting the paper, not a faint hairline. */}
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
          {/* datum marker pops where they cross */}
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
          {/* Headline — each line SWINGS up from a tilted 3D plane (real
              depth, no WebGL), staggered, weighty. This is the impact beat. */}
          <h1 className="select-none font-display text-[clamp(58px,11.5vw,196px)] leading-[0.86] text-foreground">
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
              <Annotate note="no templates. ever." className="align-top text-primary" delay={intro + 0.85}>
                measure
              </Annotate>
              {/* Red period: stamps in big and settles, with an ink ripple
                  striking outward — the punctuation lands, it doesn't fade. */}
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

          {/* Wrapper gates visibility so the dimension line's own reveal
              never plays behind the preloader on a first visit. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: intro + 0.95 }}
            className="mt-6 max-w-3xl"
          >
            <DimensionLine label="drawn to fit · live in two weeks" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: intro + 1.3, ease: EASE.snappy }}
            className="mt-8 max-w-xl text-base font-light leading-relaxed text-[color:var(--text-secondary)] md:text-lg"
          >
            {profile.heroIntroduction}
          </motion.p>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: intro + 1.5 }}
          className="absolute inset-x-6 bottom-9 z-[2] flex items-center justify-between text-[13px] text-foreground/50 md:inset-x-10"
        >
          <button
            type="button"
            onClick={() => {
              const top =
                (heroRef.current?.offsetTop ?? 0) +
                (heroRef.current?.offsetHeight ?? window.innerHeight);
              // Route through Lenis when it's driving the scroll so the glide
              // matches the rest of the page.
              const lenis = (
                window as unknown as {
                  __lenis?: { scrollTo: (target: number) => void };
                }
              ).__lenis;
              if (lenis) lenis.scrollTo(top);
              else window.scrollTo({ top, behavior: 'smooth' });
            }}
            data-cursor="hover"
            aria-label="Scroll to the offer"
            className="inline-flex items-center px-2 py-1 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Keep scrolling
            <motion.span
              className="ml-2 inline-block"
              animate={reducedMotion ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
            >
              ↓
            </motion.span>
          </button>
          <div>{profile.location}</div>
        </motion.div>
      </section>

      {/* THE OFFER — once the portal's landing target, now a plain section a
          single scroll below the hero. */}
      <section className="relative z-[3] border-t border-[var(--border-strong)] px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <HandNote className="mb-6">the offer, in plain terms —</HandNote>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.85, ease: EASE.snappy }}
              className="max-w-4xl font-display text-[clamp(30px,4.6vw,64px)] leading-[0.95] text-foreground"
            >
              Designed, built, and{' '}
              {/* nowrap welds the red period to "live" so it never orphans. */}
              <span className="whitespace-nowrap">
                live
                <span
                  aria-hidden
                  className="ml-[0.06em] inline-block size-[0.11em] translate-y-[-0.04em] bg-[var(--water)] align-baseline"
                />
              </span>
              <span className="mt-2 block text-[color:var(--text-secondary)]">
                on your own domain.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE.snappy }}
            className="mt-9 max-w-2xl text-lg font-light leading-relaxed text-[color:var(--text-secondary)] md:text-xl"
          >
            Fourteen days from first call to live URL. Every page drawn from
            zero. <Annotate>Quoted in writing</Annotate> after one call, and
            you only keep it if you love it.
          </motion.p>
          <div className="mt-9">
            <Link
              to="/services"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 border border-[var(--border-strong)] px-6 py-3.5 text-[15px] font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              See the full offer
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* THE POINT (scroll-scrubbed) — set off-axis, to the right */}
      <section className="relative z-[3] border-t border-[var(--border-strong)] px-6 pb-10 pt-24 md:px-10 md:pb-14 md:pt-40">
        <div className="mx-auto max-w-[1440px] md:flex md:justify-end">
          <div className="md:w-[82%]">
            <ScrollScrubText
              text={MANIFESTO}
              className="max-w-4xl font-sans text-[clamp(26px,4vw,54px)] font-medium leading-[1.2] tracking-[-0.02em] text-foreground"
            />
            {/* Stamp hangs over the next section's rule — paste-up, not grid */}
            <div className="relative z-[4] mt-12 md:-mb-24">
              <Stamp text="Measured twice" ink="blue" rotate={-4} />
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS (sticky stack) */}
      <section className="relative z-[3] border-t border-[var(--border-strong)] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-14">
            <HandNote className="mb-5">what every build includes ↓</HandNote>
            <h2 className="font-display text-[clamp(40px,6.5vw,96px)] leading-[0.88] text-foreground">
              <SplitTextReveal text="The whole" stagger={0.04} />
              <span className="block text-[color:var(--text-secondary)] md:ml-[14%]">
                <SplitTextReveal text="craft." stagger={0.04} delay={0.1} />
              </span>
            </h2>
          </div>

          <div ref={capRef} className="relative flex flex-col gap-8 pb-8 md:gap-10">
            {capabilities.map((cap, i) => (
              <CapabilityCard
                key={cap.key}
                cap={cap}
                index={i}
                count={capabilities.length}
                progress={capProgress}
                still={Boolean(reducedMotion) || isMobile}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TICKER — velocity-reactive, hung a degree off level. The 102%
          bleed only exists to hide the rotated strip's corners, so it is
          md-scoped like the rotation — on phones it would overflow the
          viewport and make mobile Safari zoom the whole layout out. */}
      <section
        className="relative z-[3] overflow-hidden border-y border-[var(--border-strong)] py-10 md:-mx-[1%] md:w-[102%] md:-rotate-1 md:py-14"
      >
        {/* The velocity spring integrates on every scroll frame, so phones
            (where the skew is invisible anyway) render the plain track and
            keep that time. The hooks live in SkewOnVelocity so the spring
            never even mounts on mobile / reduced motion. */}
        {reducedMotion || isMobile ? (
          <StackTicker />
        ) : (
          <SkewOnVelocity>
            <StackTicker />
          </SkewOnVelocity>
        )}
      </section>

      {/* SEQUENCE */}
      <section className="relative z-[3] px-6 py-14 md:px-10 md:py-[4.5rem]">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(34px,4.6vw,64px)] leading-[0.9] text-foreground">
              {/* JSX drops the newline between text and the span, leaving no
                  soft-wrap opportunity — without <wbr /> the heading is one
                  unbreakable run that widens the mobile layout viewport. */}
              Three steps,
              <wbr />
              <span className="ml-4 text-[color:var(--text-secondary)]">two weeks.</span>
            </h2>
            <Link
              to="/services"
              data-cursor="hover"
              className="hidden whitespace-nowrap text-[15px] text-foreground/60 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background md:inline-flex"
            >
              The full offer →
            </Link>
          </div>

          <div className="md:ml-[12%]">
          <DrawnRule strong />
          {processSteps.map((step) => (
            <div key={step.word}>
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '60%', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-8% 0px' }}
                  transition={{ duration: 0.8, ease: EASE.snappy }}
                  className="grid gap-2 py-8 md:grid-cols-12 md:items-baseline md:gap-8"
                >
                  <div className="font-note text-lg text-[color:var(--water)] md:col-span-1">
                    {step.word}
                  </div>
                  <div className="font-display text-3xl leading-none text-foreground md:col-span-3 md:text-4xl">
                    {step.title}
                  </div>
                  <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] md:col-span-8 md:text-base">
                    {step.line}
                  </p>
                </motion.div>
              </div>
              <DrawnRule strong />
            </div>
          ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              to="/services"
              data-cursor="hover"
              className="text-[15px] text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              The full offer →
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT — set hard right, the one right-aligned moment on the page */}
      <section className="relative z-[3] px-6 py-24 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1440px] md:text-right">
          <a
            href={CONTACT_HREF}
            data-cursor="view"
            data-cursor-label="Email me"
            className="group block"
          >
            <h2 className="font-display text-[clamp(56px,10.5vw,170px)] leading-[0.85] text-foreground transition-colors group-hover:text-primary">
              Start
              <wbr />
              <span className="ml-6 text-[color:var(--text-secondary)] transition-colors group-hover:text-primary">
                yours →
              </span>
            </h2>
          </a>
          <div className="mt-10 flex flex-wrap items-center gap-6 md:justify-end">
            <Stamp text="Quoted in writing · walk anytime" ink="red" rotate={-5} />
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 border border-[var(--border-strong)] px-6 py-3.5 text-[15px] font-medium transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              WhatsApp me
              <MessageCircle className="size-4" />
            </a>
            <Link
              to="/services"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 border border-[var(--border-strong)] px-6 py-3.5 text-[15px] font-medium transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Services &amp; process
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <span className="text-sm text-foreground/50">
              Email or WhatsApp. Reply within a day.
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

/** The technology ticker track — shared by both skewed and plain modes. */
function StackTicker() {
  return (
    <Marquee duration={34}>
      {profile.stack.map((tech, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-[0.5em] whitespace-nowrap font-display text-[clamp(34px,6vw,96px)] leading-none text-foreground"
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
 * One headline line that SWINGS up into place from a tilted 3D plane — the
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

function CapabilityCard({
  cap,
  index,
  count,
  progress,
  still,
}: {
  cap: (typeof capabilities)[number];
  index: number;
  count: number;
  progress: MotionValue<number>;
  still: boolean;
}) {
  // Each pinned card eases back as the next one stacks over it.
  const scale = useTransform(
    progress,
    [index / count, 1],
    [1, 1 - (count - index) * 0.04]
  );

  const inner = (
    <motion.div
      style={still ? undefined : { scale }}
      // .paper (opaque + grid) so pinned cards occlude each other cleanly.
      className="paper relative origin-top overflow-hidden border border-[var(--border-strong)] p-8 shadow-[var(--shadow-lg)] md:p-14"
    >
      <div className="flex justify-end">
        <span
          className="font-note text-lg text-[color:var(--water)]"
          style={{ rotate: '-2deg' }}
        >
          {cap.note}
        </span>
      </div>
      <h3 className="mt-8 font-display text-[clamp(30px,4.6vw,64px)] leading-[0.92] text-foreground md:mt-12">
        {cap.title}
        <span className="text-[color:var(--water)]">.</span>
      </h3>
      <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[color:var(--text-secondary)] md:text-lg">
        {cap.body}
      </p>
    </motion.div>
  );

  return (
    <div className="sticky" style={{ top: `calc(88px + ${index * 22}px)` }}>
      {still ? inner : <TiltCard max={2.2} parallax={5}>{inner}</TiltCard>}
    </div>
  );
}

