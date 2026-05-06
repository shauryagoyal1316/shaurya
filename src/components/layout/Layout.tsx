import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MagneticCursor } from '@/components/effects/MagneticCursor';
import { ScrollProgress } from '@/components/effects/ScrollProgress';
import { NoiseOverlay } from '@/components/effects/NoiseOverlay';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Root layout: sticky header + main + footer, plus the global decorations
 * (custom cursor, scroll progress rail, film-grain overlay).
 */
export function Layout({ children }: LayoutProps) {
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
