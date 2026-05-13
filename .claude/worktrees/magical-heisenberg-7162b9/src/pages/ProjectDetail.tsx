import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { SEOHead } from '@/components/seo/SEOHead';

/**
 * Project detail page matching Portfolio.html:
 *  - Meta sidebar (Year / Role / Stack + Visit live button)
 *  - Long-form description + approach paragraphs
 *  - Placeholder gallery captioned per project
 *  - "See it running" CTA + prev/next pager
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <>
        <SEOHead title="Project not found" />
        <section className="px-6 py-40 text-center md:px-10">
          <h1 className="font-display text-[clamp(60px,12vw,200px)] leading-[0.85] text-foreground">
            404.
          </h1>
          <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.22em] text-foreground/50">
            Project not found
          </p>
          <Link
            to="/work"
            data-cursor="hover"
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-border px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
          >
            Back to work →
          </Link>
        </section>
      </>
    );
  }

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;
  return (
    <>
      <SEOHead
        title={project.label}
        description={project.tagline}
        image={project.coverImage}
        type="article"
      />

      {/* META + DESCRIPTION */}
      <section className="min-h-[100svh] border-t border-border px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-14 md:grid-cols-12">
          <aside className="md:col-span-4">
            <dl className="flex flex-col gap-8 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/70">
              <div>
                <dt className="mb-2 text-foreground/40">Year</dt>
                <dd className="text-foreground">{project.year}</dd>
              </div>
              <div>
                <dt className="mb-2 text-foreground/40">Role</dt>
                <dd className="text-foreground">{project.role}</dd>
              </div>
              <div>
                <dt className="mb-2 text-foreground/40">Stack</dt>
                <dd>
                  <ul className="space-y-1.5 text-foreground">
                    {project.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              {project.liveUrl && (
                <div className="pt-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="view"
                    data-cursor-label="Visit"
                    className="group inline-flex items-center gap-3 rounded-full border border-foreground bg-foreground px-6 py-3.5 text-[11px] uppercase tracking-[0.18em] text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Visit live
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              )}
            </dl>
          </aside>
          <article className="md:col-span-7 md:col-start-6">
            <p className="mb-10 font-display text-[clamp(26px,3vw,38px)] leading-[1.18] text-foreground">
              {project.description}
            </p>
            {project.approach &&
              project.approach.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  className="mb-5 max-w-[620px] text-[17px] font-light leading-[1.7] text-foreground/70"
                >
                  {para}
                </p>
              ))}
          </article>
        </div>
      </section>

      {/* GALLERY (placeholder slots — design uses image-slot custom element) */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="px-6 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-14">
            {project.gallery.map((cap, i) => {
              const ratio =
                i === 0 ? 'aspect-[16/9]' : i === 1 ? 'aspect-[4/3]' : 'aspect-[21/9]';
              return (
                <motion.figure
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8% 0px' }}
                  transition={{ duration: 0.85, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className={`relative isolate overflow-hidden rounded-lg bg-surface-2 ${ratio} flex items-center justify-center`}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/40">
                      {project.label} · {cap}
                    </span>
                  </div>
                  <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
                    {String(i + 1).padStart(2, '0')} — {cap}
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>
        </section>
      )}

      {/* SEE IT RUNNING CTA */}
      {project.liveUrl && (
        <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-8">
            <h2 className="font-display text-[clamp(40px,7vw,112px)] leading-[0.95] tracking-[-0.02em] text-foreground">
              See it <span className="italic text-foreground/55">running.</span>
            </h2>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="view"
              data-cursor-label="Visit"
              className="group inline-flex items-center gap-3 rounded-full border border-border px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Visit live
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </section>
      )}

      {/* PREV / NEXT */}
      <section className="grid grid-cols-2 border-t border-border">
        {prev ? (
          <Link
            to={`/work/${prev.slug}`}
            data-cursor="view"
            data-cursor-label="Prev"
            className="border-r border-border px-6 py-12 transition-colors hover:bg-surface-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset md:px-10 md:py-20"
          >
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
              ← Previous
            </div>
            <PrevNextLabel label={prev.label} />
          </Link>
        ) : (
          <div className="border-r border-border" />
        )}
        {next ? (
          <Link
            to={`/work/${next.slug}`}
            data-cursor="view"
            data-cursor-label="Next"
            className="px-6 py-12 text-right transition-colors hover:bg-surface-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset md:px-10 md:py-20"
          >
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
              Next →
            </div>
            <PrevNextLabel label={next.label} />
          </Link>
        ) : (
          <div />
        )}
      </section>
    </>
  );
}

function PrevNextLabel({ label }: { label: string }) {
  const [head, ...tail] = label.split(' ');
  const tailStr = tail.join(' ');
  return (
    <div className="font-display text-[clamp(28px,4vw,56px)] leading-[1.05] text-foreground">
      {head}
      {tailStr && <span className="italic text-foreground/55"> {tailStr}</span>}
    </div>
  );
}
