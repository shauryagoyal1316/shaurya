import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
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
 * The hero scales up + blurs out + lifts on first scroll (Apple-style),
 * driven through a spring so the transition has weight rather than feeling
 * mechanical. Tags drift in from the corners; the subtitle eases up beneath
 * the headline; the bottom-row scroll cue + location fade in last.
 */
export default function Home() {
  const featured = getFeaturedProjects();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });
  const heroScale = useTransform(smoothProgress, [0, 1], [1, 1.18]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.65, 1], [1, 0.4, 0]);
  const heroBlur = useTransform(
    smoothProgress,
    [0, 1],
    ['blur(0px)', 'blur(14px)']
  );
  const heroY = useTransform(smoothProgress, [0, 1], ['0%', '-14%']);

  return (
    <>
      <SEOHead />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative h-[100svh] w-full overflow-hidden bg-background"
      >
        <motion.div
          style={{
            scale: heroScale,
            opacity: heroOpacity,
            filter: heroBlur,
            y: heroY,
          }}
          className="relative z-[2] flex h-full flex-col items-center justify-center px-6"
        >
          {/* Top tag row */}
          <div className="absolute inset-x-6 top-24 flex flex-wrap items-center justify-between gap-3 md:inset-x-10">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: EASE.snappy }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80 backdrop-blur-md"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-primary" />
              Portfolio · 2026
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: EASE.snappy }}
              className="inline-flex items-center rounded-full border border-border bg-background/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70 backdrop-blur-md"
            >
              {profile.tagline}
            </motion.span>
          </div>

          {/* Headline */}
          <h1 className="select-none text-center font-display text-[clamp(80px,16vw,280px)] leading-[0.85] tracking-[-0.03em] text-foreground">
            <span className="block">Shaurya</span>
            <span className="block italic text-foreground/55">Goyal.</span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 1.3, ease: EASE.snappy }}
            className="mt-9 max-w-xl text-balance text-center text-base font-light leading-relaxed text-foreground/70 md:text-lg"
          >
            {profile.heroIntroduction}
          </motion.p>

          {/* Bottom row */}
          <div className="absolute inset-x-6 bottom-9 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50 md:inset-x-10">
            <motion.button
              type="button"
              onClick={() => {
                // Use Lenis if it's running so this doesn't fight the
                // smooth-scroll momentum; fall back to native otherwise.
                try {
                  const lenis = (
                    window as unknown as {
                      __lenis?: {
                        scrollTo?: (t: number, o?: object) => void;
                      };
                    }
                  ).__lenis;
                  if (lenis && typeof lenis.scrollTo === 'function') {
                    lenis.scrollTo(window.innerHeight);
                    return;
                  }
                } catch {
                  /* fall through to native */
                }
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: 'smooth',
                });
              }}
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
          </div>
        </motion.div>
      </section>

      {/* INTRO / ABOUT TEASER */}
      <section className="relative z-[3] border-t border-border bg-background px-6 py-32 md:px-10 md:py-48">
        <div className="mx-auto max-w-5xl">
          <div className="mb-9 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
            <span className="text-primary">01</span>About
          </div>
          <h2 className="font-display text-[clamp(36px,5.5vw,84px)] leading-[1.05] tracking-[-0.02em] text-foreground">
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
            className="mt-14 grid grid-cols-2 gap-y-8 border-t border-border pt-7 sm:grid-cols-4"
          >
            <Stat
              value={
                <CountUp
                  to={featured.length}
                  className="font-display text-[clamp(40px,4vw,56px)] leading-none tracking-[-0.02em] text-foreground"
                />
              }
              label="Projects shipped"
            />
            <Stat
              value={
                <span className="font-display text-[clamp(40px,4vw,56px)] leading-none tracking-[-0.02em] text-foreground">
                  2y+
                </span>
              }
              label="Building for the web"
            />
            <Stat
              value={
                <span className="font-display text-[clamp(40px,4vw,56px)] leading-none tracking-[-0.02em] text-foreground">
                  100%
                </span>
              }
              label="Hands-on direction"
            />
            <div className="flex items-baseline justify-end">
              <Link
                to="/about"
                data-cursor="hover"
                className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:text-foreground"
              >
                More about me
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="relative z-[3] border-t border-border bg-background px-6 py-32 md:px-10 md:py-48">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
                <span className="text-primary">02</span>Selected work
              </div>
              <h2 className="font-display text-[clamp(48px,9vw,144px)] leading-[0.92] tracking-[-0.025em] text-foreground">
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
              className="font-display text-[clamp(40px,7vw,112px)] italic leading-none text-foreground"
            >
              {tech}
              <span className="mx-7 text-primary">✦</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* CTA */}
      <section className="relative z-[3] bg-background px-6 py-32 md:px-10 md:py-48">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-9 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
            <span className="text-primary">03</span>Index
          </div>
          <Link
            to="/work"
            data-cursor="view"
            data-cursor-label="Open work"
            className="group block"
          >
            <h2 className="font-display text-[clamp(80px,16vw,280px)] leading-[0.85] tracking-[-0.03em] text-foreground transition-colors group-hover:text-primary">
              See the
              <span className="ml-6 italic">work →</span>
            </h2>
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div>
      <div>{value}</div>
      <div className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
        {label}
      </div>
    </div>
  );
}
