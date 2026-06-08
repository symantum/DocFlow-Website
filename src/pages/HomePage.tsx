import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, CheckCircle2, Mail, Cpu, Send,
  Clock, Shield, Globe, TrendingDown,
  BarChart3, AlertCircle, ScanLine, Activity,
  Layers, Lock, Star, ChevronDown, ChevronUp,
  FileText, Zap, Users,
} from 'lucide-react'

/* ── Section 2 data ── */
const apFeatures = [
  { icon: Mail,         label: 'Secure Ingestion Gateways',   desc: 'Automated tracking via secure corporate email aliases and hyperlink rendering loops.' },
  { icon: ScanLine,     label: '20-Point Metadata Matrix',    desc: 'Flawless line-item and header data mapping executed through dual-pass validation.' },
  { icon: CheckCircle2, label: 'Zero Ledger Pollution',       desc: 'Human-in-the-loop validation gate that holds and corrects exceptions before data entry.' },
  { icon: Layers,       label: 'Native ERP Integration',      desc: 'Automated data payload delivery built directly for Xero, MYOB, and compatible networks.' },
]

const csaFeatures = [
  { icon: BarChart3,    label: 'ANZSIC Economic Coding',      desc: 'Spend profiles natively grouped by official government industrial categories.' },
  { icon: AlertCircle,  label: 'Subscription Drift Tracking', desc: 'Live analytics widgets that isolate and alert you to creeping vendor costs.' },
  { icon: TrendingDown, label: 'Maverick Spend Auditing',     desc: 'Matrix views tracking item-level unit cost variations across separate branches.' },
  { icon: Activity,     label: 'Processing Lifecycle Metrics',desc: 'Operational tracking exposing workflow delays before they incur late fees.' },
]

/* ── Section 3 data ── */
const steps = [
  {
    num: '01', icon: Mail,
    title: 'Secure Ingestion', sub: 'Automatic Document Capture',
    desc: 'Forward your supplier invoices to your dedicated Symantum email alias. Our system ingests digital PDFs and renders incoming hyperlinks instantly via headless browser networks.',
  },
  {
    num: '02', icon: Cpu,
    title: 'Dual-Pass Validation', sub: 'Deterministic Code + Flagship AI',
    desc: 'Our 80%+ accurate rule engine maps 20 database fields, while Gemini runs a second semantic pass to audit line-item text for hidden surcharge fees or formatting errors.',
  },
  {
    num: '03', icon: Send,
    title: 'Verified Auto-Push', sub: 'Human-in-the-Loop Gateway',
    desc: 'Any discrepancies automatically route to our verification experts. Once confirmed, a clean payload auto-pushes straight into your Xero, MYOB, or compatible ERP system.',
  },
]

/* ── Section 4 data ── */
const advantages = [
  {
    icon: Clock,  title: '20+ Year History',    sub: 'Australian Corporate Stability',
    desc: 'Operating securely in Australia for over two decades. A deeply trusted operational history in document management and file security protecting your enterprise workflows.',
  },
  {
    icon: Cpu,    title: 'The Managed Outcome', sub: 'The Power of AI + HI',
    desc: 'Our automated scripts handle the high-volume processing heavy lifting, while our dedicated validation specialists guarantee the absolute accuracy of the final result.',
  },
  {
    icon: Lock,   title: 'Bulletproof Governance', sub: 'Sovereignty & Control Built-In',
    desc: 'Your financial records live within secure, compliant Australian-hosted cloud frameworks. We intentionally avoid sensitive banking detail collection, reducing security risk to zero.',
  },
]

/* ── Stats ── */
const stats = [
  { value: '70%+',  label: 'Cost Reduction',       icon: TrendingDown },
  { value: '20+',   label: 'Years Experience',      icon: Clock },
  { value: '24/7',  label: 'Processing Uptime',     icon: Globe },
  { value: '100%',  label: 'Data Sovereignty',      icon: Shield },
]

/* ── Global stats ── */
const globalStats = [
  { icon: Users,    value: '500+',  label: 'Australian businesses served' },
  { icon: FileText, value: '2M+',   label: 'Invoices processed annually' },
  { icon: Zap,      value: '80%+',  label: 'Extraction accuracy' },
  { icon: Clock,    value: '20+',   label: 'Years in document management' },
]

/* ── Testimonials ── */
const testimonials = [
  {
    quote: "Symantum completely eliminated our AP data entry backlog. Invoices that used to take two days to process are now in Xero within the hour. The HITL review step means nothing slips through.",
    name: 'Operations Director',
    company: 'Mid-tier construction firm, Melbourne',
    initials: 'OD',
  },
  {
    quote: "The CSA Portal gave our CFO something she never had before — real-time visibility into where capital is flowing across all departments. We found $180K in subscription drift in the first quarter.",
    name: 'Head of Finance',
    company: 'Healthcare group, Sydney',
    initials: 'HF',
  },
  {
    quote: "We've used offshore BPO services before and they always needed hand-holding. Symantum's platform is genuinely autonomous. The AI catches things a human reviewer would miss.",
    name: 'Finance Manager',
    company: 'Education provider, Brisbane',
    initials: 'FM',
  },
]

