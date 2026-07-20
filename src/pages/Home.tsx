import { useRef, useState } from 'react';
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
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { SEOHead } from '@/components/seo/SEOHead';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';
import { ScrollScrubText } from '@/components/effects/ScrollScrubText';
import { Marquee } from '@/components/effects/Marquee';
import { TiltCard } from '@/components/effects/TiltCard';
import { getIntroOffset } from '@/components/effects/Preloader';
import { PeriodPortal, PORTAL_TIMELINE } from '@/components/effects/PeriodPortal';
import {
  Annotate,
  DimensionLine,
  DrawnRule,
  HandNote,
  Stamp,
} from '@/components/effects/drawing';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { EASE } from '@/lib/motion';

const CONTACT_HREF =
  'mailto:seekshaurya@gmail.com?subject=Website%20for%20my%20business';

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
  // Frozen at mount: extra delay so hero reveals play after the preloader.
  const [intro] = useState(getIntroOffset);
  const heroRef = useRef<HTMLElement>(null);
  // The sticky, viewport-sized stage both periods live in — the portal's
  // coordinate space.
  const pinRef = useRef<HTMLDivElement>(null);
  const heroDotRef = useRef<HTMLSpanElement>(null);
  const aboutDotRef = useRef<HTMLSpanElement>(null);

  // Progress 0→1 spans exactly the PINNED phase of the cover sheet
  // ('end end' = the moment the sticky stage is released). Every keyframe
  // below lives inside that range, so the whole portal sequence is
  // guaranteed to finish while its landing target is still fixed on
  // screen — this is what keeps the landing exact on every device.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  const T = PORTAL_TIMELINE;
  const heroScale = useTransform(scrollYProgress, [0, T.liftoff, 0.32, 0.55], [1, 1, 1.04, 1.07]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.29, 0.51], [1, 0.9, 0]);
  const heroY = useTransform(scrollYProgress, [0, T.liftoff, 0.51], ['0%', '0%', '-3%']);
  const supportOpacity = useTransform(scrollYProgress, [0, 0.19, 0.4], [1, 0.55, 0]);
  // Faded-out layers also drop visibility so their links can't be tabbed
  // to or tapped through the layer that's actually on screen.
  const heroVisibility = useTransform(heroOpacity, (v) => (v > 0.02 ? 'visible' : 'hidden'));
  // The hero period hands off to the portal square right as it ignites.
  const heroDotOpacity = useTransform(scrollYProgress, [0, T.ignite, T.liftoff], [1, 1, 0]);
  // …and the offer period fades in only once the square has landed on it.
  const aboutDotOpacity = useTransform(scrollYProgress, [0, T.land, T.settle], [0, 0, 1]);
  // The offer block settles (lift → 0) while the wash is still 15×+ the
  // period's size, so the landing target is stationary long before the
  // eye can judge alignment. Settling at 0.78 (land is 0.8) left the
  // square hovering at the resting spot while the text was still rising
  // underneath it.
  const aboutLift = useTransform(scrollYProgress, [0.46, 0.62], [24, 0]);
  const aboutOpacity = useTransform(scrollYProgress, [0.46, 0.6], [0, 1]);
  const aboutVisibility = useTransform(aboutOpacity, (v) => (v > 0.02 ? 'visible' : 'hidden'));

  // Velocity-reactive marquee: fast scrolling skews the track, springs back.
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skewRaw = useTransform(scrollVelocity, [-1400, 1400], [-5, 5]);
  const marqueeSkew = useSpring(skewRaw, { stiffness: 220, damping: 28, mass: 0.6 });

  // Sticky-stack progress for the capability cards.
  const capRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: capProgress } = useScroll({
    target: capRef,
    offset: ['start start', 'end end'],
  });

  return (
    <>
      <SEOHead />
      <PeriodPortal
        progress={scrollYProgress}
        pinRef={pinRef}
        originRef={heroDotRef}
        targetRef={aboutDotRef}
      />

      {/* SHEET 01 — COVER */}
      <section
        ref={heroRef}
        className="relative h-[210svh] w-full md:h-[265svh]"
      >
        <div ref={pinRef} className="sticky top-0 h-[100svh] overflow-hidden">
          <motion.div
            style={{
              scale: heroScale,
              opacity: heroOpacity,
              y: heroY,
              visibility: heroVisibility,
              transformOrigin: 'center 58%',
            }}
            className="relative z-[2] mx-auto flex h-full max-w-[1440px] flex-col justify-center px-6 md:px-10"
          >
            {/* Headline — left-set, measured, annotated */}
            <h1 className="select-none font-display text-[clamp(58px,11.5vw,196px)] leading-[0.86] text-foreground">
              <SplitTextReveal
                text="Websites,"
                className="block"
                once={false}
                delay={intro + 0.5}
                stagger={0.04}
              />
              <SplitTextReveal
                text="built to"
                className="block text-[color:var(--text-secondary)]"
                once={false}
                delay={intro + 0.75}
                stagger={0.04}
              />
              <span className="block">
                <Annotate note="no templates. ever." className="align-top">
                  <SplitTextReveal
                    text="measure"
                    once={false}
                    delay={intro + 1.0}
                    stagger={0.045}
                    className="text-primary"
                  />
                </Annotate>
                <motion.span
                  ref={heroDotRef}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: intro + 1.45, ease: EASE.bounce }}
                  style={{ opacity: reducedMotion ? 1 : heroDotOpacity }}
                  aria-hidden
                  className="ml-[0.05em] inline-block size-[0.1em] translate-y-[-0.06em] bg-[var(--water)] align-baseline"
                />
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ opacity: supportOpacity }}
              transition={{ duration: 0.8, delay: intro + 1.5 }}
              className="mt-6 max-w-3xl"
            >
              <DimensionLine label="drawn to fit · live in two weeks" />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ opacity: supportOpacity }}
              transition={{ duration: 1, delay: intro + 1.6, ease: EASE.snappy }}
              className="mt-8 max-w-xl text-base font-light leading-relaxed text-[color:var(--text-secondary)] md:text-lg"
            >
              {profile.heroIntroduction}
            </motion.p>

            {/* Bottom row */}
            <motion.div
              style={{ opacity: supportOpacity }}
              className="absolute inset-x-6 bottom-9 flex items-center justify-between text-[13px] text-foreground/50 md:inset-x-10"
            >
              <motion.button
                type="button"
                onClick={() => {
                  const top =
                    (heroRef.current?.offsetTop ?? 0) +
                    (heroRef.current?.offsetHeight ?? window.innerHeight);
                  // Route through Lenis when it's driving the scroll, so
                  // the glide matches the rest of the page.
                  const lenis = (
                    window as unknown as {
                      __lenis?: { scrollTo: (target: number) => void };
                    }
                  ).__lenis;
                  if (lenis) lenis.scrollTo(top);
                  else window.scrollTo({ top, behavior: 'smooth' });
                }}
                data-cursor="hover"
                aria-label="Scroll to next section"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: intro + 1.8, ease: EASE.snappy }}
                className="inline-flex items-center px-2 py-1 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Keep scrolling
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
                >
                  ↓
                </motion.span>
              </motion.button>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: intro + 1.8, ease: EASE.snappy }}
              >
                {profile.location}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Portal destination — the offer block */}
          <motion.div
            style={{ opacity: aboutOpacity, y: aboutLift, visibility: aboutVisibility }}
            className="absolute inset-0 z-[2] flex items-center px-6 py-24 md:px-10"
          >
            <div className="mx-auto w-full max-w-5xl">
              <HandNote className="mb-6">the offer, in plain terms —</HandNote>
              <h2 className="max-w-4xl font-display text-[clamp(30px,4.6vw,64px)] leading-[0.95] text-foreground">
                Designed, built, and live
                <motion.span
                  ref={aboutDotRef}
                  style={{ opacity: reducedMotion ? 1 : aboutDotOpacity }}
                  aria-hidden
                  className="ml-[0.06em] inline-block size-[0.11em] translate-y-[-0.04em] bg-[var(--water)] align-baseline"
                />
                <span className="mt-2 block text-[color:var(--text-secondary)]">
                  on your own domain.
                </span>
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE.snappy }}
                className="mt-9 max-w-2xl text-lg font-light leading-relaxed text-[color:var(--text-secondary)] md:text-xl"
              >
                Fourteen days from first call to live URL. Every page drawn
                from zero. <Annotate>Quoted in writing</Annotate> after one
                call, and you only keep it if you love it.
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
          </motion.div>
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

          <div ref={capRef} className="flex flex-col gap-8 pb-8 md:gap-10">
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
        <motion.div style={reducedMotion ? undefined : { skewX: marqueeSkew }}>
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
        </motion.div>
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
            <Link
              to="/services"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 border border-[var(--border-strong)] px-6 py-3.5 text-[15px] font-medium transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Services &amp; process
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <span className="text-sm text-foreground/50">
              One email. Reply within a day.
            </span>
          </div>
        </div>
      </section>
    </>
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

