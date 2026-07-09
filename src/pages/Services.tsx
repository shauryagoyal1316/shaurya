import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollDrift } from '@/components/effects/ScrollDrift';
import { ScrollScrubText } from '@/components/effects/ScrollScrubText';
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
    label: 'The pages you actually need',
    detail:
      'A single page can carry a food truck; a growing firm might need seven. We settle the page list on the first call, and each one is designed around your business from a blank sheet.',
  },
  {
    label: 'Perfect on a phone',
    detail:
      'Most of your customers find you on a phone via Google Maps. Every page is designed for that screen first.',
  },
  {
    label: 'Live on a real domain',
    detail:
      'Launch day ends with a URL your customers can type, on a domain of your own. How it stays online afterward is your pick of the plans further down this page.',
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

const afterLaunch = [
  {
    label: 'I run it, end to end',
    detail:
      'I register an available domain and run the hosting, deploys included, for a flat $75 to $100 a month, fixed in your written quote. You never touch a server.',
  },
  {
    label: 'A backend behind it',
    detail:
      'Orders, bookings, logins, or live inventory run on real infrastructure, and real infrastructure carries real costs. When I manage that layer too, it adds $75 to $100 a month.',
  },
  {
    label: 'On a plan you already pay for',
    detail:
      'Hold your own hosting or backend account? I set the finished site up on it for a one-time $50. The bills stay in your name, and so does the control.',
  },
  {
    label: 'Own the code outright',
    detail:
      'The complete codebase, delivered clean and ready to host anywhere. Simple builds start at $700, larger ones sit closer to $1,000. One payment, then it answers to you.',
  },
];

const modules = [
  {
    name: 'Inventory & stock',
    detail:
      'Items in, items out, live counts, and a reminder before a shelf runs empty.',
  },
  {
    name: 'Fleet & maintenance',
    detail:
      'Service logs and schedules per asset, with every cost and repair on record.',
  },
  {
    name: 'Approvals & roles',
    detail:
      'Permission levels and sign-off chains, with an audit trail behind every change.',
  },
  {
    name: 'Reports & PDF export',
    detail:
      'Management reports drawn from live data, exported as PDFs your accountant will actually open.',
  },
];

const steps = [
  {
    word: 'First',
    title: 'Survey',
    detail:
      'A 30-minute conversation about your business: who walks in, and what you want more of. It becomes a one-page brief we both sign off on.',
  },
  {
    word: 'Then',
    title: 'Draft',
    detail:
      'A 25% deposit starts the build. Within days you get a working preview link, a real site you can tap through on your own phone, not a static mockup. Feedback goes straight into the build.',
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
        description="Custom websites for local businesses, live on your domain in about two weeks with a 25% deposit to start. Internal SaaS tools and sectional ERP software, scoped module by module."
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
            weeks. None of it from a template, and none of it at agency prices.
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
            <Stamp text="From $500 · 25% to start" ink="red" rotate={-4} />
          </motion.div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="border-t border-[var(--border-strong)] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12">
            <HandNote className="mb-5">the whole list is included —</HandNote>
            <ScrollDrift from={-48}>
              <h2 className="font-display text-[clamp(34px,4.6vw,64px)] leading-[0.9] text-foreground">
                {/* JSX drops the newline between text and the span, leaving no
                    soft-wrap opportunity — without <wbr /> the heading is one
                    unbreakable run that widens the mobile layout viewport. */}
                All of it,
                <wbr />
                <span className="ml-4 text-[color:var(--text-secondary)]">handled.</span>
              </h2>
            </ScrollDrift>
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
            <ScrollDrift from={56}>
              <h2 className="font-display text-[clamp(34px,4.6vw,64px)] leading-[0.9] text-foreground">
                Brief to live URL,
                <wbr />
                <span className="ml-4 text-[color:var(--text-secondary)]">two weeks.</span>
              </h2>
            </ScrollDrift>
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

      {/* PROOF — set off-axis, to the right */}
      <section className="border-t border-[var(--border-strong)] px-6 py-14 md:px-10 md:py-[4.5rem]">
        <div className="mx-auto max-w-[1440px] md:flex md:justify-end">
          <div className="md:w-[78%]">
            <HandNote className="mb-5">no stock case studies here —</HandNote>
            <h2 className="font-display text-[clamp(34px,4.6vw,64px)] leading-[0.9] text-foreground">
              You're looking
              <wbr />
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
              your customers will: on your phone, at full speed, down to the
              smallest <Annotate>detail</Annotate>. This is the standard your
              site gets built to. If the build doesn't clear it for you, the
              25% deposit is all you ever spent.
            </motion.p>
          </div>
        </div>
      </section>

      {/* SOFTWARE — the second service line. Scrubbed pitch, inset module
          schedule, proof block set hard right with a stamp crossing the
          section rule below. */}
      <section className="border-t border-[var(--border-strong)] px-6 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <HandNote className="mb-5">when the spreadsheet stops coping —</HandNote>
          <h2 className="font-display text-[clamp(38px,5.5vw,84px)] leading-[0.88] text-foreground">
            Software,
            <span className="ml-4 text-[color:var(--text-secondary)]">same pencil.</span>
          </h2>

          <div className="mt-12 max-w-3xl md:ml-[8%]">
            <ScrollScrubText
              text="Somewhere past the tenth spreadsheet tab, a business stops needing a website and starts needing software. I build internal SaaS tools and sectional ERP systems: one module at a time, each fitted to how your operation already runs."
              className="font-sans text-[clamp(22px,2.8vw,40px)] font-medium leading-[1.25] tracking-[-0.02em] text-foreground"
            />
          </div>

          <div className="mt-16 md:ml-[16%]">
            <DrawnRule strong />
            {modules.map((mod) => (
              <div key={mod.name}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8% 0px' }}
                  transition={{ duration: 0.7, ease: EASE.snappy }}
                  className="grid gap-2 py-7 md:grid-cols-12 md:items-baseline md:gap-8"
                >
                  <div className="font-display text-xl leading-snug text-foreground md:col-span-4 md:text-2xl">
                    {mod.name}
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-[color:var(--text-secondary)] md:col-span-7 md:text-base">
                    {mod.detail}
                  </p>
                </motion.div>
                <DrawnRule />
              </div>
            ))}
          </div>

          <div className="mt-14 md:flex md:justify-end">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.8, ease: EASE.snappy }}
                className="text-lg font-light leading-relaxed text-[color:var(--text-secondary)] md:text-xl"
              >
                Two of these run in production right now: a parts-inventory
                platform and a fleet-maintenance app, both used every working
                day by teams that will never see this page. Software is quoted
                per module after a 30-minute call. The quote arrives in
                writing, and the same <Annotate>25% deposit</Annotate> rule
                applies.
              </motion.p>
              <div className="relative z-[4] mt-10 md:-mb-24">
                <Stamp text="In production · daily use" ink="blue" rotate={3} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AFTERCARE + CTA */}
      <section className="border-t border-[var(--border-strong)] px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-16 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-[clamp(30px,3.8vw,52px)] leading-[0.95] text-foreground">
                A site that stays
                <wbr />
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
                Separate from hosting: menu changes, new photos, seasonal
                updates, and someone who answers when something needs doing.
                Your site never quietly goes stale. Optional, cancel any time.
              </p>
            </motion.div>
          </div>

          <div className="mb-24 md:ml-[10%]">
            <HandNote className="mb-5">after launch, four ways to run it —</HandNote>
            <DrawnRule strong />
            {afterLaunch.map((option) => (
              <div key={option.label}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8% 0px' }}
                  transition={{ duration: 0.7, ease: EASE.snappy }}
                  className="grid gap-2 py-7 md:grid-cols-12 md:items-baseline md:gap-8"
                >
                  <div className="font-display text-xl leading-snug text-foreground md:col-span-4 md:text-2xl">
                    {option.label}
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-[color:var(--text-secondary)] md:col-span-7 md:text-base">
                    {option.detail}
                  </p>
                </motion.div>
                <DrawnRule />
              </div>
            ))}
          </div>

          <a href={CONTACT_HREF} data-cursor="view" data-cursor-label="Email me" className="group block">
            <h2 className="font-display text-[clamp(48px,9.5vw,150px)] leading-[0.85] text-foreground transition-colors group-hover:text-primary">
              Start
              <wbr />
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
