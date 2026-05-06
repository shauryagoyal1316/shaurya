import { motion } from 'framer-motion';
import { Github, ArrowRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { SEOHead } from '@/components/seo/SEOHead';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';
import { MagneticLink } from '@/components/effects/MagneticLink';

/**
 * About — split editorial layout: oversized title, bio narrative, skill
 * constellation that drifts gently in place.
 */
export default function About() {
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
            <span className="mr-3 text-primary">03</span>About
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
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 md:grid-cols-12">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
          >
            <div className="aspect-[3/4] overflow-hidden bg-surface-2">
              <img
                src={profile.portraitImage}
                alt={profile.name}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
              {profile.location}
            </div>
          </motion.div>

          {/* Bio */}
          <div className="md:col-span-7 md:col-start-6">
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
                  style={{
                    animation: `drift ${6 + (i % 4)}s ease-in-out ${i * 0.3}s infinite`,
                  }}
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
            <MagneticLink
              href="/work"
              aria-label="View work"
              className="inline-flex items-center gap-3 bg-primary px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground"
            >
              View work <ArrowRight className="size-3.5" />
            </MagneticLink>
            {profile.socialLinks.github && (
              <MagneticLink
                href={profile.socialLinks.github}
                aria-label="GitHub"
                className="inline-flex items-center gap-3 border border-border-strong px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground transition-colors hover:bg-surface-2"
              >
                <Github className="size-3.5" /> GitHub
              </MagneticLink>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
