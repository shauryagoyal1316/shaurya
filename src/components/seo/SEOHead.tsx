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
 * Fallback OG image used on pages that don't pass one explicitly. Shared
 * across Home / Work / About / 404 so social previews always render with
 * an image rather than as bare text.
 */
const DEFAULT_OG_IMAGE =
  'https://image.thum.io/get/width/1600/crop/1000/noanimate/https://shauryagoyal1316.github.io/shaurya/';

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
  // Under HashRouter the visible browser URL is `${origin}${pathname}#${route}`,
  // so reading `window.location.href` is the only reliable way to share the
  // *actual* URL a visitor would see — `location.pathname` from React Router
  // is the route inside the hash, not the page URL.
  const fullUrl =
    typeof window !== 'undefined' ? window.location.href : '';

  // Use location.pathname (a real string that updates on every nav) as the
  // dependency, not the derived `fullUrl` (which reads window.location at
  // render time and can lag the route change).
  void location.pathname;

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

    const ogImage = image || DEFAULT_OG_IMAGE;
    set('description', fullDescription);
    set('og:title', fullTitle, true);
    set('og:description', fullDescription, true);
    set('og:type', type, true);
    set('og:url', fullUrl, true);
    set('og:image', ogImage, true);
    set('og:site_name', profile.name, true);
    set('twitter:card', 'summary_large_image');
    set('twitter:title', fullTitle);
    set('twitter:description', fullDescription);
    set('twitter:image', ogImage);
    set('author', profile.name);
  }, [fullTitle, fullDescription, fullUrl, image, type, location.pathname]);

  return null;
}
