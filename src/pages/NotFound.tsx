import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';

/** 404 — keeps the editorial voice. */
export default function NotFound() {
  return (
    <>
      <SEOHead title="Not found" description="This page doesn't exist." />
      <section className="flex min-h-[100vh] items-center px-6 md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
            <span className="mr-3 text-primary">/</span>404
          </div>
          <h1 className="font-display text-[20vw] leading-[0.85] text-foreground md:text-[14vw]">
            <SplitTextReveal text="Lost." stagger={0.05} />
            <span className="block italic text-foreground/55">
              <SplitTextReveal text="Nothing here." stagger={0.04} delay={0.15} />
            </span>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-12"
          >
            <Link
              to="/"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              Back to index
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
