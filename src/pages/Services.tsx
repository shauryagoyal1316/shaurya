import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollScrubText } from '@/components/effects/ScrollScrubText';
import { SheetTitleBlock } from '@/components/effects/TitleBlock';
import {
  Annotate,
  DimensionLine,
  DrawnRule,
  HandNote,
  Stamp,
} from '@/components/effects/drawing';
import { EASE } from '@/lib/motion';
import { EMAIL, EMAIL_HREF as CONTACT_HREF, WHATSAPP_HREF } from '@/lib/contact';

/** What a website build contains. Craft only: nothing here is a term. */
const included = [
  {
    label: 'The pages you actually need',
    detail:
      'A single page can carry a food truck. A logistics firm might want a coverage map, a fleet page, and a contact form that routes properly. The page list is settled around your business, and each one is drawn from a blank sheet.',
  },
  {
    label: 'Perfect on a phone',
    detail:
      'Most of your customers find you on a phone, usually through Google Maps. Every page is designed for that screen first and widened from there.',
  },
  {
    label: 'Live on a real domain',
    detail:
      'It ends with a URL your customers can type, on a domain that belongs to you, served fast from a real host.',
  },
  {
    label: 'Built around your photographs',
    detail:
      'The layout is composed around the pictures you actually have. And I will tell you honestly when you need better ones first.',
  },
  {
    label: 'Found on Google',
    detail:
      'Clean metadata, quick load times, and a Google Business Profile set up properly, so a search near you surfaces you.',
  },
];

/** The software line. Each module is a service, set as a museum label. */
const modules = [
  {
    name: 'Inventory and stock',
    detail:
      'Items in, items out, live counts, and a warning before a shelf runs empty.',
  },
  {
    name: 'Fleet and maintenance',
    detail:
      'Service logs and schedules per asset, with every repair on record.',
  },
  {
    name: 'Compliance and documents',
    detail:
      'Permits, insurance, licences, and fitness certificates on file, with a reminder before each one lapses.',
  },
  {
    name: 'Approvals and roles',
    detail:
      'Permission levels and sign-off chains, with an audit trail behind every change.',
  },
  {
    name: 'Reports and PDF export',
    detail:
      'Management reports drawn from live data, exported as PDFs your accountant will actually open.',
  },
];

/**
 * Sheet 02, the services. Same typographic poster grammar as the cover, at a
 * lower amplitude so the cover stays the flagship. Two service lines set as
 * type, then the same title block hand-off.
 *
 * Carries no commercial terms and no process by instruction: nothing about
 * money, rates, plans, deposits, quotes, timelines, or stages.
 */
