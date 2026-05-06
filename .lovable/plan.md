# Shaurya Goyal — Cinematic Frontend Developer Portfolio

Convert the existing photographer template into your personal frontend dev portfolio. Same React + Vite + Tailwind v4 + Framer Motion + GSAP stack — no backend, no contact page, pure work showcase.

## Aesthetic direction

**Editorial Dark + Tech Forward** — the "Apple keynote / Porsche product page" feel, which also matches the vibe of your two existing sites.

- True black canvas (`#0a0a0a`), elevated surfaces (`#141414`, `#1c1c1c`)
- One sharp accent: **electric lime** `hsl(75 100% 60%)` (or your pick — see questions)
- Typography: **Instrument Serif** italic (display drama) + **Geist** (body) + **JetBrains Mono** (labels/code)
- Generous spacing, asymmetric layouts, subtle film-grain noise overlay at 3% opacity
- Dark only — no theme toggle (it's the look)

## The signature animations (the "small → takes over screen" moments)

Built with GSAP ScrollTrigger + Framer Motion. All respect `prefers-reduced-motion`.

1. **Hero word-morph** — "SHAURYA / GOYAL" letters assemble from scattered positions, then on first scroll scale 8x and dissolve into the next section (Apple AirPods reveal style).
2. **Pinned scroll project reveals** — each featured project pins to viewport, thumbnail scales from a small card to fullscreen-bleed while metadata slides in from the side, then unpins.
3. **Magnetic cursor** — custom cursor that morphs/grows over interactive elements with a trailing dot. Hides on touch devices.
4. **Horizontal scroll showcase** — vertical scroll captured and translated to horizontal movement through a row of projects.
5. **Text mask reveals** — headings revealed by a wiping clip-path mask with split-letter stagger (60–80ms between letters).
6. **Image hover tilt + parallax** — project thumbs respond to cursor with subtle 3D tilt and inner-image counter-shift.
7. **Page transitions** — full-screen colored panel sweeps across between routes.
8. **Marquee strip** — infinitely scrolling tech-stack ticker (React, TS, GSAP, Framer, Tailwind, Vite…).
9. **Scroll progress rail** — thin accent line on left edge that fills with scroll.
10. **Number counter ramps** — stats count up when scrolled into view.

## Site structure (no contact)

```text
/              Home — hero + about teaser + featured work + tech marquee + footer
/work          All projects, filter chips, horizontal-scroll featured row, masonry grid
/work/:slug    Case study — pinned hero, scrolling story, gallery, "view live" external link
/about         Bio, timeline, skills constellation
```

Removed: `/contact` route, `ContactForm`, all photography components (Lightbox, ImageWithLightbox, photo CategoryFilter). Footer just shows your name, year, and a single GitHub link.

## Project entries

I'll seed the data with two real case studies plus 3–4 placeholder dev projects you can swap later.

**Real case studies (URLs hidden, opened via labeled buttons only):**

1. **"Barbershop example"** — Fade & Co. showcase
   - Card label / case-study title: *"Barbershop example"*
   - Description framing: editorial dark landing page for a Brooklyn barbershop, serif typography, gold accent, scroll-driven hero
   - Hidden external link via a `<a target="_blank" rel="noopener noreferrer">` button labeled `VIEW LIVE →` — URL never displayed as text, no `aria-label` revealing it, no visible URL anywhere on the page

2. **"Private chef example"** — Julien Marceau private chef portfolio
   - Card label / case-study title: *"Private chef example"*
   - Description framing: cinematic landing for a Lyon-trained private chef, large serif headlines, warm muted palette
   - Same hidden-URL pattern

**Implementation detail for hidden URLs:** the `href` is in the markup (it has to be for the link to work), but no visible text, tooltip, status-bar preview text, or label exposes the URL. Note: a curious user can still inspect the DOM and see the href — true URL hiding is not possible on the open web. If you want the URL fully obscured, the alternatives are (a) a server-side redirect (needs backend) or (b) routing through a generic `/external?id=barbershop` page that does `window.location` — let me know if you want that.

## Page-by-page detail

### Home
- **Hero**: Black canvas. "SHAURYA / GOYAL" massive serif italic with letter-scatter animation. Subtitle "Frontend Developer · Interface Engineer". Mono corner tag: `// AVAILABLE FOR WORK — 2026`.
- **About teaser**: Single oversized serif paragraph, one accent-color word.
- **Featured work**: Both real case studies + one placeholder, presented as pinned scroll reveals.
- **Tech marquee**: Infinite horizontal ticker.
- **Footer**: Big "SHAURYA GOYAL © 2026" + GitHub link, magnetic on hover.

### Work
- Filter chips (All / Landing Pages / Web Apps / Experiments).
- Horizontal-scroll featured row at top with both real projects.
- Asymmetric masonry below.

### Work detail (`/work/:slug`)
- Pinned hero: title + role + year + stack tags.
- Long-form scroll: overview, approach, screenshots with parallax.
- Bottom: `VIEW LIVE →` button (hidden URL) + prev/next project links.

### About
- Two-column: portrait left, serif bio right with drop-cap.
- Animated vertical timeline.
- Skills constellation (floating tag cloud with gentle drift).

## Technical approach

- **Design tokens**: Rewrite `index.css` palette to editorial-dark (true black, elevation surfaces, lime accent, opacity-based borders). Add easing curves and shadow scale as CSS vars.
- **Fonts**: Load Instrument Serif + Geist + JetBrains Mono via `<link>` in `index.html`.
- **New folders**:
  - `src/lib/animations/` — `pinnedReveal.ts`, `splitText.ts`, `horizontalScroll.ts`, `magneticCursor.ts`
  - `src/components/effects/` — `MagneticCursor`, `Marquee`, `SplitTextReveal`, `PinnedSection`, `HorizontalScroll`, `NoiseOverlay`, `ScrollProgress`, `MagneticLink`, `CountUp`, `TiltCard`
  - `src/components/work/` — `ExternalLinkButton` (the hidden-URL component)
- **Data**: Replace `src/data/photographer.ts` → `src/data/profile.ts` (Shaurya). Replace `projects.ts` with dev schema: `{ slug, label, role, year, stack[], summary, body, screenshots[], liveUrl?, repoUrl? }`.
- **Routes**: Rename `/portfolio` → `/work`, `/project/:slug` → `/work/:slug`. Delete `/contact` route + `Contact.tsx` + `ContactForm.tsx`. Remove "Contact" from header nav.
- **Cleanup**: Delete `Lightbox.tsx`, `ImageWithLightbox.tsx`, photo-specific `CategoryFilter.tsx` (replace with new chip filter for work categories).
- **Performance**: Lazy-load GSAP plugins, IntersectionObserver guards, cleanup all ScrollTriggers on unmount, `will-change` only during active animations.

## Out of scope
Backend, CMS, contact form, analytics, light-mode toggle.

---

A couple of quick choices before I build:
