import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import {
  Annotate,
  DimensionLine,
  DrawnRule,
  HandNote,
  Stamp,
} from '@/components/effects/drawing';
import { EASE } from '@/lib/motion';

const CONTACT_HREF =
  'mailto:seekshaurya@gmail.com?subject=Website%20for%20my%20business';

const included = [
  {
    label: 'Five pages, custom-designed',
    detail:
      'Home, About, Menu or Services, Gallery, Contact. Each shaped around your business, not poured into a template.',
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
      'The layout is built around your real photos. And I will tell you honestly if you need better ones first.',
  },
  {
    label: 'Found on Google',
    detail:
      'Clean metadata, fast load times, and Google Business Profile setup so searches near you actually surface you.',
  },
  {
    label: 'Two revision rounds',
    detail:
      'Structured feedback passes at design and pre-launch. Enough to get it right, scoped enough to ship.',
  },
];

const steps = [
  {
    word: 'First',
    title: 'Survey',
    detail:
      'A 30-minute conversation about your business: who walks in, what they ask, what you want more of. It becomes a one-page brief we both sign off on.',
  },
  {
    word: 'Then',
    title: 'Draft',
    detail:
      'A 20% deposit starts the build. Within days you get a working preview link, a real site you can tap through on your own phone, not a static mockup. Feedback goes straight into the build.',
  },
  {
    word: 'Last',
    title: 'Build',
    detail:
      'Love it? Pay the balance and it goes live on your domain, with a simple handoff of how updates work. Not right for you? You walk away. The deposit is all you ever spent.',
  },
];

/**
 * Services — the offer, in the same drawn language as the rest of the site.
 */
export default function Services() {
  return (
    <>
      <SEOHead
        title="Services"
        description="Custom websites for local businesses — designed, built, and live on your domain in about two weeks. 20% deposit to start, balance only if you take it."
      />

      {/* HERO */}
      <section className="relative px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-[1440px]">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: EASE.snappy }}
            className="max-w-5xl font-display text-[clamp(42px,7.5vw,110px)] leading-[0.88] text-foreground"
          >
            Your business,
            <span className="block text-[color:var(--text-secondary)]">
              online <Annotate note="the way it deserves">properly</Annotate>.
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 max-w-3xl"
          >
            <DimensionLine label="fixed scope · fixed price · two weeks" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE.snappy }}
            className="mt-8 max-w-xl text-base font-light leading-relaxed text-[color:var(--text-secondary)] md:text-lg"
          >
            Cafés, barbershops, studios, chefs, small firms. A custom-designed
            website, written, built, and live on your own domain in about two
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
              className="group inline-flex items-center gap-3 border border-[var(--border-strong)] bg-primary px-6 py-3.5 text-[15px] font-medium text-primary-foreground shadow-[var(--shadow-md)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Start a project
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Stamp text="From $500 · 20% to start" ink="red" rotate={-4} />
          </motion.div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="border-t border-[var(--border-strong)] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12">
            <HandNote className="mb-5">everything on this list is included —</HandNote>
            <h2 className="font-display text-[clamp(34px,4.6vw,64px)] leading-[0.9] text-foreground">
              Everything,
              <span className="ml-4 text-[color:var(--text-secondary)]">handled.</span>
            </h2>
          </div>
          <DrawnRule strong />
          {included.map((item, i) => (
            <div key={item.label}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.7, ease: EASE.snappy }}
                className={`grid gap-2 py-7 md:grid-cols-12 md:gap-8 ${i % 2 === 1 ? 'md:[&>*:first-child]:col-start-3' : ''}`}
              >
                <div className="font-display text-xl leading-snug text-foreground md:col-span-4 md:text-2xl">
                  {item.label}
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-[color:var(--text-secondary)] md:col-span-6 md:text-base">
                  {item.detail}
                </p>
              </motion.div>
              <DrawnRule />
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-[var(--border-strong)] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12">
            <h2 className="font-display text-[clamp(34px,4.6vw,64px)] leading-[0.9] text-foreground">
              Brief to live URL,
              <span className="ml-4 text-[color:var(--text-secondary)]">two weeks.</span>
            </h2>
          </div>
          <DrawnRule strong />
          {steps.map((step) => (
            <div key={step.word}>
              <div className="overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: '45%' }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8% 0px' }}
                  transition={{ duration: 0.8, ease: EASE.snappy }}
                  className="grid gap-4 py-10 md:grid-cols-12 md:gap-8"
                >
                  <div className="font-note text-lg text-[color:var(--water)] md:col-span-1">
                    {step.word}
                  </div>
                  <div className="font-display text-3xl leading-none text-foreground md:col-span-3 md:text-4xl">
                    {step.title}
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-[color:var(--text-secondary)] md:col-span-8 md:text-base">
                    {step.detail}
                  </p>
                </motion.div>
              </div>
              <DrawnRule strong />
            </div>
          ))}
        </div>
      </section>

      {/* PROOF */}
      <section className="border-t border-[var(--border-strong)] px-6 py-14 md:px-10 md:py-[4.5rem]">
        <div className="mx-auto max-w-[1440px]">
          <HandNote className="mb-5">no stock case studies here —</HandNote>
          <h2 className="font-display text-[clamp(34px,4.6vw,64px)] leading-[0.9] text-foreground">
            You're looking
            <span className="ml-4 text-[color:var(--text-secondary)]">at it.</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.8, ease: EASE.snappy }}
            className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-[color:var(--text-secondary)] md:text-xl"
          >
            The site you're reading right now is the demo. Judge it the way
            your customers will: the <Annotate>type</Annotate>, the motion,
            the speed on your phone. This is the standard your site gets
            built to — and if the build doesn't clear it for you, the 20%
            deposit is all you ever spent.
          </motion.p>
        </div>
      </section>

      {/* AFTERCARE + CTA */}
      <section className="border-t border-[var(--border-strong)] px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-16 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-[clamp(30px,3.8vw,52px)] leading-[0.95] text-foreground">
                A site that stays
                <span className="ml-3 text-[color:var(--text-secondary)]">alive.</span>
              </h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.8, ease: EASE.snappy }}
              className="paper-plain relative border border-[var(--border-strong)] p-8 shadow-[var(--shadow-md)]"
            >
              <div className="text-sm font-medium text-foreground">
                Care plan, from $75 a month
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-secondary)] md:text-base">
                Menu changes, new photos, seasonal updates, and someone who
                answers when something needs doing. Your site never quietly
                goes stale. Optional, cancel any time.
              </p>
            </motion.div>
          </div>

          <a href={CONTACT_HREF} data-cursor="view" data-cursor-label="Email me" className="group block">
            <h2 className="font-display text-[clamp(48px,9.5vw,150px)] leading-[0.85] text-foreground transition-colors group-hover:text-primary">
              Start
              <span className="ml-5 text-[color:var(--text-secondary)] transition-colors group-hover:text-primary">
                yours →
              </span>
            </h2>
          </a>
          <p className="mt-6 text-sm text-foreground/50">
            One email. Tell me about your business, get a reply within a day.
          </p>
        </div>
      </section>
    </>
  );
}
