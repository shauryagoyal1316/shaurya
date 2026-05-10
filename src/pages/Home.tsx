import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
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

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const { scrollYProgress: workScrollYProgress } = useScroll({
    target: workRef,
    offset: ['start end', 'start center'],
  });
  // Raw scroll progress drives the period portal into the About teaser.
  const heroScale = useTransform(scrollYProgress, [0, 0.38, 0.7], [1, 1.06, 0.96]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.58, 0.82], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], ['0%', '-10%']);
  const heroRotateX = useTransform(scrollYProgress, [0, 0.75], [0, -7]);
  const supportOpacity = useTransform(scrollYProgress, [0, 0.28, 0.52], [1, 0.58, 0]);
  const portalScale = useTransform(scrollYProgress, [0, 0.2, 0.42, 0.76, 1], [0, 0, 0.14, 2.65, 3.2]);
  const portalY = useTransform(scrollYProgress, [0, 0.58], ['0vh', '-8vh']);
  const portalOpacity = useTransform(scrollYProgress, [0, 0.18, 0.28, 0.82, 0.98], [0, 0, 1, 1, 0]);
  const portalGlowOpacity = useTransform(scrollYProgress, [0.18, 0.48, 0.9], [0, 1, 0]);
  const aboutLift = useTransform(scrollYProgress, [0.62, 1], [72, 0]);
  const aboutOpacity = useTransform(scrollYProgress, [0.58, 0.92], [0, 1]);
  const workWipeY = useTransform(workScrollYProgress, [0, 1], ['115%', '0%']);
  const workAccentScale = useTransform(workScrollYProgress, [0.15, 0.85], [0, 1]);
  const workGlowOpacity = useTransform(workScrollYProgress, [0, 0.55, 1], [0, 1, 0.35]);

  return (
    <>
      <SEOHead />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative h-[155svh] w-full bg-background"
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden [perspective:1200px]">
          <motion.div
            aria-hidden
            style={{ opacity: portalGlowOpacity }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[72vmin] w-[72vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--water)_24%,transparent),transparent_64%)]"
          />
          <motion.div
            aria-hidden
            style={{
              scale: reducedMotion ? 0 : portalScale,
              y: portalY,
              opacity: reducedMotion ? 0 : portalOpacity,
              boxShadow:
                '0 0 0 1px color-mix(in oklch, var(--water) 28%, transparent), 0 0 96px var(--water-glow)',
            }}
            className="pointer-events-none absolute left-[calc(50%+5.1rem)] top-[calc(50%+1.1rem)] z-[4] h-[34vmax] w-[34vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--portal-solid)] md:left-[calc(50%+8.5rem)] md:top-[calc(50%+1.4rem)]"
          />
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
            <span className="inline italic text-[var(--water-deep)]">.</span>
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
        </div>
      </section>

      {/* INTRO / ABOUT TEASER */}
      <motion.section
        style={{ opacity: aboutOpacity, y: aboutLift }}
        className="relative z-[3] overflow-hidden border-t border-border bg-background px-6 py-20 md:px-10 md:py-28"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--water)_16%,transparent),transparent_68%)]"
        />
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
            <span className="text-primary">01</span>
            <span>About</span>
          </div>
          <h2 className="font-display text-[clamp(32px,4.5vw,64px)] leading-[1.05] tracking-[-0.02em] text-foreground">
            <SplitTextReveal
              text="I build websites end to end."
              stagger={0.022}
            />
            <span className="mt-3 block italic text-foreground/55">
              <SplitTextReveal
                text="Type, motion, and the obsession with details no one notices."
                stagger={0.018}
              />
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE.snappy }}
            className="mt-10 grid gap-3 border-t border-border pt-5 sm:grid-cols-3"
          >
            <StatCard
              value={
                <CountUp
                  to={featured.length}
                  className="font-display text-[clamp(44px,5vw,72px)] leading-none tracking-[-0.02em] text-foreground"
                />
              }
              label="Projects shipped"
              detail="Two real live builds, kept intentional instead of padded."
            />
            <StatCard
              value={
                <span className="font-display text-[clamp(44px,5vw,72px)] leading-none tracking-[-0.02em] text-foreground">
                  2y+
                </span>
              }
              label="Building for the web"
              detail="Taste, layout, motion, stack choice, and launch flow."
            />
            <StatCard
              value={
                <span className="font-display text-[clamp(44px,5vw,72px)] leading-none tracking-[-0.02em] text-foreground">
                  100%
                </span>
              }
              label="Hands-on direction"
              detail="No template dump: each section is shaped around the business."
            />
            <div className="flex items-baseline justify-start sm:col-span-3 sm:justify-end">
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
      </motion.section>

      {/* FEATURED WORK */}
      <section
        ref={workRef}
        className="relative z-[3] overflow-hidden border-t border-border bg-background px-6 py-20 md:px-10 md:py-28"
      >
        <motion.div
          aria-hidden
          style={{ y: workWipeY }}
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-48 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--water)_10%,transparent),transparent)]"
        >
          <div className="absolute -top-20 left-1/2 h-40 w-[130vw] -translate-x-1/2 rounded-[50%] bg-background" />
          <motion.div
            style={{ opacity: workGlowOpacity }}
            className="absolute -top-16 left-1/2 h-32 w-[110vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,var(--water-glow),transparent_62%)]"
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

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
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

function StatCard({
  value,
  label,
  detail,
}: {
  value: React.ReactNode;
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
