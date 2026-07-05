import { useCallback, useLayoutEffect, useState, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import {
  cubicBezier,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion';

/**
 * The period portal — the site's signature move. The ink period at the end
 * of the hero headline swells into a full-viewport wash, carries the eye
 * down the cover sheet, then contracts until it *is* the period of the
 * offer block's headline.
 *
 * Keyframes are fractions of the hero's PINNED scroll range: the driving
 * progress must run 0 → 1 over exactly the span where the sticky stage is
 * pinned to the viewport (`useScroll` with offset `['start start', 'end
 * end']` on a section taller than its sticky child). Because every keyframe
 * ends well inside that range, the landing always completes while the
 * destination is still fixed on screen — on any device, at any scroll
 * speed. This is the invariant that keeps the dot from ever landing on a
 * "random spot" again; preserve it if you retune the numbers.
 */
export const PORTAL_TIMELINE = {
  /** Portal disc has faded in over the visible period. */
  ignite: 0.02,
  /** Slow swell ends; the rush to full cover begins. */
  liftoff: 0.08,
  /** The wash fully covers the viewport. */
  cover: 0.3,
  /** Still fully covered — the disc centre quietly travels to the target. */
  carry: 0.46,
  /** Contraction complete: the disc sits exactly on the target period. */
  land: 0.8,
  /** Crossfade to the real ink period is done; the portal is gone. */
  settle: 0.88,
} as const;

/**
 * A square period rendered as a circle of equal area reads as the same
 * mark: r = side / √π.
 */
const SQUARE_TO_CIRCLE = 1 / Math.sqrt(Math.PI);

type Anchor = { x: number; y: number; r: number };
type Geometry = { origin: Anchor; target: Anchor; coverRadius: number };

/** Gentle in-out for the first swell — the period "wakes up". */
const swell = cubicBezier(0.45, 0, 0.55, 1);
/** Hard acceleration into the wash — the takeoff. */
const rush = cubicBezier(0.7, 0, 0.3, 1);
/** Linear hold while fully covered (radius is constant here anyway). */
const hold = (v: number) => v;
/** Long decelerating tail — the disc settles onto the period, no bounce. */
const landing = cubicBezier(0.23, 1, 0.32, 1);

/**
 * Layout-space offset of `node` within `ancestor`, accumulated up the
 * offsetParent chain. Unlike getBoundingClientRect(), offsetLeft/offsetTop
 * ignore CSS transforms — so this is immune to every animation that may be
 * running when we measure (the hero's scroll scale, the offer block's
 * entrance lift, route-transition translates) and always describes the
 * resting layout. Returns null if `ancestor` is not on the chain.
 */
function layoutOffsetWithin(node: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let current: HTMLElement | null = node;
  while (current && current !== ancestor) {
    x += current.offsetLeft;
    y += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return current === ancestor ? { x, y } : null;
}

/** Layout-space left edge of `node` relative to the document. */
function layoutDocumentLeft(node: HTMLElement) {
  let x = 0;
  let current: HTMLElement | null = node;
  while (current) {
    x += current.offsetLeft;
    current = current.offsetParent as HTMLElement | null;
  }
  return x;
}

/**
 * The period glyphs carry a tiny constant optical nudge (`translate-y-*`
 * for baseline alignment). Layout offsets can't see it, but the eye can —
 * read it from computed style so the disc ignites and lands exactly on
 * the visible mark. Handles both the CSS `translate` property (Tailwind
 * v4) and a plain 2D `transform` matrix.
 */
function opticalNudge(node: HTMLElement) {
  const style = getComputedStyle(node);
  let dx = 0;
  let dy = 0;
  if (style.translate && style.translate !== 'none') {
    const [x = '0', y = '0'] = style.translate.split(' ');
    dx += parseFloat(x) || 0;
    dy += parseFloat(y) || 0;
  }
  if (style.transform && style.transform.startsWith('matrix(')) {
    const parts = style.transform.slice(7, -1).split(',');
    dx += parseFloat(parts[4]) || 0;
    dy += parseFloat(parts[5]) || 0;
  }
  return { dx, dy };
}

/**
 * The tallest the viewport can get. iOS Safari grows the viewport when its
 * toolbar collapses mid-scroll, so the full-cover radius must be computed
 * against the LARGE viewport height — measured through a 100lvh probe —
 * or the wash could leave an uncovered strip at the bottom of an iPhone
 * screen. Falls back to innerHeight where lvh is unsupported.
 */
function measureLargeViewportHeight() {
  const probe = document.createElement('div');
  probe.style.cssText =
    'position:fixed;top:0;left:0;width:0;height:100lvh;visibility:hidden;pointer-events:none;';
  document.body.appendChild(probe);
  const measured = probe.offsetHeight; // 0 when lvh is unsupported
  document.body.removeChild(probe);
  return Math.max(measured, window.innerHeight || 0, 1);
}

function anchorsEqual(a: Anchor, b: Anchor) {
  return (
    Math.abs(a.x - b.x) < 0.5 &&
    Math.abs(a.y - b.y) < 0.5 &&
    Math.abs(a.r - b.r) < 0.5
  );
}

/**
 * Renders the portal disc into <body> as a fixed, full-viewport layer
 * clipped to an animated circle. clip-path is resolution-independent
 * (crisp at 4px and at 4000px) and composites without per-frame repaints,
 * which is what keeps this smooth on iPhone — where animating a
 * full-screen SVG circle visibly stutters.
 *
 * @param progress Pinned-range scroll progress (see PORTAL_TIMELINE).
 * @param pinRef   The sticky, viewport-sized stage both periods live in.
 * @param originRef The hero headline's period.
 * @param targetRef The offer block's period.
 */
export function PeriodPortal({
  progress,
  pinRef,
  originRef,
  targetRef,
}: {
  progress: MotionValue<number>;
  pinRef: RefObject<HTMLElement | null>;
  originRef: RefObject<HTMLElement | null>;
  targetRef: RefObject<HTMLElement | null>;
}) {
  const reducedMotion = useReducedMotion();
  const [geometry, setGeometry] = useState<Geometry | null>(null);

  const measure = useCallback(() => {
    const pin = pinRef.current;
    const origin = originRef.current;
    const target = targetRef.current;
    if (!pin || !origin || !target) return;

    const viewportWidth =
      document.documentElement.clientWidth || window.innerWidth || 1;
    const viewportHeight = measureLargeViewportHeight();
    const pinLeft = layoutDocumentLeft(pin);

    // While pinned, the stage's top-left sits at (pinLeft, 0) in viewport
    // space — and the portal only ever shows while pinned — so layout
    // offsets within the stage ARE viewport coordinates.
    const readAnchor = (dot: HTMLElement): Anchor => {
      const offset = layoutOffsetWithin(dot, pin);
      if (offset) {
        const nudge = opticalNudge(dot);
        return {
          x: pinLeft + offset.x + nudge.dx + dot.offsetWidth / 2,
          y: offset.y + nudge.dy + dot.offsetHeight / 2,
          r: Math.max(dot.offsetWidth * SQUARE_TO_CIRCLE, 2),
        };
      }
      // Rect fallback, only reachable if the offsetParent chain ever stops
      // passing through the stage (e.g. markup restructure).
      const pinRect = pin.getBoundingClientRect();
      const rect = dot.getBoundingClientRect();
      return {
        x: rect.left - pinRect.left + rect.width / 2 + pinLeft,
        y: rect.top - pinRect.top + rect.height / 2,
        r: Math.max(rect.width * SQUARE_TO_CIRCLE, 2),
      };
    };

    const originAnchor = readAnchor(origin);
    const targetAnchor = readAnchor(target);
    const farthestCorner = (anchor: Anchor) =>
      Math.hypot(
        Math.max(anchor.x, viewportWidth - anchor.x),
        Math.max(anchor.y, viewportHeight - anchor.y)
      );
    const coverRadius =
      Math.ceil(
        Math.max(farthestCorner(originAnchor), farthestCorner(targetAnchor)) *
          1.06
      ) + 32;

    setGeometry((current) =>
      current &&
      anchorsEqual(current.origin, originAnchor) &&
      anchorsEqual(current.target, targetAnchor) &&
      Math.abs(current.coverRadius - coverRadius) < 1
        ? current
        : { origin: originAnchor, target: targetAnchor, coverRadius }
    );
  }, [pinRef, originRef, targetRef]);

  // Measurement is layout-driven, never scroll-driven. Because the reads
  // above are transform-immune, we only need to re-measure when layout can
  // truly change: mount, web fonts arriving (they reflow the display type
  // the periods sit inside), and viewport/stage resizes. iOS toolbar
  // show/hide fires window resize too, but svh-sized layout doesn't move,
  // so the epsilon guard in measure() turns those into no-ops.
  useLayoutEffect(() => {
    measure();

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    let disposed = false;
    document.fonts?.ready.then(() => {
      if (!disposed) schedule();
    });

    window.addEventListener('resize', schedule);
    window.addEventListener('orientationchange', schedule);
    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    if (pinRef.current) observer?.observe(pinRef.current);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('orientationchange', schedule);
      observer?.disconnect();
    };
  }, [measure, pinRef]);

  const T = PORTAL_TIMELINE;
  const geo = geometry ?? {
    origin: { x: 0, y: 0, r: 0 },
    target: { x: 0, y: 0, r: 0 },
    coverRadius: 1,
  };

  const cx = useTransform(
    progress,
    [T.cover, T.carry],
    [geo.origin.x, geo.target.x]
  );
  const cy = useTransform(
    progress,
    [T.cover, T.carry],
    [geo.origin.y, geo.target.y]
  );
  const radius = useTransform(
    progress,
    [0, T.liftoff, T.cover, T.carry, T.land],
    [geo.origin.r, geo.origin.r * 3, geo.coverRadius, geo.coverRadius, geo.target.r],
    { ease: [swell, rush, hold, landing] }
  );
  const opacity = useTransform(
    progress,
    [0, T.ignite, T.land, T.settle],
    [0, 1, 1, 0]
  );
  // Fully transparent frames drop out of compositing (and hit-testing on
  // older engines) entirely.
  const visibility = useTransform(opacity, (v) =>
    v > 0.001 ? ('visible' as const) : ('hidden' as const)
  );
  const clipPath = useMotionTemplate`circle(${radius}px at ${cx}px ${cy}px)`;

  if (reducedMotion || !geometry) return null;

  return createPortal(
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[10000] h-screen w-screen bg-[var(--portal-solid)]"
      style={{
        clipPath,
        opacity,
        visibility,
        // Large-viewport height so the wash never exposes a strip while
        // the iOS toolbar collapses; invalid where unsupported, in which
        // case the h-screen class above applies.
        height: '100lvh',
        willChange: 'clip-path, opacity',
        transform: 'translateZ(0)',
      }}
    />,
    document.body
  );
}
