import type { ProfileInfo } from '@/types';

export const profile: ProfileInfo = {
  name: 'Shaurya Goyal',
  firstName: 'Shaurya',
  lastName: 'Goyal',
  tagline: 'Frontend Developer · Interface Engineer',
  heroIntroduction:
    'I build cinematic, high-craft web experiences — interfaces that feel less like websites and more like products you remember.',
  biography: `I'm a frontend developer obsessed with the difference between something that works and something that feels alive. My focus is the layer most people overlook: the easing curve on a button, the way a headline reveals itself, the rhythm of a layout breathing across breakpoints.\n\nI work primarily in React, TypeScript, and Tailwind, with GSAP and Framer Motion for the moments that need to perform. I treat performance and accessibility as part of the design — a 60fps animation that excludes keyboard users isn't finished work.\n\nWhen I'm not shipping, I'm reverse-engineering the product pages of brands I admire (Apple, Linear, Vercel, Porsche, Arc) to understand what makes them quietly extraordinary.`,
  approach: `My process is short on theory and long on iteration. I start in code, not Figma — the browser is the only place an interface is ever real. I build in passes: layout, then type, then color, then motion, then the polish nobody notices but everyone feels.\n\nI'd rather ship one page that's exceptional than ten that are competent.`,
  skills: [
    'Interface Engineering',
    'Motion Design',
    'Design Systems',
    'Performance',
    'Accessibility',
    'Prototyping',
    'WebGL Basics',
    'Type & Layout',
  ],
  stack: [
    'React',
    'TypeScript',
    'Tailwind CSS',
    'GSAP',
    'Framer Motion',
    'Vite',
    'Next.js',
    'Radix UI',
    'Three.js',
    'Node',
  ],
  location: 'Available worldwide · Remote',
  availability: 'Available for select work — 2026',
  socialLinks: {
    github: 'https://github.com/shauryagoyal1316',
    email: 'mailto:hello@shauryagoyal.com',
  },
  portraitImage: '',
};

// Legacy alias so any leftover imports of `photographerInfo` keep compiling.
export const photographerInfo = profile;
