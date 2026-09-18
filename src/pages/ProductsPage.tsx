import { ArrowRight, Mail, ScanLine, Brain, UserCheck, Send, BarChart3, TrendingUp, AlertTriangle, FileSpreadsheet, RefreshCw } from 'lucide-react'

const apFeatures = [
  { icon: Mail,         title: 'Email Invoice Intake',       desc: 'EIP monitors your dedicated mailbox 24/7. Any format — PDF, scanned image, digital invoice — is accepted and queued automatically.' },
  { icon: ScanLine,     title: 'OCR Extraction Engine',      desc: 'Custom-trained OCR extracts vendor name, invoice number, date, ABN, amounts, GST, payment terms and line items.' },
  { icon: Brain,        title: 'Gemini AI Validation',       desc: 'Google Gemini validates extracted fields for logical consistency, flags anomalies, and cross-checks totals against line items.' },
  { icon: UserCheck,    title: 'Human-in-the-Loop Review',   desc: 'Your team reviews AI results in a clean HITL interface — approve, correct, or reject. Every decision is audited.' },
  { icon: Send,         title: 'Accounting System Push',     desc: 'Approved invoices are pushed via API to Xero, MYOB, NetSuite, Dynamics 365 or SAP — or exported as tax-ready CSV.' },
  { icon: BarChart3,    title: 'PM Dashboard & Control',     desc: 'Admin dashboard for managing users, clients, triggering the EIP pipeline, monitoring ingestion status and reading stage logs.' },
]

const csaFeatures = [
  { icon: TrendingUp,      title: 'Spend Analytics',       desc: 'Visual dashboards showing spend by vendor, category and time period. Drill into any segment to see the underlying invoices.' },
  { icon: BarChart3,       title: 'Budget Radar',           desc: '30/60/90-day cash outflow forecasts based on verified invoice due dates. Department-level budget tracking and variance alerts.' },
  { icon: AlertTriangle,   title: 'Anomaly Detection',      desc: 'AI-powered flagging of duplicate invoices, price spikes, unusual vendors and policy breaches before they become problems.' },
  { icon: RefreshCw,       title: 'Xero Integration',       desc: 'Bi-directional sync with Xero — approved invoices appear as Draft Bills, and payment status flows back into the dashboard.' },
  { icon: FileSpreadsheet, title: 'Reports & Export',       desc: 'Generate period-over-period spending reports, vendor consolidation summaries and tax-ready exports in one click.' },
  { icon: Brain,           title: 'CFO "Chat With Data"',   desc: 'LLM-powered semantic search lets executives query their data in plain English: "Show me Q2 travel spend by department."' },
]

export default function ProductsPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="pt-32 pb-20 px-6 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="section-eyebrow mb-6 inline-flex">
            <span className="eyebrow-dot" />
            Live Products
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            Two portals. One pipeline
          </h1>
          <p className="text-base sm:text-lg text-slate-500 font-normal leading-relaxed max-w-xl mx-auto mb-10">
            AP Portal handles ingestion, extraction, and validation. CSA Portal delivers the spending intelligence.
          </p>
        </div>
      </section>

      {/* AP Portal */}
      <section className="py-24 px-6 bg-slate-50 border-b border-slate-200" id="ap-portal">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            
            <div className="border-b border-slate-200 px-8 py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-white font-black text-lg">AP</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">AP Portal</h2>
                    <p className="text-sm text-sky-600 font-bold uppercase tracking-widest">Accounts Payable Automation</p>
                  </div>
                </div>
                <p className="text-slate-600 max-w-2xl leading-relaxed">
                  End-to-end invoice processing platform. From the moment a supplier hits send to the moment your accounting system is updated — fully automated with human validation at every critical step.
                </p>
              </div>
              <a href="https://ap.symantum.com/" target="_blank" rel="noopener noreferrer" className="shrink-0 btn-primary px-8 py-4 inline-flex items-center gap-2">
                Open Live Demo <ArrowRight size={16} />
              </a>
            </div>

            {/* Pipeline strip */}
            <div className="px-8 py-6 bg-slate-50 border-b border-slate-200">
              <div className="flex flex-wrap items-center gap-2">
                {['Email Intake', 'OCR Extraction', 'AI Validation', 'HITL Review', 'AP Push'].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold">{step}</span>
                    {i < 4 && <ArrowRight size={14} className="text-slate-400" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {apFeatures.map(f => (
                <div key={f.title} className="flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center shrink-0">
                      <f.icon size={18} className="text-sky-600" />
                    </div>
                    <p className="text-base font-bold text-slate-900">{f.title}</p>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="mx-8 mb-8 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-4 text-sm">
              <span className="font-bold text-slate-600 uppercase tracking-widest text-xs">Demo Access</span>
              <div className="text-slate-600">
                Username: <code className="text-sky-700 bg-white border border-slate-200 px-2 py-1 rounded mx-1 font-bold">admin_test</code>
                Password: <code className="text-sky-700 bg-white border border-slate-200 px-2 py-1 rounded mx-1 font-bold">password123</code>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CSA Portal */}
      <section className="py-24 px-6 bg-white" id="csa-portal">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            
            <div className="border-b border-slate-200 px-8 py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-white font-black text-lg">CS</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">CSA Portal</h2>
                    <p className="text-sm text-emerald-600 font-bold uppercase tracking-widest">Customer Spending Analysis</p>
                  </div>
                </div>
                <p className="text-slate-600 max-w-2xl leading-relaxed">
                  Intelligence layer on top of your AP data. Multi-tenant analytics dashboard giving finance teams and executives the real-time spending visibility they need — without touching the ERP.
                </p>
              </div>
              <a href="https://csa.symantum.com/" target="_blank" rel="noopener noreferrer" className="shrink-0 btn-primary bg-emerald-600 hover:bg-emerald-700 px-8 py-4 inline-flex items-center gap-2">
                Open Live Demo <ArrowRight size={16} />
              </a>
            </div>

            <div className="px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {csaFeatures.map(f => (
                <div key={f.title} className="flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                      <f.icon size={18} className="text-emerald-600" />
                    </div>
                    <p className="text-base font-bold text-slate-900">{f.title}</p>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="mx-8 mb-8 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-4 text-sm">
              <span className="font-bold text-slate-600 uppercase tracking-widest text-xs">Demo Access</span>
              <div className="text-slate-600">
                Username: <code className="text-emerald-700 bg-white border border-slate-200 px-2 py-1 rounded mx-1 font-bold">admin</code>
                Password: <code className="text-emerald-700 bg-white border border-slate-200 px-2 py-1 rounded mx-1 font-bold">admin</code>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