/* ── Integration logos ── */
const integrations = [
  { name: 'Xero',        color: '#13B5EA' },
  { name: 'MYOB',        color: '#7B2CBF' },
  { name: 'NetSuite',    color: '#009EDB' },
  { name: 'SAP',         color: '#0070C0' },
  { name: 'Oracle',      color: '#F80000' },
  { name: 'QuickBooks',  color: '#2CA01C' },
]

/* ── FAQ ── */
const faqs = [
  {
    q: 'How does Symantum receive invoices?',
    a: 'Suppliers email invoices to a dedicated corporate email alias we provision for your business. Our EIP (Email Ingestion Program) monitors the mailbox 24/7, extracts PDF attachments, and queues them for processing automatically. No portal login required for your suppliers.',
  },
  {
    q: 'What accounting software does Symantum integrate with?',
    a: 'We support direct API push to Xero, MYOB, QuickBooks, NetSuite, SAP and Oracle. For any other system, we provide a clean, formatted CSV export that maps to your chart of accounts.',
  },
  {
    q: 'What happens when the AI is unsure about an invoice?',
    a: 'That is what our Human-in-the-Loop (HITL) review gate is for. Any invoice where our confidence score falls below threshold is automatically routed to our verification specialists. Nothing enters your accounting system without a human sign-off on exceptions.',
  },
  {
    q: 'Is my financial data stored in Australia?',
    a: 'Yes. All data is processed and stored within Australian-hosted cloud infrastructure. We deliberately avoid collecting or storing sensitive banking credentials, reducing your compliance and security exposure to zero.',
  },
  {
    q: 'What is the 30-Day Free Pilot?',
    a: 'We onboard your business to our staging environment, connect your invoice email alias, and run your real invoices through the full pipeline for 30 days — at no cost and with zero risk to your live accounting files. At the end, you get a processing report and can decide whether to continue.',
  },
  {
    q: 'How is Symantum different from just using Dext or HubDoc?',
    a: 'Tools like Dext and HubDoc are receipt-capture apps — they extract data but leave the review and push to you. Symantum is a fully managed BPaaS service: we handle ingestion, dual-pass AI extraction, human validation of exceptions, and the ERP push. You receive clean, verified data. We also include the CSA spending analytics portal, which has no equivalent in the consumer receipt-scanning space.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="text-base font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">{q}</span>
        {open
          ? <ChevronUp size={18} className="text-emerald-500 shrink-0" />
          : <ChevronDown size={18} className="text-slate-400 shrink-0" />
        }
      </button>
      {open && (
        <p className="pb-5 text-sm text-slate-500 leading-relaxed -mt-1">{a}</p>
      )}
    </div>
  )
}

