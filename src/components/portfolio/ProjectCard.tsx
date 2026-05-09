import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  showBadges?: boolean;
  index?: number;
  total?: number;
}

/**
 * Project card matching Portfolio.html: rounded image surface with diagonal
 * sheen, floating year/category/index badges, italic-tail title, "Open ↗"
 * affordance. Cards navigate to the in-app detail page at /work/:slug.
 */
export function ProjectCard({
  project,
  aspectRatio = 'landscape',
  showBadges = true,
  index = 0,
  total = 2,
}: ProjectCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(project.coverImage) && !imgFailed;

  const ratioClass = (
    {
      portrait: 'aspect-[4/5]',
      landscape: 'aspect-[16/10]',
      square: 'aspect-square',
    } satisfies Record<NonNullable<ProjectCardProps['aspectRatio']>, string>
  )[aspectRatio];

  const [labelHead, ...labelTailParts] = project.label.split(' ');
  const labelTail = labelTailParts.join(' ');
  const categoryDisplay =
    project.category.charAt(0).toUpperCase() + project.category.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
    >
      <Link
        to={`/work/${project.slug}`}
        data-cursor="view"
        data-cursor-label="Open"
        aria-label={`${project.label} — ${project.role}, ${project.year}`}
        className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <div className={cn('relative isolate overflow-hidden rounded-lg bg-surface-2', ratioClass)}>
          <div className="absolute inset-0 bg-surface-2" />
          <div className="absolute inset-0 scale-[1.04] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:scale-[1.08] group-focus-visible:scale-[1.08]">
            {showImage && (
              <img
                src={project.coverImage}
                alt={`${project.label} — ${project.role}`}
                loading="lazy"
                decoding="async"
                onError={() => setImgFailed(true)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,color-mix(in_oklch,var(--foreground)_6%,transparent))]"
          />
          {showBadges && (
            <>
              <div className="pointer-events-none absolute left-4 top-4 z-[2] inline-flex gap-2">
                <Badge>
                  <span aria-hidden className="size-1.5 rounded-full bg-primary" />
                  {project.year}
                </Badge>
                <Badge>{categoryDisplay}</Badge>
              </div>
              <div className="pointer-events-none absolute right-4 top-4 z-[2]">
                <Badge>
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </Badge>
              </div>
            </>
          )}
        </div>

        <div className="mt-5 flex items-end justify-between gap-6">
          <div>
            <div className="font-display text-[clamp(28px,3.6vw,44px)] leading-[1.05] tracking-[-0.015em] text-foreground">
              {labelHead}
              {labelTail && <span className="italic text-foreground/60"> {labelTail}</span>}
            </div>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
              {project.role}
            </div>
          </div>
          <div className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/70 transition-colors group-hover:text-foreground">
            <span className="inline-flex items-center gap-1.5">
              Open
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80 backdrop-blur-md">
      {children}
    </span>
  );
}
