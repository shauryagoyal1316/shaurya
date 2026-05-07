import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectNavigationProps {
  prev: Project | null;
  next: Project | null;
}

/**
 * Edge-to-edge prev/next strip at the foot of a case study. When only one
 * neighbour exists, the strip collapses to a single full-width cell instead
 * of showing a dead "No previous"/"No next" label — that placeholder reads
 * like a broken state and adds nothing.
 */
export function ProjectNavigation({ prev, next }: ProjectNavigationProps) {
  if (!prev && !next) return null;

  const single = !prev || !next;

  return (
    <div
      className={
        single
          ? 'grid grid-cols-1 border-t border-border'
          : 'grid grid-cols-1 border-t border-border md:grid-cols-2'
      }
    >
      {prev && (
        <div className={!single ? 'border-b border-border md:border-b-0 md:border-r' : ''}>
          <Link
            to={`/work/${prev.slug}`}
            data-cursor="view"
            className="group block p-10 transition-colors hover:bg-surface-1 focus-visible:bg-surface-1 focus-visible:outline-none md:p-14"
          >
            <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50 transition-colors group-hover:text-foreground">
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              Previous
            </div>
            <div className="font-display text-4xl text-foreground md:text-5xl">
              {prev.label}
            </div>
            <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
              {prev.role} · {prev.year}
            </div>
          </Link>
        </div>
      )}

      {next && (
        <div>
          <Link
            to={`/work/${next.slug}`}
            data-cursor="view"
            className="group block p-10 text-right transition-colors hover:bg-surface-1 focus-visible:bg-surface-1 focus-visible:outline-none md:p-14"
          >
            <div className="mb-6 flex items-center justify-end gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50 transition-colors group-hover:text-foreground">
              Next
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </div>
            <div className="font-display text-4xl text-foreground md:text-5xl">
              {next.label}
            </div>
            <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
              {next.role} · {next.year}
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
