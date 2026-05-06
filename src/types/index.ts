/**
 * Core TypeScript interfaces for Shaurya Goyal's frontend developer portfolio.
 */

export type ProjectCategory = 'landing' | 'web-app' | 'experiment';

export type AspectRatio = 'portrait' | 'landscape' | 'square';

export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  aspectRatio: AspectRatio;
  caption?: string;
}

export interface Project {
  id: string;
  /** Public-facing label (the URL is intentionally hidden — only this label is shown). */
  label: string;
  /** Short subtitle / project type, displayed under the label. */
  role: string;
  category: ProjectCategory;
  year: string;
  slug: string;
  coverImage: string;
  /** Two-line tagline used on cards and hero. */
  tagline: string;
  /** Long description used on the case-study page. */
  description: string;
  /** Process / approach paragraph(s), separated by \n\n. */
  approach?: string;
  stack: string[];
  images: ProjectImage[];
  /** Live URL — never displayed as text, only opened by the hidden ExternalLinkButton. */
  liveUrl?: string;
  featured?: boolean;
}

export interface ProfileInfo {
  name: string;
  firstName: string;
  lastName: string;
  tagline: string;
  heroIntroduction: string;
  biography: string;
  approach: string;
  skills: string[];
  stack: string[];
  location: string;
  availability: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    x?: string;
    email?: string;
  };
  portraitImage: string;
}

// Legacy alias kept so any stragglers still compile during migration.
export type PhotographerInfo = ProfileInfo;
