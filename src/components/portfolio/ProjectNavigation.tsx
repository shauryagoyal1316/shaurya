import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectNavigationProps {
  prev: Project | null;
  next: Project | null;
}

/**
 * Edge-to-edge prev/next strip at the foot of a case study.
 */
export function ProjectNavigation({ prev, next }: ProjectNavigationProps) {
  return (
    <div className="grid grid-cols-1 border-t border-border md:grid-cols-2">
      {/* Prev */}
      <div className={cn('border-b border-border md:border-b-0 md:border-r', !prev && 'opacity-40')}>
        {prev ? (
          <Link
            to={`/work/${prev.slug}`}
            data-cursor="view"
            className="group block p-10 transition-colors hover:bg-surface-1 md:p-14"
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
        ) : (
          <div className="p-10 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/40 md:p-14">
            <div className="flex items-center gap-3"><ArrowLeft className="size-3.5" /> No previous</div>
          </div>
        )}
      </div>

      {/* Next */}
      <div className={cn(!next && 'opacity-40')}>
        {next ? (
          <Link
            to={`/work/${next.slug}`}
            data-cursor="view"
            className="group block p-10 text-right transition-colors hover:bg-surface-1 md:p-14"
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
        ) : (
          <div className="p-10 text-right font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/40 md:p-14">
            <div className="flex items-center justify-end gap-3">No next <ArrowRight className="size-3.5" /></div>
          </div>
        )}
      </div>
    </div>
  );
}
