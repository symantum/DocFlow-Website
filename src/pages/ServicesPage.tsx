import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'

const tiers = [
  {
    id: 'digital-shoebox', tier: 'Tier 1', name: 'Digital Shoebox', subtitle: '"The Tax Helper"',
    target: 'Individuals & Sole Traders',
    targetDesc: 'Freelancers, contractors and individuals who hate administrative paperwork.',
    accent: 'text-blue-400', border: 'border-blue-400/20', glow: 'bg-blue-400/[0.04]',
    services: [
      { label: 'GET — Automated Receipt Ingestion', desc: 'A secure dedicated email address. Forward all e-receipts and snap photos of physical receipts — we handle the rest.' },
      { label: 'EVA — Tax-Ready Categorisation', desc: 'AI extracts merchant, date and amount, then auto-tags with standard tax categories (Office Supplies, Travel, etc.).' },
      { label: 'CPB — Personal Finance Dashboard', desc: 'Simple web portal showing monthly spend summaries, large outflow alerts, and running total of estimated tax-deductible expenses.' },
      { label: 'PUSH — End-of-Year Tax Export', desc: 'One-click download of a perfectly formatted CSV, or secure API push to personal tax software — ready to hand to your accountant.' },
    ],
    value: 'Complete peace of mind and tax maximisation. Converts messy personal administration into zero-effort tracking. Ensures no tax deductions are missed while keeping accountants happy with pristine, pre-categorised data.',
  },
  {
    id: 'virtual-controller', tier: 'Tier 2', name: 'Virtual Controller', subtitle: '"The Autonomous Office Manager"',
    target: 'Small & Medium Enterprises', highlight: true,
    targetDesc: 'Clinics, retail chains and trade businesses needing to eliminate bookkeeping overhead.',
    accent: 'text-cyan-400', border: 'border-cyan-400/20', glow: 'bg-cyan-400/[0.04]',
    services: [
      { label: 'GET — 100% AP Outsourcing', desc: 'Suppliers email invoices directly to Symantum. We act as the universal mailroom, accepting any PDF format.' },
      { label: 'EVA — Data Cleansing & Fraud Shield', desc: 'We extract all header data, verify BSB/Account numbers exist, and automatically flag duplicated invoice numbers — blocking double payments.' },
      { label: 'CPB — SME Budget Radar', desc: 'Dashboard showing exact 30-day and 60-day cash outflow requirements based on verified invoice due dates.' },
      { label: 'PUSH — Pre-Coded Accounting Push', desc: 'Validated data pushed securely to Xero or MYOB via API. Invoices appear as "Draft Bills" in your system, ready to pay.' },
    ],
    value: 'Completely removes the need for a human to do data entry. The CEO gets real-time visibility into what cash needs to leave the business this week, with zero duplicate payment errors.',
  },
  {
    id: 'procurement-analytics', tier: 'Tier 3', name: 'Procurement Analytics', subtitle: '"The Procurement Intelligence Suite"',
    target: 'Corporates',
    targetDesc: 'Mid-market manufacturers, logistics firms and construction companies with heavy supply chains.',
    accent: 'text-violet-400', border: 'border-violet-400/20', glow: 'bg-violet-400/[0.04]',
    services: [
      { label: 'GET — Line-Item Heavy Ingestion', desc: 'Processing 50+ page supply chain invoices with thousands of complex line items — SKUs, units, currency variations.' },
      { label: 'EVA — AI Price Normalisation', desc: "AI cleans and maps wildly different vendor SKUs to identical internal categories. Vendor A's \"Wood 4x4\" and Vendor B's \"Timber beam\" map to the same category automatically." },
      { label: 'CPB — Price Arbitrage Dashboard', desc: 'Portal specifically for Procurement Managers showing where you are paying different prices to different vendors for the exact same raw materials.' },
      { label: 'PUSH — ERP Batch Feed', desc: 'Pristine, validated batch JSON datasets pushed via webhooks directly to NetSuite, Sage or Dynamics 365 API endpoints.' },
    ],
    value: 'Transforms locked PDF data into active intelligence. Equips procurement teams with exact line-item historical data needed to negotiate volume discounts and consolidate bloated vendor lists.',
  },
  {
    id: 'executive-edge', tier: 'Tier 4', name: 'Executive Edge Gateway', subtitle: '"The Autonomous Finance AI"',
    target: 'Enterprise',
    targetDesc: 'Multinationals held back by legacy technology and rigid, bloated ERP systems.',
    accent: 'text-amber-400', border: 'border-amber-400/20', glow: 'bg-amber-400/[0.04]',
    services: [
      { label: 'GET — Global AP Standardisation Layer', desc: 'We intercept multi-language, multi-currency invoices globally before they hit the Enterprise ERP, acting as a standardisation firewall.' },
      { label: 'EVA — LLM Anomaly Detection', desc: 'AI flags macroeconomic risks, contract compliance breaches, and price gouging by tracking global supply trends against extracted AP volume.' },
      { label: 'CPB — Executive "Chat With Data" Portal', desc: 'Instead of requesting custom SAP reports from IT, the CFO types: "Give me total IT hardware spend across Asian departments" — and gets the chart instantly.' },
      { label: 'PUSH — Monolithic System Feeds', desc: 'Secure SFTP drops or massive API payload pushes into SAP / Oracle. Perfect formatted data without millions in ERP customisation fees.' },
    ],
    value: 'Enterprise ERPs are notoriously inflexible. Symantum acts as the agile, intelligent layer on top. The CFO gets answers in seconds via the portal without needing to submit an IT ticket for a custom SAP report.',
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">Service Tiers</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Solutions for every scale
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            The same intelligent GET → EVA → PUSH pipeline — packaged for your complexity, your industry, and your systems.
          </p>
        </div>

        {/* Tier cards */}
        <div className="space-y-8">
          {tiers.map(t => (
            <div key={t.id} id={t.id} className={`glass-card border ${t.border} overflow-hidden`}>
              {/* Header */}
              <div className={`${t.glow} border-b ${t.border} px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-xs font-bold uppercase tracking-widest ${t.accent}`}>{t.tier}</span>
                    {t.highlight && (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-full">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {t.name} <span className="text-slate-500 font-normal text-lg">{t.subtitle}</span>
                  </h2>
                  <p className={`text-sm font-medium mt-0.5 ${t.accent}`}>{t.target}</p>
                </div>
                <p className="text-sm text-slate-400 max-w-xs">{t.targetDesc}</p>
              </div>

              {/* Services grid */}
              <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.services.map(s => (
                  <div key={s.label} className="flex gap-3">
                    <Check size={16} className={`${t.accent} mt-0.5 shrink-0`} />
                    <div>
                      <p className="text-sm font-semibold text-slate-200 mb-1">{s.label}</p>
                      <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Value */}
              <div className={`mx-8 mb-6 p-4 rounded-xl ${t.glow} border ${t.border}`}>
                <p className={`text-xs font-bold uppercase tracking-widest ${t.accent} mb-1`}>Client Value</p>
                <p className="text-sm text-slate-300 leading-relaxed">{t.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-6">Not sure which tier fits your business?</p>
          <Link to="/contact" className="btn-primary">
            Talk to our team <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
