import { ExternalLink } from 'lucide-react';
import { MagneticLink } from '@/components/effects/MagneticLink';

interface ExternalLinkButtonProps {
  /**
   * The actual URL — never displayed as visible text, never used as the
   * accessible name. The user-supplied `label` is what people see and what
   * screen readers announce.
   */
  href: string;
  /** Visible label, e.g. "Barbershop example". */
  label?: string;
  /** Visual variant. */
  variant?: 'primary' | 'ghost';
  className?: string;
}

/**
 * Hidden-URL external-link button.
 *
 * Notes on what "hidden" means here:
 *  - The href is in the DOM (it has to be for the link to work).
 *  - No visible text reveals the URL.
 *  - The accessible name is the user-supplied label, not the URL.
 *  - The browser's status-bar URL preview on hover can't be hidden by web
 *    code — that's a browser-level affordance and not something a portfolio
 *    page can disable. Treat the URL as "obscured", not "secret".
 */
export function ExternalLinkButton({
  href,
  label = 'View live',
  variant = 'primary',
  className = '',
}: ExternalLinkButtonProps) {
  const base =
    'group relative inline-flex items-center gap-3 px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] transition-colors';
  const styles =
    variant === 'primary'
      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
      : 'border border-border-strong text-foreground hover:bg-surface-2';

  return (
    <MagneticLink
      href={href}
      aria-label={label}
      className={`${base} ${styles} ${className}`}
      strength={10}
    >
      <span>{label}</span>
      <ExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </MagneticLink>
  );
}
