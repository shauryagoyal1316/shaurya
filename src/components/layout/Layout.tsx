import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MagneticCursor } from '@/components/effects/MagneticCursor';
import { ScrollProgress } from '@/components/effects/ScrollProgress';
import { NoiseOverlay } from '@/components/effects/NoiseOverlay';
import { SmoothScroll } from '@/components/effects/SmoothScroll';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Root layout: sticky header + main + footer, plus the global decorations
 * (Lenis smooth scroll, custom cursor, scroll progress rail, film-grain).
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground">
      <SmoothScroll />
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
