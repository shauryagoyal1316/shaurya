import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';
import { ExternalLinkButton } from '@/components/work/ExternalLinkButton';
import { ProjectNavigation } from '@/components/portfolio/ProjectNavigation';
import { getProjectBySlug, getAdjacentProjects } from '@/data/projects';

/**
 * Case-study page. Pinned hero with parallax cover image, long-form story,
 * gallery with image parallax, hidden-URL "View live" button at the bottom,
 * prev/next strip.
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) return <Navigate to="/404" replace />;

  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <>
      <SEOHead
        title={project.label}
        description={project.tagline}
        image={project.coverImage}
        type="article"
      />

      {/* HERO */}
      <section className="relative h-[100vh] overflow-hidden bg-background">
        <div className="absolute inset-0 bg-surface-2" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background" />

        <div className="relative z-10 flex h-full flex-col px-6 pb-12 pt-32 md:px-10">
          <Link
            to="/work"
            data-cursor="hover"
            className="group inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            Back to work
          </Link>

          <div className="mt-auto max-w-[1440px]">
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
              {project.year} · {project.role} · {project.category}
            </div>
            <h1 className="font-display text-6xl leading-[0.9] tracking-tight text-white md:text-8xl lg:text-[10rem]">
              <SplitTextReveal text={project.label} stagger={0.04} />
            </h1>
            <p className="mt-8 max-w-2xl text-balance text-lg font-light leading-relaxed text-white/80 md:text-xl">
              {project.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* META + DESCRIPTION */}
      <section className="border-t border-border bg-background px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 md:grid-cols-12">
          {/* Sidebar meta */}
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
                <div className="pt-4">
                  <ExternalLinkButton href={project.liveUrl} label="View live" />
                </div>
              )}
            </div>
          </aside>

          {/* Long-form */}
          <article className="prose prose-invert max-w-none md:col-span-7 md:col-start-6">
            <p className="mb-10 font-display text-3xl leading-[1.15] text-foreground/95 md:text-4xl">
              {project.description}
            </p>
            {project.approach &&
              project.approach.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  className="mb-6 text-lg font-light leading-[1.75] text-foreground/70"
                >
                  {para}
                </p>
              ))}
          </article>
        </div>
      </section>

      {/* GALLERY */}
      {project.images.length > 0 && (
        <section className="bg-background px-6 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto max-w-[1440px] space-y-10 md:space-y-16">
            {project.images.map((img, i) => (
              <motion.figure
                key={img.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                className="overflow-hidden bg-surface-2"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="block h-auto w-full object-cover"
                />
                {img.caption && (
                  <figcaption className="mt-3 px-1 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
                    {img.caption}
                  </figcaption>
                )}
              </motion.figure>
            ))}
          </div>
        </section>
      )}

      {/* CTA before next */}
      {project.liveUrl && (
        <section className="border-t border-border bg-background px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <h2 className="font-display text-5xl leading-[0.95] text-foreground md:text-7xl">
              See it
              <span className="italic text-foreground/55"> running.</span>
            </h2>
            <ExternalLinkButton href={project.liveUrl} label="View live" />
          </div>
        </section>
      )}

      {/* PREV / NEXT */}
      <ProjectNavigation prev={prev} next={next} />
    </>
  );
}
