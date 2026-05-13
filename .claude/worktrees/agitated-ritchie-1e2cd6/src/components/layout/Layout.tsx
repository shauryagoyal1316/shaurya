import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MagneticCursor } from '@/components/effects/MagneticCursor';
import { ScrollProgress } from '@/components/effects/ScrollProgress';
import { NoiseOverlay } from '@/components/effects/NoiseOverlay';

/**
 * Root layout: sticky header + main + footer. Global decorations live as
 * siblings of <main>: noise grain, custom cursor, top scroll-progress rail.
 * Native scrolling — Portfolio.html does not use Lenis or any smooth-scroll
 * wrapper; the cursor lerp + page-transition curtain rely on raw scrollY.
 */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground">
      <NoiseOverlay />
      <MagneticCursor />
      <ScrollProgress />
      <Header />
      <main id="main-content" className="relative z-[2] flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
