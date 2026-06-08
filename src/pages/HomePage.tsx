import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Cpu, Send, Shield, Clock, Globe, TrendingDown, Zap } from 'lucide-react'

const pipeline = [
  {
    icon: Mail,
    step: '01',
    label: 'GET',
    title: 'Email Invoice Intake',
    desc: 'Suppliers email invoices directly to your dedicated Symantum address. Any format, any volume, 24/7.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
  },
  {
    icon: Cpu,
    step: '02',
    label: 'EVA',
    title: 'AI Extraction & Validation',
    desc: 'OCR engine extracts every field. Gemini AI validates. Your team reviews in the AP Portal — human-in-the-loop precision.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
  },
  {
    icon: Send,
    step: '03',
    label: 'PUSH',
    title: 'Accounting System Push',
    desc: 'Validated data pushed directly into Xero, MYOB, NetSuite, SAP — or exported as tax-ready CSV.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
  },
]

const tiers = [
  {
    name: 'Digital Shoebox',
    target: 'Individuals & Sole Traders',
    tagline: 'Zero-effort tax tracking',
    features: ['Automated receipt ingestion', 'Tax category tagging', 'End-of-year CSV export'],
    color: 'from-blue-600/20 to-blue-900/10',
    accent: 'text-blue-400',
  },
  {
    name: 'Virtual Controller',
    target: 'Small & Medium Enterprises',
    tagline: 'Autonomous accounts payable',
    features: ['100% AP outsourcing', 'Duplicate invoice shield', 'Xero / MYOB push'],
    color: 'from-cyan-600/20 to-cyan-900/10',
    accent: 'text-cyan-400',
    highlight: true,
  },
  {
    name: 'Procurement Analytics',
    target: 'Corporates',
    tagline: 'Supply chain intelligence',
    features: ['Deep line-item extraction', 'Vendor price arbitrage', 'ERP webhook feeds'],
    color: 'from-violet-600/20 to-violet-900/10',
    accent: 'text-violet-400',
  },
  {
    name: 'Executive Edge Gateway',
    target: 'Enterprise',
    tagline: 'AI-powered finance layer',
    features: ['Multi-language / multi-currency', 'CFO "chat with data" portal', 'SAP / Oracle integration'],
    color: 'from-amber-600/20 to-amber-900/10',
    accent: 'text-amber-400',
  },
]

const stats = [
  { icon: TrendingDown, value: '70%+', label: 'Cost Reduction' },
  { icon: Clock,        value: '20+',  label: 'Years Experience' },
  { icon: Globe,        value: '24/7', label: 'Global Support' },
  { icon: Zap,          value: 'AI',   label: 'Powered Extraction' },
  { icon: Shield,       value: '100%', label: 'Data Security' },
]

const industries = ['Financial Services', 'Government', 'Education', 'Healthcare', 'Retail', 'Construction']

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-32 px-6">
        {/* Background glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-8 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Now live — AP Portal & CSA Portal
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            From Document<br />
            Processing to{' '}
            <span className="gradient-text">Intelligent<br />Finance Automation</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Symantum's AI-powered BPaaS platform ingests invoices from email, extracts every field with human-validated precision, and pushes clean data straight into your accounting system.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://frontend-apportal.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-xl shadow-blue-900/30 hover:shadow-blue-900/50"
            >
              See AP Portal Live <ArrowRight size={16} />
            </a>
            <a
              href="https://csa-dashboard-omega.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] text-white font-semibold transition-all"
            >
              See Spending Analytics <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
          {stats.map(s => (
            <div key={s.label} className="flex flex-col items-center gap-1.5">
              <s.icon size={18} className="text-blue-400" />
              <span className="text-2xl font-black text-white">{s.value}</span>
              <span className="text-xs text-slate-500 font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── GET → EVA → PUSH Pipeline ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Three steps from inbox to ERP
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector lines (desktop) */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-px bg-gradient-to-r from-blue-400/30 via-cyan-400/30 to-emerald-400/30 -translate-y-1/2 pointer-events-none" />

            {pipeline.map((p, i) => (
              <div key={p.label} className={`glass-card p-7 border ${p.border} relative`}>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-11 h-11 rounded-xl ${p.bg} flex items-center justify-center`}>
                    <p.icon size={20} className={p.color} />
                  </div>
                  <span className={`text-4xl font-black ${p.color} opacity-20`}>{p.step}</span>
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest ${p.color} mb-2 block`}>{p.label}</span>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                {i < 2 && (
                  <div className="md:hidden flex justify-center mt-5">
                    <ArrowRight size={20} className="text-slate-600 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/technology" className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
              See full technology stack →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Service Tiers ── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Service Tiers</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Solutions for every scale
            </h2>
            <p className="text-slate-400 mt-3 max-w-xl mx-auto text-sm">
              From solo freelancers to multinational enterprises — the same intelligent pipeline, tailored to your complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tiers.map(t => (
              <div
                key={t.name}
                className={`glass-card p-6 bg-gradient-to-b ${t.color} ${t.highlight ? 'ring-1 ring-cyan-400/30' : ''} flex flex-col`}
              >
                {t.highlight && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full w-fit mb-3">
                    Most Popular
                  </span>
                )}
                <p className={`text-xs font-semibold ${t.accent} mb-1`}>{t.target}</p>
                <h3 className="text-lg font-bold text-white mb-1">{t.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{t.tagline}</p>
                <ul className="space-y-2 mt-auto">
                  {t.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className={`mt-0.5 w-1.5 h-1.5 rounded-full ${t.accent.replace('text-', 'bg-')} shrink-0`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] text-white text-sm font-semibold transition-all"
            >
              View full service details <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="py-16 px-6 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="section-label mb-6">Trusted Across Industries</p>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map(ind => (
              <span key={ind} className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-slate-400">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto glass-card p-12 text-center bg-gradient-to-b from-blue-900/20 to-transparent border-blue-500/20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to automate your AP workflow?
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            See the live portals in action or get in touch to discuss a solution tailored to your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://frontend-apportal.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-xl shadow-blue-900/30"
            >
              Try AP Portal <ArrowRight size={16} />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] text-white font-semibold transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
