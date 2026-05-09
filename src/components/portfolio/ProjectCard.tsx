import { useRef, useState } from 'react';
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
 * Adds an Apple-style scroll-linked image parallax (image translates -8%
 * to 8% as the card passes through the viewport) on top of the existing
 * 3D tilt. Cursor variant `view` swaps to the "VIEW" pill.
 */
export function ProjectCard({
  project,
  aspectRatio = 'landscape',
  showCategory = true,
  index = 0,
  flat = false,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(project.coverImage) && !imgFailed;

  // `satisfies` ensures the map covers every AspectRatio variant — adding a
  // new variant in `src/types` without updating this map becomes a compile
  // error instead of silently rendering an undefined class.
  const ratioClass = ({
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[16/10]',
    square: 'aspect-square',
  } satisfies Record<NonNullable<ProjectCardProps['aspectRatio']>, string>)[aspectRatio];

  // Cards link straight to the live site in a new tab — no internal detail
  // page (it added a chunk fetch + page-transition curtain that read as a
  // blank screen for ~1s). The hidden URL is still on the anchor's href so
  // the link works without JS; the visible label is controlled by the
  // overlay below, never the URL.
  const href = project.liveUrl ?? '#';

  const inner = (
    <a
      href={href}
      target={project.liveUrl ? '_blank' : undefined}
      rel={project.liveUrl ? 'noopener noreferrer' : undefined}
      data-cursor="view"
      aria-label={`${project.label} — ${project.role}, ${project.year} (opens in a new tab)`}
      className="group relative block overflow-hidden bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className={cn('relative overflow-hidden', ratioClass)}>
        {/* Surface base — also acts as the fallback when an image fails. */}
        <div className="absolute inset-0 bg-surface-2" />

        {showImage && (
          <img
            src={project.coverImage}
            alt={`${project.label} — ${project.role}`}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}

        {/* Bottom meta overlay — slides up with content on hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 md:p-8">
          <div className="space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
              {project.year} · {project.role}
            </div>
            <div className="font-display text-3xl text-white md:text-4xl">
              {project.label}
            </div>
          </div>
          <div className="flex size-10 items-center justify-center rounded-full border border-white/40 text-white transition-transform duration-500 group-hover:rotate-45">
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
    </a>
  );

  if (flat) return inner;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
    >
      <TiltCard className="will-change-transform">{inner}</TiltCard>
    </motion.div>
  );
}
