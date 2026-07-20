import { useEffect, useRef, useState } from 'react';
import { hasFinePointer, prefersReducedMotion } from '@/lib/motion';

/**
 * Drafting-table cursor: full-viewport crosshair hairlines meeting at the
 * pointer, a square reticle at the intersection, and a live mono X/Y
 * coordinate readout — the site measures itself as you move. Keeps the same
 * [data-cursor] / [data-cursor-label] API the old cursor used. Hides on
 * touch devices and under reduced motion.
 */
export function DraftingCursor() {
  const [enabled, setEnabled] = useState(false);
  // Stay invisible until the pointer actually moves — otherwise the reticle
  // and coordinate readout sit parked over the hero at page load.
  const [live, setLive] = useState(false);
  const [variant, setVariant] = useState<'default' | 'hover' | 'view' | 'text'>(
    'default'
  );
  const [label, setLabel] = useState('');
  const hRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const readRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktopPointer = window.matchMedia('(min-width: 768px)');
    if (!hasFinePointer() || prefersReducedMotion() || !desktopPointer.matches) return;
    setEnabled(true);
    document.body.dataset.cursor = 'custom';

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;
    let moved = false;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!moved) {
        // Snap to the first real position so the crosshair doesn't glide
        // in from screen center, then fade the overlay on.
        moved = true;
        x = tx;
        y = ty;
        setLive(true);
      }
    };

    const frame = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      if (hRef.current) hRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
      if (vRef.current) vRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (readRef.current) {
        readRef.current.style.transform = `translate3d(${x + 18}px, ${y + 18}px, 0)`;
        readRef.current.textContent = `X ${String(Math.round(x)).padStart(4, '0')} · Y ${String(Math.round(y)).padStart(4, '0')}`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest('input, textarea, select, [contenteditable="true"]')) {
        setVariant('text');
        setLabel('');
        return;
      }
      const cursorEl = t.closest('[data-cursor]') as HTMLElement | null;
      const mode = cursorEl?.getAttribute('data-cursor');
      if (mode === 'view') {
        setVariant('view');
        setLabel(cursorEl?.getAttribute('data-cursor-label') || 'Open');
        return;
      }
      if (mode === 'hover' || t.closest('a, button, [role="button"]')) {
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

  if (!enabled || !live || variant === 'text') return null;

  const active = variant !== 'default';
  const ret = variant === 'view' ? 72 : variant === 'hover' ? 34 : 12;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Crosshair hairlines */}
      <div
        ref={hRef}
        className="absolute inset-x-0 top-0 h-px"
        style={{ backgroundColor: 'var(--border-strong)', opacity: 0.5 }}
      />
      <div
        ref={vRef}
        className="absolute inset-y-0 left-0 w-px"
        style={{ backgroundColor: 'var(--border-strong)', opacity: 0.5 }}
      />
      {/* Reticle at the intersection */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 flex items-center justify-center"
        style={{
          width: ret,
          height: ret,
          border: `1.5px solid ${active ? 'var(--water)' : 'var(--primary)'}`,
          backgroundColor: active ? 'transparent' : 'var(--accent-soft)',
          transition:
            'width 320ms cubic-bezier(0.16,1,0.3,1), height 320ms cubic-bezier(0.16,1,0.3,1), border-color 240ms',
        }}
      >
        {label && (
          <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--water)]">
            {label}
          </span>
        )}
      </div>
      {/* Live coordinate readout */}
      <div
        ref={readRef}
        className="absolute left-0 top-0 font-mono text-[9px] tracking-[0.14em] text-[color:var(--text-tertiary)]"
      />
    </div>
  );
}
