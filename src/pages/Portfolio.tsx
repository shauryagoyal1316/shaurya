import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { SEOHead } from '@/components/seo/SEOHead';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';
import { ProjectCard } from '@/components/portfolio/ProjectCard';

/**
 * Work page. With only a handful of projects and no per-project detail
 * route, every project gets its full case-study content laid out inline:
 * cover card, meta sidebar (year / role / stack + Visit live button), and
 * long-form description / approach paragraphs.
 *
 * The cover card itself opens the live site in a new tab. There is no
 * /work/:slug route any more — it added a chunk fetch + page-transition
 * curtain that read as a blank screen for a beat.
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
        <motion.div
          style={{ y: headingY }}
          className="mx-auto max-w-[1440px]"
        >
          <div className="mb-7 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
            <span className="text-primary">02</span>Index of work
          </div>
          <h1 className="font-display text-[clamp(96px,18vw,280px)] leading-[0.85] tracking-[-0.03em] text-foreground">
            <SplitTextReveal text="Work." stagger={0.05} />
          </h1>
          <p className="mt-9 max-w-xl text-balance text-base font-light leading-relaxed text-foreground/70 md:text-lg">
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
            <div className="mb-10 flex items-baseline gap-6 font-mono text-[11px] uppercase tracking-[0.28em]">
              <span className="text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                id={`project-${project.id}-label`}
                className="text-foreground/70"
              >
                {project.role} · {project.year}
              </span>
            </div>

            {/* Cover */}
            <ProjectCard
              project={project}
              index={i}
              total={projects.length}
              aspectRatio="landscape"
              showBadges={false}
            />

            {/* Title under the cover, large editorial */}
            <h2
              className="mt-12 font-display text-[clamp(48px,8vw,128px)] leading-[0.95] tracking-[-0.025em] text-foreground"
            >
              {project.label.split(' ')[0]}
              {project.label.split(' ').slice(1).join(' ') && (
                <span className="italic text-foreground/55">
                  {' '}
                  {project.label.split(' ').slice(1).join(' ')}
                </span>
              )}
            </h2>

            {/* Meta + description grid */}
            <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-12 md:gap-16">
              <aside className="md:col-span-4 md:col-start-1">
                <div className="space-y-10 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/70">
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
                    <ul className="space-y-1.5 text-foreground">
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
                        data-cursor-label="Visit"
                        className="group inline-flex items-center gap-3 rounded-full border border-foreground bg-foreground px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        Visit live
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  )}
                </div>
              </aside>

              <article className="md:col-span-7 md:col-start-6">
                <p className="mb-8 font-display text-[clamp(26px,3vw,38px)] leading-[1.18] text-foreground">
                  {project.description}
                </p>
                {project.approach &&
                  project.approach.split('\n\n').map((para, idx) => (
                    <p
                      key={idx}
                      className="mb-5 max-w-2xl text-base font-light leading-[1.7] text-foreground/70 md:text-[17px]"
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
