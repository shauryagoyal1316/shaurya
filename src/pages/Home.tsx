import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { getFeaturedProjects, projects } from '@/data/projects';
import { SEOHead } from '@/components/seo/SEOHead';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';
import { Marquee } from '@/components/effects/Marquee';
import { CountUp } from '@/components/effects/CountUp';
import { MagneticLink } from '@/components/effects/MagneticLink';
import { ProjectCard } from '@/components/portfolio/ProjectCard';

/**
 * Home — the cinematic entry. Hero with split-letter reveal, scroll-driven
 * scale-out into the about teaser, featured work, tech marquee, oversized
 * footer CTA.
 */
export default function Home() {
  const featured = getFeaturedProjects();
  const heroRef = useRef<HTMLElement>(null);

  // Apple-style "small element scales 8x then dissolves" on first scroll.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.4, 0]);
  const heroBlur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(8px)']);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  // Smooth-scroll anchors on the page.
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

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
          {/* Top mono tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50 md:left-10 md:top-10"
          >
            <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-primary align-middle" />
            Portfolio · 2026
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50 md:right-10 md:top-10"
          >
            Frontend Developer / Interface Engineer
          </motion.div>

          {/* The big name */}
          <h1 className="text-balance text-center font-display leading-[0.85] text-foreground">
            <SplitTextReveal
              text="Shaurya"
              as="span"
              className="block text-[22vw] tracking-[-0.04em] md:text-[18vw]"
              stagger={0.05}
            />
            <SplitTextReveal
              text="Goyal."
              as="span"
              className="block italic text-[22vw] tracking-[-0.04em] text-foreground/55 md:text-[18vw]"
              delay={0.4}
              stagger={0.05}
            />
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 max-w-xl text-balance text-center text-base font-light leading-relaxed text-foreground/70 md:text-lg"
          >
            {profile.heroIntroduction}
          </motion.p>

          {/* Bottom row */}
          <div className="absolute inset-x-0 bottom-8 flex items-center justify-between px-6 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50 md:px-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              Scroll <span className="ml-2">↓</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
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
              stagger={0.025}
            />
            <span className="mt-4 block italic text-foreground/55">
              <SplitTextReveal
                text="Type, motion, and the obsession with details no one notices."
                stagger={0.02}
              />
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 flex flex-wrap items-baseline gap-x-12 gap-y-6 border-t border-border pt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60"
          >
            <div>
              <CountUp to={projects.length} className="font-display text-5xl normal-case tracking-normal text-foreground" />
              <div className="mt-1">Projects shipped</div>
            </div>
            <div>
              <span className="font-display text-5xl normal-case tracking-normal text-foreground">5y+</span>
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
              className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60 transition-colors hover:text-foreground md:inline-flex"
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
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/70"
            >
              View archive →
            </Link>
          </div>
        </div>
      </section>

      {/* TECH MARQUEE */}
      <section className="relative z-[3] overflow-hidden border-y border-border bg-background py-12 md:py-16">
        <Marquee duration={45}>
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
            <MagneticLink
              href={profile.socialLinks.github}
              aria-label="GitHub"
              className="inline-flex items-center gap-3 border border-border-strong px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground transition-colors hover:bg-surface-2"
            >
              GitHub <ArrowRight className="size-3.5" />
            </MagneticLink>
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
