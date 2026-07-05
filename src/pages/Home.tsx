import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
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
  'Most small-business websites are templates wearing a logo. Yours should read like this page does: drawn for one business, then built to last.';

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
    body: 'Front end, back end, forms, bookings. Built as one system, deployed on your own domain, fast on any phone.',
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
    line: 'Live on your domain. You pay the balance only if you take it.',
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
  const heroDotRef = useRef<HTMLSpanElement>(null);
  const aboutDotRef = useRef<HTMLSpanElement>(null);
  const measureFrameRef = useRef<number | null>(null);
  const [portalMetrics, setPortalMetrics] = useState({
    width: 1,
    height: 1,
    hero: { x: 0, y: 0 },
    about: { x: 0, y: 0 },
  });

  const measurePortalAnchors = useCallback(() => {
    const width = window.innerWidth || 1;
    const height = window.innerHeight || 1;
    const readAnchor = (node: HTMLSpanElement | null, fallback: { x: number; y: number }) => {
      if (!node) return fallback;
      const rect = node.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    };

    const isPortrait = height > width;
    const next = {
      width,
      height,
      hero: readAnchor(heroDotRef.current, {
        x: isPortrait ? width * 0.5  : width  * 0.66,
        y: isPortrait ? height * 0.45 : height * 0.5,
      }),
      about: readAnchor(aboutDotRef.current, {
        x: isPortrait ? width * 0.5  : width  * 0.75,
        y: isPortrait ? height * 0.22 : height * 0.18,
      }),
    };

    setPortalMetrics((current) => {
      const changed =
        Math.abs(current.width - next.width) > 0.5 ||
        Math.abs(current.height - next.height) > 0.5 ||
        Math.abs(current.hero.x - next.hero.x) > 0.5 ||
        Math.abs(current.hero.y - next.hero.y) > 0.5 ||
        Math.abs(current.about.x - next.about.x) > 0.5 ||
        Math.abs(current.about.y - next.about.y) > 0.5;

      return changed ? next : current;
    });
  }, []);

  const schedulePortalMeasure = useCallback(() => {
    if (measureFrameRef.current !== null) return;
    measureFrameRef.current = window.requestAnimationFrame(() => {
      measureFrameRef.current = null;
      measurePortalAnchors();
    });
  }, [measurePortalAnchors]);

  useLayoutEffect(() => {
    measurePortalAnchors();
    const timers = [
      window.setTimeout(measurePortalAnchors, 90),
      window.setTimeout(measurePortalAnchors, 450),
      window.setTimeout(measurePortalAnchors, 1000),
      window.setTimeout(measurePortalAnchors, 1700),
      window.setTimeout(measurePortalAnchors, 2300),
    ];

    window.addEventListener('resize', schedulePortalMeasure);
    window.addEventListener('orientationchange', schedulePortalMeasure);
    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener('resize', schedulePortalMeasure);
      window.removeEventListener('orientationchange', schedulePortalMeasure);
      if (measureFrameRef.current !== null) {
        window.cancelAnimationFrame(measureFrameRef.current);
      }
    };
  }, [measurePortalAnchors, schedulePortalMeasure]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', schedulePortalMeasure);
  }, [scrollYProgress, schedulePortalMeasure]);

  const heroScale = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.34], [1, 1, 1.04, 1.07]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18, 0.32], [1, 0.9, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.05, 0.32], ['0%', '0%', '-3%']);
  const supportOpacity = useTransform(scrollYProgress, [0, 0.12, 0.25], [1, 0.55, 0]);
  const heroDotOpacity = useTransform(scrollYProgress, [0, 0.03, 0.05], [1, 0.75, 0]);
  const aboutDotOpacity = useTransform(scrollYProgress, [0, 0.5, 0.56], [0, 0, 1]);
  const farthestRadius = (point: { x: number; y: number }) =>
    Math.hypot(
      Math.max(point.x, portalMetrics.width - point.x),
      Math.max(point.y, portalMetrics.height - point.y)
    );
  const portalMaxRadius =
    Math.ceil(Math.max(farthestRadius(portalMetrics.hero), farthestRadius(portalMetrics.about))) + 80;
  const portalCx = useTransform(
    scrollYProgress,
    [0, 0.17, 0.27, 0.5],
    [portalMetrics.hero.x, portalMetrics.hero.x, portalMetrics.about.x, portalMetrics.about.x]
  );
  const portalCy = useTransform(
    scrollYProgress,
    [0, 0.17, 0.27, 0.5],
    [portalMetrics.hero.y, portalMetrics.hero.y, portalMetrics.about.y, portalMetrics.about.y]
  );
  const portalRadius = useTransform(
    scrollYProgress,
    [0, 0.05, 0.17, 0.27, 0.5],
    [2, 22, portalMaxRadius, portalMaxRadius, 2]
  );
  const portalOpacity = useTransform(scrollYProgress, [0, 0.02, 0.5, 0.56], [0, 1, 1, 0]);
  const aboutLift = useTransform(scrollYProgress, [0.48, 0.58], [24, 0]);
  const aboutOpacity = useTransform(scrollYProgress, [0.46, 0.56], [0, 1]);

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
      <BodyPortalLayer
        reducedMotion={Boolean(reducedMotion)}
        width={portalMetrics.width}
        height={portalMetrics.height}
        cx={portalCx}
        cy={portalCy}
        radius={portalRadius}
        opacity={portalOpacity}
      />

      {/* SHEET 01 — COVER */}
      <section
        ref={heroRef}
        className="relative h-[180svh] w-full md:h-[265svh]"
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <motion.div
            style={{
              scale: heroScale,
              opacity: heroOpacity,
              y: heroY,
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
                onClick={() =>
                  window.scrollTo({
                    top:
                      (heroRef.current?.offsetTop ?? 0) +
                      (heroRef.current?.offsetHeight ?? window.innerHeight),
                    behavior: 'smooth',
                  })
                }
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
            style={{ opacity: aboutOpacity, y: aboutLift }}
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
                Fourteen days from first call to live URL. Five pages, drawn
                from zero. <Annotate>Twenty percent down</Annotate>, and the
                balance only if you decide to keep the site.
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
            <HandNote className="mb-5">what your money buys ↓</HandNote>
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

      {/* TICKER — velocity-reactive, hung a degree off level */}
      <section
        className="relative z-[3] -mx-[1%] w-[102%] overflow-hidden border-y border-[var(--border-strong)] py-10 md:-rotate-1 md:py-14"
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
              Three steps,
              <span className="ml-4 text-[color:var(--text-secondary)]">two weeks.</span>
            </h2>
            <Link
              to="/services"
              data-cursor="hover"
              className="hidden whitespace-nowrap text-[15px] text-foreground/60 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background md:inline-flex"
            >
              Full offer &amp; pricing →
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
              Full offer &amp; pricing →
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
              <span className="ml-6 text-[color:var(--text-secondary)] transition-colors group-hover:text-primary">
                yours →
              </span>
            </h2>
          </a>
          <div className="mt-10 flex flex-wrap items-center gap-6 md:justify-end">
            <Stamp text="20% down · walk anytime" ink="red" rotate={-5} />
            <Link
              to="/services"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 border border-[var(--border-strong)] px-6 py-3.5 text-[15px] font-medium transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Services &amp; pricing
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

function BodyPortalLayer({
  reducedMotion,
  width,
  height,
  cx,
  cy,
  radius,
  opacity,
}: {
  reducedMotion: boolean;
  width: number;
  height: number;
  cx: MotionValue<number>;
  cy: MotionValue<number>;
  radius: MotionValue<number>;
  opacity: MotionValue<number>;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (reducedMotion || !mounted) return null;

  return createPortal(
    <motion.svg
      aria-hidden
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{
        opacity,
      }}
      className="pointer-events-none fixed inset-0 z-[10000] h-screen w-screen"
    >
      <motion.circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="var(--primary)"
        shapeRendering="geometricPrecision"
      />
    </motion.svg>,
    document.body
  );
}

