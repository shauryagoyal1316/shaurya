import { useTheme } from '@/hooks/useTheme';

/**
 * Site-wide film-grain overlay. Single source of truth — renders behind
 * `<main>` (which sits at z-2) so it never tints the cursor or UI.
 *
 * The blend mode flips with theme: `multiply` on light surfaces darkens
 * the bone background subtly; `screen` on dark surfaces lightens the ink.
 * Plain low-opacity layering on near-black would just look washed out.
 */
export function NoiseOverlay() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        opacity: isDark ? 0.05 : 0.035,
        mixBlendMode: isDark ? 'screen' : 'multiply',
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}
