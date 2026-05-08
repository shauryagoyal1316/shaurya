import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ExternalLinkButton } from '@/components/work/ExternalLinkButton';
import { ProjectNavigation } from '@/components/portfolio/ProjectNavigation';
import { getProjectBySlug, getAdjacentProjects } from '@/data/projects';
import NotFound from './NotFound';

/**
 * Case-study page. Pinned hero with parallax cover image, long-form story,
 * gallery with image parallax, hidden-URL "View live" button at the bottom,
 * prev/next strip.
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  // Render the 404 view in place rather than redirecting — keeps the URL the
  // user typed, avoids a back-button redirect loop, and lets the wildcard
  // route own its own URL ("/work/<unknown>", not "/404").
  if (!project) return <NotFound />;

  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <>
      <SEOHead
        title={project.label}
        description={project.tagline}
        image={project.coverImage}
        type="article"
      />

      {/* Spacer so the sticky breadcrumb lands below the fixed header on
          first paint (header is up to 76px tall before scroll-compress). */}
      <div className="h-20 md:h-24" aria-hidden />

      {/* Persistent back-to-work bar — first row of the page now that the
          hero is gone, also sticks just below the header once you scroll. */}
      <div className="sticky top-14 z-20 border-y border-border bg-background/85 px-6 py-3 backdrop-blur-md md:px-10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.22em]">
          <Link
            to="/work"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 rounded-sm text-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
            All work
          </Link>
          <span className="truncate text-foreground/50">{project.label}</span>
        </div>
      </div>

      {/* COVER — landing-page screenshot of the live site, full-bleed within
          the page padding. Falls back to the surface tone if the image fails. */}
      {project.coverImage && (
        <section className="bg-background px-6 pt-12 md:px-10 md:pt-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
              <img
                src={project.coverImage}
                alt={`${project.label} — landing page`}
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* META + DESCRIPTION */}
      <section className="bg-background px-6 py-24 md:px-10 md:py-32">
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
