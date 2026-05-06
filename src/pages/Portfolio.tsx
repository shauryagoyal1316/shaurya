import { useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '@/data/projects';
import { SEOHead } from '@/components/seo/SEOHead';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { WorkFilter } from '@/components/work/WorkFilter';
import type { ProjectCategory } from '@/types';

const CATEGORIES: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'landing', label: 'Landing' },
  { id: 'web-app', label: 'Web app' },
  { id: 'experiment', label: 'Experiment' },
];

/**
 * Work / archive page. Top hero, mono filter row, asymmetric grid below.
 * Featured items occupy a wider column on desktop for visual rhythm.
 */
export default function Work() {
  const [active, setActive] = useState<'all' | ProjectCategory>('all');

  const filtered = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  const categoriesWithCounts = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        ...c,
        count:
          c.id === 'all'
            ? projects.length
            : projects.filter((p) => p.category === c.id).length,
      })),
    []
  );

  // Subtle parallax on the heading as the user scrolls into the grid.
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  return (
    <>
      <SEOHead
        title="Work"
        description="Selected frontend builds, case studies, and experiments by Shaurya Goyal."
      />

      {/* HERO */}
      <section
        ref={headerRef}
        className="relative px-6 pb-20 pt-40 md:px-10 md:pb-32 md:pt-48"
      >
        <motion.div style={{ y: headingY }} className="mx-auto max-w-[1440px]">
          <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
            <span className="mr-3 text-primary">02</span>Index of work
          </div>
          <h1 className="font-display text-[18vw] leading-[0.85] text-foreground md:text-[14vw]">
            <SplitTextReveal text="Work." stagger={0.06} />
          </h1>
          <p className="mt-10 max-w-xl text-balance text-base font-light leading-relaxed text-foreground/70 md:text-lg">
            A short list of things I've built or shipped recently. Each one
            taught me something different about the line between craft and
            decoration.
          </p>
        </motion.div>
      </section>

      {/* FILTER */}
      <section className="sticky top-16 z-30 border-y border-border bg-background/85 px-6 py-5 backdrop-blur-md md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <WorkFilter
            categories={categoriesWithCounts}
            active={active}
            onChange={(id) => setActive(id as 'all' | ProjectCategory)}
          />
        </div>
      </section>

      {/* GRID */}
      <section className="px-6 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <motion.div
            layout
            className="grid grid-cols-1 gap-10 md:grid-cols-6 md:gap-12"
          >
            {filtered.map((project, i) => {
              // Featured items take 4/6 columns; others take 3/6, creating
              // an editorial rhythm rather than a uniform grid.
              const span = project.featured ? 'md:col-span-4' : 'md:col-span-3';
              const ratio = project.featured ? 'landscape' : 'portrait';
              return (
                <motion.div
                  key={project.id}
                  layout
                  className={span}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard project={project} index={i} aspectRatio={ratio} />
                </motion.div>
              );
            })}
          </motion.div>

          {filtered.length === 0 && (
            <div className="py-32 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/40">
              Nothing here yet.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
