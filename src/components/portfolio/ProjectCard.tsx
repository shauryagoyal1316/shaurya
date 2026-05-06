import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';
import { TiltCard } from '@/components/effects/TiltCard';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  /** Force a specific aspect ratio. Defaults to landscape. */
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  /** Show the role/year overlay row on hover. */
  showCategory?: boolean;
  /** Used for stagger calculations. */
  index?: number;
  /** Render the card without the tilt wrapper (e.g. inside a horizontal scroller). */
  flat?: boolean;
}

/**
 * Project card — image on a dark surface, label and role appear on hover.
 * Uses `data-cursor="view"` so the magnetic cursor swaps to the "VIEW"
 * variant when entering the card.
 */
export function ProjectCard({
  project,
  aspectRatio = 'landscape',
  showCategory = true,
  index = 0,
  flat = false,
}: ProjectCardProps) {
  const [loaded, setLoaded] = useState(false);

  const ratioClass = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[16/10]',
    square: 'aspect-square',
  }[aspectRatio];

  const inner = (
    <Link
      to={`/work/${project.slug}`}
      data-cursor="view"
      className="group relative block overflow-hidden bg-surface-2"
    >
      <div className={cn('relative overflow-hidden', ratioClass)}>
        {!loaded && <div className="absolute inset-0 bg-surface-2" />}
        <motion.img
          src={project.coverImage}
          alt={project.label}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
            loaded ? 'opacity-100' : 'opacity-0',
            'group-hover:scale-[1.06]'
          )}
          loading={index < 3 ? 'eager' : 'lazy'}
          onLoad={() => setLoaded(true)}
        />

        {/* Bottom gradient + meta overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-8">
          <div className="space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
              {project.year} · {project.role}
            </div>
            <div className="font-display text-3xl text-white md:text-4xl">
              {project.label}
            </div>
          </div>
          <div className="flex size-10 items-center justify-center rounded-full border border-white/40 text-white">
            <ArrowUpRight className="size-4" />
          </div>
        </div>

        {/* Top index marker */}
        {showCategory && (
          <div className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70 md:left-8 md:top-8">
            {String(index + 1).padStart(2, '0')} / {project.category}
          </div>
        )}
      </div>
    </Link>
  );

  if (flat) return inner;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
    >
      <TiltCard className="will-change-transform">{inner}</TiltCard>
    </motion.div>
  );
}
