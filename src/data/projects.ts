import type { Project } from '@/types';

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
    coverImage: '',
    images: [],
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
    coverImage: '',
    images: [],
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
    coverImage: '',
    images: [],
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
    coverImage: '',
    images: [],
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
    coverImage: '',
    images: [],
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
