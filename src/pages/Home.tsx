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
  useTransform,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { getFeaturedProjects } from '@/data/projects';
import { SEOHead } from '@/components/seo/SEOHead';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';
import { Marquee } from '@/components/effects/Marquee';
import { CountUp } from '@/components/effects/CountUp';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { EASE } from '@/lib/motion';

/**
 * Home — cinematic entry, reskinned to match Portfolio.html.
 *
 * The hero uses a sticky Framer Motion period portal: the final dot in
 * "Goyal." expands into a fluid mask that carries the page into About.
 */
export default function Home() {
  const featured = getFeaturedProjects();
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
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

    const next = {
      width,
      height,
      hero: readAnchor(heroDotRef.current, { x: width * 0.66, y: height * 0.5 }),
      about: readAnchor(aboutDotRef.current, { x: width * 0.75, y: height * 0.18 }),
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
    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener('resize', schedulePortalMeasure);
      if (measureFrameRef.current !== null) {
        window.cancelAnimationFrame(measureFrameRef.current);
      }
    };
  }, [measurePortalAnchors, schedulePortalMeasure]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const { scrollYProgress: workScrollYProgress } = useScroll({
    target: workRef,
    offset: ['start end', 'start center'],
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
  const workWipeY = useTransform(workScrollYProgress, [0, 1], ['115%', '0%']);
  const workAccentScale = useTransform(workScrollYProgress, [0.15, 0.85], [0, 1]);
  const workGlowOpacity = useTransform(workScrollYProgress, [0, 0.55, 1], [0, 1, 0.35]);

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
              transition={{ duration: 0.9, delay: 0.4, ease: EASE.snappy }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-[var(--surface-premium)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80 backdrop-blur-md"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-primary" />
              Portfolio · 2026
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: EASE.snappy }}
              className="inline-flex items-center rounded-full border border-border bg-[var(--surface-premium)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70 backdrop-blur-md"
            >
              {profile.tagline}
            </motion.span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.16,
                  delayChildren: 0.65,
                },
              },
            }}
            className="select-none text-center font-display text-[clamp(80px,16vw,280px)] leading-[0.85] tracking-[-0.03em] text-foreground"
          >
            {[
              { text: 'Shaurya', className: 'block' },
              { text: 'Goyal', className: 'inline italic text-foreground/55' },
            ].map((line) => (
              <motion.span
                key={line.text}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 42,
                    scale: 0.97,
                    filter: 'blur(14px)',
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    transition: {
                      duration: 1.1,
                      ease: EASE.snappy,
                    },
                  },
                }}
                className={line.className}
              >
                {line.text}
              </motion.span>
            ))}
            <motion.span
              ref={heroDotRef}
              style={{ opacity: reducedMotion ? 1 : heroDotOpacity }}
              aria-hidden
              className="ml-[0.018em] inline-block size-[0.062em] translate-y-[0.035em] rounded-full bg-primary align-baseline"
            />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            style={{ opacity: supportOpacity }}
            transition={{ duration: 1, delay: 1.3, ease: EASE.snappy }}
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
              transition={{ duration: 1, delay: 1.7, ease: EASE.snappy }}
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
              transition={{ duration: 1, delay: 1.7, ease: EASE.snappy }}
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
                <span>About</span>
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
                  Type, motion, and the obsession with details no one notices.
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
                      to={featured.length}
                      className="font-display text-[clamp(40px,5vw,68px)] leading-none tracking-[-0.02em] text-foreground"
                    />
                  }
                  label="Projects shipped"
                  detail="Two real live builds, kept intentional instead of padded."
                />
                <StatCard
                  value={
                    <span className="font-display text-[clamp(40px,5vw,68px)] leading-none tracking-[-0.02em] text-foreground">
                      2y+
                    </span>
                  }
                  label="Building for the web"
                  detail="Taste, layout, motion, stack choice, and launch flow."
                />
                <StatCard
                  value={
                    <span className="font-display text-[clamp(40px,5vw,68px)] leading-none tracking-[-0.02em] text-foreground">
                      100%
                    </span>
                  }
                  label="Hands-on direction"
                  detail="No template dump: each section is shaped around the business."
                />
                <div className="flex items-baseline justify-center sm:col-span-3">
                  <Link
                    to="/about"
                    data-cursor="hover"
                    className="group inline-flex items-center gap-3 rounded-full border border-[color:var(--water-soft)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:border-[color:var(--water)] hover:text-foreground"
                  >
                    More about me
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section
        ref={workRef}
        className="relative z-[3] overflow-hidden border-t border-border bg-background px-6 py-20 md:px-10 md:py-28"
      >
        <motion.div
          aria-hidden
          style={{ y: workWipeY }}
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-48 overflow-hidden bg-[linear-gradient(180deg,color-mix(in_oklch,var(--water)_10%,transparent),transparent)]"
        >
          <div className="absolute -top-20 left-1/2 h-40 w-full -translate-x-1/2 rounded-[50%] bg-background md:w-[130vw]" />
          <motion.div
            style={{ opacity: workGlowOpacity }}
            className="absolute -top-16 left-1/2 h-32 w-full -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,var(--water-glow),transparent_62%)] md:w-[110vw]"
          />
          <motion.div
            style={{ scaleX: workAccentScale, transformOrigin: 'center' }}
            className="absolute left-6 right-6 top-0 h-px bg-[linear-gradient(90deg,var(--primary),var(--water))] md:left-10 md:right-10"
          />
        </motion.div>
        <div className="relative z-[1] mx-auto max-w-[1440px]">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="mb-5 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
                <span className="text-primary">02</span>Selected work
              </div>
              <h2 className="font-display text-[clamp(44px,7vw,104px)] leading-[0.92] tracking-[-0.025em] text-foreground">
                <SplitTextReveal text="Recent" stagger={0.04} />
                <span className="block italic text-foreground/55">
                  <SplitTextReveal
                    text="builds."
                    stagger={0.04}
                    delay={0.1}
                  />
                </span>
              </h2>
            </div>
            <Link
              to="/work"
              data-cursor="hover"
              className="hidden whitespace-nowrap rounded-sm font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background md:inline-flex"
            >
              View archive →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
            {featured.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                total={featured.length}
                aspectRatio="landscape"
              />
            ))}
          </div>

          <div className="mt-12 md:hidden">
            <Link
              to="/work"
              data-cursor="hover"
              className="rounded-sm font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              View archive →
            </Link>
          </div>
        </div>
      </section>

      {/* TECH MARQUEE */}
      <section className="relative z-[3] overflow-hidden border-y border-border bg-background py-12 md:py-16">
        <Marquee speed={60}>
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
      </section>

      {/* CTA */}
      <section className="relative z-[3] bg-background px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
            <span className="text-primary">03</span>Index
          </div>
          <Link
            to="/work"
            data-cursor="view"
            data-cursor-label="Open work"
            className="group block"
          >
            <h2 className="font-display text-[clamp(64px,11vw,180px)] leading-[0.9] tracking-[-0.03em] text-foreground transition-colors group-hover:text-primary">
              See the
              <span className="ml-6 italic">work →</span>
            </h2>
          </Link>
        </div>
      </section>
    </>
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
