import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { SEOHead } from '@/components/seo/SEOHead';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { EASE } from '@/lib/motion';

const CONTACT_HREF =
  'mailto:seekshaurya@gmail.com?subject=Website%20for%20my%20business';

const included = [
  {
    label: 'Five pages, custom-designed',
    detail:
      'Home, About, Menu or Services, Gallery, Contact — each shaped around your business, not poured into a template.',
  },
  {
    label: 'Perfect on a phone',
    detail:
      'Most of your customers find you on a phone via Google Maps. Every page is designed for that screen first.',
  },
  {
    label: 'Your domain, live',
    detail:
      'Domain, hosting, and deployment handled end to end. You get a live URL, not a folder of files.',
  },
  {
    label: 'Photography-led',
    detail:
      'The layout is built around your real photos — and I will tell you honestly if you need better ones first.',
  },
  {
    label: 'Found on Google',
    detail:
      'Clean metadata, fast load times, and Google Business Profile setup so searches near you actually surface you.',
  },
  {
    label: 'Two revision rounds',
    detail:
      'Structured feedback passes at design and pre-launch — enough to get it right, scoped enough to ship.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Discover',
    detail:
      'A 30-minute conversation about your business — who walks in, what they ask, what you want more of. It becomes a one-page brief we both sign off on.',
  },
  {
    num: '02',
    title: 'Build',
    detail:
      'A 20% deposit starts the build. Within days you get a working preview link — a real site you can tap through on your own phone, not a static mockup. Feedback goes straight into the build.',
  },
  {
    num: '03',
    title: 'Launch',
    detail:
      'Love it? Pay the balance and it goes live on your domain, with a simple handoff of how updates work. Not right for you? You walk away — the deposit is all you ever spent.',
  },
];

/**
 * Services — the client-facing offer page. Same editorial system as Home:
 * numbered mono section labels, display serif headlines with italic turns,
 * bordered cards on the premium surface.
 */
export default function Services() {
  const clientWork = projects.filter((p) => p.category === 'landing');

  return (
    <>
      <SEOHead
        title="Services"
        description="Custom websites for local businesses — designed, built, and live on your domain in about two weeks. 20% deposit to start, balance only if you take it."
      />

      {/* HERO */}
      <section className="relative bg-background px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.snappy }}
            className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50"
          >
            <span className="text-primary">/</span> Services — for local businesses
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.1, ease: EASE.snappy }}
            className="max-w-5xl font-display text-[clamp(44px,8vw,120px)] leading-[0.95] tracking-[-0.025em] text-foreground"
          >
            Your business,
            <span className="block italic text-foreground/55">online properly.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE.snappy }}
            className="mt-8 max-w-xl text-base font-light leading-relaxed text-foreground/70 md:text-lg"
          >
            Cafés, barbershops, studios, chefs, small firms. A custom-designed
            website — written, built, and live on your own domain in about two
            weeks. No templates, no agency invoice, no six-week timeline.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE.snappy }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <a
              href={CONTACT_HREF}
              data-cursor="hover"
              className="group inline-flex items-center gap-3 rounded-full border border-border px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Start a project
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
              From $800 · 20% deposit to start · Balance only if you take it
            </span>
          </motion.div>
        </div>
      </section>

      {/* 01 — WHAT YOU GET */}
      <section className="border-t border-border bg-background px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12">
            <div className="mb-5 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
              <span className="text-primary">01</span>What you get
            </div>
            <h2 className="font-display text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-foreground">
              Everything,
              <span className="ml-4 italic text-foreground/55">handled.</span>
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE.snappy }}
                className="group relative overflow-hidden rounded-lg border border-border bg-[var(--surface-premium)] p-6 shadow-[var(--shadow-md)] backdrop-blur-md transition-colors hover:border-[color:var(--water-soft)]"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,var(--primary),var(--water),transparent)] opacity-70"
                />
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mt-4 font-display text-xl leading-snug text-foreground md:text-2xl">
                  {item.label}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/58">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — HOW IT WORKS */}
      <section className="border-t border-border bg-background px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-5 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
                <span className="text-primary">02</span>How it works
              </div>
              <h2 className="font-display text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-foreground">
                Brief to live URL,
                <span className="ml-4 italic text-foreground/55">two weeks.</span>
              </h2>
            </div>
          </div>
          <div className="border-t border-border">
            {steps.map((step) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.7, ease: EASE.snappy }}
                className="grid gap-4 border-b border-border py-10 md:grid-cols-12 md:gap-8"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary md:col-span-1">
                  {step.num}
                </div>
                <div className="font-display text-3xl italic leading-none text-foreground md:col-span-3 md:text-4xl">
                  {step.title}
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-foreground/65 md:col-span-8 md:text-base">
                  {step.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — PROOF */}
      <section className="border-t border-border bg-background px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10">
            <div className="mb-5 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
              <span className="text-primary">03</span>Proof
            </div>
            <h2 className="font-display text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-foreground">
              Built, shipped,
              <span className="ml-4 italic text-foreground/55">live.</span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-foreground/65 md:text-base">
              Fade &amp; Co. and Private Chef are complete builds — open either
              on your phone right now and judge the standard yourself.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
            {clientWork.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                total={clientWork.length}
                aspectRatio="portrait"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 04 — AFTERCARE + CTA */}
      <section className="border-t border-border bg-background px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-16 grid gap-10 md:grid-cols-2">
            <div>
              <div className="mb-5 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/50">
                <span className="text-primary">04</span>After launch
              </div>
              <h2 className="font-display text-[clamp(32px,4vw,56px)] leading-[1] tracking-[-0.02em] text-foreground">
                A site that stays
                <span className="ml-3 italic text-foreground/55">alive.</span>
              </h2>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-border bg-[var(--surface-premium)] p-8 shadow-[var(--shadow-md)] backdrop-blur-md">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,var(--primary),var(--water),transparent)] opacity-70"
              />
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
                Care plan — from $75/month
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/65 md:text-base">
                Menu changes, new photos, seasonal updates, and someone who
                answers when something needs doing. Your site never quietly
                goes stale — optional, cancel any time.
              </p>
            </div>
          </div>

          <a href={CONTACT_HREF} data-cursor="view" data-cursor-label="Email me" className="group block">
            <h2 className="font-display text-[clamp(52px,10vw,160px)] leading-[0.9] tracking-[-0.03em] text-foreground transition-colors group-hover:text-primary">
              Start
              <span className="ml-5 italic">yours →</span>
            </h2>
          </a>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
            One email — tell me about your business, get a reply within a day.
          </p>
        </div>
      </section>
    </>
  );
}
