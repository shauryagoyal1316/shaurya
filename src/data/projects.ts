import type { Project } from '@/types';
import fadeCoCoverUrl from '@/assets/images/fade-co-cover.jpg';
import privateChefCoverUrl from '@/assets/images/private-chef-cover.jpg';
// When ready: drop skyward-cover.jpg / ghosted-cover.jpg into src/assets/images/
// then import them here and set coverImage below.

export const projects: Project[] = [
  {
    id: 'skyward',
    label: 'Skyward',
    role: 'Full-stack web app',
    category: 'web-app',
    year: '2025',
    slug: 'skyward',
    featured: true,
    liveUrl: 'https://bookskyward.vercel.app',
    tagline: 'An AI-powered flight search that finds, ranks, and books — handled end to end.',
    description:
      'Skyward is a full-stack flight search app where a plain-language request becomes a ranked shortlist of real flights, curated by Mistral AI and linked directly to Skyscanner for booking. Real APIs, real money on the line, real edge cases.',
    approach: `The core challenge was the gap between raw flight data and something a person can act on. SerpAPI returns hundreds of results; most are noise. I wired Mistral to read the full set and return a ranked, explained shortlist — teaching me exactly where the seams between data APIs and language models break.

The serverless function handles the entire pipeline: validate the request, call SerpAPI, pipe the results through Mistral with a structured prompt, normalise the JSON response, and return it typed. Dev and prod run the same logic through different entry points — keeping those in lockstep was its own discipline.`,
    stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'Mistral AI', 'SerpAPI', 'Vercel'],
    coverImage: '', // replace with skyward-cover.jpg when available
    images: [],
    learned: [
      {
        label: 'API Orchestration',
        detail: 'Chained SerpAPI flight data into Mistral AI and normalised the output into a typed, ranked JSON response — learning where the seams between data APIs and language models break.',
      },
      {
        label: 'Vercel Serverless',
        detail: 'Built the full search pipeline as a single serverless function, keeping dev middleware and the production API route in lockstep.',
      },
      {
        label: 'Supabase Auth',
        detail: 'Email/password flows, protected routes, and React session context — wired from scratch without a helper library.',
      },
      {
        label: 'Mistral AI',
        detail: 'Prompted mistral-small-latest to return structured JSON rankings, guarding at the component level against nulls the model can return despite typed contracts.',
      },
      {
        label: 'Rate Limiting',
        detail: 'In-memory rate limiting in a stateless serverless environment — a deliberate cold-start tradeoff chosen over Redis overhead.',
      },
      {
        label: 'CSS Design Systems',
        detail: 'Built a full token system in raw CSS variables — surfaces, type scale, motion, and colour — without a utility framework.',
      },
    ],
  },
  {
    id: 'ghosted',
    label: 'Ghosted',
    role: 'Real-time multiplayer game',
    category: 'web-app',
    year: '2025',
    slug: 'ghosted',
    featured: true,
    liveUrl: 'https://seekr.vercel.app',
    tagline: 'A real-time GPS hide-and-seek game for friend groups, playable entirely in the browser.',
    description:
      'Ghosted is a multiplayer location-based game built on Supabase Realtime. Players join a room via a six-character code, a host draws a GPS boundary on a live map, and the round plays out across four phases — all synced in real time across every device in the room.',
    approach: `The hardest part was not the game logic — it was the state model. A game has phases that must advance in order, with different rules and UI for each player role at each phase. I ended up modelling the entire game as an explicit state machine (waiting → hiding → seeking → reveal → finished) and driving every component from that single source of truth.

Realtime sync exposed a second layer of complexity: subscriptions had to be scoped precisely to one room, mutations had to be idempotent, and the host had to be the single authority for phase transitions — otherwise two clients could race to advance the game simultaneously.`,
    stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'Supabase Realtime', 'Leaflet', 'Tailwind CSS'],
    coverImage: '', // replace with ghosted-cover.jpg when available
    images: [],
    learned: [
      {
        label: 'Supabase Realtime',
        detail: 'Scoped live subscriptions per room, syncing player positions and game state across multiple clients without race conditions.',
      },
      {
        label: 'Game State Machines',
        detail: 'Modelled phases (waiting → hiding → seeking → reveal) as explicit types and drove all UI and logic from that single source of truth.',
      },
      {
        label: 'Geolocation API',
        detail: 'Continuous GPS polling in the browser — handling accuracy variance and the battery tradeoff for a live mobile game.',
      },
      {
        label: 'Geospatial Maths',
        detail: 'Haversine distance formula for proximity hints; ray-casting algorithm to check whether a player is inside the host-drawn boundary polygon.',
      },
      {
        label: 'Row-Level Security',
        detail: 'Wrote Supabase RLS policies that restrict every player\'s data to members of the same room only — database-level auth, not just frontend guards.',
      },
      {
        label: 'Anonymous Auth',
        detail: 'Zero-friction join flow using anonymous Supabase sessions — players enter a game without signing up, identity persists for the session.',
      },
    ],
  },
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
    coverImage: fadeCoCoverUrl,
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
    coverImage: privateChefCoverUrl,
    images: [],
  },
];

export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.featured);
