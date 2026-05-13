import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { SEOHead } from '@/components/seo/SEOHead';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';

/**
 * About — split editorial layout reskinned to match Portfolio.html:
 *  - Oversized "Hello. / I'm Shaurya." hero
 *  - Bio strip with a sidebar (currently / based / status / email / GitHub)
 *    on the left and a long-form narrative on the right
 *  - Skills constellation that drifts in place + a stack list
 *  - Closing CTA pointing back at /work
 */
export default function About() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <SEOHead
        title="About"
        description={`About ${profile.name} — ${profile.tagline}.`}
      />

      {/* BIO — leads the page; hero stripped to remove dead space */}
      <section className="px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 md:grid-cols-12">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
          >
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
              Currently
            </div>
            <div className="mb-5 font-display text-[clamp(28px,3vw,40px)] leading-[1.1] text-foreground">
              Building{' '}
              <span className="italic text-foreground/60">
                websites that ship.
              </span>
            </div>
            <dl className="flex flex-col gap-4 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[0.22em]">
              <MetaRow label="Based" value={profile.location} />
              <MetaRow label="Status" value={profile.availability} />
              <MetaRow label="Email">
                <a
                  href="mailto:seekshaurya@gmail.com"
                  data-cursor="hover"
                  className="rounded-sm normal-case tracking-[0.05em] text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  seekshaurya@gmail.com
                </a>
              </MetaRow>
              <MetaRow label="GitHub">
                <a
                  href="https://github.com/shauryagoyal1316"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-1.5 rounded-sm normal-case tracking-[0.05em] text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  shauryagoyal1316
                  <ArrowUpRight className="size-3.5" />
                </a>
              </MetaRow>
            </dl>
          </motion.aside>

          {/* Bio */}
          <div className="md:col-span-7 md:col-start-6">
            <p className="font-display text-[clamp(24px,2.6vw,36px)] leading-[1.2] text-foreground">
              {profile.biography.split('\n\n')[0]}
            </p>
            <div className="mt-9 max-w-2xl space-y-5 text-base font-light leading-[1.7] text-foreground/70 md:text-[17px]">
              {profile.biography
                .split('\n\n')
                .slice(1)
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </div>

            <div className="mt-10 border-t border-border pt-7">
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
                Approach
              </div>
              <div className="max-w-2xl space-y-4 text-base font-light leading-[1.65] text-foreground md:text-[16px]">
                {profile.approach.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS / STACK */}
      <section className="border-t border-border bg-background px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
            <span className="text-primary">/</span>What I do
          </div>
          <h2 className="font-display text-[clamp(40px,6vw,96px)] leading-[0.95] tracking-[-0.025em] text-foreground">
            <SplitTextReveal text="Skills" stagger={0.04} />{' '}
            <span className="italic text-foreground/55">
              <SplitTextReveal text="& tools." stagger={0.04} delay={0.12} />
            </span>
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Skills cloud */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              {profile.skills.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-display text-[clamp(24px,3vw,40px)] leading-[1.1] text-foreground"
                  style={
                    reducedMotion
                      ? undefined
                      : {
                          animation: `drift ${6 + (i % 4)}s ease-in-out ${
                            i * 0.3
                          }s infinite`,
                        }
                  }
                >
                  {s}
                  {i < profile.skills.length - 1 && (
                    <span className="mx-2.5 text-primary">·</span>
                  )}
                </motion.span>
              ))}
            </div>

            {/* Stack */}
            <div>
              <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
                Stack
              </div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground">
                {profile.stack.map((tech) => (
                  <li key={tech} className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="size-1.5 rounded-full bg-primary"
                    />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OUTRO */}
      <section className="border-t border-border bg-background px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="font-display text-[clamp(40px,7vw,112px)] leading-[0.95] tracking-[-0.025em] text-foreground">
            Want to{' '}
            <span className="italic text-foreground/55">see the work?</span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/work"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 rounded-full border border-foreground bg-foreground px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View work
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="mailto:seekshaurya@gmail.com"
              data-cursor="hover"
              className="inline-flex items-center gap-3 rounded-full border border-border px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function MetaRow({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <dt className="mb-1.5 text-foreground/40">{label}</dt>
      <dd className="text-foreground">{value || children}</dd>
    </div>
  );
}
