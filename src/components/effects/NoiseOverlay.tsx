/**
 * Site-wide film-grain overlay. Single source of truth — renders behind
 * `<main>` (which sits at z-2) so it never tints the cursor or UI.
 * Plain low-opacity layering (no blend mode) avoids the washed-out look
 * that `mix-blend-overlay` produces on near-black canvases.
 */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}
