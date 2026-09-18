import {
  ArrowRight,
  ArrowRightLeft,
  Check,
  ClipboardList,
  LayoutTemplate,
  ListChecks,
  MapPin,
  ScanLine,
  ShieldCheck,
  Sparkles,
  UserCheck,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'

// >>> HASH BRIDGE TARGET IDS (Integrity) — content-stable anchors.
// Public nav: #architecture (section), #sovereignty → local-residency, #compliance → outcome.
// See HashScroll NAV_HASH_ALIASES. Revert: id 'sovereignty' / section id 'compliance'.
const vulnerabilities: { title: string; desc: string; icon: LucideIcon; iconWrap: string; id?: string }[] = [
  {
    title: 'AI Guesswork',
    desc: 'Pure AI tools can misread an invoice and still look confident — wrong totals, wrong suppliers, or wrong buyer details. Those bad fields become trusted facts inside the record. DocFlow never lets AI silently overwrite; it only suggests, and people confirm the values before they are treated as final.',
    icon: Sparkles,
    iconWrap: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'local-residency',
    title: 'Local data residency',
    desc: 'Invoice files and extracted fields are sensitive commercial records. Moving them through unmanaged offshore paths creates compliance and client trust risk. Document data stays in Australia from intake through processing to sync.',
    icon: MapPin,
    iconWrap: 'bg-lime-100 text-lime-800',
  },
  {
    title: 'Layout Drift',
    desc: 'Supplier templates change without notice. Brittle layout rules break, and the same invoice type suddenly fails or lands incomplete. DocFlow uses a rule-based IDP path with structured fields and line-item support so extraction stays useful when the page layout moves.',
    icon: LayoutTemplate,
    iconWrap: 'bg-amber-100 text-amber-700',
  },
  {
    title: 'Review Overload',
    desc: 'Exceptions pile up in inboxes and chat threads, with no clear owner and no shared queue. Corrections get lost, and the same issue comes back next month. DocFlow keeps flagged items in a controlled review path so teams work exceptions in one place, not by ad hoc email.',
    icon: ListChecks,
    iconWrap: 'bg-violet-100 text-violet-700',
  },
  {
    title: 'Audit Weakness',
    desc: 'If you cannot see what was extracted, what changed, and who confirmed it, you cannot defend the figure later. Finance needs more than a finished CSV. DocFlow keeps processing status, reviewed fields, and confirmed outputs so verified data stays traceable.',
    icon: ClipboardList,
    iconWrap: 'bg-rose-100 text-rose-700',
  },
  {
    title: 'Integration Risk',
    desc: 'Even a careful extract can still leave too early. Half-checked records pushed into Xero or another workflow create clean-looking errors downstream, where recovery is harder. DocFlow holds delivery until validation and confirmation are complete — nothing is released on a blind pass-through.',
    icon: ArrowRightLeft,
    iconWrap: 'bg-indigo-100 text-indigo-700',
  },
]

const filters: {
  id: string
  gate: string
  title: string
  desc: string
  icon: LucideIcon
  iconWrap: string
  wash: string
}[] = [
  {
    id: 'rules',
    gate: '01',
    title: 'Rule-based IDP engine',
    desc: 'Structured extraction with strict formatting logic, account configuration, and line-item support.',
    icon: ShieldCheck,
    iconWrap: 'bg-sky-500 text-white',
    wash: 'bg-sky-50',
  },
  {
    id: 'ai-check',
    gate: '02',
    title: 'Contextual AI validation',
    desc: 'AI checks the document context, flags mismatches, and only suggests corrections — it does not silently overwrite.',
    icon: Sparkles,
    iconWrap: 'bg-violet-500 text-white',
    wash: 'bg-violet-50',
  },
  {
    id: 'hitl',
    gate: '03',
    title: 'Human-in-the-loop confirmation',
    desc: 'Operators review flagged exceptions and confirm final outputs before data reaches your ledger.',
    icon: UserCheck,
    iconWrap: 'bg-emerald-500 text-white',
    wash: 'bg-emerald-50',
  },
]

const sampleInvoice = {
  vendor: 'Northline Paper',
  abn: '84 000 112 390',
  billTo: 'Harbour Civic Pty Ltd',
  invoiceNo: 'INV-4027',
  issued: '12/03/2026',
  taxEx: '1,167.73',
  gst: '116.77',
  total: '1,284.50',
  currency: 'AUD',
  lines: '3',
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

function ExtractionStill() {
  const fields: [string, string][] = [
    ['Vendor', sampleInvoice.vendor],
    ['ABN', sampleInvoice.abn],
    ['Bill to', sampleInvoice.billTo],
    ['Invoice No.', sampleInvoice.invoiceNo],
    ['Ex-tax', sampleInvoice.taxEx],
    ['GST', sampleInvoice.gst],
    ['Total', sampleInvoice.total],
    ['Lines', sampleInvoice.lines],
  ]
  return (
    <div className="rounded-xl p-3 h-full" aria-hidden>
      <div className="rounded-lg bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)] px-3.5 py-3 h-full">
        <StillStatus label="Deterministic extract" badge="Rules" badgeClass="text-sky-700 bg-sky-100" />
        <ul className="space-y-1.5">
          {fields.map(([label, value]) => (
            <li key={label} className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-medium text-slate-700">{label}</span>
              <span className="text-[11px] font-bold text-slate-900 tabular-nums text-right truncate">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function AiValidationStill() {
  return (
    <div className="rounded-xl p-3 h-full" aria-hidden>
      <div className="rounded-lg bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)] px-3.5 py-3 h-full">
        <StillStatus label="Contextual check" badge="AI suggests" badgeClass="text-violet-700 bg-violet-100" />
        <p className="text-[11px] font-medium text-slate-700 mb-2.5">
          Totals checked against the document
        </p>
        <ul className="space-y-2 mb-3">
          {[
            ['Ex-tax', sampleInvoice.taxEx, 'Match'],
            ['GST', sampleInvoice.gst, 'Match'],
            ['Total', sampleInvoice.total, 'Match'],
          ].map(([label, value, status]) => (
            <li key={label} className="flex items-center gap-1.5 min-w-0">
              <span className="w-3.5 h-3.5 rounded-full bg-violet-100 text-violet-700 inline-flex items-center justify-center shrink-0">
                <Check size={9} strokeWidth={3} />
              </span>
              <span className="text-[10px] font-medium text-slate-700 w-[3.2rem] shrink-0">{label}</span>
              <span className="text-[11px] font-bold text-slate-900 tabular-nums truncate">{value}</span>
              <span className="ml-auto text-[10px] font-bold text-violet-700 shrink-0">{status}</span>
            </li>
          ))}
        </ul>
        <p className="border-t border-slate-100 pt-2 text-[11px] font-medium text-slate-700 leading-relaxed">
          Suggestion only — nothing is overwritten without review.
        </p>
      </div>
    </div>
  )
}

function HitlAuditStill() {
  return (
    <div className="rounded-xl p-3 h-full" aria-hidden>
      <div className="rounded-lg bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)] px-3.5 py-3 h-full flex flex-col">
        <StillStatus label="Human audit" badge="Confirmed" badgeClass="text-emerald-700 bg-emerald-100" />
        <p className="text-[13px] font-bold text-slate-900 leading-tight">{sampleInvoice.vendor}</p>
        <p className="text-[10px] font-medium text-slate-700 tabular-nums mb-3">
          {sampleInvoice.invoiceNo} · {sampleInvoice.issued}
        </p>
        <ul className="space-y-1.5 mb-3">
          {[
            ['Bill to', sampleInvoice.billTo],
            ['ABN', sampleInvoice.abn],
            ['Total', `${sampleInvoice.total} ${sampleInvoice.currency}`],
          ].map(([label, value]) => (
            <li key={label} className="flex items-center gap-1.5 min-w-0">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 inline-flex items-center justify-center shrink-0">
                <Check size={9} strokeWidth={3} />
              </span>
              <span className="text-[10px] font-medium text-slate-700 w-[3.2rem] shrink-0">{label}</span>
              <span className="text-[11px] font-bold text-slate-900 truncate tabular-nums">{value}</span>
            </li>
          ))}
        </ul>
        <p className="mt-auto border-t border-slate-100 pt-2 text-[10px] font-semibold text-slate-700">
          Confirmed — fit for sync and Analytics
        </p>
      </div>
    </div>
  )
}

const trustFrames = [
  {
    kicker: 'Extract',
    title: 'Deterministic extraction',
    icon: ScanLine,
    iconWrap: 'bg-sky-100 text-sky-700',
    frame: 'bg-sky-100',
    still: ExtractionStill,
  },
  {
    kicker: 'Validate',
    title: 'Contextual AI validation',
    icon: Sparkles,
    iconWrap: 'bg-violet-100 text-violet-700',
    frame: 'bg-violet-100',
    still: AiValidationStill,
  },
  {
    kicker: 'Audit',
    title: 'Human-in-the-loop audit',
    icon: UserCheck,
    iconWrap: 'bg-emerald-100 text-emerald-700',
    frame: 'bg-emerald-100',
    still: HitlAuditStill,
  },
]

export default function DataIntegrityPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden hero-section-pad section-band-a">
        <div className="relative home-container">
          <div className="hero-copy max-w-3xl mx-auto text-center">
            <h1 className="type-h1 mb-5">
              <span className="block">Controlled Data Flow with</span>
              <span className="block">Security, Governance, and Integrity</span>
            </h1>
            <p className="hero-lead mb-8 max-w-2xl mx-auto">
              DocFlow combines deterministic extraction, AI verification, and human review to
              produce reliable operational data from inconsistent supplier documents
            </p>
            <Link
              to="/pilot?module=automation#pilot-request"
              className="btn-primary text-sm px-8 py-3.5 font-bold"
            >
              Request a DocFlow pilot <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section id="risks" className="section-pad-home section-band-b scroll-mt-28">
        <div className="home-container">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="type-h2 mb-3">Integrity Risks Managed</h2>
            <p className="hero-lead max-w-xl mx-auto">
              The integrity exposures DocFlow is built around
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {vulnerabilities.map((v) => (
              <div
                key={v.title}
                id={v.id}
                className={`rounded-2xl bg-[#F8FAFC] px-5 py-5 sm:px-6 text-left${v.id ? ' scroll-mt-28' : ''}`}
              >
                <span className={`w-9 h-9 rounded-xl inline-flex items-center justify-center mb-3 ${v.iconWrap}`}>
                  <v.icon size={16} />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-2">{v.title}</h3>
                <p className="text-[13px] sm:text-sm text-slate-700 leading-relaxed font-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="architecture" className="section-pad-home section-band-c scroll-mt-28">
        <div className="home-container">
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <h2 className="type-h2 mb-3">Triple-Filtered Data Integrity Architecture</h2>
            <p className="hero-lead max-w-xl mx-auto">
              Three layers before data reaches your ledger — rules, AI check, then human confirm.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
            {filters.map((filter) => (
              <article
                key={filter.id}
                id={filter.id}
                className={`scroll-mt-28 rounded-2xl overflow-hidden flex flex-col h-full shadow-[0_16px_36px_-28px_rgba(15,23,42,0.35)] ${filter.wash}`}
              >
                <div className="px-5 pt-6 sm:px-6 flex items-start justify-between gap-3">
                  <p className="text-4xl sm:text-5xl font-black text-slate-900/10 tracking-tight leading-none tabular-nums">
                    {filter.gate}
                  </p>
                  <span className={`w-11 h-11 rounded-2xl inline-flex items-center justify-center shrink-0 shadow-[0_10px_18px_-12px_rgba(15,23,42,0.55)] ${filter.iconWrap}`}>
                    <filter.icon size={20} />
                  </span>
                </div>
                <div className="px-5 pb-6 pt-4 sm:px-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-3">
                    {filter.title}
                  </h3>
                  <p className="text-[13px] sm:text-sm text-slate-700 leading-relaxed font-medium mt-auto">
                    {filter.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HASH BRIDGE: nav #compliance → id outcome (HashScroll). Revert section id to compliance if dropping alias. */}
      <section id="outcome" className="section-pad-home section-band-a scroll-mt-28">
        <div className="home-container">
          <div className="text-center mb-8">
            <h2 className="type-h2 mb-3">From Inconsistent Documents to Verified Data</h2>
            <p className="hero-lead max-w-5xl mx-auto lg:text-base">
              DocFlow provides verified, traceable invoice data with controlled review gates —
              <br className="hidden lg:block" />
              ready for your books with operational and spend intelligence.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
            {trustFrames.map((frame) => {
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
                    <span className={`w-9 h-9 rounded-xl inline-flex items-center justify-center shrink-0 ${frame.iconWrap}`}>
                      <Icon size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-400 mb-1">{frame.kicker}</p>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">{frame.title}</h3>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad-home section-band-d">
        <div className="home-container-narrow text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Ready for Data You Can Trust?
          </h2>
          <p className="text-white text-base mb-8 max-w-lg mx-auto leading-relaxed font-medium">
            Request a DocFlow pilot — we map extraction, verification, and review to your volume
            and systems.
          </p>
          <Link
            to="/pilot?module=automation#pilot-request"
            className="btn-primary text-sm px-8 py-3.5 font-bold"
          >
            Request a DocFlow pilot <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
