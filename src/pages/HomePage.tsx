import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowRightLeft,
  BarChart3,
  FolderTree,
  Mail,
  Play,
  Plug,
  ScanLine,
} from 'lucide-react'

const importTypes = [
  { label: 'Invoice', image: '/images/home/chip-invoice.png' },
  { label: 'Statement', image: '/images/home/chip-statement.png' },
  { label: 'Receipt', image: '/images/home/chip-receipt.png' },
  { label: 'Bill', image: '/images/home/chip-bill.png' },
  { label: 'PO Orders', image: '/images/home/chip-po.png' },
]

const exportDestinations = [
  { label: 'Xero', image: '/images/home/chip-xero.png' },
  { label: 'MYOB', image: '/images/home/chip-myob.png' },
  { label: 'SFTP', image: '/images/home/chip-sftp.png' },
  { label: 'API', image: '/images/home/chip-api.png' },
]

const modules = [
  {
    title: 'DocFlow Gateway',
    body: 'A dedicated email intake engine that continuously monitors your accounts inbox to automatically ingest all incoming vendor invoices, bills, statements and receipts the moment they arrive.',
    icon: Mail,
    accent: 'bg-slate-400',
    iconWrap: 'bg-slate-100 text-slate-700',
    image: '/images/home/module-gateway.png?v=11',
    imageAlt: 'Email key on keyboard for DocFlow Gateway',
    link: null as { to: string; label: string } | null,
  },
  {
    title: 'DocFlow Automation',
    body: 'A digital processing core that extracts key vendor data using IDP and AI-assisted validation, syncing clean, verified financial figures directly into your accounting workflow or ERP.',
    icon: ScanLine,
    accent: 'bg-lime-500',
    iconWrap: 'bg-lime-100 text-lime-800',
    image: '/images/home/module-automation.png?v=11',
    imageAlt: 'Invoice and structured data in DocFlow Automation',
    link: { to: '/automation', label: 'Explore Automation' },
  },
  {
    title: 'DocFlow Analytics',
    body: 'An analytical dashboard that instantly translates historical ledger transactions into interactive visualizations, allowing you to analyse spending patterns and spot cash-flow leaks for business intelligence.',
    icon: BarChart3,
    accent: 'bg-sky-500',
    iconWrap: 'bg-sky-100 text-sky-800',
    image: '/images/home/module-analytics.png?v=11',
    imageAlt: 'Spend analytics dashboard in DocFlow Analytics',
    link: { to: '/analytics', label: 'Explore Analytics' },
  },
]

