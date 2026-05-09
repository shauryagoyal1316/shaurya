import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '@/data/projects';
import { SEOHead } from '@/components/seo/SEOHead';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';
import { ProjectCard } from '@/components/portfolio/ProjectCard';

/**
 * Work page. With only a handful of projects and no per-project detail
 * route, every project gets its full case-study content laid out inline
 * here: cover screenshot card, meta sidebar (year / role / stack +
 * View live button), and the long-form description / approach paragraphs.
 *
 * The card itself opens the live site in a new tab — there is no internal
 * /work/:slug route any more (it added a chunk fetch + page-transition
 * curtain that read as a blank screen for a beat).
 */
export default function Work() {
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
        description="Real website examples — built end to end, front and back, with an editorial bar for craft."
      />

      {/* HERO */}
      <section
        ref={headerRef}
        className="relative px-6 pb-20 pt-40 md:px-10 md:pb-32 md:pt-48"
      >
        <motion.div style={{ y: headingY }} className="mx-auto max-w-[1440px]">
          <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
            <span className="mr-3 text-primary">/</span>Index of work
          </div>
          <h1 className="font-display text-[18vw] leading-[0.85] text-foreground md:text-[14vw]">
            <SplitTextReveal text="Work." stagger={0.06} />
          </h1>
          <p className="mt-10 max-w-xl text-balance text-base font-light leading-relaxed text-foreground/70 md:text-lg">
            Two real website examples — built end to end, designed with
            editorial typography, and shipped to live URLs.
          </p>
        </motion.div>
      </section>

      {/* PROJECT SECTIONS */}
      {projects.map((project, i) => (
        <section
          key={project.id}
          aria-labelledby={`project-${project.id}-label`}
          className="border-t border-border px-6 py-24 md:px-10 md:py-32"
        >
          <div className="mx-auto max-w-[1440px]">
            {/* Section number + project label */}
            <div className="mb-10 flex items-baseline gap-6 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
              <span className="text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span id={`project-${project.id}-label`} className="text-foreground/70">
                {project.role} · {project.year}
              </span>
            </div>

            {/* Cover */}
            <ProjectCard
              project={project}
              index={i}
              aspectRatio="landscape"
              showCategory={false}
            />

            {/* Title under the cover, large editorial */}
            <h2 className="mt-12 font-display text-5xl leading-[0.95] text-foreground md:text-7xl">
              {project.label}
            </h2>

            {/* Meta + description grid */}
            <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-12 md:gap-16">
              <aside className="md:col-span-4 md:col-start-1">
                <div className="space-y-10 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60">
                  <div>
                    <div className="mb-2 text-foreground/40">Year</div>
                    <div className="text-foreground">{project.year}</div>
                  </div>
                  <div>
                    <div className="mb-2 text-foreground/40">Role</div>
                    <div className="text-foreground">{project.role}</div>
                  </div>
                  <div>
                    <div className="mb-2 text-foreground/40">Stack</div>
                    <ul className="space-y-1 text-foreground">
                      {project.stack.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  {project.liveUrl && (
                    <div className="pt-2">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="view"
                        className="inline-flex items-center gap-3 rounded-sm bg-primary px-7 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        View live ↗
                      </a>
                    </div>
                  )}
                </div>
              </aside>

              <article className="md:col-span-7 md:col-start-6">
                <p className="mb-8 font-display text-2xl leading-[1.2] text-foreground/95 md:text-3xl">
                  {project.description}
                </p>
                {project.approach &&
                  project.approach.split('\n\n').map((para, idx) => (
                    <p
                      key={idx}
                      className="mb-5 text-base font-light leading-[1.7] text-foreground/70 md:text-lg"
                    >
                      {para}
                    </p>
                  ))}
              </article>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
