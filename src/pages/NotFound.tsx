import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';
import { HandNote } from '@/components/effects/drawing';

/** 404 — a page that fell off the drawing board. */
export default function NotFound() {
  return (
    <>
      <SEOHead title="Not found" description="This page doesn't exist." />
      <section className="flex min-h-[100vh] items-center px-6 md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <HandNote className="mb-6">this sheet doesn't exist (404)</HandNote>
          <h1 className="font-display text-[20vw] leading-[0.85] text-foreground md:text-[14vw]">
            <SplitTextReveal text="Lost." stagger={0.05} />
            <span className="block text-[color:var(--text-secondary)]">
              <SplitTextReveal text="Nothing here." stagger={0.04} delay={0.15} />
            </span>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            <Link
              to="/"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 text-[15px] font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back home
            </Link>
            <Link
              to="/services"
              data-cursor="hover"
              className="text-[15px] text-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              See what I build →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
