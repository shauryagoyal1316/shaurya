/**
 * Core TypeScript interfaces for Shaurya Goyal's website portfolio.
 */

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
