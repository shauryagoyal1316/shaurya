import { useState, useMemo } from 'react';
import { projects } from '@/data/projects';
import { SEOHead } from '@/components/seo/SEOHead';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { cn } from '@/lib/utils';

/**
 * Work index. Hero stripped — when users land here they want the projects,
 * not a giant "Work." headline. The static pill filter + alternating 12-column
 * grid get straight to the content.
 */
export default function Work() {
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

      {/* Filter strip stays in the page flow so it does not cover work while scrolling. */}
      <section className="relative z-30 border-y border-border bg-background/70 px-6 pt-24 pb-3.5 backdrop-blur-md md:px-10 md:pt-28">
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
                    'inline-flex cursor-pointer items-baseline gap-2 rounded-full border px-[18px] py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
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
      <section className="px-6 pb-10 pt-20 md:px-10 md:py-16">
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