const trustPoints = [
  {
    label: 'No manual data extraction',
    icon: ScanLine,
    iconWrap: 'bg-lime-100 text-lime-700',
  },
  {
    label: 'Auto-sorting & classification',
    icon: FolderTree,
    iconWrap: 'bg-amber-100 text-amber-700',
  },
  {
    label: 'Integrates directly with your platforms',
    icon: Plug,
    iconWrap: 'bg-violet-100 text-violet-700',
  },
  {
    label: 'Document in, data out — one flow',
    icon: ArrowRightLeft,
    iconWrap: 'bg-sky-100 text-sky-700',
  },
]

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* Band A — Hero (copy only) */}
      <section className="relative overflow-hidden hero-section-pad section-band-a">
        <div className="relative home-container">
          <div className="hero-copy max-w-3xl mx-auto text-center">
            <h1 className="type-h1 mb-5">
              <span className="block">Turn Supplier Documents into</span>
              <span className="block">Efficiency and Intelligence</span>
            </h1>
            <p className="hero-lead mb-8 max-w-2xl mx-auto">
              DocFlow is a digital factory for your back office, it automates your accounts payable
              lifecycle and unlocks real-time spending insights for operational intelligence
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/pilot#pilot-request" className="btn-primary text-sm px-8 py-3.5 font-bold">
                Request a DocFlow pilot <ArrowRight size={16} />
              </Link>
              <a href="#demo" className="btn-ghost-dark text-sm px-8 py-3.5 font-bold">
                <Play size={16} className="text-sky-600" />
                Watch a Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Band B — Works with (Import → Export, flattened) */}
      <section className="section-pad-home section-band-b">
        <div className="home-container">
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <h2 className="type-h2 mb-3">Seamless Document Data Pipeline</h2>
            <p className="hero-lead max-w-xl mx-auto">
              Import supplier documents. Export clean data to your systems.
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-5 md:gap-4 items-stretch max-w-5xl mx-auto">
            <div className="flow-well">
              <div className="flow-well-media">
                <img
                  src="/images/home/works-import.png?v=2"
                  alt="Supplier documents flowing into DocFlow"
                  width={640}
                  height={400}
                  decoding="async"
                />
              </div>
              <div className="flow-well-body">
                <p className="flow-well-headline">
                  Bring vendor documents in the forms of
                </p>
                <div className="chip-row justify-center">
                  {importTypes.map(({ label, image }) => (
                    <span key={label} className="chip-logo" title={label}>
                      <img src={image} alt={label} width={56} height={56} decoding="async" />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-center justify-center px-1 gap-2 text-sky-500" aria-hidden>
              <div className="w-px h-8 bg-gradient-to-b from-transparent to-sky-300" />
              <ArrowRight size={20} />
              <div className="w-px h-8 bg-gradient-to-b from-sky-300 to-transparent" />
            </div>
            <div className="flex md:hidden items-center justify-center py-1" aria-hidden>
              <ArrowRight size={18} className="text-sky-500 rotate-90" />
            </div>

            <div className="flow-well">
              <div className="flow-well-media">
                <img
                  src="/images/home/works-export.png?v=4"
                  alt="Verified data ready for delivery and review"
                  width={640}
                  height={400}
                  decoding="async"
                />
              </div>
              <div className="flow-well-body">
                <p className="flow-well-headline">
                  Synced validated data into
                </p>
                <div className="chip-row justify-center">
                  {exportDestinations.map(({ label, image }) => (
                    <span key={label} className="chip-logo" title={label}>
                      <img src={image} alt={label} width={56} height={56} decoding="async" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Band C — How it works (refined tiles) */}
      <section id="how-it-works" className="section-pad-home section-band-c scroll-mt-28">
        <div className="home-container">
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <h2 className="type-h2 mb-3">How DocFlow Works</h2>
            <p className="hero-lead max-w-xl mx-auto">
              Your vendor document lifecycle is streamlined — intake, extraction, and analytics in one go.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
            {modules.map((mod) => (
              <article key={mod.title} className="tile-module p-0">
                <span className={`tile-accent ${mod.accent}`} aria-hidden />
                {mod.image ? (
                  <div className="tile-module-media">
                    <img src={mod.image} alt={mod.imageAlt} decoding="async" />
                  </div>
                ) : (
                  <div className={`tile-module-media-fallback ${mod.iconWrap}`}>
                    <mod.icon size={28} />
                  </div>
                )}
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">{mod.title}</h3>
                  <p className="text-[13px] sm:text-sm text-slate-700 leading-relaxed font-medium text-left flex-1">{mod.body}</p>
                  {mod.link ? (
                    <Link
                      to={mod.link.to}
                      className="mt-5 text-sm font-bold text-sky-700 hover:opacity-80 inline-flex items-center gap-1"
                    >
                      {mod.link.label} <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <span className="mt-5 text-sm font-semibold text-slate-400">Intake foundation</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / capability strip — no client names or metrics */}
      <section className="section-pad-home section-band-a">
        <div className="home-container max-w-5xl mx-auto text-center">
          <h2 className="type-h2 mb-8 max-w-4xl mx-auto text-[1.35rem] sm:text-2xl lg:text-[2.125rem]">
            Built for Your Finance Team with:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {trustPoints.map(({ label, icon: Icon, iconWrap }) => (
              <div
                key={label}
                className="rounded-2xl bg-white px-5 py-7 sm:px-6 sm:py-8 shadow-[0_12px_32px_-24px_rgba(15,23,42,0.22)] flex flex-col items-center gap-4 text-center"
              >
                <span className={`w-14 h-14 rounded-2xl inline-flex items-center justify-center ${iconWrap}`}>
                  <Icon size={28} />
                </span>
                <p className="text-[15px] sm:text-base font-bold text-slate-900 leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Band B — Demo */}
      <section id="demo" className="section-pad-home section-band-b">
        <div className="home-container-narrow">
          <div className="section-panel text-center !py-8 sm:!py-10">
            <h2 className="type-h2 mb-3">See DocFlow in Action</h2>
            <p className="mb-5 text-[13px] sm:text-sm font-medium text-slate-900 leading-snug sm:whitespace-nowrap">
              From supplier document to spend analytics — end to end.
            </p>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-sky-50 via-white to-[#F4F7FB] shadow-[0_12px_32px_-24px_rgba(15,23,42,0.28)] group max-w-md mx-auto">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
                <div className="w-11 h-11 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-600/25 group-hover:scale-105 transition-transform">
                  <Play size={20} className="ml-0.5" fill="currentColor" />
                </div>
                <p className="text-xs font-semibold text-slate-600">Demo video coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Band D — CTA */}
      <section className="section-pad-home section-band-d">
        <div className="home-container text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 leading-tight max-w-3xl mx-auto">
            From Invoices to Insights — Put Your Back-Office Operations on Autopilot.
          </h2>
          <p className="text-white text-base mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
            <span className="block">
              DocFlow is a managed digital operations platform operated by Symantum.
            </span>
            <span className="block">
              You provide supplier documents; we deliver verified data, integrated outputs and actionable intelligence.
            </span>
          </p>
          <Link
            to="/pilot#pilot-request"
            className="btn-primary text-sm px-8 py-3.5 font-bold"
          >
            Request a DocFlow pilot <ArrowRight size={16} />
          </Link>
          <p className="text-white/90 text-xs mt-4 font-medium">
            No credit card required · Onboarding support · Guided setup
          </p>
        </div>
      </section>

    </div>
  )
}
