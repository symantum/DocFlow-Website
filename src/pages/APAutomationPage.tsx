import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowRightLeft,
  Building2,
  Check,
  FolderTree,
  Layers,
  Link2,
  ListChecks,
  Mail,
  Play,
  ScanLine,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const frictions = [
  {
    title: 'The Hyperlink Trap',
    desc: 'Teams lose time logging into supplier portals or clicking through emails to locate hidden invoice downloads.',
    icon: Link2,
    iconWrap: 'bg-sky-100 text-sky-700',
  },
  {
    title: 'The Bundle Bottleneck',
    desc: 'Multi-page bundled PDFs require manual splitting before invoices can be processed.',
    icon: Layers,
    iconWrap: 'bg-amber-100 text-amber-700',
  },
  {
    title: 'Approval and Review Gridlock',
    desc: 'Finance teams need a controlled review workflow instead of scattered email follow-ups.',
    icon: ListChecks,
    iconWrap: 'bg-violet-100 text-violet-700',
  },
  {
    title: 'Field-Level Error Risk',
    desc: 'Supplier layouts vary, making pure OCR or generic AI extraction unreliable without validation.',
    icon: ScanLine,
    iconWrap: 'bg-rose-100 text-rose-700',
  },
  {
    title: 'AI Guesswork Risk',
    desc: 'Unchecked model output can look confident and still invent or misread fields — creating ledger risk if it ships unverified.',
    icon: Sparkles,
    iconWrap: 'bg-lime-100 text-lime-800',
  },
  {
    title: 'The Multi-Mailbox Split',
    desc: 'Invoices arrive across branch offices and separate company or admin mailboxes, so files get missed, delayed, or filed under the wrong account.',
    icon: Building2,
    iconWrap: 'bg-indigo-100 text-indigo-700',
  },
]

const syncDestinations = [
  { label: 'Xero', image: '/images/home/chip-xero.png' },
  { label: 'MYOB', image: '/images/home/chip-myob.png' },
  { label: 'SFTP', image: '/images/home/chip-sftp.png' },
  { label: 'API', image: '/images/home/chip-api.png' },
]

type Gear = {
  id: string
  title: string
  summary: string
  capabilities: string[]
  icon: LucideIcon
  iconWrap: string
}

const gears: Gear[] = [
  {
    id: 'intake',
    title: 'Intake',
    icon: Mail,
    iconWrap: 'bg-sky-100 text-sky-700',
    summary: 'Monitor the dedicated mailbox, route each file to the right account, and take it into customised processing.',
    capabilities: [
      'Watch the dedicated mailbox where supplier documents arrive.',
      'Route each file to the right account.',
      'Send ready files on for customised processing.',
    ],
  },
  {
    id: 'bundle',
    title: 'Bundle',
    icon: Layers,
    iconWrap: 'bg-amber-100 text-amber-700',
    summary: 'Separate bundled files into individual documents without losing the original.',
    capabilities: [
      'Split bundled files into separate documents.',
      'Keep the original linked to each document it is split into.',
    ],
  },
  {
    id: 'triage',
    title: 'Triage',
    icon: FolderTree,
    iconWrap: 'bg-violet-100 text-violet-700',
    summary: 'Recognise each document type and send it down the right path.',
    capabilities: [
      'Identify invoices, credit notes, statements, and other supported types.',
      'Send each type down the right processing and delivery path.',
      'Keep the document type with the file through to sync.',
    ],
  },
  {
    id: 'extract',
    title: 'Extract',
    icon: ScanLine,
    iconWrap: 'bg-lime-100 text-lime-800',
    summary: 'IDP reads the key figures. AI checks those values against the document.',
    capabilities: [
      'IDP reads vendor, totals, tax, purchase order, and line items for each document type.',
      'AI checks those values against the document.',
      'Checked figures move on for validation.',
    ],
  },
  {
    id: 'audit',
    title: 'Audit',
    icon: ShieldCheck,
    iconWrap: 'bg-rose-100 text-rose-700',
    summary:
      'AI checks the figures before anything is synced. HITL clears exceptions so mismatches do not reach your books.',
    capabilities: [
      'Check invoice figures and line items with AI.',
      'Surface mismatches for a controlled check.',
      'Release only data that has passed AI-powered validation and HITL.',
    ],
  },
  {
    id: 'sync',
    title: 'Sync',
    icon: ArrowRightLeft,
    iconWrap: 'bg-indigo-100 text-indigo-700',
    summary:
      'Sync clean, verified data into your accounting workflow — and into DocFlow Analytics when you want spend intelligence.',
    capabilities: [
      'Send clean data to your accounting systems.',
      'Bring the same verified figures into DocFlow Analytics when you want spend intelligence.',
      'Set up Xero, MYOB, SFTP, API, or CSV during onboarding.',
    ],
  },
]

