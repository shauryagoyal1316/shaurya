# AGENTS.md

## Project Snapshot

This is Shaurya Goyal's personal portfolio site. It is a Vite + React + TypeScript app with Tailwind CSS v4, Radix/shadcn UI components, Framer Motion, GSAP, Lenis smooth scrolling, and React Router.

The site is positioned around Shaurya as a full-stack website builder and AI web specialist who builds complete websites end to end: front end, back end, responsive layout, motion, deployment, and overall direction.

## Current Public Profile

- Name: Shaurya Goyal
- Tagline: Full-Stack Website Builder
- Experience shown: 2y+ building for the web
- Location: Available worldwide / Remote
- Availability: Available - 2026
- Contact email: seekshaurya@gmail.com
- GitHub: https://github.com/shauryagoyal1316

Keep profile copy in `src/data/profile.ts`.

## Current Work

Only the real portfolio examples should be shown:

- Fade & Co. / barbershop example
  - Live URL: https://shauryagoyal1316.github.io/fade-co-showcase/
- Private Chef / private chef landing page example
  - Live URL: https://shauryagoyal1316.github.io/privatechefportfolio/

Keep project data in `src/data/projects.ts`. Do not add fake examples unless Shaurya explicitly asks for placeholders.

## Routing And Deployment

This site must work from static hosting and from directly opening `dist/index.html`.

- `vite.config.ts` uses `base: './'` so built asset URLs are relative.
- `src/App.tsx` uses `HashRouter`, so routes are `#/`, `#/work`, `#/about`, and `#/work/:slug`.
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

- The landing page hero should show the large "Shaurya Goyal." name immediately on load.
- Header nav routes are Index, Work, and About.
- The global header/nav should stay fixed while scrolling so Index, Work, About, and the theme toggle remain reachable. The Work page filter row (`All`, `Landing`, project count) must stay non-sticky and scroll away with the project list.
- Project detail pages should open directly on the written case-study content with meta/sidebar and paragraphs. Do not add a full-screen screenshot/cover-image hero before that content.
- Footer currently includes email contact, GitHub, and the two live project links.
- The visual style is editorial, dark, cinematic, type-heavy, and restrained. Avoid generic startup/landing-page sections.
- Keep navigation simple and test button/link changes in the browser because routing bugs previously caused white screens.
- The tech marquee should keep each stack item and its star on one line using no-wrap inline flex. Do not use manual negative margins around the star.
- The home hero should not use a scroll-driven blur. The signature dot-portal lives in `src/components/effects/PeriodPortal.tsx`: a body-level fixed div clipped to an animated `clip-path: circle()` (crisp at any size, compositor-friendly on iOS — do not go back to animating a full-screen SVG circle's radius, it repaints every frame and stutters on iPhone). Its keyframes (`PORTAL_TIMELINE`) are fractions of the hero's PINNED scroll range — `useScroll` with offset `['start start', 'end end']` — so the landing always completes while the sticky stage is still on screen; keep every keyframe well inside 0..1 or the dot will land on a "random spot" again. Anchors are measured through the offsetParent chain (transform-immune layout coordinates) plus the dots' static optical `translate` nudge — never via `getBoundingClientRect` during scroll, and never re-measured per scroll frame.
- Never let anything overflow the viewport horizontally on mobile — Safari widens the layout viewport (zooms the page out) and every scroll-linked animation skews. Three past offenders to watch for: joined display headings (`Text,<span className="ml-4">…</span>`) need a `<wbr />` between the text and span because JSX drops the newline and leaves no soft-wrap opportunity; rotated/scaled `whileInView` elements must REST at identity transform and play their entrance via keyframes (see `Stamp` in `drawing.tsx`); full-bleed strips like the tech marquee's 102% width belong behind `md:` prefixes.
- Disable the custom cursor on narrow/mobile-width viewports; it can read as a stray dot during hero and portal animations.
- Use the warm background and orange primary as the base palette. Water blue/aqua accents should stay restrained and secondary, mainly for portal glow, About accents, Work reveal atmosphere, and selected highlights.
- Premium wipe/liquid animation belongs in Work or section reveals, not the hero.
- After any completed change, commit and push to GitHub unless Shaurya explicitly says not to. Update this file whenever project context, contacts, deployment notes, or UI rules change.

## Known Quality Notes

- `npm run build` is the main required verification before deploy.
- Lint may include pre-existing issues, especially in copied/reference UI material. Do not treat unrelated lint churn as part of small content fixes.
- The `tailwind-plus/` folder is design/reference material and should not be deleted without an explicit request.
