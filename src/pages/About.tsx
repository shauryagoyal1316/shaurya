import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { SEOHead } from '@/components/seo/SEOHead';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';

/**
 * About — split editorial layout: oversized title, bio narrative, skill
 * constellation that drifts gently in place.
 */
export default function About() {
  const reducedMotion = useReducedMotion();
  const hasPortrait = Boolean(profile.portraitImage);
  return (
    <>
      <SEOHead
        title="About"
        description={`About ${profile.name} — ${profile.tagline}.`}
        image={profile.portraitImage}
      />

      {/* HERO */}
      <section className="relative px-6 pb-24 pt-40 md:px-10 md:pb-32 md:pt-48">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
            <span className="mr-3 text-primary">/</span>About
          </div>
          <h1 className="font-display text-[18vw] leading-[0.85] text-foreground md:text-[14vw]">
            <SplitTextReveal text="Hello." stagger={0.06} />
            <span className="block italic text-foreground/55">
              <SplitTextReveal text="I'm Shaurya." stagger={0.05} delay={0.2} />
            </span>
          </h1>
        </div>
      </section>

      {/* BIO */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className={hasPortrait
          ? "mx-auto grid max-w-[1440px] grid-cols-1 gap-16 md:grid-cols-12"
          : "mx-auto max-w-[1440px]"
        }>
          {/* Portrait — only rendered when an image is actually provided.
              An empty grey 3/4 box reads like a broken placeholder, so we
              omit it instead and let the bio span the full column. */}
          {hasPortrait && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-4"
            >
              <img
                src={profile.portraitImage}
                alt={`Portrait of ${profile.name}`}
                className="aspect-[3/4] w-full bg-surface-2 object-cover"
              />
              <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
                {profile.location}
              </div>
            </motion.div>
          )}

          {/* Bio */}
          <div className={hasPortrait ? "md:col-span-7 md:col-start-6" : "max-w-3xl"}>
            <p className="font-display text-3xl leading-[1.15] text-foreground/95 md:text-4xl">
              {profile.biography.split('\n\n')[0]}
            </p>
            <div className="mt-10 space-y-6 text-lg font-light leading-[1.75] text-foreground/70">
              {profile.biography
                .split('\n\n')
                .slice(1)
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </div>

            <div className="mt-12 border-t border-border pt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60">
              <div className="mb-3 text-foreground/40">Approach</div>
              <div className="space-y-4 text-base font-light normal-case tracking-normal text-foreground/80">
                {profile.approach.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS CONSTELLATION */}
      <section className="border-t border-border bg-background px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex items-baseline justify-between gap-6">
            <div>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
                <span className="mr-3 text-primary">/</span>What I do
              </div>
              <h2 className="font-display text-5xl leading-[0.95] text-foreground md:text-7xl">
                Skills <span className="italic text-foreground/55">&amp; tools.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            {/* Skills cloud */}
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {profile.skills.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-3xl text-foreground/90 md:text-4xl"
                  style={
                    reducedMotion
                      ? undefined
                      : { animation: `drift ${6 + (i % 4)}s ease-in-out ${i * 0.3}s infinite` }
                  }
                >
                  {s}
                  {i < profile.skills.length - 1 && (
                    <span className="mx-3 text-primary">·</span>
                  )}
                </motion.span>
              ))}
            </div>

            {/* Stack list */}
            <div>
              <ul className="grid grid-cols-2 gap-y-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/70">
                {profile.stack.map((tech) => (
                  <li key={tech} className="flex items-center gap-3">
                    <span className="size-1 rounded-full bg-primary" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OUTRO */}
      <section className="border-t border-border bg-background px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="font-display text-5xl leading-[0.95] text-foreground md:text-8xl">
            Want to <span className="italic text-foreground/55">see the work?</span>
          </h2>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link
              to="/work"
              className="inline-flex items-center gap-3 rounded-sm bg-primary px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              View work <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
