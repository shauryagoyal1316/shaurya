import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { profile } from '@/data/profile';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

/**
 * Imperative SEO updater — sets <title> and meta tags on each page change.
 */
export function SEOHead({
  title,
  description,
  image,
  type = 'website',
}: SEOHeadProps) {
  const location = useLocation();

  const fullTitle = title
    ? `${title} — ${profile.name}`
    : `${profile.name} — ${profile.tagline}`;
  const fullDescription = description || profile.heroIntroduction;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    document.title = fullTitle;

    const set = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    set('description', fullDescription);
    set('og:title', fullTitle, true);
    set('og:description', fullDescription, true);
    set('og:type', type, true);
    set('og:url', fullUrl, true);
    if (image) set('og:image', image, true);
    set('og:site_name', profile.name, true);
    set('twitter:card', 'summary_large_image');
    set('twitter:title', fullTitle);
    set('twitter:description', fullDescription);
    if (image) set('twitter:image', image);
    set('author', profile.name);
  }, [fullTitle, fullDescription, fullUrl, image, type]);

  return null;
}
