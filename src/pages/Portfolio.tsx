import { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '@/data/projects';
import { SEOHead } from '@/components/seo/SEOHead';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { cn } from '@/lib/utils';

/**
 * Work index — matches Portfolio.html: oversized "Work." hero, sticky pill
 * filter (All / Landing), and a 12-column grid where every other card
 * starts at column 6 to break the rhythm.
 */
export default function Work() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  const [active, setActive] = useState<'all' | 'landing'>('all');

  const cats = useMemo(
    () => [
      { id: 'all' as const, label: 'All', count: projects.length },
      {
        id: 'landing' as const,
        label: 'Landing',
        count: projects.filter((p) => p.category === 'landing').length,
      },
    ],
    []
  );

  const filtered = useMemo(
    () =>
      active === 'all'
        ? projects
        : projects.filter((p) => p.category === active),
    [active]
  );

  return (
    <>
      <SEOHead
        title="Work"
        description="Real website examples — built end to end, front and back, with an editorial bar for craft."
      />

      {/* HERO */}
      <section
        ref={headerRef}
        className="relative px-6 pb-20 pt-40 md:px-10 md:pb-32 md:pt-48"
      >
        <motion.div style={{ y: headingY }} className="mx-auto max-w-[1440px]">
          <div className="mb-7 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
            <span className="text-primary">02</span>Index of work
          </div>
          <h1 className="font-display text-[clamp(96px,18vw,280px)] leading-[0.85] tracking-[-0.03em] text-foreground">
            <SplitTextReveal text="Work." stagger={0.05} />
          </h1>
          <p className="mt-9 max-w-xl text-balance text-base font-light leading-relaxed text-foreground/70 md:text-lg">
            Two real website examples: an editorial barbershop landing page
            and a cinematic private-chef portfolio. Both shipped, both live.
          </p>
        </motion.div>
      </section>

      {/* Sticky filter strip */}
      <section className="sticky top-[72px] z-30 border-y border-border bg-background/70 px-6 py-3.5 backdrop-blur-md md:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4">
          <div className="inline-flex flex-wrap gap-2">
            {cats.map((c) => {
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  data-cursor="hover"
                  onClick={() => setActive(c.id)}
                  className={cn(
                    'inline-flex items-baseline gap-2 rounded-full border px-[18px] py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    isActive
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border text-foreground/70 hover:border-foreground/40 hover:text-foreground'
                  )}
                >
                  {c.label}
                  <span
                    className={cn(
                      'text-[9px]',
                      isActive ? 'text-background/70' : 'text-foreground/40'
                    )}
                  >
                    {String(c.count).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
            {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 md:grid-cols-12">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={cn(
                'md:col-span-7',
                i % 2 === 0 ? 'md:col-start-1' : 'md:col-start-6'
              )}
            >
              <ProjectCard
                project={project}
                index={i}
                total={filtered.length}
                aspectRatio={i % 2 === 0 ? 'landscape' : 'portrait'}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
