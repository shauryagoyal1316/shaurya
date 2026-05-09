import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

/**
 * Sun/moon button matching Portfolio.html: round bordered button, the icon
 * rotates -30deg on hover (600ms), the button scales to 0.94 when pressed.
 * No icon-swap animation — the icon flips instantly when the theme changes.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor="hover"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className={
        'theme-btn group relative inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-[background,border-color,transform] duration-300 hover:bg-surface-2 active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ' +
        className
      }
    >
      <span
        className="inline-flex transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-[30deg]"
      >
        {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
      </span>
    </button>
  );
}
