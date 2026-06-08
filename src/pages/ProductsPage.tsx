import { ArrowRight, Mail, ScanLine, Brain, UserCheck, Send, BarChart3, TrendingUp, AlertTriangle, FileSpreadsheet, RefreshCw } from 'lucide-react'

const apFeatures = [
  { icon: Mail,        title: 'Email Invoice Intake',        desc: 'EIP monitors your dedicated mailbox 24/7. Any format — PDF, scanned image, digital invoice — is accepted and queued automatically.' },
  { icon: ScanLine,    title: 'OCR Extraction Engine',       desc: 'Custom-trained OCR (v3.6.4) extracts vendor name, invoice number, date, ABN, amounts, GST, payment terms and line items.' },
  { icon: Brain,       title: 'Gemini AI Validation',        desc: 'Google Gemini Flash validates extracted fields for logical consistency, flags anomalies, and cross-checks totals against line items.' },
  { icon: UserCheck,   title: 'Human-in-the-Loop Review',    desc: 'Your team reviews AI results in a clean HITL interface — approve, correct, or reject. Every decision is audited.' },
  { icon: Send,        title: 'Accounting System Push',      desc: 'Approved invoices are pushed via API to Xero, MYOB, NetSuite, Dynamics 365 or SAP — or exported as tax-ready CSV.' },
  { icon: BarChart3,   title: 'PM Dashboard & EIP Control',  desc: 'Admin dashboard for managing users, clients, triggering the EIP pipeline, monitoring ingestion status and reading stage logs.' },
]

const csaFeatures = [
  { icon: TrendingUp,     title: 'Spend Analytics',         desc: 'Visual dashboards showing spend by vendor, category and time period. Drill into any segment to see the underlying invoices.' },
  { icon: BarChart3,      title: 'Budget Radar',            desc: '30/60/90-day cash outflow forecasts based on verified invoice due dates. Department-level budget tracking and variance alerts.' },
  { icon: AlertTriangle,  title: 'Anomaly Detection',       desc: 'AI-powered flagging of duplicate invoices, price spikes, unusual vendors and policy breaches before they become problems.' },
  { icon: RefreshCw,      title: 'Xero Integration',        desc: 'Bi-directional sync with Xero — approved invoices appear as Draft Bills, and payment status flows back into the dashboard.' },
  { icon: FileSpreadsheet, title: 'Reports & Export',       desc: 'Generate period-over-period spending reports, vendor consolidation summaries and tax-ready exports in one click.' },
  { icon: Brain,          title: 'CFO "Chat With Data"',    desc: 'LLM-powered semantic search lets executives query their data in plain English: "Show me Q2 travel spend by department."' },
]

export default function ProductsPage() {
  return (
    <div className="pt-28 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="section-label mb-3">Live Products</p>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Two portals. One pipeline.
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            AP Portal handles ingestion, extraction and validation. CSA Portal delivers the spending intelligence. Together they form a complete finance automation system.
          </p>
        </div>

        {/* ── AP Portal ── */}
        <section className="mb-20" id="ap-portal">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-[#0A192F] border-b border-white/10 px-8 py-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-black text-base">AP</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">AP Portal</h2>
                      <p className="text-xs text-emerald-400 font-semibold uppercase tracking-widest">Accounts Payable Automation</p>
                    </div>
                  </div>
                  <p className="text-slate-300 max-w-xl leading-relaxed">
                    End-to-end invoice processing platform. From the moment a supplier hits send to the moment your accounting system is updated — fully automated with human validation at every critical step.
                  </p>
                </div>
                <a
                  href="https://frontend-apportal.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 btn-primary"
                >
                  Open Live Demo <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Pipeline flow */}
            <div className="px-8 py-6 bg-slate-50 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                {['Email Intake', 'OCR Extraction', 'AI Validation', 'HITL Review', 'AP Push'].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
                      {step}
                    </span>
                    {i < 4 && <ArrowRight size={12} className="text-slate-300" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Features grid */}
            <div className="px-8 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apFeatures.map(f => (
                <div key={f.title} className="flex gap-4">
                  <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                    <f.icon size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 mb-1">{f.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Demo credentials */}
            <div className="mx-8 mb-8 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Demo Access</p>
              <p className="text-sm text-slate-700">
                Username: <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">admin_test</code>
                &nbsp;·&nbsp;
                Password: <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">password123</code>
              </p>
            </div>
          </div>
        </section>

        {/* ── CSA Portal ── */}
        <section id="csa-portal">
          <div className="bg-[#0A192F] border border-white/10 rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="border-b border-white/10 px-8 py-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-black text-base">CS</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">CSA Portal</h2>
                      <p className="text-xs text-emerald-400 font-semibold uppercase tracking-widest">Customer Spending Analysis</p>
                    </div>
                  </div>
                  <p className="text-slate-300 max-w-xl leading-relaxed">
                    Intelligence layer on top of your AP data. Multi-tenant analytics dashboard giving finance teams and executives the real-time spending visibility they need — without touching the ERP.
                  </p>
                </div>
                <a
                  href="https://csa-dashboard-omega.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 btn-primary"
                >
                  Open Live Demo <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Features grid */}
            <div className="px-8 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {csaFeatures.map(f => (
                <div key={f.title} className="flex gap-4">
                  <div className="w-9 h-9 bg-emerald-500/15 rounded-lg flex items-center justify-center shrink-0">
                    <f.icon size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200 mb-1">{f.title}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Demo credentials */}
            <div className="mx-8 mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Demo Access</p>
              <p className="text-sm text-slate-300">
                Username: <code className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">admin</code>
                &nbsp;·&nbsp;
                Password: <code className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">admin</code>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
