import type { ProfileInfo } from '@/types';

export const profile: ProfileInfo = {
  name: 'Shaurya Goyal',
  firstName: 'Shaurya',
  lastName: 'Goyal',
  tagline: 'Full-Stack Website Builder / AI Web Specialist',
  heroIntroduction:
    'I build complete websites, front end and back end, using modern AI-assisted workflows to move faster without losing polish.',
  biography: `I build full websites for people who want something sharper than a template. Front end, back end, layout, copy flow, motion, and deployment all matter to me because a website only works when the whole thing feels intentional.

I do not hand-code every line from scratch. My strength is using AI tools professionally: turning a business idea into a clear brief, prompting and steering the build, debugging with AI assistance, choosing the right stack, and polishing the final site until it feels custom. I have spent time learning structured AI workflows and AI web-building courses so I can use these tools with control instead of guesswork.

The result is simple: clients get a website that looks expensive, works properly, and can be shipped much faster than a traditional build.`,
  approach: `My process is direct: understand the business, map the pages, generate strong first passes with AI, then refine the design, content, responsiveness, and behavior until the site feels finished.

I focus on the outcome, not pretending every line was typed manually. AI is the toolset; taste, direction, and execution are the service.`,
  skills: [
    'Full Website Builds',
    'AI-Assisted Development',
    'Prompt Direction',
    'Frontend Polish',
    'Backend Setup',
    'Responsive Design',
    'Launch & Deployment',
    'Type & Layout',
  ],
  stack: [
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Node',
    'Supabase',
    'Vite',
    'AI Build Tools',
    'Prompt Engineering',
    'GSAP',
    'Framer Motion',
  ],
  location: 'Available worldwide / Remote',
  availability: 'Available for select work / 2026',
  socialLinks: {},
  portraitImage: '',
};

// Legacy alias so any leftover imports of `photographerInfo` keep compiling.
export const photographerInfo = profile;
