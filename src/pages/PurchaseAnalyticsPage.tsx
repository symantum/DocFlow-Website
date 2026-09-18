import {
  AlertTriangle,
  ArrowRight,
  ArrowRightLeft,
  BarChart3,
  Building2,
  EyeOff,
  FileWarning,
  Gauge,
  Layers,
  LineChart,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const vulnerabilities: { title: string; desc: string; icon: LucideIcon; iconWrap: string }[] = [
  {
    title: 'Silent Spend Growth',
    desc: 'Monthly vendor or category spend can rise without a clear trigger.',
    icon: TrendingUp,
    iconWrap: 'bg-sky-100 text-sky-700',
  },
  {
    title: 'Vendor Concentration',
    desc: 'Too much spend can accumulate with a single vendor or category.',
    icon: Building2,
    iconWrap: 'bg-amber-100 text-amber-700',
  },
  {
    title: 'Budget Drift',
    desc: 'Teams need live budget progress and alerts, not retrospective spreadsheet checks.',
    icon: Gauge,
    iconWrap: 'bg-violet-100 text-violet-700',
  },
  {
    title: 'Category Blind Spots',
    desc: 'Vendor ABNs and names need enrichment before spend can be grouped usefully.',
    icon: EyeOff,
    iconWrap: 'bg-rose-100 text-rose-700',
  },
  {
    title: 'Irregular Invoices',
    desc: 'A spike or a repeated invoice can sit inside the total and still look ordinary.',
    icon: FileWarning,
    iconWrap: 'bg-orange-100 text-orange-700',
  },
  {
    title: 'Future Unit-Cost Risk',
    desc: 'The same item can cost more over time. That view is a direction, not a live control yet.',
    icon: LineChart,
    iconWrap: 'bg-indigo-100 text-indigo-700',
  },
]

// >>> HASH BRIDGE TARGET IDS (Analytics) — content-stable card ids.
// Public nav uses #spending|#insights|#detections|#guardrails → see HashScroll NAV_HASH_ALIASES.
// Revert ids only: spending, insights, detections, guardrails (and drop those four aliases).
const intelligenceAreas: {
  id: string
  title: string
  subtitle: string
  icon: LucideIcon
  iconWrap: string
  accent: string
  wash: string
  items: string[]
}[] = [
  {
    id: 'spend-dashboard',
    title: 'Monthly spend',
    subtitle: 'The invoice behind the total',
    icon: BarChart3,
    iconWrap: 'bg-sky-500 text-white',
    accent: 'bg-sky-500',
    wash: 'bg-sky-50',
    items: [
      'See monthly spend and how it is trending.',
      'Open the invoice behind the total.',
      'Follow recent transactions as they land.',
    ],
  },
  {
    id: 'vendor-category',
    title: 'Vendor and category',
    subtitle: 'The vendor taking the share',
    icon: Building2,
    iconWrap: 'bg-violet-500 text-white',
    accent: 'bg-violet-500',
    wash: 'bg-violet-50',
    items: [
      'See which vendor or category holds the share.',
      'Compare spend across vendors, categories, and document types.',
      'Read vendor performance next to the total.',
    ],
  },
  {
    id: 'enrichment',
    title: 'Supplier enrichment',
    subtitle: 'Spend that will not group',
    icon: Layers,
    iconWrap: 'bg-lime-500 text-white',
    accent: 'bg-lime-500',
    wash: 'bg-lime-50',
    items: [
      'Match suppliers to the business register.',
      'Enrich names and map categories so spend can be grouped.',
      'Keep those supplier records current.',
    ],
  },
  {
    id: 'budget',
    title: 'Budget and cashflow',
    subtitle: 'Drift before the month closes',
    icon: Gauge,
    iconWrap: 'bg-emerald-500 text-white',
    accent: 'bg-emerald-500',
    wash: 'bg-emerald-50',
    items: [
      'Watch budget progress before the month closes.',
      'See cash leaving while the period is still open.',
      'Review suggestions while there is still time to act.',
    ],
  },
  {
    id: 'anomalies',
    title: 'Anomaly signals',
    subtitle: 'The bill that should not be there',
    icon: AlertTriangle,
    iconWrap: 'bg-amber-500 text-white',
    accent: 'bg-amber-500',
    wash: 'bg-amber-50',
    items: [
      'Flag a spike that does not fit the pattern.',
      'Surface the same invoice appearing twice.',
      'Read the signal across totals, vendors, and categories.',
    ],
  },
  {
    id: 'xero',
    title: 'Xero delivery',
    subtitle: 'Still not in the books',
    icon: ArrowRightLeft,
    iconWrap: 'bg-indigo-500 text-white',
    accent: 'bg-indigo-500',
    wash: 'bg-indigo-50',
    items: [
      'Export clean figures for the books.',
      'Connect to Xero where that path is enabled.',
      'See whether the figures have actually gone across.',
    ],
  },
]
// <<< HASH BRIDGE TARGET IDS (Analytics)

const monthSpend = [
  { month: 'Jan', amount: '39,400', height: '72%' },
  { month: 'Feb', amount: '43,090', height: '84%' },
  { month: 'Mar', amount: '48,260', height: '100%', current: true },
]

const categorySpend = [
  { label: 'Paper and packaging', spent: '18,420', limit: '22,000', share: '38%', width: '84%', swatch: 'bg-sky-500', tone: 'bg-sky-500' },
  { label: 'Logistics', spent: '16,880', limit: '18,000', share: '35%', width: '94%', swatch: 'bg-amber-500', tone: 'bg-amber-500' },
  { label: 'Facilities', spent: '12,960', limit: '20,000', share: '27%', width: '65%', swatch: 'bg-emerald-500', tone: 'bg-emerald-500' },
]

const supplierSpend = [
  { name: 'Northline Paper', invoices: '14', spent: '18,420', share: '38%' },
  { name: 'Civic Freight', invoices: '9', spent: '11,200', share: '23%' },
  { name: 'Harbour Facilities', invoices: '7', spent: '8,640', share: '18%' },
]

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

function PanelLabel({ children }: { children: string }) {
  return (
    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">{children}</p>
  )
}

function InsightsStill() {
  return (
    <div className="rounded-xl p-3 h-full" aria-hidden>
      <div className="rounded-lg bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)] px-3.5 py-3 h-full">
        <StillStatus label="Behaviour" badge="Signal" badgeClass="text-amber-700 bg-amber-100" />
        <p className="text-[11px] font-medium text-slate-700 mb-2.5">Mar 2026 vs Feb 2026</p>
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          <div className="rounded-lg bg-[#F8FAFC] px-2.5 py-2">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-700">Month on month</p>
            <p className="text-sm font-bold text-slate-900 tabular-nums">+12%</p>
          </div>
          <div className="rounded-lg bg-[#F8FAFC] px-2.5 py-2">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-700">Flags</p>
            <p className="text-sm font-bold text-slate-900 tabular-nums">2</p>
          </div>
        </div>
        <PanelLabel>Intelligence</PanelLabel>
        <ul className="space-y-2.5 mb-3">
          <li>
            <p className="text-[11px] font-bold text-slate-900">Northline Paper</p>
            <p className="text-[11px] font-medium text-slate-700">INV-4027 sits above the usual pattern</p>
          </li>
          <li>
            <p className="text-[11px] font-bold text-slate-900">Civic Freight</p>
            <p className="text-[11px] font-medium text-slate-700">INV-2218 appears twice</p>
          </li>
        </ul>
        <p className="border-t border-slate-100 pt-2 text-[11px] font-medium text-slate-700 leading-relaxed">
          Logistics holds 35% of March spend.
        </p>
      </div>
    </div>
  )
}

function SpendingStill() {
  return (
    <div className="rounded-xl p-3 h-full" aria-hidden>
      <div className="rounded-lg bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)] px-3.5 py-3 h-full">
        <StillStatus label="Mar 2026" badge="72 invoices" badgeClass="text-violet-700 bg-violet-100" />
        <PanelLabel>Monthly spend</PanelLabel>
        <div className="flex items-end gap-2 h-16 mb-1">
          {monthSpend.map((bar) => (
            <div key={bar.month} className="flex-1 h-full flex items-end">
              <span
                className={`block w-full rounded-sm ${bar.current ? 'bg-sky-500' : 'bg-sky-200'}`}
                style={{ height: bar.height }}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 mb-3">
          {monthSpend.map((bar) => (
            <span key={bar.month} className="flex-1 text-center text-[10px] font-bold text-slate-700">
              {bar.month}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[1fr_3.2rem_2rem] gap-x-2 text-[8px] font-bold uppercase tracking-wider text-slate-700 mb-1">
          <span>Supplier</span>
          <span className="text-right">Spend</span>
          <span className="text-right">Share</span>
        </div>
        <ul className="space-y-1.5 mb-3">
          {supplierSpend.map((row) => (
            <li key={row.name} className="grid grid-cols-[1fr_3.2rem_2rem] gap-x-2 items-center">
              <span className="min-w-0">
                <span className="block text-[11px] font-bold text-slate-900 truncate">{row.name}</span>
                <span className="block text-[10px] font-medium text-slate-700">{row.invoices} invoices</span>
              </span>
              <span className="text-right text-[11px] font-bold text-slate-900 tabular-nums">{row.spent}</span>
              <span className="text-right text-[10px] font-medium text-slate-700 tabular-nums">{row.share}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-slate-100 pt-2 flex items-center justify-between gap-2">
          <span>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-700">Invoice behind March</span>
            <span className="block text-[11px] font-bold text-slate-900">Northline Paper · INV-4027</span>
          </span>
          <span className="text-[11px] font-bold text-slate-900 tabular-nums">1,284.50</span>
        </div>
      </div>
    </div>
  )
}

function BudgetsStill() {
  return (
    <div className="rounded-xl p-3 h-full" aria-hidden>
      <div className="rounded-lg bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)] px-3.5 py-3 h-full flex flex-col">
        <StillStatus label="Mar 2026" badge="Open" badgeClass="text-emerald-700 bg-emerald-100" />
        <PanelLabel>Category thresholds</PanelLabel>
        <ul className="space-y-3 mb-3">
          {categorySpend.map((row) => (
            <li key={row.label}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-bold text-slate-900 truncate">{row.label}</span>
                <span className="text-[10px] font-bold text-slate-900 tabular-nums shrink-0">{row.width}</span>
              </div>
              <span className="block h-1.5 rounded-full bg-slate-100 overflow-hidden mb-1">
                <span className={`block h-full rounded-full ${row.tone}`} style={{ width: row.width }} />
              </span>
              <p className="text-[10px] font-medium text-slate-700 tabular-nums">
                {row.spent} of {row.limit}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-auto border-t border-slate-100 pt-2 text-[11px] font-medium text-slate-700 leading-relaxed">
          Logistics is at 94% of its limit, with the month still open.
        </p>
      </div>
    </div>
  )
}

const intelligenceFrames = [
  {
    kicker: 'Spending',
    title: 'The invoices behind the total',
    icon: LineChart,
    iconWrap: 'bg-violet-100 text-violet-700',
    frame: 'bg-violet-100',
    still: SpendingStill,
  },
  {
    kicker: 'Insights',
    title: 'What sits outside the pattern',
    icon: TrendingUp,
    iconWrap: 'bg-amber-100 text-amber-700',
    frame: 'bg-amber-100',
    still: InsightsStill,
  },
  {
    kicker: 'Budgets',
    title: 'Thresholds while the month is open',
    icon: Gauge,
    iconWrap: 'bg-emerald-100 text-emerald-700',
    frame: 'bg-emerald-100',
    still: BudgetsStill,
  },
]

export default function PurchaseAnalyticsPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden hero-section-pad section-band-a">
        <div className="relative home-container">
          <div className="hero-copy max-w-3xl mx-auto text-center">
            <h1 className="type-h1 mb-5">
              <span className="block">Spend Intelligence from</span>
              <span className="block">Invoice Data to Budget Control</span>
            </h1>
            <p className="hero-lead mb-8 max-w-2xl mx-auto">
              DocFlow Analytics turns invoice data into supplier insight, anomaly signals, and
              margin protection
            </p>
            <Link
              to="/pilot?module=both#pilot-request"
              className="btn-primary text-sm px-8 py-3.5 font-bold"
            >
              Request a DocFlow pilot <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section id="vulnerabilities" className="section-pad-home section-band-b scroll-mt-28">
        <div className="home-container">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="type-h2 mb-3">Cost Vulnerabilities Mitigated</h2>
            <p className="hero-lead max-w-xl mx-auto">
              The cost exposures DocFlow Analytics is built around
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {vulnerabilities.map((v) => (
              <div key={v.title} className="text-left">
                <span className={`w-11 h-11 rounded-2xl inline-flex items-center justify-center mb-4 ${v.iconWrap}`}>
                  <v.icon size={20} />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-2">{v.title}</h3>
                <p className="text-[13px] sm:text-sm text-slate-700 leading-relaxed font-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="intelligence" className="section-pad-home section-band-c scroll-mt-28">
        <div className="home-container">
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <h2 className="type-h2 mb-3">DocFlow Analytics Capabilities</h2>
            <p className="hero-lead max-w-xl mx-auto">
              Six capabilities inside DocFlow Analytics — from the monthly total to the books.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid gap-4">
            {intelligenceAreas.map((area) => (
              <article
                key={area.id}
                id={area.id}
                className="scroll-mt-28 grid md:grid-cols-[minmax(0,19rem)_1fr] rounded-2xl overflow-hidden bg-white shadow-[0_16px_36px_-28px_rgba(15,23,42,0.35)]"
              >
                <div className={`relative flex items-start gap-4 px-5 py-6 sm:px-6 sm:py-7 ${area.wash}`}>
                  <span className={`absolute left-0 top-0 bottom-0 w-1.5 ${area.accent}`} aria-hidden />
                  <span className={`w-12 h-12 rounded-2xl inline-flex items-center justify-center shrink-0 shadow-[0_10px_18px_-12px_rgba(15,23,42,0.55)] ${area.iconWrap}`}>
                    <area.icon size={22} />
                  </span>
                  <div className="pt-0.5">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{area.title}</h3>
                    <p className="text-sm text-slate-800 leading-relaxed font-semibold mt-1">{area.subtitle}</p>
                  </div>
                </div>
                <ul className="px-5 py-6 sm:px-8 sm:py-7 space-y-2.5 flex flex-col justify-center">
                  {area.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[13px] sm:text-sm text-slate-700 leading-relaxed font-medium">
                      <span className={`mt-[0.45em] w-1.5 h-1.5 rounded-full shrink-0 ${area.accent}`} aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="outcome" className="section-pad-home section-band-a scroll-mt-28">
        <div className="home-container">
          <div className="text-center mb-8">
            <h2 className="type-h2 mb-3">From Verified Invoices to Spend Intelligence</h2>
            <p className="hero-lead max-w-5xl mx-auto lg:text-base">
              Verified invoice data becomes a live spending layer —
              <br className="hidden lg:block" />
              supplier, category, budget, cashflow, and anomaly views, with Xero delivery where you
              use it.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
            {intelligenceFrames.map((frame) => {
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
            Ready to See Spend Intelligence?
          </h2>
          <p className="text-white text-base mb-8 max-w-lg mx-auto leading-relaxed font-medium">
            Request a DocFlow pilot — we map Analytics to the verified data from DocFlow Automation.
          </p>
          <Link
            to="/pilot?module=both#pilot-request"
            className="btn-primary text-sm px-8 py-3.5 font-bold"
          >
            Request a DocFlow pilot <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
