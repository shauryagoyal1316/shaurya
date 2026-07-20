import { useTheme } from '@/hooks/useTheme';

/**
 * Site-wide film-grain overlay. Single source of truth — renders behind
 * `<main>` (which sits at z-2) so it never tints the cursor or UI.
 *
 * The tint is baked into the texture per theme — a black-grain alpha mask
 * darkens light surfaces, a white-grain one lifts dark surfaces — instead
 * of a live mix-blend-mode. A full-viewport blend layer forced the
 * compositor to re-blend the whole screen every frame, which measurably
 * janked the scroll-linked hero (period portal) on modest GPUs; baked
 * grain composites as a plain cached texture at effectively zero cost.
 */
const GRAIN = (fill: 0 | 1) =>
  `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 ${fill} 0 0 0 0 ${fill} 0 0 0 0 ${fill} 0.4 0.4 0.4 0 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

const BLACK_GRAIN = GRAIN(0);
const WHITE_GRAIN = GRAIN(1);

export function NoiseOverlay() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        opacity: isDark ? 0.055 : 0.04,
        backgroundImage: isDark ? WHITE_GRAIN : BLACK_GRAIN,
      }}
    />
  );
}
