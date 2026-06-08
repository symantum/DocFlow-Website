import { Link } from 'react-router-dom'
import {
  ArrowRight, CheckCircle2, Mail, Cpu, Send,
  Clock, Shield, Globe, TrendingDown,
  BarChart3, AlertCircle, ScanLine, Activity,
  Layers, Lock
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
    num: '01',
    icon: Mail,
    title: 'Secure Ingestion',
    sub: 'Automatic Document Capture',
    desc: 'Forward your supplier invoices to your dedicated Symantum email alias. Our system ingests digital PDFs and renders incoming hyperlinks instantly via headless browser networks.',
  },
  {
    num: '02',
    icon: Cpu,
    title: 'Dual-Pass Validation',
    sub: 'Deterministic Code + Flagship AI',
    desc: 'Our 80%+ accurate rule engine maps 20 database fields, while Gemini runs a second semantic pass to audit line-item text for hidden surcharge fees or formatting errors.',
  },
  {
    num: '03',
    icon: Send,
    title: 'Verified Auto-Push',
    sub: 'Human-in-the-Loop Gateway',
    desc: 'Any discrepancies automatically route to our verification experts. Once confirmed, a clean payload auto-pushes straight into your Xero, MYOB, or compatible ERP system.',
  },
]

/* ── Section 4 data ── */
const advantages = [
  {
    icon: Clock,
    title: '20+ Year History',
    sub: 'Australian Corporate Stability',
    desc: 'Operating securely in Australia for over two decades. We leverage a deeply trusted operational history in document management and file security to protect your enterprise workflows.',
  },
  {
    icon: Cpu,
    title: 'The Managed Outcome',
    sub: 'The Power of AI + HI',
    desc: 'We do not just sell unverified software tools. Our automated scripts handle the high-volume processing heavy lifting, while our dedicated system validation specialists guarantee absolute accuracy.',
  },
  {
    icon: Lock,
    title: 'Bulletproof Governance',
    sub: 'Sovereignty & Control Built-In',
    desc: 'Your financial records live safely within secure, compliant Australian-hosted cloud frameworks. We intentionally avoid sensitive banking detail collection, reducing your security risk to zero.',
  },
]

/* ── Stats ── */
const stats = [
  { value: '70%+', label: 'Cost Reduction',    icon: TrendingDown },
  { value: '20+',  label: 'Years Experience',  icon: Clock },
  { value: '24/7', label: 'Processing Uptime', icon: Globe },
  { value: '100%', label: 'Data Sovereignty',  icon: Shield },
]

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
          Deep navy #0A192F, white text, emerald CTA
      ══════════════════════════════════════════ */}
      <section className="hero-bg relative overflow-hidden min-h-screen flex flex-col justify-center pt-24 pb-32 px-6">

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
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

          {/* H1 */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.04] tracking-tight mb-6 animate-fade-up delay-100">
            Flawless Document&nbsp;Workflows.{' '}
            <span className="gradient-text-emerald">Actionable Spend&nbsp;Intelligence.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-300/80 font-medium mb-4 animate-fade-up delay-200">
            High-integrity financial data pipelines built for Australian enterprises.
          </p>

          {/* Body */}
          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-up delay-300">
            Symantum delivers automated ledger ingestion and macroeconomic spend analytics that plug seamlessly into your current corporate ecosystem. We handle the end-to-end processing lifecycle, protect your accounting files from errors, and unlock strategic capital insights — allowing your executive team to focus entirely on growth.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-400">
            <Link to="/contact" className="btn-primary text-base px-8 py-4">
              Request Free 30-Day Pilot
              <ArrowRight size={17} />
            </Link>
            <Link to="/products" className="btn-ghost-dark text-base px-8 py-4">
              Explore Standalone AP Engine →
            </Link>
          </div>

          {/* Trust micro-line */}
          <p className="mt-8 text-slate-500 text-xs animate-fade-up delay-500">
            No setup fees · No software to install · Zero risk to your live files
          </p>
        </div>

        {/* Stats ribbon inside hero */}
        <div className="relative z-10 max-w-4xl mx-auto mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-up delay-500">
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
          White bg, 2-col grid, thin grey dividers
      ══════════════════════════════════════════ */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-16">
            <span className="section-eyebrow">
              <span className="eyebrow-dot" />
              Our Solutions
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              One Core Engine. Two Modular Pathways.
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Choose the exact operational layer your business requires.
            </p>
          </div>

          {/* 2-col product grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── Left card: AP Workflows Engine ── */}
            <div className="product-card group">
              <div className="flex items-center gap-3 mb-2">
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

              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors group"
              >
                Explore AP Workflows
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* ── Right card: CSA Portal ── */}
            <div className="product-card group bg-[#0A192F]">
              <div className="flex items-center gap-3 mb-2">
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

              <a
                href="https://csa-dashboard-omega.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group"
              >
                Explore CSA Intelligence
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          SECTION 3 — AUTOMATION FLOW
          Off-white #F5F7FA bg, 3-step horizontal
      ══════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <span className="section-eyebrow">
              <span className="eyebrow-dot" />
              How It Works
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              How Symantum Protects<br />Your Corporate Ledger
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              The self-correcting lifecycle of a modern financial pipeline.
            </p>
          </div>

          {/* 3-step row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 items-stretch">
            {steps.map((step, i) => (
              <div key={step.num} className="flex flex-col md:flex-row">

                <div className="flow-card flex flex-col flex-1 relative">
                  {/* Step number watermark */}
                  <span className="absolute top-6 right-7 text-6xl font-black text-slate-100 select-none leading-none">
                    {step.num}
                  </span>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center mb-6 shadow-md shadow-emerald-500/25">
                    <step.icon size={22} className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-4">{step.sub}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>

                {/* Connector arrow between cards */}
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
            <Link to="/technology" className="btn-ghost-light">
              See full technology stack →
            </Link>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          SECTION 4 — SYMANTUM ADVANTAGE
          Dark navy #0A192F, white text, 3-col
      ══════════════════════════════════════════ */}
      <section className="advantage-bg py-28 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <span className="section-eyebrow-light">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Why Symantum
            </span>
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

          {/* Logos / trust strip */}
          <div className="mt-16 pt-12 border-t border-white/10">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-8">
              Integrated with your accounting ecosystem
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {['Xero', 'MYOB', 'NetSuite', 'SAP', 'Oracle', 'QuickBooks'].map(brand => (
                <span
                  key={brand}
                  className="text-slate-400 font-bold text-lg opacity-50 hover:opacity-80 transition-opacity"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          SECTION 5 — BOTTOM CTA
          White canvas, centred single column
      ══════════════════════════════════════════ */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">

          <span className="section-eyebrow">
            <span className="eyebrow-dot" />
            Get Started Today
          </span>

          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Ready to Automate<br />Your Ledger Operations?
          </h2>

          <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Connect your invoice flow to our staging pipeline for 30 days. No setup fees, no software to install, and zero risk to your live files.
          </p>

          <Link to="/contact" className="btn-primary text-base px-10 py-4 mx-auto">
            Claim Your Free 30-Day Audit
            <ArrowRight size={17} />
          </Link>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" />
              Australian data sovereignty
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" />
              Dedicated onboarding support
            </span>
          </div>
        </div>
      </section>

    </div>
  )
}
