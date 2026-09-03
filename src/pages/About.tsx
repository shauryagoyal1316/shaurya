import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollDrift } from '@/components/effects/ScrollDrift';
import { ScrollScrubText } from '@/components/effects/ScrollScrubText';
import { SplitTextReveal } from '@/components/effects/SplitTextReveal';
import { SheetTitleBlock } from '@/components/effects/TitleBlock';
import {
  Annotate,
  DrawnRule,
  HandNote,
} from '@/components/effects/drawing';
import { EASE } from '@/lib/motion';
import { EMAIL, EMAIL_HREF, WHATSAPP_DISPLAY, WHATSAPP_HREF } from '@/lib/contact';

/** Masked line reveal for body copy: the paragraph rises out of its own line box. */
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
 * Sheet 03, who drew this. Same poster grammar at the lowest amplitude of
 * the three pages: this one is mostly reading, so the type stays at reading
 * scale and only the headings go large.
 *
 * The old three-column TiltCard panel grid is gone. A grid of identical
 * cards is the single most recognisable machine-made page structure there
 * is, and both the house rules and the taste floor ban it outright.
 */
export default function About() {
  const reducedMotion = useReducedMotion();

  // Two, not three. A rule of three is a banned copy pattern here, and the
  // third panel advertised an AI-assisted workflow, which reads badly on a
  // page whose whole argument is that a person drew this by hand.
  const disciplines = [
    {
      label: 'Direction',
      title: 'Page strategy before pixels.',
      body: 'The offer, the sections, the hierarchy, and the path a visitor takes are mapped before anything gets dressed up.',
    },
    {
      label: 'Build',
      title: 'Front end, back end, and the launch.',
      body: 'The site is shaped as one complete system rather than a visual mockup that somebody else has to wire up later.',
    },
  ];

  return (
    <>
      <SEOHead
        title="About"
        description={`About ${profile.name}: custom websites and internal business software for local businesses and growing operations.`}
      />

      {/* BIO HERO */}
      <section
        data-sheet="ABOUT"
        className="relative overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36"
      >
        <div className="relative mx-auto max-w-[1440px]">
          <motion.div
            initial={reducedMotion ? undefined : { opacity: 0, y: 28 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE.snappy }}
            className="max-w-5xl"
          >
            <HandNote className="mb-5">who drew all this ↓</HandNote>
            <h1 className="poster font-display text-[clamp(54px,11.5vw,186px)] leading-[0.84] text-foreground">
              Full websites,
              <span className="block text-[color:var(--text-secondary)]">
                <Annotate note="design → deploy">one</Annotate> pair of hands.
              </span>
            </h1>
          </motion.div>

          {/* Two disciplines as type rows, walking right. No cards. */}
          <div className="mt-16 md:mt-24">
            {disciplines.map((d, i) => (
              <div key={d.label}>
                <DrawnRule strong={i === 0} />
                <motion.article
                  initial={reducedMotion ? undefined : { opacity: 0, y: 18 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.75, ease: EASE.snappy }}
                  className="grid gap-3 py-10 md:grid-cols-12 md:items-baseline md:gap-10 md:py-14"
                  style={{ paddingLeft: `${i * 4}%` }}
                >
                  <div className="font-mono text-[11px] leading-none text-[color:var(--text-tertiary)] md:col-span-2">
                    {d.label.toUpperCase()}
                  </div>
                  <h2 className="font-display text-2xl leading-[1.02] text-foreground md:col-span-5 md:text-4xl">
                    {d.title}
                  </h2>
                  <p className="max-w-[44ch] text-base font-light leading-relaxed text-[color:var(--text-secondary)] md:col-span-5">
                    {d.body}
                  </p>
                </motion.article>
              </div>
            ))}
            <DrawnRule strong />
          </div>
        </div>
      </section>

      {/* BIO + SPEC TABLE */}
      <section
        data-sheet="THE HAND"
        className="border-t border-[var(--border-strong)] px-6 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 md:grid-cols-12">
          <motion.aside
            initial={reducedMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: EASE.snappy }}
            className="md:col-span-4"
          >
            <div className="mb-5 font-mono text-[11px] text-foreground/50">
              CURRENTLY
            </div>
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
              <div className="mb-4 font-mono text-[11px] text-foreground/50">
                APPROACH
              </div>
              <div className="max-w-2xl space-y-4 text-base font-light leading-[1.65] text-foreground">
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
      <section
        data-sheet="TOOLS"
        className="relative overflow-hidden border-t border-[var(--border-strong)] px-6 py-20 md:px-10 md:py-28"
      >
        <div className="relative mx-auto max-w-[1440px]">
          <h2 className="poster font-display text-[clamp(38px,6vw,104px)] leading-[0.88] text-foreground">
            <SplitTextReveal text="Skills" stagger={0.04} />{' '}
            <span className="text-[color:var(--text-secondary)]">
              <SplitTextReveal text="and tools." stagger={0.04} delay={0.12} />
            </span>
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
            <ScrollDrift from={-48}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                {profile.skills.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={reducedMotion ? undefined : { opacity: 0, y: 18 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
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

            <ScrollDrift from={56}>
              <div className="paper-plain h-full border border-[var(--border-strong)] p-6 shadow-[var(--shadow-sm)]">
                <div className="mb-5 font-mono text-[11px] text-foreground/50">
                  THE STACK
                </div>
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

      {/* APPROVAL — the same hand-off the other two sheets end on. */}
      <section
        data-sheet="APPROVAL"
        className="relative border-t border-[var(--border-strong)] px-6 py-24 md:px-10 md:py-36"
      >
        <div className="mx-auto max-w-[1100px]">
          <SheetTitleBlock ctaHref={EMAIL_HREF} />
        </div>
      </section>

      {/* CLOSE */}
      <section data-sheet="CLOSE" className="relative px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px] md:text-right">
          <p className="text-sm font-light leading-relaxed text-[color:var(--text-secondary)] md:ml-auto md:max-w-[38ch]">
            If you like how this reads, that is the whole pitch. Yours would be
            drawn the same way.
          </p>
          <div className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-3 md:justify-end">
            <a
              href={EMAIL_HREF}
              data-cursor="hover"
              className="text-[15px] text-foreground underline decoration-[var(--water)] decoration-2 underline-offset-[6px] transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {EMAIL}
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="inline-flex items-center gap-1.5 text-[15px] text-[color:var(--text-secondary)] underline decoration-[var(--border-strong)] underline-offset-[6px] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              WhatsApp
              <ArrowUpRight className="size-3.5" />
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
  last = false,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={`p-4 ${last ? '' : 'border-b border-[var(--border-strong)]'}`}>
      <dt className="mb-1 font-mono text-[10px] text-foreground/50">
        {label.toUpperCase()}
      </dt>
      <dd className="text-[14px] text-foreground">{value || children}</dd>
    </div>
  );
}
