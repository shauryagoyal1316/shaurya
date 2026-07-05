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
import { CountUp } from '@/components/effects/CountUp';
import { TiltCard } from '@/components/effects/TiltCard';
import { getIntroOffset } from '@/components/effects/Preloader';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { EASE } from '@/lib/motion';

const CONTACT_HREF =
  'mailto:seekshaurya@gmail.com?subject=Website%20for%20my%20business';

const MANIFESTO =
  'Most small-business websites are templates wearing a logo. Yours should feel impossible to buy off a shelf — the type, the motion, the details no one notices but everyone feels.';

const capabilities = [
  {
    num: '01',
    title: 'Design direction',
    body: 'Typography, layout, colour, and pacing chosen for your business — not pulled from a theme. Every page is composed, not filled.',
    tags: ['Type systems', 'Layout', 'Brand feel'],
  },
  {
    num: '02',
    title: 'Full-stack build',
    body: 'Front end, back end, forms, bookings — built as one system, deployed on your own domain, fast on any phone.',
    tags: ['React', 'TypeScript', 'Supabase'],
  },
  {
    num: '03',
    title: 'Motion & feel',
    body: 'The difference between a page and an experience: scroll choreography, micro-interactions, and restraint where it counts.',
    tags: ['Framer Motion', 'Scroll design', '60fps'],
  },
  {
    num: '04',
    title: 'Launch & aftercare',
    body: 'Domain, hosting, and the basics that make Google notice — live in about two weeks, and kept alive after launch.',
    tags: ['Deploy', 'SEO basics', 'Care plan'],
  },
];

const processSteps = [
  {
    num: '01',
    title: 'Discover',
    line: 'A 30-minute conversation becomes a one-page brief.',
  },
  {
    num: '02',
    title: 'Build',
    line: 'A working preview link on your phone within days.',
  },
  {
    num: '03',
    title: 'Launch',
    line: 'Live on your domain — pay the balance only if you take it.',
  },
];

