import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WorkFilterProps {
  categories: { id: string; label: string; count?: number }[];
  active: string;
  onChange: (id: string) => void;
}

/**
 * Mono-style filter chips — minimal, uppercase, with a sliding accent
 * underline that animates between active items via layoutId.
 */
export function WorkFilter({ categories, active, onChange }: WorkFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
      {categories.map((c) => {
        const isActive = active === c.id;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onChange(c.id)}
            aria-pressed={isActive}
            className={cn(
              'group relative rounded-sm pb-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              isActive ? 'text-foreground' : 'text-foreground/40 hover:text-foreground/80'
            )}
          >
            <span className="inline-flex items-baseline gap-2">
              {c.label}
              {typeof c.count === 'number' && (
                <span className="text-[9px] text-foreground/40">{c.count.toString().padStart(2, '0')}</span>
              )}
            </span>
            {isActive && (
              <motion.span
                layoutId="workFilterUnderline"
                className="absolute inset-x-0 bottom-0 h-px bg-primary"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
