import { useEffect, useRef, useState } from 'react';
import { hasFinePointer, prefersReducedMotion } from '@/lib/motion';

/**
 * Custom cursor matching Portfolio.html exactly: a single difference-blend
 * circle that lerps toward the pointer (factor 0.18 per frame) and grows
 * to 60px on `[data-cursor="hover"]` or 96px on `[data-cursor="view"]`.
 * Renders an optional label inside the circle (e.g. "View"). Hides on
 * touch devices and when the user prefers reduced motion.
 */
export function MagneticCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<'default' | 'hover' | 'view' | 'text'>(
    'default'
  );
  const [label, setLabel] = useState('');
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    setEnabled(true);
    document.body.dataset.cursor = 'custom';

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const frame = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      if (elRef.current) {
        elRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      // Inputs need the native I-beam — render nothing over them.
      if (t.closest('input, textarea, select, [contenteditable="true"]')) {
        setVariant('text');
        setLabel('');
        return;
      }
      const cursorEl = t.closest('[data-cursor]') as HTMLElement | null;
      const mode = cursorEl?.getAttribute('data-cursor');
      if (mode === 'view') {
        setVariant('view');
        setLabel(cursorEl?.getAttribute('data-cursor-label') || 'View');
        return;
      }
      if (
        mode === 'hover' ||
        t.closest('a, button, [role="button"]')
      ) {
        setVariant('hover');
        setLabel('');
        return;
      }
      setVariant('default');
      setLabel('');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      delete document.body.dataset.cursor;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
    };
  }, []);

  if (!enabled || variant === 'text') return null;

  const size = variant === 'view' ? 96 : variant === 'hover' ? 60 : 14;

  return (
    <div
      ref={elRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full bg-foreground mix-blend-difference"
      style={{
        width: size,
        height: size,
        transition:
          'width 360ms cubic-bezier(0.16,1,0.3,1), height 360ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {label && (
        <span
          className="font-mono text-[9px] uppercase tracking-[0.2em] text-background"
          style={{ whiteSpace: 'nowrap' }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