/**
 * Home — cinematic entry. The hero uses a sticky Framer Motion period
 * portal: the final dot in "Goyal." expands into a fluid mask that carries
 * the page into the positioning statement. Below: scroll-scrubbed manifesto,
 * sticky-stacking capability cards, a velocity-reactive marquee, the process
 * tease, and the contact set-piece.
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

  // Exact-anchor portal: expand from hero period, move while full-screen,
  // then shrink into the About period without drifting through the layout.
  const heroScale = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.34], [1, 1, 1.06, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18, 0.32], [1, 0.9, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.05, 0.32], ['0%', '0%', '-3%']);
  const heroRotateX = useTransform(scrollYProgress, [0, 0.05, 0.32], [0, 0, -2]);
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

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative h-[180svh] md:h-[265svh] w-full bg-background"
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden [perspective:1200px]">
          <motion.div
            style={{
              scale: heroScale,
              opacity: heroOpacity,
              y: heroY,
              rotateX: heroRotateX,
              transformPerspective: 1200,
              transformOrigin: 'center 58%',
            }}
            className="relative z-[2] flex h-full flex-col items-center justify-center px-6"
          >
          {/* Top tag row */}
          <motion.div
            style={{ opacity: supportOpacity }}
            className="absolute inset-x-6 top-24 flex flex-wrap items-center justify-between gap-3 md:inset-x-10"
          >
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: intro + 0.4, ease: EASE.snappy }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-[var(--surface-premium)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80 backdrop-blur-md"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-primary" />
              Websites, built properly
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: intro + 0.55, ease: EASE.snappy }}
              className="inline-flex items-center rounded-full border border-border bg-[var(--surface-premium)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70 backdrop-blur-md"
            >
              {profile.tagline}
            </motion.span>
          </motion.div>

          {/* Headline — per-character masked rise */}
          <h1 className="select-none text-center font-display text-[clamp(80px,16vw,280px)] leading-[0.85] tracking-[-0.03em] text-foreground">
            <SplitTextReveal
              text="Shaurya"
              className="block"
              once={false}
              delay={intro + 0.55}
              stagger={0.05}
            />
            <span className="inline italic text-foreground/55">
              <SplitTextReveal
                text="Goyal"
                once={false}
                delay={intro + 0.9}
                stagger={0.055}
              />
            </span>
            <motion.span
              ref={heroDotRef}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: intro + 1.3, ease: EASE.bounce }}
              style={{ opacity: reducedMotion ? 1 : heroDotOpacity }}
              aria-hidden
              className="ml-[0.018em] inline-block size-[0.062em] translate-y-[0.035em] rounded-full bg-primary align-baseline"
            />
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            style={{ opacity: supportOpacity }}
            transition={{ duration: 1, delay: intro + 1.35, ease: EASE.snappy }}
            className="mt-9 max-w-xl text-balance text-center text-base font-light leading-relaxed text-foreground/70 md:text-lg"
          >
            {profile.heroIntroduction}
          </motion.p>

          {/* Bottom row */}
          <motion.div
            style={{ opacity: supportOpacity }}
            className="absolute inset-x-6 bottom-9 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50 md:inset-x-10"
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
              transition={{ duration: 1, delay: intro + 1.7, ease: EASE.snappy }}
              className="inline-flex items-center rounded-sm px-2 py-1 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Scroll
              <motion.span
                className="ml-2 inline-block"
                animate={{ y: [0, 4, 0] }}
                transition={{
                  duration: 1.6,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
              >
                ↓
              </motion.span>
            </motion.button>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: intro + 1.7, ease: EASE.snappy }}
            >
              {profile.location}
            </motion.div>
          </motion.div>
          </motion.div>

          <motion.div
            style={{ opacity: aboutOpacity, y: aboutLift }}
            className="absolute inset-0 z-[2] flex items-center px-6 py-24 md:px-10"
          >
            <div className="mx-auto w-full max-w-5xl text-center">
              <div className="mb-6 inline-flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
                <span className="text-primary">01</span>
                <span>The offer</span>
              </div>
              <h2 className="mx-auto max-w-4xl font-display text-[clamp(32px,5vw,72px)] leading-[1.02] tracking-[-0.02em] text-foreground">
                I build websites end-to-end
                <motion.span
                  ref={aboutDotRef}
                  style={{ opacity: reducedMotion ? 1 : aboutDotOpacity }}
                  aria-hidden
                  className="ml-[0.035em] inline-block size-[0.09em] translate-y-[0.015em] rounded-full bg-primary align-baseline"
                />
                <span className="mt-3 block italic text-foreground/55">
                  Designed, built, and live on your domain.
                </span>
              </h2>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE.snappy }}
                className="mx-auto mt-9 grid max-w-4xl gap-3 border-t border-border pt-5 text-left sm:grid-cols-3"
              >
                <StatCard
                  value={
                    <CountUp
                      to={14}
                      className="font-display text-[clamp(40px,5vw,68px)] leading-none tracking-[-0.02em] text-foreground"
                    />
                  }
                  label="Days, brief to live"
                  detail="From the first conversation to a live URL on your own domain."
                />
                <StatCard
                  value={
                    <CountUp
                      to={5}
                      className="font-display text-[clamp(40px,5vw,68px)] leading-none tracking-[-0.02em] text-foreground"
                    />
                  }
                  label="Pages, designed from zero"
                  detail="Home to contact — no templates, nothing off a shelf."
                />
                <StatCard
                  value={
                    <CountUp
                      to={20}
                      suffix="%"
                      className="font-display text-[clamp(40px,5vw,68px)] leading-none tracking-[-0.02em] text-foreground"
                    />
                  }
                  label="All it takes to start"
                  detail="The balance is only due if you decide to take the site."
                />
                <div className="flex items-baseline justify-center sm:col-span-3">
                  <Link
                    to="/services"
                    data-cursor="hover"
                    className="group inline-flex items-center gap-3 rounded-full border border-[color:var(--water-soft)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:border-[color:var(--water)] hover:text-foreground"
                  >
                    The full offer
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 02 — MANIFESTO (scroll-scrubbed) */}
      <section className="relative z-[3] border-t border-border bg-background px-6 py-24 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
            <span className="text-primary">02</span>The point
          </div>
          <ScrollScrubText
            text={MANIFESTO}
            className="max-w-5xl font-display text-[clamp(30px,4.6vw,64px)] leading-[1.14] tracking-[-0.02em] text-foreground"
          />
        </div>
      </section>

      {/* 03 — CAPABILITIES (sticky stack) */}
      <section className="relative z-[3] border-t border-border bg-background px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-14">
            <div className="mb-5 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
              <span className="text-primary">03</span>What you're paying for
            </div>
            <h2 className="font-display text-[clamp(44px,7vw,104px)] leading-[0.92] tracking-[-0.025em] text-foreground">
              <SplitTextReveal text="The whole" stagger={0.04} />
              <span className="block italic text-foreground/55">
                <SplitTextReveal text="craft." stagger={0.04} delay={0.1} />
              </span>
            </h2>
          </div>

          <div ref={capRef} className="flex flex-col gap-8 pb-8 md:gap-10">
            {capabilities.map((cap, i) => (
              <CapabilityCard
                key={cap.num}
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

      {/* TECH MARQUEE — velocity-reactive */}
      <section className="relative z-[3] overflow-hidden border-y border-border bg-background py-12 md:py-16">
        <motion.div style={reducedMotion ? undefined : { skewX: marqueeSkew }}>
          <Marquee duration={34}>
            {profile.stack.map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-[0.38em] whitespace-nowrap font-display text-[clamp(40px,7vw,112px)] italic leading-none text-foreground"
              >
                {tech}
                <span
                  aria-hidden
                  className="not-italic text-primary"
                >
                  ✦
                </span>
              </span>
            ))}
          </Marquee>
        </motion.div>
      </section>

      {/* 04 — PROCESS TEASE */}
      <section className="relative z-[3] bg-background px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-5 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
                <span className="text-primary">04</span>How it works
              </div>
              <h2 className="font-display text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-foreground">
                Three steps,
                <span className="ml-4 italic text-foreground/55">two weeks.</span>
              </h2>
            </div>
            <Link
              to="/services"
              data-cursor="hover"
              className="hidden whitespace-nowrap rounded-sm font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background md:inline-flex"
            >
              Full offer & pricing →
            </Link>
          </div>

          <div className="border-t border-border">
            {processSteps.map((step) => (
              <div key={step.num} className="overflow-hidden border-b border-border">
                <motion.div
                  initial={{ y: '60%', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-8% 0px' }}
                  transition={{ duration: 0.8, ease: EASE.snappy }}
                  className="grid gap-2 py-8 md:grid-cols-12 md:items-baseline md:gap-8"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary md:col-span-1">
                    {step.num}
                  </div>
                  <div className="font-display text-3xl italic leading-none text-foreground md:col-span-3 md:text-4xl">
                    {step.title}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/65 md:col-span-8 md:text-base">
                    {step.line}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              to="/services"
              data-cursor="hover"
              className="rounded-sm font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Full offer & pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* 05 — CTA */}
      <section className="relative z-[3] bg-background px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
            <span className="text-primary">05</span>Contact
          </div>
          <a
            href={CONTACT_HREF}
            data-cursor="view"
            data-cursor-label="Email me"
            className="group block"
          >
            <h2 className="font-display text-[clamp(64px,11vw,180px)] leading-[0.9] tracking-[-0.03em] text-foreground transition-colors group-hover:text-primary">
              Start
              <span className="ml-6 italic">yours →</span>
            </h2>
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              to="/services"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 rounded-full border border-border px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Services & pricing
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
              One email · reply within a day
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
      // bg-background (opaque) so pinned cards occlude each other cleanly —
      // the translucent surface tokens would let the stack show through.
      className="relative origin-top overflow-hidden rounded-xl border border-border bg-background p-8 shadow-[var(--shadow-lg)] md:p-14"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,var(--primary),var(--water),transparent)] opacity-70"
      />
      <div className="flex items-start justify-between gap-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
          {cap.num}
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          {cap.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <h3 className="mt-10 font-display text-[clamp(32px,5vw,72px)] leading-[0.98] tracking-[-0.02em] text-foreground md:mt-16">
        {cap.title}
        <span className="text-primary">.</span>
      </h3>
      <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-foreground/68 md:text-lg">
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

function StatCard({
  value,
  label,
  detail,
}: {
  value: ReactNode;
  label: string;
  detail: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-[var(--surface-premium)] p-6 shadow-[var(--shadow-md)] backdrop-blur-md transition-colors hover:border-[color:var(--water-soft)]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,var(--primary),var(--water),transparent)] opacity-70"
      />
      <div>{value}</div>
      <div className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
        {label}
      </div>
      <p className="mt-5 max-w-xs text-sm leading-relaxed text-foreground/58">
        {detail}
      </p>
    </div>
  );
}
