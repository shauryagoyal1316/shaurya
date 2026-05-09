import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  /** Force a specific aspect ratio. Defaults to landscape. */
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  /** Show the year/category badges in the corner of the cover. */
  showBadges?: boolean;
  /** Used for stagger calculations and the "01/02" index badge. */
  index?: number;
  /** Total number of cards in the surrounding grid (used by index badge). */
  total?: number;
}

/**
 * Project card reskinned to match Portfolio.html:
 *  - Rounded image surface with a subtle gradient sheen and an inner zoom on
 *    hover (image, not the whole card, so the corner badges stay still).
 *  - Floating year + category + "01/02" badges over the cover.
 *  - Title row underneath: serif label with italic surname, mono role, and
 *    an "Open ↗" affordance on the right.
 *
 * Cards open the live site in a new tab — there is no per-project detail
 * route. If a project has no liveUrl (shouldn't happen with current data,
 * but the type allows it) the card renders as a non-interactive div instead
 * of an anchor pointing at "#" — that would just yank the URL hash.
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

  // `satisfies` ensures the map covers every AspectRatio variant — adding a
  // new variant in `src/types` without updating this map becomes a compile
  // error instead of silently rendering an undefined class.
  const ratioClass = (
    {
      portrait: 'aspect-[4/5]',
      landscape: 'aspect-[16/10]',
      square: 'aspect-square',
    } satisfies Record<NonNullable<ProjectCardProps['aspectRatio']>, string>
  )[aspectRatio];

  const Wrapper: 'a' | 'div' = project.liveUrl ? 'a' : 'div';
  const wrapperProps = project.liveUrl
    ? {
        href: project.liveUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
        'data-cursor': 'view',
        'data-cursor-label': 'Open',
        'aria-label': `${project.label} — ${project.role}, ${project.year} (opens in a new tab)`,
      }
    : { 'aria-label': `${project.label} — ${project.role}, ${project.year}` };

  // Split the label into "first word" + "rest" so we can italicise the
  // surname-style trailing portion the way the design does ("Fade" + "& Co.").
  const [labelHead, ...labelTailParts] = project.label.split(' ');
  const labelTail = labelTailParts.join(' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
    >
      <Wrapper
        {...(wrapperProps as Record<string, string>)}
        className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        {/* Cover */}
        <div
          className={cn(
            'relative isolate overflow-hidden rounded-lg bg-surface-2',
            ratioClass
          )}
        >
          {/* Surface base — also acts as the fallback when an image fails. */}
          <div className="absolute inset-0 bg-surface-2" />

          {/* Inner zoom layer — the design moves only the image on hover, not
              the badges or the gradient sheen. */}
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

          {/* Diagonal sheen over the cover, lifts the bottom-right corner */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,color-mix(in_oklch,var(--foreground)_6%,transparent))]"
          />

          {showBadges && (
            <>
              <div className="pointer-events-none absolute left-4 top-4 z-[2] inline-flex gap-2">
                <Badge>
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full bg-primary"
                  />
                  {project.year}
                </Badge>
                <Badge>{project.category}</Badge>
              </div>
              <div className="pointer-events-none absolute right-4 top-4 z-[2]">
                <Badge>
                  {String(index + 1).padStart(2, '0')} /{' '}
                  {String(total).padStart(2, '0')}
                </Badge>
              </div>
            </>
          )}
        </div>

        {/* Title row */}
        <div className="mt-5 flex items-end justify-between gap-6">
          <div>
            <div className="font-display text-[clamp(28px,3.6vw,44px)] leading-[1.05] tracking-[-0.015em] text-foreground">
              {labelHead}
              {labelTail && (
                <span className="italic text-foreground/60"> {labelTail}</span>
              )}
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
      </Wrapper>
    </motion.div>
  );
}

/**
 * Small frosted pill used over the cover image. Pulled out so the styling
 * is consistent across year / category / index variants.
 */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80 backdrop-blur-md">
      {children}
    </span>
  );
}
