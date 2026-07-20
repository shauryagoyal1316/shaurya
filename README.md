# Shaurya Goyal — Portfolio

Personal portfolio site for **Shaurya Goyal**, a full-stack website builder. Designed as "The Working Drawing" — the site presented as an engineer's drawing of itself: drafting-paper light theme, night-blueprint dark theme, drafting-blue primary, red-pencil annotations. Mobile-first, with a quote-first offer (no listed prices) and email + WhatsApp contact throughout.

## Stack

- Vite
- React 18 + TypeScript
- Tailwind CSS v4
- shadcn/ui (Radix primitives)
- Framer Motion + GSAP
- Lenis (inertial smooth scroll — desktop only; phones scroll natively, and a frame-rate governor falls back to native scrolling on devices that can't hold the frame rate)
- React Router (HashRouter for static hosting)

## Local development

Requires Node.js (v20+) and npm. Bun is also supported (`bun.lockb` is committed).

```sh
# Install dependencies
npm install

# Start the dev server (port 8080)
npm run dev

# Production build
npm run build

# Lint
npm run lint

# Preview the production build
npm run preview
```

## Deployment

Pushes to `main` deploy automatically to GitHub Pages via the workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

Two pieces of the build exist specifically so the static GitHub Pages deploy works:

- `base: './'` in `vite.config.ts` — produces relative asset URLs.
- `HashRouter` in `src/App.tsx` — routes are served as `#/work/...` because GitHub Pages can't do server-side rewrites for client-side routes.

## `./tailwind-plus` folder

The `tailwind-plus/` folder contains Tailwind UI templates kept as design reference. **Don't remove it** unless you intend to drop the reference set entirely.
