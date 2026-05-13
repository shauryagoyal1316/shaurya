import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
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
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const springX = useSpring(pointerX, { stiffness: 140, damping: 24, mass: 0.45 });
  const springY = useSpring(pointerY, { stiffness: 140, damping: 24, mass: 0.45 });
  const rotateX = useTransform(springY, [0, 1], [5, -5]);
  const rotateY = useTransform(springX, [0, 1], [-6, 6]);
  const imageX = useTransform(springX, [0, 1], ['-1.8%', '1.8%']);
  const imageY = useTransform(springY, [0, 1], ['-1.8%', '1.8%']);
  const sheenX = useTransform(springX, [0, 1], ['-45%', '45%']);
  const sheenY = useTransform(springY, [0, 1], ['-45%', '45%']);
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

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  const handlePointerLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      whileHover={reducedMotion ? undefined : { y: -8 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Link
        to={`/work/${project.slug}`}
        data-cursor="view"
        data-cursor-label="Open"
        aria-label={`${project.label} — ${project.role}, ${project.year}`}
        className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <motion.div
          className={cn('relative isolate overflow-hidden rounded-lg bg-surface-2', ratioClass)}
          style={
            reducedMotion
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  transformPerspective: 1000,
                }
          }
        >
          <div className="absolute inset-0 bg-surface-2" />
          <motion.div
            className="absolute inset-0 scale-[1.06] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:scale-[1.1] group-focus-visible:scale-[1.1]"
            style={reducedMotion ? undefined : { x: imageX, y: imageY }}
          >
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
          </motion.div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,color-mix(in_oklch,var(--foreground)_6%,transparent))]"
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
            style={{
              x: reducedMotion ? undefined : sheenX,
              y: reducedMotion ? undefined : sheenY,
              background:
                'radial-gradient(circle at center, color-mix(in oklch, var(--foreground) 24%, transparent), transparent 34%)',
            }}
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
        </motion.div>

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