export default function Services() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <SEOHead
        title="Services"
        description="Custom websites for local businesses and growing operations, designed and built from a blank sheet. Internal tools and sectional ERP software, module by module."
      />

      {/* HERO — the two service lines, stated as the page's largest type. */}
      <section
        data-sheet="SERVICES"
        className="relative flex min-h-[86svh] w-full flex-col justify-center px-6 py-28 md:px-10"
      >
        <div className="mx-auto w-full max-w-[1440px]">
          <h1 className="poster font-display text-[clamp(60px,13.5vw,246px)] leading-[0.8] text-foreground">
            <motion.span
              initial={reducedMotion ? undefined : { opacity: 0, y: 26 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE.snappy }}
              className="block"
            >
              Websites
              <span className="text-[color:var(--water)]">.</span>
            </motion.span>
            <motion.span
              initial={reducedMotion ? undefined : { opacity: 0, y: 26 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.14, ease: EASE.snappy }}
              className="block text-[color:var(--text-secondary)]"
            >
              Software
              <span className="text-[color:var(--water)]">.</span>
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 max-w-3xl"
          >
            <DimensionLine label="two lines of work · one person drawing both" />
          </motion.div>

          <motion.p
            initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE.snappy }}
            className="mt-8 max-w-[46ch] text-[17px] font-light leading-[1.65] text-[color:var(--text-secondary)]"
          >
            One is a site your customers see. The other is the software your
            staff live in. Both get drawn from a blank sheet, and neither comes
            off a template.
          </motion.p>
        </div>
      </section>

      {/* WEBSITES — the build, as type rows walking across the sheet. */}
      <section
        data-sheet="WEBSITES"
        className="relative border-t border-[var(--border-strong)] px-6 py-24 md:px-10 md:py-36"
      >
        <div className="mx-auto max-w-[1440px]">
          <HandNote className="mb-6">what a website build contains ↓</HandNote>
          <h2 className="poster max-w-4xl font-display text-[clamp(36px,6vw,104px)] leading-[0.88] text-foreground">
            The whole
            <span className="ml-4 text-[color:var(--text-secondary)]">craft.</span>
          </h2>

          <div className="mt-16">
            {included.map((item, i) => (
              <div key={item.label}>
                <DrawnRule strong={i === 0} />
                <motion.article
                  initial={reducedMotion ? undefined : { opacity: 0, y: 18 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8% 0px' }}
                  transition={{ duration: 0.7, ease: EASE.snappy }}
                  className="grid gap-3 py-9 md:grid-cols-12 md:items-baseline md:gap-10 md:py-12"
                >
                  <h3 className="font-display text-xl leading-snug text-foreground md:col-span-5 md:text-3xl">
                    {item.label}
                  </h3>
                  <p className="max-w-[46ch] text-base font-light leading-relaxed text-[color:var(--text-secondary)] md:col-span-7">
                    {item.detail}
                  </p>
                </motion.article>
              </div>
            ))}
            <DrawnRule strong />
          </div>
        </div>
      </section>

      {/* PROOF — off-axis right, a house requirement. */}
      <section className="relative border-t border-[var(--border-strong)] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1440px] md:flex md:justify-end">
          <div className="md:w-[78%]">
            <HandNote className="mb-5">no stock case studies here ↓</HandNote>
            <h2 className="poster font-display text-[clamp(34px,5.4vw,80px)] leading-[0.88] text-foreground">
              You're looking
              <span className="ml-4 text-[color:var(--text-secondary)]">at it.</span>
            </h2>
            <motion.p
              initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.8, ease: EASE.snappy }}
              className="mt-8 max-w-[48ch] text-lg font-light leading-relaxed text-[color:var(--text-secondary)]"
            >
              The site you are reading is the demo. Judge it the way your own
              customers will: on your phone, at full speed, down to the smallest{' '}
              <Annotate>detail</Annotate>. This is the standard your site gets
              built to.
            </motion.p>
          </div>
        </div>
      </section>

      {/* SOFTWARE — the second line, denser, set as labels. */}
      <section
        data-sheet="SOFTWARE"
        className="relative border-t border-[var(--border-strong)] px-6 py-24 md:px-10 md:py-36"
      >
        <div className="mx-auto max-w-[1440px]">
          <HandNote className="mb-6">when the spreadsheet stops coping ↓</HandNote>
          <h2 className="poster font-display text-[clamp(38px,6.4vw,116px)] leading-[0.86] text-foreground">
            Software,
            <span className="ml-4 text-[color:var(--text-secondary)]">same pencil.</span>
          </h2>

          <div className="mt-12 max-w-3xl md:ml-[8%]">
            <ScrollScrubText
              text="Somewhere past the tenth spreadsheet tab, a business stops needing a website and starts needing software. I build internal tools and sectional ERP systems, one module at a time, each fitted to how your operation already runs."
              className="font-sans text-[clamp(22px,2.8vw,40px)] font-medium leading-[1.25] tracking-[-0.02em] text-foreground"
            />
          </div>

          <div className="mt-16 md:ml-[16%]">
            <DrawnRule strong />
            {modules.map((mod) => (
              <div key={mod.name}>
                <motion.div
                  initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
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
                initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.8, ease: EASE.snappy }}
                className="text-lg font-light leading-relaxed text-[color:var(--text-secondary)]"
              >
                Two of these run in production right now, a parts-inventory
                platform and a fleet-maintenance app, both used every working
                day by teams that will never see this page.
              </motion.p>
              <div className="relative z-[4] mt-10 md:-mb-20">
                <Stamp text="In production · daily use" ink="blue" rotate={3} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPROVAL — the same hand-off as the cover sheet. */}
      <section
        data-sheet="APPROVAL"
        className="relative border-t border-[var(--border-strong)] px-6 py-24 md:px-10 md:py-36"
      >
        <div className="mx-auto max-w-[1100px]">
          <SheetTitleBlock ctaHref={CONTACT_HREF} />
        </div>
      </section>

      {/* CLOSE — the grammar's inversion: smallest type, plain links. */}
      <section data-sheet="CLOSE" className="relative px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px] md:text-right">
          <p className="text-sm font-light leading-relaxed text-[color:var(--text-secondary)] md:ml-auto md:max-w-[38ch]">
            If either line fits what your business needs, a short message is the
            fastest way in.
          </p>
          <div className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-3 md:justify-end">
            <a
              href={CONTACT_HREF}
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