const sampleInvoice = {
  vendor: 'Northline Paper',
  abn: '84 000 112 390',
  billTo: 'Harbour Civic Pty Ltd',
  invoiceNo: 'INV-4027',
  issued: '12/03/2026',
  filename: 'Northline_INV-4027.pdf',
  po: '88421',
  lines: '3',
  taxEx: '1,167.73',
  gst: '116.77',
  total: '1,284.50',
  currency: 'AUD',
}

function StillStatus({
  label,
  badge,
  badgeClass,
}: {
  label: string
  badge: string
  badgeClass: string
}) {
  return (
    <div className="flex items-start justify-between gap-2 mb-2.5 min-h-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700">{label}</p>
      <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 shrink-0 whitespace-nowrap ${badgeClass}`}>
        {badge}
      </span>
    </div>
  )
}

const sampleLines = [
  { description: 'Copy paper', qty: '20', amount: '570.00' },
  { description: 'Archive boxes', qty: '8', amount: '433.60' },
  { description: 'Delivery', qty: '1', amount: '164.13' },
]

function IntakeStill() {
  return (
    <div className="rounded-xl p-3 h-full flex flex-col gap-2" aria-hidden>
      <div className="rounded-lg bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)] px-3.5 py-3 flex-1">
        <StillStatus label="Tax invoice" badge="Received / Intaked" badgeClass="text-sky-700 bg-sky-100" />
        <p className="text-[13px] font-bold text-slate-900 leading-tight">{sampleInvoice.vendor}</p>
        <p className="text-[10px] font-medium text-slate-700 tabular-nums mb-2.5">
          {sampleInvoice.invoiceNo} · {sampleInvoice.issued}
        </p>
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-700">Bill to</p>
        <p className="text-[11px] font-semibold text-slate-700 mb-2.5">{sampleInvoice.billTo}</p>
        <div className="grid grid-cols-[1fr_2rem_3.4rem] gap-x-2 text-[9px] font-bold uppercase tracking-wider text-slate-700 mb-1">
          <span>Item</span>
          <span className="text-right">Qty</span>
          <span className="text-right">Amount</span>
        </div>
        <ul className="space-y-1 mb-2.5">
          {sampleLines.map((line) => (
            <li key={line.description} className="grid grid-cols-[1fr_2rem_3.4rem] gap-x-2 text-[11px]">
              <span className="font-medium text-slate-700 truncate">{line.description}</span>
              <span className="text-right font-medium text-slate-700 tabular-nums">{line.qty}</span>
              <span className="text-right font-semibold text-slate-900 tabular-nums">{line.amount}</span>
            </li>
          ))}
        </ul>
        <dl className="border-t border-slate-100 pt-2 space-y-0.5 text-[11px]">
          <div className="flex justify-between">
            <dt className="font-medium text-slate-700">Ex-tax</dt>
            <dd className="font-semibold text-slate-900 tabular-nums">{sampleInvoice.taxEx}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium text-slate-700">GST</dt>
            <dd className="font-semibold text-slate-900 tabular-nums">{sampleInvoice.gst}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-bold text-slate-700">Total {sampleInvoice.currency}</dt>
            <dd className="font-bold text-slate-900 tabular-nums">{sampleInvoice.total}</dd>
          </div>
        </dl>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {['Inbox', 'Invoice', '3 lines'].map((chip) => (
          <span key={chip} className="text-[10px] font-bold text-sky-700 bg-white rounded-full px-2 py-0.5">
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}

function VerifiedStill() {
  const fields: [string, string][] = [
    ['Type', 'Invoice'],
    ['ABN', sampleInvoice.abn],
    ['Bill to', sampleInvoice.billTo],
    ['Invoice No.', sampleInvoice.invoiceNo],
    ['Issued', sampleInvoice.issued],
    ['Ex-tax', sampleInvoice.taxEx],
    ['GST', sampleInvoice.gst],
    ['Total', `${sampleInvoice.total} ${sampleInvoice.currency}`],
    ['PO', sampleInvoice.po],
    ['Lines', sampleInvoice.lines],
  ]
  return (
    <div className="rounded-xl p-3 h-full" aria-hidden>
      <div className="rounded-lg bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)] px-3.5 py-3 h-full">
        <StillStatus
          label="Checked against the document"
          badge="AI checked"
          badgeClass="text-lime-800 bg-lime-100"
        />
        <ul className="space-y-1.5">
          {fields.map(([label, value]) => (
            <li key={label} className="flex items-center gap-1.5 min-w-0">
              <span className="w-3.5 h-3.5 rounded-full bg-lime-100 text-lime-700 inline-flex items-center justify-center shrink-0">
                <Check size={9} strokeWidth={3} />
              </span>
              <span className="text-[10px] font-medium text-slate-700 w-[4.6rem] shrink-0">{label}</span>
              <span className="text-[11px] font-bold text-slate-900 truncate tabular-nums">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SyncStill() {
  const posting = [
    ['Type', 'Invoice'],
    ['Invoice No.', sampleInvoice.invoiceNo],
    ['Issued', sampleInvoice.issued],
    ['ABN', sampleInvoice.abn],
    ['PO', sampleInvoice.po],
    ['Lines', sampleInvoice.lines],
  ]
  return (
    <div className="rounded-xl p-3 h-full" aria-hidden>
      <div className="rounded-lg bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)] px-3.5 py-3 h-full flex flex-col">
        <StillStatus label="Accounting workflow" badge="Synced" badgeClass="text-indigo-700 bg-indigo-100" />
        <p className="text-[11px] font-bold text-slate-900 truncate mb-2.5">{sampleInvoice.filename}</p>
        <dl className="space-y-1.5 mb-3">
          {posting.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-2">
              <dt className="text-[10px] font-medium text-slate-700">{label}</dt>
              <dd className="text-[11px] font-bold text-slate-900 tabular-nums text-right">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto grid grid-cols-3 gap-1.5 rounded-lg bg-[#F8FAFC] px-2.5 py-2">
          {[
            ['Ex-tax', sampleInvoice.taxEx],
            ['GST', sampleInvoice.gst],
            ['Total', sampleInvoice.total],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-700">{label}</p>
              <p className="text-[11px] font-bold text-slate-900 tabular-nums">{value}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[10px] font-semibold text-slate-700">{sampleInvoice.currency} · ready in your books</p>
      </div>
    </div>
  )
}

const pathFrames = [
  {
    kicker: 'In',
    title: 'Supplier document arrives',
    icon: Mail,
    iconWrap: 'bg-sky-100 text-sky-700',
    frame: 'bg-sky-100',
    still: IntakeStill,
  },
  {
    kicker: 'Verified',
    title: 'Fields checked and ready',
    icon: ShieldCheck,
    iconWrap: 'bg-lime-100 text-lime-800',
    frame: 'bg-lime-100',
    still: VerifiedStill,
  },
  {
    kicker: 'Out',
    title: 'Clean data in your workflow',
    icon: ArrowRightLeft,
    iconWrap: 'bg-indigo-100 text-indigo-700',
    frame: 'bg-indigo-100',
    still: SyncStill,
  },
]

function PipelineGraphic({
  activeId,
  onSelect,
}: {
  activeId: string
  onSelect: (id: string) => void
}) {
  return (
    <div
      className="rounded-2xl bg-white p-5 sm:p-6 shadow-[0_12px_32px_-24px_rgba(15,23,42,0.22)]"
      aria-label="Automation pipeline stages"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-4 text-center">
        DocFlow engine
      </p>
      <ol className="space-y-2">
        {gears.map((g, index) => {
          const Icon = g.icon
          const active = g.id === activeId
          return (
            <li key={g.id}>
              <button
                type="button"
                onClick={() => onSelect(g.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  active
                    ? 'bg-sky-50 ring-1 ring-sky-200'
                    : 'hover:bg-slate-50'
                }`}
              >
                <span
                  className={`w-9 h-9 rounded-xl inline-flex items-center justify-center shrink-0 ${g.iconWrap}`}
                >
                  <Icon size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold truncate text-slate-900">
                    {g.title}
                  </span>
                </span>
              </button>
                {index < gears.length - 1 && <div className="h-1" aria-hidden />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default function APAutomationPage() {
  const [activeId, setActiveId] = useState(gears[0].id)

  useEffect(() => {
    const syncFromHash = () => {
      let hash = window.location.hash.replace('#', '')
      if (hash === 'validate') {
        hash = 'audit'
        window.history.replaceState(null, '', '#audit')
      }
      if (!gears.some((g) => g.id === hash)) return
      setActiveId(hash)
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  useEffect(() => {
    const nodes = gears
      .map((g) => document.getElementById(g.id))
      .filter((el): el is HTMLElement => !!el)
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActiveId(visible.target.id)
      },
      { rootMargin: '-30% 0px -45% 0px', threshold: [0.15, 0.35, 0.55] },
    )
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  const selectGear = (id: string) => {
    setActiveId(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden hero-section-pad section-band-a">
        <div className="relative home-container">
          <div className="hero-copy max-w-3xl mx-auto text-center">
            <h1 className="type-h1 mb-5">
              <span className="block">An AI-Powered Engine from</span>
              <span className="block">Supplier Documents to Ledger Data</span>
            </h1>
            <p className="hero-lead mb-8 max-w-2xl mx-auto">
              DocFlow Automation replaces email sorting, document classification and job routing
              with a structured ingestion and validation workflow
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/pilot?module=automation#pilot-request"
                className="btn-primary text-sm px-8 py-3.5 font-bold"
              >
                Request a DocFlow pilot <ArrowRight size={16} />
              </Link>
              <a href="/#demo" className="btn-ghost-dark text-sm px-8 py-3.5 font-bold">
                <Play size={16} className="text-sky-600" />
                Watch the Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Friction */}
      <section id="friction" className="section-pad-home section-band-b scroll-mt-28">
        <div className="home-container">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="type-h2 mb-3">Operational Friction Reduced</h2>
            <p className="hero-lead max-w-xl mx-auto">
              DocFlow Automation is built around the failure modes AP teams hit every week.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {frictions.map((f) => (
              <div key={f.title} className="text-left">
                <span className={`w-11 h-11 rounded-2xl inline-flex items-center justify-center mb-4 ${f.iconWrap}`}>
                  <f.icon size={20} />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-2">
                  {f.title}
                </h3>
                <p className="text-[13px] sm:text-sm text-slate-700 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline — shared graphic (B) + stage detail */}
      <section id="pipeline" className="section-pad-home section-band-c scroll-mt-28">
        <div className="home-container">
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <h2 className="type-h2 mb-3">DocFlow Automation Engine</h2>
            <p className="hero-lead max-w-xl mx-auto">
              Six stages inside DocFlow Automation — from mailbox to sync.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-5xl mx-auto mb-10 sm:mb-12">
            {gears.map((g, index) => (
              <div key={g.id} className="inline-flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => selectGear(g.id)}
                  className={`inline-flex items-center gap-2.5 rounded-2xl pl-2.5 pr-4 py-2 shadow-[0_12px_32px_-24px_rgba(15,23,42,0.22)] transition-colors ${
                    activeId === g.id ? 'bg-white ring-1 ring-slate-300' : 'bg-white'
                  }`}
                >
                  <span
                    className={`w-9 h-9 rounded-xl inline-flex items-center justify-center shrink-0 ${g.iconWrap}`}
                  >
                    <g.icon size={18} />
                  </span>
                  <span className="text-sm font-bold text-slate-900 leading-none">{g.title}</span>
                </button>
                {index < gears.length - 1 && (
                  <ArrowRight size={14} className="text-slate-300 hidden sm:block shrink-0" aria-hidden />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[minmax(0,240px)_1fr] gap-8 lg:gap-10 items-start max-w-5xl mx-auto">
            <div className="lg:sticky lg:top-28">
              <PipelineGraphic activeId={activeId} onSelect={selectGear} />
            </div>

            <div className="space-y-10 sm:space-y-12">
              {gears.map((g) => {
                const Icon = g.icon
                const active = g.id === activeId
                return (
                  <article
                    key={g.id}
                    id={g.id}
                    className={`scroll-mt-28 text-left rounded-2xl px-5 py-6 sm:px-6 sm:py-7 transition-colors ${
                      active ? 'bg-white shadow-[0_12px_32px_-24px_rgba(15,23,42,0.22)]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <span
                        className={`w-11 h-11 rounded-2xl inline-flex items-center justify-center shrink-0 ${g.iconWrap}`}
                      >
                        <Icon size={20} />
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        {g.title}
                      </h3>
                    </div>
                    <p className="text-[13px] sm:text-sm text-slate-700 leading-relaxed font-medium mb-4">
                      {g.summary}
                    </p>
                    <ul className="space-y-2">
                      {g.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="text-[13px] sm:text-sm text-slate-700 leading-relaxed font-medium pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-sky-500"
                        >
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Outcome + destinations */}
      <section id="outcome" className="section-pad-home section-band-a scroll-mt-28">
        <div className="home-container">
          <div className="text-center mb-8">
            <h2 className="type-h2 mb-3">From Intake to Your Workflow</h2>
            <p className="hero-lead max-w-5xl mx-auto lg:text-base">
              DocFlow Automation keeps a controlled path from intake to sync: verified data into
              your accounting workflow,
              <br className="hidden lg:block" />
              without blind AI guesswork, and into DocFlow Analytics when you want spend intelligence.
            </p>
          </div>
          <div className="chip-row justify-center max-w-xl mx-auto mb-10">
            {syncDestinations.map(({ label, image }) => (
              <span key={label} className="chip-logo" title={label}>
                <img src={image} alt={label} width={56} height={56} decoding="async" />
              </span>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
            {pathFrames.map((frame) => {
              const Icon = frame.icon
              const Still = frame.still
              return (
                <article
                  key={frame.kicker}
                  className={`rounded-2xl overflow-hidden flex flex-col h-full shadow-[0_12px_32px_-24px_rgba(15,23,42,0.22)] ${frame.frame}`}
                >
                  <div className="p-3 pb-0 flex-1 flex flex-col">
                    <Still />
                  </div>
                  <div className="p-5 mt-auto flex items-start gap-3 min-h-[5.5rem]">
                    <span
                      className={`w-9 h-9 rounded-xl inline-flex items-center justify-center shrink-0 ${frame.iconWrap}`}
                    >
                      <Icon size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-400 mb-1">
                        {frame.kicker}
                      </p>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
                        {frame.title}
                      </h3>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad-home section-band-d">
        <div className="home-container-narrow text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Ready to Streamline AP Workflow?
          </h2>
          <p className="text-white text-base mb-8 max-w-lg mx-auto leading-relaxed font-medium">
            Request a DocFlow pilot — we map intake, processing, and sync to your volume and systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/pilot?module=automation#pilot-request"
              className="btn-primary text-sm px-8 py-3.5 font-bold"
            >
              Request a DocFlow pilot <ArrowRight size={16} />
            </Link>
            <a
              href="/#demo"
              className="btn-ghost-dark text-sm px-8 py-3.5 font-bold !bg-white !text-sky-800 hover:!bg-sky-50"
            >
              <Play size={16} className="text-sky-700" />
              Watch the Demo
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
