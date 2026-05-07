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
      'A single-page experience built around one idea: three barbers, one uncompromising standard. The brief called for a brand that felt closer to a fashion house than a salon: heavy serif type, deep shadows, and a single warm gold that earns its place by appearing only twice on the page.',
    approach: `I started by stripping every assumption: no carousel of stock photos, no process timeline, no smiling-staff grid. Just one room, one chair, one promise.

The hero pairs a slow zoom on a portrait crop with a serif and italic headline split across two lines, so the layout reads like a magazine spread rather than a generic marketing page.

Type is doing most of the work. The rest is restraint.`,
    stack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite'],
    coverImage:
      'https://image.thum.io/get/width/1600/crop/1000/noanimate/https://shauryagoyal1316.github.io/fade-co-showcase/',
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
      'A landing page for a private chef whose work is built around a single line: where every dinner becomes a memory. The site had to feel like the rooms he cooks in: candlelit, intimate, slow.',
    approach: `The whole site hinges on one image: a long table, candles, herbs, copper. Everything else is restraint. A serif and italic headline anchors the hero, kept deliberately low in the frame so the photograph leads first and the type closes second.

Below, the layout reads like an editorial: generous margins, narrow body column, and a quiet section marker tucked in the corner so the page feels composed rather than decorated.

The typography is the loudest thing in the room, and it never raises its voice.`,
    stack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite'],
    coverImage:
      'https://image.thum.io/get/width/1600/crop/1000/noanimate/https://shauryagoyal1316.github.io/privatechefportfolio/',
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
