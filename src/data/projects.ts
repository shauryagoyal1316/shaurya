import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'barbershop',
    label: 'Fade & Co.',
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
    // Microlink renders SPAs after JS hydrates (`waitFor=2000`). thum.io's
    // free tier captures before hydration, so SPA targets came back blank.
    coverImage:
      'https://api.microlink.io/?url=https%3A%2F%2Fshauryagoyal1316.github.io%2Ffade-co-showcase%2F&screenshot=true&embed=screenshot.url&waitFor=2000&meta=false',
    images: [],
  },
  {
    id: 'private-chef',
    label: 'Private Chef',
    role: 'Private chef landing page',
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
      'https://api.microlink.io/?url=https%3A%2F%2Fshauryagoyal1316.github.io%2Fprivatechefportfolio%2F&screenshot=true&embed=screenshot.url&waitFor=2000&meta=false',
    images: [],
  },
];

export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.featured);