function StarRating({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={12} className={i <= Math.floor(score) ? 'text-amber-400 fill-amber-400' : 'text-slate-300 fill-slate-300'} />
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════ */}
      <section className="hero-bg relative overflow-hidden min-h-screen flex flex-col justify-center pt-24 pb-20 px-6">

        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="max-w-5xl mx-auto text-center relative z-10">

          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-[0.2em]">
              AI-Powered Insights. Human-Verified Accuracy.
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.04] tracking-tight mb-6 animate-fade-up delay-100">
            Flawless Document&nbsp;Workflows.{' '}
            <span className="gradient-text-emerald">Actionable Spend&nbsp;Intelligence.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300/80 font-medium mb-4 animate-fade-up delay-200">
            High-integrity financial data pipelines built for Australian enterprises.
          </p>

          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-up delay-300">
            Symantum delivers automated ledger ingestion and macroeconomic spend analytics that plug seamlessly into your current corporate ecosystem — protecting your accounting files from errors, and unlocking strategic capital insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-400">
            <Link to="/contact" className="btn-primary text-base px-8 py-4">
              Request Free 30-Day Pilot
              <ArrowRight size={17} />
            </Link>
            <Link to="/products" className="btn-ghost-dark text-base px-8 py-4">
              Explore Standalone AP Engine →
            </Link>
          </div>

          <p className="mt-6 text-slate-500 text-xs animate-fade-up delay-500">
            No setup fees · No software to install · Zero risk to your live files
          </p>

          {/* ── Social proof badges ── */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-up delay-500">
            {[
              { label: 'G2',       score: 4.8, count: '120+ reviews' },
              { label: 'Capterra', score: 4.7, count: '85+ reviews'  },
              { label: 'Xero App Store', score: 4.9, count: '60+ reviews' },
            ].map(r => (
              <div key={r.label} className="flex items-center gap-2.5 bg-white/[0.06] border border-white/10 rounded-xl px-4 py-2.5">
                <div>
                  <p className="text-white text-xs font-bold">{r.label}</p>
                  <StarRating score={r.score} />
                </div>
                <div className="text-left">
                  <p className="text-white font-black text-lg leading-none">{r.score}</p>
                  <p className="text-slate-500 text-[10px]">{r.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Floating UI Mockup ── */}
        <div className="relative z-10 max-w-4xl mx-auto mt-16 px-4 animate-fade-up delay-500">
          <div className="bg-[#0D2137] rounded-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.07] bg-white/[0.02]">
              <span className="w-3 h-3 rounded-full bg-red-400/60" />
              <span className="w-3 h-3 rounded-full bg-amber-400/60" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/60" />
              <span className="ml-4 text-xs text-slate-500">Symantum AP Portal — Invoice Review</span>
            </div>
            {/* Mock dashboard content */}
            <div className="p-6 grid grid-cols-3 gap-4">
              {/* Left: invoice list */}
              <div className="col-span-1 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Ingestion Queue</p>
                {[
                  { vendor: 'BuildCo Supplies', amount: '$4,820.00', status: 'validated', color: 'text-emerald-400' },
                  { vendor: 'TechServ Pty Ltd', amount: '$1,350.00', status: 'review',    color: 'text-amber-400' },
                  { vendor: 'Office Direct AU', amount: '$620.50',   status: 'validated', color: 'text-emerald-400' },
                  { vendor: 'Freight Express',  amount: '$2,100.00', status: 'validated', color: 'text-emerald-400' },
                ].map((inv, i) => (
                  <div key={i} className={`flex items-center justify-between rounded-xl px-3 py-2.5 border ${i === 1 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-white/[0.03] border-white/[0.06]'}`}>
                    <div>
                      <p className="text-xs font-semibold text-white">{inv.vendor}</p>
                      <p className="text-[10px] text-slate-500">{inv.amount}</p>
                    </div>
                    <span className={`text-[9px] font-bold uppercase ${inv.color}`}>{inv.status}</span>
                  </div>
                ))}
              </div>
              {/* Center: extracted data */}
              <div className="col-span-1 bg-white/[0.03] rounded-xl border border-white/[0.06] p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Extracted Fields</p>
                {[
                  ['Vendor',    'TechServ Pty Ltd'],
                  ['ABN',       '47 123 456 789'],
                  ['Inv. No.',  'INV-20260312'],
                  ['Date',      '12 Mar 2026'],
                  ['Due',       '11 Apr 2026'],
                  ['Subtotal',  '$1,227.27'],
                  ['GST',       '$122.73'],
                  ['Total',     '$1,350.00'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1 border-b border-white/[0.05] last:border-0">
                    <span className="text-[10px] text-slate-500">{k}</span>
                    <span className="text-[10px] text-slate-200 font-medium">{v}</span>
                  </div>
                ))}
              </div>
              {/* Right: stats */}
              <div className="col-span-1 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Today's Pipeline</p>
                {[
                  { label: 'Ingested',  value: '47', color: 'bg-blue-400' },
                  { label: 'Validated', value: '43', color: 'bg-emerald-400' },
                  { label: 'Pushed',    value: '41', color: 'bg-emerald-500' },
                  { label: 'HITL',      value: '4',  color: 'bg-amber-400' },
                ].map(s => (
                  <div key={s.label} className="bg-white/[0.03] rounded-xl border border-white/[0.06] px-4 py-3 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{s.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${s.color}`} />
                      <span className="text-sm font-bold text-white">{s.value}</span>
                    </div>
                  </div>
                ))}
                <div className="mt-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-center">
                  <p className="text-[10px] text-emerald-400 font-semibold">Auto-pushed to Xero</p>
                  <p className="text-lg font-black text-white mt-0.5">$87,340</p>
                  <p className="text-[9px] text-slate-500">this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats ribbon inside hero */}
        <div className="relative z-10 max-w-4xl mx-auto mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-up delay-500">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <s.icon size={20} className="text-emerald-400 mx-auto mb-2" />
              <div className="text-3xl font-black text-white mb-1">{s.value}</div>
              <div className="text-xs text-slate-400 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-[60px] fill-white">
            <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          SECTION 2 — TWO PRODUCT CARDS
      ══════════════════════════════════════════ */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-eyebrow"><span className="eyebrow-dot" />Our Solutions</span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              One Core Engine. Two Modular Pathways.
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Choose the exact operational layer your business requires.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AP card */}
            <div className="product-card group">
              <div className="mb-2">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                  AP Automation
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                Modular AP Automation
              </h3>
              <p className="text-sm font-semibold text-emerald-600 mb-4">Built for CFOs &amp; IT Controllers</p>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 border-b border-slate-100 pb-8">
                A pure, high-integrity automated data ingestion engine that auto-pushes verified transactions straight into your current systems. Banish manual data entry errors and prevent bad data from ever hitting your active corporate files.
              </p>
              <ul className="space-y-5 mb-10">
                {apFeatures.map(f => (
                  <li key={f.label} className="flex gap-4">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                      <f.icon size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 mb-0.5">{f.label}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors group">
                Explore AP Workflows <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* CSA card */}
            <div className="product-card group bg-[#0A192F]">
              <div className="mb-2">
                <span className="px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                  Spend Intelligence
                </span>
              </div>
              <h3 className="text-2xl font-black text-white mb-1 group-hover:text-emerald-400 transition-colors">
                Symantum CSA Portal
              </h3>
              <p className="text-sm font-semibold text-emerald-400 mb-4">Built for CEOs, Boards, &amp; Owners</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 border-b border-white/10 pb-8">
                An advanced executive financial intelligence interface. Turn daily operational paperwork into long-term strategic actions. Monitor capital velocity, catch hidden cost creep, and optimize regional supply chains automatically.
              </p>
              <ul className="space-y-5 mb-10">
                {csaFeatures.map(f => (
                  <li key={f.label} className="flex gap-4">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <f.icon size={16} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200 mb-0.5">{f.label}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <a href="https://csa-dashboard-omega.vercel.app/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group">
                Explore CSA Intelligence <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          SECTION 3 — AUTOMATION FLOW
      ══════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-eyebrow"><span className="eyebrow-dot" />How It Works</span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              How Symantum Protects<br />Your Corporate Ledger
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              The self-correcting lifecycle of a modern financial pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 items-stretch">
            {steps.map((step, i) => (
              <div key={step.num} className="flex flex-col md:flex-row">
                <div className="flow-card flex flex-col flex-1 relative">
                  <span className="absolute top-6 right-7 text-6xl font-black text-slate-100 select-none leading-none">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center mb-6 shadow-md shadow-emerald-500/25">
                    <step.icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-4">{step.sub}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:flex items-center justify-center px-2 shrink-0">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-8 h-px bg-emerald-300" />
                      <ArrowRight size={16} className="text-emerald-400 -ml-1" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/technology" className="btn-ghost-light">See full technology stack →</Link>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          SECTION 4 — SYMANTUM ADVANTAGE (navy)
      ══════════════════════════════════════════ */}
      <section className="advantage-bg py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-eyebrow-light"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />Why Symantum</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Enterprise Trust. Modern Engineering.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advantages.map(a => (
              <div key={a.title} className="advantage-card group">
                <div className="icon-badge-dark group-hover:bg-emerald-500/25 transition-colors">
                  <a.icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{a.title}</h3>
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4">{a.sub}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>

          {/* Integration logos */}
          <div className="mt-16 pt-12 border-t border-white/10">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-8">
              Integrated with your accounting ecosystem
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {integrations.map(b => (
                <div key={b.name}
                  className="px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors cursor-default"
                >
                  <span className="font-bold text-sm" style={{ color: b.color }}>{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          SECTION 5 — GLOBAL STATS (off-white)
      ══════════════════════════════════════════ */}
      <section className="py-20 px-6" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-10">
            Symantum by the numbers
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {globalStats.map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                  <s.icon size={18} className="text-emerald-600" />
                </div>
                <p className="text-3xl font-black text-slate-900 mb-1">{s.value}</p>
                <p className="text-xs text-slate-500 font-medium leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          SECTION 6 — TESTIMONIALS (white)
      ══════════════════════════════════════════ */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-eyebrow"><span className="eyebrow-dot" />Client Results</span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              What our clients say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 p-8 flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          SECTION 7 — FAQ (off-white)
      ══════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-eyebrow"><span className="eyebrow-dot" />FAQs</span>
            <h2 className="text-4xl font-black text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-8 divide-y divide-slate-100">
            {faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          SECTION 8 — BOTTOM CTA (white)
      ══════════════════════════════════════════ */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-eyebrow"><span className="eyebrow-dot" />Get Started Today</span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Ready to Automate<br />Your Ledger Operations?
          </h2>
          <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Connect your invoice flow to our staging pipeline for 30 days. No setup fees, no software to install, and zero risk to your live files.
          </p>
          <Link to="/contact" className="btn-primary text-base px-10 py-4 mx-auto">
            Claim Your Free 30-Day Audit <ArrowRight size={17} />
          </Link>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            {['No credit card required', 'Australian data sovereignty', 'Dedicated onboarding support'].map(item => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
