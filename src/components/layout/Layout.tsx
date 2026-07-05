import { ReactNode, useEffect, useRef, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MagneticCursor } from '@/components/effects/MagneticCursor';
import { ScrollProgress } from '@/components/effects/ScrollProgress';
import { NoiseOverlay } from '@/components/effects/NoiseOverlay';
import { SmoothScroll } from '@/components/effects/SmoothScroll';
import { Preloader } from '@/components/effects/Preloader';
import { useIsMobile } from '@/hooks/useMediaQuery';

/**
 * Root layout. Global decorations live as siblings of <main>: noise grain,
 * custom cursor, top scroll-progress rail, Lenis inertial scroll, and the
 * first-visit preloader.
 *
 * Desktop footer is fixed behind the page and revealed as the content
 * scrolls past its own end — the main column carries an equal bottom margin
 * (measured live) so the document is tall enough to expose it. Mobile keeps
 * the footer in normal flow.
 */
export function Layout({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerH, setFooterH] = useState(0);

  useEffect(() => {
    if (isMobile) return;
    const el = footerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setFooterH(entry.contentRect.height)
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile]);

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground">
      <SmoothScroll />
      <Preloader />
      <NoiseOverlay />
      <MagneticCursor />
      <ScrollProgress />
      <Header />
      <main
        id="main-content"
        className="relative z-[2] flex-1 bg-background"
        style={!isMobile ? { marginBottom: footerH } : undefined}
        tabIndex={-1}
      >
        {children}
      </main>
      {isMobile ? (
        <Footer />
      ) : (
        <div ref={footerRef} className="fixed inset-x-0 bottom-0 z-[1]">
          <Footer />
        </div>
      )}
    </div>
  );
}
