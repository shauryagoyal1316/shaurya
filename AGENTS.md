# AGENTS.md

## Project Snapshot

This is Shaurya Goyal's personal portfolio site. It is a Vite + React + TypeScript app with Tailwind CSS v4, Radix/shadcn UI components, Framer Motion, GSAP, Lenis smooth scrolling (desktop-only, adaptive — see UI notes), and React Router.

The site is positioned around Shaurya as a full-stack website builder who builds complete websites and internal business software end to end: front end, back end, responsive layout, motion, deployment, and overall direction. The audience is small and growing businesses — cafés, studios, logistics fleets — with mobile treated as the primary device.

## Current Public Profile

- Name: Shaurya Goyal
- Tagline: Websites & Business Software
- Location: Available worldwide / Remote
- Availability: Taking client projects · 2026
- Contact email: seekshaurya@gmail.com
- WhatsApp: +1 (630) 915-0320 — message-only (US number); never frame it as a phone line to call
- GitHub: https://github.com/shauryagoyal1316

Keep profile copy in `src/data/profile.ts` and contact endpoints (email href with subject, wa.me link with prefilled greeting) in `src/lib/contact.ts` — every CTA imports from there.

## Positioning Rules

- No prices anywhere on the site. The offer is quote-first: "quoted in writing after one call", fixed scope, walk-away-anytime. Do not reintroduce dollar amounts, deposit percentages, or payment terms without an explicit request.
- The proof strategy is the site itself ("You're looking at it") plus two internal tools described in Services copy as running in production (a parts-inventory platform and a fleet-maintenance app). Do not add fake case studies, logos, or testimonials.
- Services page carries both service lines: custom websites, and internal SaaS / sectional ERP modules (inventory, fleet & maintenance, compliance & documents, approvals & roles, reports). A hand-note jump link in the Services hero scrolls to `#software` — via Lenis when present, `scrollIntoView` otherwise, never a plain hash anchor (HashRouter owns the URL hash).

## Routing And Deployment

This site must work from static hosting and from directly opening `dist/index.html`.

- `vite.config.ts` uses `base: './'` so built asset URLs are relative.
- `src/App.tsx` uses `HashRouter`; routes are `#/`, `#/services`, and `#/about`.
- `index.html` includes file-open handling for local `file://` usage.
- GitHub Pages deploys from pushes to `main` using `.github/workflows/deploy.yml`.

Be careful not to switch back to `BrowserRouter` unless static hosting rewrites are also added.

Route pages must be imported with `lazyWithRetry` (`src/lib/lazyWithRetry.ts`), not bare `React.lazy`: each deploy replaces the content-hashed chunks, so a visitor holding a cached `index.html` would otherwise hit "Importing a module script failed" when navigating. The wrapper hard-reloads once (session-guarded) to fetch the fresh manifest, and `ErrorBoundary` treats stale-chunk errors the same way.

## Main Commands

```sh
npm run dev
npm run build
npm run preview
npm run lint
```

Expected dev server port is `8080`.

## Important UI Notes

- The visual system is "The Working Drawing": the site presented as an engineer's drawing of itself. Drafting-paper light theme (default), night-blueprint dark theme, drafting-blue primary, red-pencil (`--water`) annotations, graph-grid `.paper` surfaces, hand-note asides, stamps, dimension lines. Avoid generic startup/landing-page sections.
- Header nav routes are Home, Services, and About; the header stays fixed while scrolling.
- The Home hero headline is "Websites, built to measure." with a split-letter reveal; the first-visit preloader (session-gated) shows the name. `Annotate` accepts a `delay` prop — the Home hero passes its intro offset so the red pencil circles letters that have already landed.
- The signature dot-portal lives in `src/components/effects/PeriodPortal.tsx`. Current implementation: a small solid-colour square, translated and scaled with pure transforms inside a fixed `overflow: clip` container sized from measured viewport numbers. Solid-colour quads composite as geometry (no texture, no repaints, crisp at any scale) — do NOT go back to animating `clip-path` per frame (paint-path stutter on modest GPUs) or a full-screen SVG. Keyframes (`PORTAL_TIMELINE`) are fractions of the hero's PINNED scroll range — `useScroll` with offset `['start start', 'end end']` — so the landing always completes while the sticky stage is still on screen; keep every keyframe well inside 0..1. Anchors are measured through the offsetParent chain (transform-immune layout coordinates) plus the dots' static optical `translate` nudge — never via `getBoundingClientRect` during scroll, and never re-measured per scroll frame.
- NEVER set `overflow-x` (even `clip`) on the root `<html>` element: it kills every `position: sticky` descendant in Chromium, which unpins the hero stage mid-portal and hides the offer block. Mobile viewport-widening is prevented at the source instead (see next note) plus `body { overflow-x: hidden }`.
- Never let anything overflow the viewport horizontally on mobile — mobile browsers widen the layout viewport (zoom the page out) and every scroll-linked animation skews. Past offenders: joined display headings (`Text,<span className="ml-4">…</span>`) need a `<wbr />` between text and span; rotated/scaled `whileInView` elements must REST at identity transform and play entrances via keyframes (see `Stamp` in `drawing.tsx`); `ScrollDrift` clamps its lateral offset to 20px on small screens; full-bleed strips like the tech marquee's 102% width belong behind `md:` prefixes.
- Performance tiers (keep all of these): Lenis runs on fine-pointer devices only — phones scroll natively; a frame-rate governor in `SmoothScroll.tsx` demotes a session to native scrolling when sustained FPS is poor (sessionStorage `sg-native-scroll`). Every scroll consumer must keep a native fallback. The route-transition blur in `PageTransition.tsx` is desktop-only and clears to `filter: none` on completion — a resting `blur(0px)` isolates the whole page into a render surface and janks every scroll-linked animation. The film-grain overlay bakes its tint into the texture per theme — never reintroduce a full-viewport `mix-blend-mode` layer. The marquee pauses its animation off-screen. The hero and offer blocks keep `willChange: 'transform, opacity'`; do not add a slow per-frame `scale` to the hero (large-text layers re-rasterise and stutter).
- `useMediaQuery` reads its query synchronously so the first render is mobile-correct; don't regress it to an effect-only read.
- The tech marquee keeps each stack item and its mark on one line using no-wrap inline flex. Do not use manual negative margins around the mark.
- Disable the custom drafting cursor on narrow/mobile viewports (already gated); it also stays hidden until the pointer first moves.
- Keep navigation simple and test button/link changes in the browser because routing bugs previously caused white screens.
- After any completed change, commit and push to GitHub unless Shaurya explicitly says not to. Update this file whenever project context, contacts, deployment notes, or UI rules change.

## Known Quality Notes

- `npm run build` is the main required verification before deploy.
- For animation or layout changes, verify in a real browser at both 1440×900 and 390×844 across the hero's full pinned scroll range — screenshots at scroll position 0 alone have missed pin regressions before.
- Lint may include pre-existing issues, especially in copied/reference UI material. Do not treat unrelated lint churn as part of small content fixes.
- The `tailwind-plus/` folder is design/reference material and should not be deleted without an explicit request.
