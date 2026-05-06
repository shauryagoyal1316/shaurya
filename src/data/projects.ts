import type { Project } from '@/types';

/**
 * Featured project list for the portfolio.
 *
 * Real case studies are kept first. Their `liveUrl` is intentionally never
 * rendered as visible text anywhere in the UI — it is only attached to a
 * hidden ExternalLinkButton component that opens the link in a new tab.
 */
export const projects: Project[] = [
  {
    id: 'barbershop',
    label: 'Barbershop example',
    role: 'Editorial landing page',
    category: 'landing',
    year: '2025',
    slug: 'barbershop-example',
    featured: true,
    liveUrl: 'https://shauryagoyal1316.github.io/fade-co-showcase/',
    tagline: 'A dark, editorial landing page for a Brooklyn barbershop.',
    description:
      'A single-page experience built around one idea — three barbers, one uncompromising standard. The brief called for a brand that felt closer to a fashion house than a salon: heavy serif type, deep shadows, and a single warm gold that earns its place by appearing only twice on the page.',
    approach: `I started by stripping every assumption — no carousel of stock photos, no "our process" timeline, no smiling-staff grid. Just one room, one chair, one promise.

The hero pairs a slow zoom on a portrait crop with a serif/italic headline split across two lines, so the layout reads like a magazine spread rather than a marketing page. Below the fold, every section breathes — generous spacing, locked vertical rhythm, and a gold accent that only ever marks an action.

Type is doing 90% of the work. The rest is restraint.`,
    stack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite'],
    coverImage:
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
    images: [
      {
        id: 'barbershop-1',
        src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
        alt: 'Barbershop hero — close portrait, deep shadows, gold accent',
        aspectRatio: 'landscape',
      },
      {
        id: 'barbershop-2',
        src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
        alt: 'Detail of vintage barber tools on marble',
        aspectRatio: 'portrait',
      },
      {
        id: 'barbershop-3',
        src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
        alt: 'Interior of the shop, warm tungsten light',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'private-chef',
    label: 'Private chef example',
    role: 'Cinematic single-page portfolio',
    category: 'landing',
    year: '2025',
    slug: 'private-chef-example',
    featured: true,
    liveUrl: 'https://shauryagoyal1316.github.io/privatechefportfolio/',
    tagline: 'A cinematic portfolio for a Lyon-trained private chef.',
    description:
      'A landing page for a private chef whose work is built around a single line: where every dinner becomes a memory. The site had to feel like the rooms he cooks in — candlelit, intimate, slow.',
    approach: `The whole site hinges on one image: a long table, candles, herbs, copper. Everything else is restraint. A serif/italic headline anchors the hero, kept deliberately low in the frame so the photograph leads first and the type closes second.

Below, the layout reads like an editorial: generous margins, narrow body column, and a quiet "01 — HELLO" marker tucked in the corner so the page feels composed rather than decorated.

Color palette: true black, off-white, two earth tones, one muted forest green for actions. Typography is the loudest thing in the room — and it never raises its voice.`,
    stack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite'],
    coverImage:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
    images: [
      {
        id: 'chef-1',
        src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
        alt: 'Long candlelit table set for a private dinner',
        aspectRatio: 'landscape',
      },
      {
        id: 'chef-2',
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
        alt: 'Plated course, overhead, low key',
        aspectRatio: 'portrait',
      },
      {
        id: 'chef-3',
        src: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
        alt: 'Hands working with fresh herbs',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'halo',
    label: 'Halo design system',
    role: 'Component library & token system',
    category: 'web-app',
    year: '2025',
    slug: 'halo-design-system',
    featured: false,
    tagline: 'A token-driven design system for a fintech product team.',
    description:
      'A headless component library built on Radix and Tailwind tokens, designed to keep eight squads visually aligned without slowing any of them down.',
    approach:
      'Started with the tokens, not the components. Once color, type, spacing, and motion were locked as CSS variables, the components practically wrote themselves — and theming became a one-file change.',
    stack: ['React', 'TypeScript', 'Radix UI', 'Tailwind', 'Storybook'],
    coverImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
    images: [
      {
        id: 'halo-1',
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
        alt: 'Design system documentation interface',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'drift',
    label: 'Drift WebGL experiment',
    role: 'Interactive landing prototype',
    category: 'experiment',
    year: '2024',
    slug: 'drift-webgl',
    featured: false,
    tagline: 'A scroll-driven WebGL hero, just to see how far it would go.',
    description:
      'A weekend prototype exploring how far a single GLSL shader and a ScrollTrigger timeline can carry a landing page before the framework has to step in.',
    approach:
      'No frameworks beyond Vite. One shader, one canvas, one scroll handler. The whole thing is under 40KB and runs at 60fps on a four-year-old laptop — which is the only metric I cared about.',
    stack: ['Three.js', 'GLSL', 'GSAP', 'Vite'],
    coverImage:
      'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
    images: [
      {
        id: 'drift-1',
        src: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
        alt: 'Abstract shader gradient',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'ledger',
    label: 'Ledger dashboard',
    role: 'Data-dense product UI',
    category: 'web-app',
    year: '2024',
    slug: 'ledger-dashboard',
    featured: false,
    tagline: 'A trading dashboard that makes 14 charts feel calm.',
    description:
      'A dashboard concept for a portfolio analytics tool — the design problem was hierarchy, not features. The first version had every chart at equal weight and read like a wall of noise.',
    approach:
      'Reduced the palette to three values, locked everything to a 4px grid, and used motion only for state changes (never decoration). The screen is doing more, but feels like less.',
    stack: ['React', 'TypeScript', 'Recharts', 'Tailwind'],
    coverImage:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
    images: [
      {
        id: 'ledger-1',
        src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
        alt: 'Dashboard with multiple charts',
        aspectRatio: 'landscape',
      },
    ],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter((p) => p.category === category);
};

export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.featured);

export const getAdjacentProjects = (
  currentSlug: string,
): { prev: Project | null; next: Project | null } => {
  const i = projects.findIndex((p) => p.slug === currentSlug);
  return {
    prev: i > 0 ? projects[i - 1] : null,
    next: i >= 0 && i < projects.length - 1 ? projects[i + 1] : null,
  };
};
