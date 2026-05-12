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
- The home hero should not use a scroll-driven blur. Use the sticky Framer Motion period portal pattern with exact measured anchors: expand a crisp orange body-level SVG circle from the visible `Goyal.` period, move the circle center only while it fully covers the viewport, then shrink it into the measured About heading period. The visible hero/About periods should be small inline CSS dots so their measured boxes match the actual dot centers; do not measure a tall text period glyph or add manual Y offsets. Do not let the portal drift visibly through the layout or sit as a blob over About copy.
- Disable the custom cursor on narrow/mobile-width viewports; it can read as a stray dot during hero and portal animations.
- Use the warm background and orange primary as the base palette. Water blue/aqua accents should stay restrained and secondary, mainly for portal glow, About accents, Work reveal atmosphere, and selected highlights.
- Premium wipe/liquid animation belongs in Work or section reveals, not the hero.
- After any completed change, commit and push to GitHub unless Shaurya explicitly says not to. Update this file whenever project context, contacts, deployment notes, or UI rules change.

## Known Quality Notes

- `npm run build` is the main required verification before deploy.
- Lint may include pre-existing issues, especially in copied/reference UI material. Do not treat unrelated lint churn as part of small content fixes.
- The `tailwind-plus/` folder is design/reference material and should not be deleted without an explicit request.
