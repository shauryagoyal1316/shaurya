import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { getFeaturedProjects, projects } from '@/data/projects';
import { SEOHead } from '@/components/seo/SEOHead';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';
import { Marquee } from '@/components/effects/Marquee';
import { CountUp } from '@/components/effects/CountUp';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { EASE } from '@/lib/motion';

/**
 * Home — the cinematic entry. Spring-driven scroll exit on the hero so the
 * scale + blur + lift feel like physical motion rather than a linear tween.
 * Tags drift in from the corners; subtitle eases up beneath the headline.
 */
export default function Home() {
  const featured = getFeaturedProjects();
  const heroRef = useRef<HTMLElement>(null);

  // Apple-style "scales out + blurs + dissolves" on first scroll, but
  // wrapped through a spring so it never feels mechanical.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });
  const heroScale = useTransform(smoothProgress, [0, 1], [1, 1.5]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.65, 1], [1, 0.4, 0]);
  const heroBlur = useTransform(smoothProgress, [0, 1], ['blur(0px)', 'blur(14px)']);
  const heroY = useTransform(smoothProgress, [0, 1], ['0%', '-22%']);

  return (
    <>
      <SEOHead />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative h-[100vh] w-full overflow-hidden bg-background"
      >
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity, filter: heroBlur, y: heroY }}
          className="relative z-[2] flex h-full flex-col items-center justify-center px-6"
        >
          {/* Footer-style name, visible on first landing viewport */}
          <h1 className="select-none text-center font-display text-[20vw] leading-[0.85] tracking-tight text-foreground/95 sm:text-[16vw] md:text-[14vw] lg:text-[12vw]">
            <span className="block">Shaurya</span>
            <span className="block italic text-foreground/60">Goyal.</span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 1.3, ease: EASE.snappy }}
            className="mt-10 max-w-xl text-balance text-center text-base font-light leading-relaxed text-foreground/70 md:text-lg"
          >
            {profile.heroIntroduction}
          </motion.p>

          {/* Bottom row */}
          <div className="absolute inset-x-0 bottom-8 flex items-center justify-between px-6 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50 md:px-10">
            <motion.button
              type="button"
              onClick={() => {
                // Use Lenis if it's running so this doesn't fight the
                // smooth-scroll momentum; fall back to native otherwise.
                const lenis = (window as unknown as {
                  __lenis?: { scrollTo: (t: number, o?: object) => void };
                }).__lenis;
                if (lenis) {
                  lenis.scrollTo(window.innerHeight);
                } else {
                  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }
              }}
              data-cursor="hover"
              aria-label="Scroll to next section"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.7, ease: EASE.snappy }}
              className="inline-flex items-center rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Scroll
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
          <div className="mb-10 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
            <span className="mr-3 text-primary">01</span>About
          </div>
          <h2 className="font-display text-4xl leading-[1.05] text-foreground/90 md:text-6xl lg:text-7xl">
            <SplitTextReveal
              text="I build cinematic, high-craft web interfaces."
              stagger={0.022}
            />
            <span className="mt-4 block italic text-foreground/55">
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
            className="mt-12 flex flex-wrap items-baseline gap-x-12 gap-y-6 border-t border-border pt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60"
          >
            <div>
              <CountUp to={projects.length} className="font-display text-5xl normal-case tracking-normal text-foreground" />
              <div className="mt-1">Projects shipped</div>
            </div>
            <div>
              <span className="font-display text-5xl normal-case tracking-normal text-foreground">2y+</span>
              <div className="mt-1">Building for the web</div>
            </div>
            <div className="ml-auto">
              <Link
                to="/about"
                data-cursor="hover"
                className="group inline-flex items-center gap-3 text-foreground transition-colors hover:text-primary"
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
          <div className="mb-16 flex items-end justify-between gap-6">
            <div>
              <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
                <span className="mr-3 text-primary">02</span>Selected work
              </div>
              <h2 className="font-display text-5xl leading-[0.95] text-foreground md:text-7xl lg:text-[8rem]">
                <SplitTextReveal text="Recent" stagger={0.04} />
                <span className="block italic text-foreground/55">
                  <SplitTextReveal text="builds." stagger={0.04} delay={0.1} />
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

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} aspectRatio="landscape" />
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
              className="font-display text-6xl italic text-foreground/80 md:text-8xl"
            >
              {tech}
              <span className="mx-8 text-primary">✦</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* CTA */}
      <section className="relative z-[3] bg-background px-6 py-32 md:px-10 md:py-48">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
            <span className="mr-3 text-primary">03</span>Index
          </div>
          <Link
            to="/work"
            data-cursor="view"
            className="group block"
          >
            <h2 className="font-display text-[18vw] leading-[0.85] text-foreground transition-colors group-hover:text-primary md:text-[14vw]">
              See the
              <span className="ml-6 italic">work →</span>
            </h2>
          </Link>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link
              to="/about"
              data-cursor="hover"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60 transition-colors hover:text-foreground"
            >
              About me →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
