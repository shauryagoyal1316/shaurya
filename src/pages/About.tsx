import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react';
import { profile } from '@/data/profile';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollDrift } from '@/components/effects/ScrollDrift';
import { ScrollScrubText } from '@/components/effects/ScrollScrubText';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';
import { TiltCard } from '@/components/effects/TiltCard';
import {
  Annotate,
  DrawnRule,
  HandNote,
  Stamp,
} from '@/components/effects/drawing';
import { EASE } from '@/lib/motion';
import { EMAIL, EMAIL_HREF, WHATSAPP_DISPLAY, WHATSAPP_HREF } from '@/lib/contact';

/** Masked line reveal for body copy — the paragraph rises out of its own line box. */
function RevealParagraph({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className="overflow-hidden">
      <motion.p
        initial={{ y: '55%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 0.85, delay, ease: EASE.snappy }}
        className={className}
      >
        {children}
      </motion.p>
    </div>
  );
}

/**
 * Sheet 03 — who drew this. Split editorial layout in the working-drawing
 * language: bordered capability cells, a spec-table sidebar, drawn rules.
 */
export default function About() {
  const reducedMotion = useReducedMotion();
  const capabilityPanels = [
    {
      label: 'Direction',
      title: 'Clear page strategy before pixels.',
      body: 'The offer, sections, hierarchy, and user path get mapped before the design gets dressed up.',
    },
    {
      label: 'Build',
      title: 'Front end, back end, and launch flow.',
      body: 'The site is shaped as a complete system, not a disconnected visual mockup.',
    },
    {
      label: 'AI workflow',
      title: 'AI-assisted execution with taste.',
      body: 'AI tools speed up production while every decision about quality and polish stays human.',
    },
  ];

  return (
    <>
      <SEOHead
        title="About"
        description={`About ${profile.name}: custom websites and internal business software for local businesses and growing operations.`}
      />

      {/* BIO HERO */}
      <section className="relative overflow-hidden px-6 pb-12 pt-28 md:px-10 md:pb-16 md:pt-36">
        <div className="relative mx-auto max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE.snappy }}
            className="max-w-5xl"
          >
            <HandNote className="mb-5">who drew all this —</HandNote>
            <h1 className="font-display text-[clamp(52px,10.5vw,160px)] leading-[0.86] text-foreground">
              Full websites,
              <span className="block text-[color:var(--text-secondary)]">
                <Annotate note="design → deploy">one</Annotate> pair of hands.
              </span>
            </h1>
          </motion.div>

          <div className="mt-12 grid border border-[var(--border-strong)] md:grid-cols-3">
            {capabilityPanels.map((panel, i) => (
              <motion.article
                key={panel.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{
                  duration: 0.75,
                  delay: i * 0.08,
                  ease: EASE.snappy,
                }}
                className={`border-[var(--border-strong)] max-md:border-b md:border-r ${i === 2 ? 'md:border-r-0 max-md:border-b-0' : ''}`}
              >
                <TiltCard max={2.5} parallax={5} className="h-full">
                  <div className="h-full p-6">
                    <div className="mb-8 font-note text-base text-[color:var(--water)]" style={{ rotate: '-1.5deg' }}>
                      {panel.label.toLowerCase()}
                    </div>
                    <h2 className="font-display text-2xl leading-[1.02] text-foreground">
                      {panel.title}
                    </h2>
                    <p className="mt-5 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                      {panel.body}
                    </p>
                  </div>
                </TiltCard>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 pt-8 md:px-10 md:pb-20 md:pt-12">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 md:grid-cols-12">
          {/* Spec-table sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: EASE.snappy }}
            className="md:col-span-4"
          >
            <div className="mb-5 text-sm text-foreground/50">Currently</div>
            <div className="mb-6 font-display text-[clamp(24px,2.6vw,36px)] leading-[1.02] text-foreground">
              Building
              <span className="block text-[color:var(--text-secondary)]">
                websites that ship.
              </span>
            </div>
            <dl className="border border-[var(--border-strong)]">
              <MetaRow label="Based" value={profile.location} />
              <MetaRow label="Status" value={profile.availability} />
              <MetaRow label="Email">
                <a
                  href={EMAIL_HREF}
                  data-cursor="hover"
                  className="normal-case tracking-[0.05em] text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {EMAIL}
                </a>
              </MetaRow>
              <MetaRow label="WhatsApp">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="normal-case tracking-[0.05em] text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </MetaRow>
              <MetaRow label="GitHub" last>
                <a
                  href="https://github.com/shauryagoyal1316"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-1.5 normal-case tracking-[0.05em] text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  shauryagoyal1316
                  <ArrowUpRight className="size-3.5" />
                </a>
              </MetaRow>
            </dl>
          </motion.aside>

          {/* Bio */}
          <div className="md:col-span-7 md:col-start-6">
            <ScrollScrubText
              text={profile.biography.split('\n\n')[0]}
              className="font-sans text-[clamp(22px,2.4vw,32px)] font-medium leading-[1.3] tracking-[-0.01em] text-foreground"
            />
            <div className="mt-9 max-w-2xl space-y-5 text-base font-light leading-[1.7] text-[color:var(--text-secondary)] md:text-[17px]">
              {profile.biography
                .split('\n\n')
                .slice(1)
                .map((para, i) => (
                  <RevealParagraph key={i} delay={i * 0.08}>
                    {para}
                  </RevealParagraph>
                ))}
            </div>

            <div className="mt-10 pt-7">
              <DrawnRule strong className="mb-7" />
              <div className="mb-4 text-sm text-foreground/50">Approach</div>
              <div className="max-w-2xl space-y-4 text-base font-light leading-[1.65] text-foreground md:text-[16px]">
                {profile.approach.split('\n\n').map((para, i) => (
                  <RevealParagraph key={i} delay={i * 0.08}>
                    {para}
                  </RevealParagraph>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS / STACK */}
      <section className="relative overflow-hidden border-t border-[var(--border-strong)] px-6 py-16 md:px-10 md:py-20">
        <div className="relative mx-auto max-w-[1440px]">
          <h2 className="font-display text-[clamp(38px,5.5vw,88px)] leading-[0.9] text-foreground">
            <SplitTextReveal text="Skills" stagger={0.04} />{' '}
            <span className="text-[color:var(--text-secondary)]">
              <SplitTextReveal text="& tools." stagger={0.04} delay={0.12} />
            </span>
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Skills cloud — the two halves square up as you scroll */}
            <ScrollDrift from={-48}>
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
                    ease: EASE.snappy,
                  }}
                  className="font-display text-[clamp(20px,2.6vw,34px)] leading-[1.05] text-foreground"
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
                    <span className="mx-2.5 text-[color:var(--water)]">+</span>
                  )}
                </motion.span>
              ))}
            </div>
            </ScrollDrift>

            {/* Stack */}
            <ScrollDrift from={56}>
            <div className="paper-plain h-full border border-[var(--border-strong)] p-6 shadow-[var(--shadow-sm)]">
              <div className="mb-5 text-sm text-foreground/50">The stack</div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-[14px] text-foreground">
                {profile.stack.map((tech) => (
                  <li key={tech} className="flex items-center gap-3">
                    <span aria-hidden className="size-1.5 bg-primary" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            </ScrollDrift>
          </div>
        </div>
      </section>

      {/* OUTRO */}
      <section className="border-t border-[var(--border-strong)] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="font-display text-[clamp(38px,6.5vw,104px)] leading-[0.88] text-foreground">
            <SplitTextReveal text="Like how" stagger={0.04} />{' '}
            <span className="text-[color:var(--text-secondary)]">
              <SplitTextReveal text="this feels?" stagger={0.04} delay={0.12} />
            </span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/services"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 border border-[var(--border-strong)] bg-primary px-7 py-3.5 text-[15px] font-medium text-primary-foreground shadow-[var(--shadow-md)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Your site, drawn like this
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={EMAIL_HREF}
              data-cursor="hover"
              className="inline-flex items-center gap-3 border border-[var(--border-strong)] px-7 py-3.5 text-[15px] font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Email me
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="inline-flex items-center gap-3 border border-[var(--border-strong)] px-7 py-3.5 text-[15px] font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              WhatsApp me
              <MessageCircle className="size-4" />
            </a>
            <Stamp text="Open for work" ink="blue" rotate={4} />
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
  last = false,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={`p-4 ${last ? '' : 'border-b border-[var(--border-strong)]'}`}>
      <dt className="mb-1 text-[13px] text-foreground/50">{label}</dt>
      <dd className="text-[14px] text-foreground">{value || children}</dd>
    </div>
  );
}
