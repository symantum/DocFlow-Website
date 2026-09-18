import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'

const tiers = [
  {
    id: 'digital-shoebox', tier: 'Tier 1', name: 'Digital Shoebox', subtitle: '"The Tax Helper"',
    target: 'Individuals & Sole Traders',
    targetDesc: 'Freelancers, contractors and individuals who hate administrative paperwork.',
    services: [
      { label: 'Automated Receipt Ingestion', desc: 'Forward e-receipts or snap physical receipts to your dedicated email — we handle the rest.' },
      { label: 'Tax-Ready Categorisation', desc: 'AI extracts merchant, date and amount, then auto-tags each transaction with standard tax categories.' },
      { label: 'Personal Finance Dashboard', desc: 'Web portal showing monthly spend summaries, large outflow alerts, and estimated tax-deductible expenses.' },
      { label: 'End-of-Year Tax Export', desc: 'One-click CSV download or secure API push directly into personal tax software.' },
    ],
    value: 'Converts messy personal administration into zero-effort tracking. Ensures no tax deductions are missed while keeping accountants happy with pristine data.',
  },
  {
    id: 'virtual-controller', tier: 'Tier 2', name: 'Virtual Controller', subtitle: '"The Autonomous Office Manager"',
    target: 'Small & Medium Enterprises', highlight: true,
    targetDesc: 'Clinics, retail chains and trade businesses needing to eliminate bookkeeping overhead.',
    services: [
      { label: '100% AP Outsourcing', desc: 'Suppliers email invoices directly to Symantum — we act as the universal mailroom, accepting any PDF format.' },
      { label: 'Data Cleansing & Fraud Shield', desc: 'We verify BSB numbers and flag duplicate invoice numbers to block double payments before they happen.' },
      { label: 'SME Budget Radar', desc: 'Dashboard showing 30-day and 60-day cash outflow requirements based on verified invoice due dates.' },
      { label: 'Pre-Coded Accounting Push', desc: 'Validated data is pushed to Xero or MYOB via API — invoices appear instantly as Draft Bills.' },
    ],
    value: 'Completely removes the need for data entry. The CEO gets real-time visibility into cash outflows with zero duplicate payment errors.',
  },
  {
    id: 'procurement-analytics', tier: 'Tier 3', name: 'Procurement Analytics', subtitle: '"The Procurement Intelligence Suite"',
    target: 'Corporates',
    targetDesc: 'Mid-market manufacturers, logistics firms and construction companies with heavy supply chains.',
    services: [
      { label: 'Line-Item Heavy Ingestion', desc: '50+ page supply chain invoices with thousands of line items are processed without manual intervention.' },
      { label: 'AI Price Normalisation', desc: 'AI maps wildly different vendor SKUs to identical internal categories automatically.' },
      { label: 'Price Arbitrage Dashboard', desc: 'See exactly where you pay different prices to different vendors for the same materials.' },
      { label: 'ERP Batch Feed', desc: 'Validated JSON datasets are pushed via webhooks directly to NetSuite, Sage, or Dynamics 365.' },
    ],
    value: 'Transforms locked PDF data into active intelligence. Equips procurement teams with exact line-item historical data needed to negotiate volume discounts.',
  },
  {
    id: 'executive-edge', tier: 'Tier 4', name: 'Executive Edge Gateway', subtitle: '"The Autonomous Finance AI"',
    target: 'Enterprise',
    targetDesc: 'Multinationals held back by legacy technology and rigid, bloated ERP systems.',
    services: [
      { label: 'Global AP Standardisation Layer', desc: 'Multi-language, multi-currency invoices are intercepted and normalised before hitting your enterprise ERP.' },
      { label: 'LLM Anomaly Detection', desc: 'AI flags contract compliance breaches, price gouging, and macroeconomic supply-chain risks automatically.' },
      { label: 'Executive "Chat With Data"', desc: 'The CFO queries the data in plain English — no custom SAP report requests to IT required.' },
      { label: 'Monolithic System Feeds', desc: 'Secure SFTP drops or API payload pushes into SAP / Oracle without per-connector customisation fees.' },
    ],
    value: 'Symantum acts as the agile, intelligent layer on top of inflexible enterprise ERPs. The CFO gets answers in seconds via the portal.',
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="pt-32 pb-20 px-6 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="section-eyebrow mb-6 inline-flex">
            <span className="eyebrow-dot" />
            Service Tiers
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            Solutions for every scale
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-sky-600 mb-6">
            Configured for your complexity, industry, and systems
          </p>
          <p className="text-base text-slate-500 font-normal leading-relaxed max-w-xl mx-auto mb-10">
            The same intelligent pipeline, packaged into clear service tiers from sole traders to enterprise multi-nationals.
          </p>
        </div>
      </section>

      {/* Tier cards */}
      <section className="py-24 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto space-y-8">
          {tiers.map(t => (
            <div key={t.id} id={t.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="bg-white border-b border-slate-100 px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-sky-600">{t.tier}</span>
                    {t.highlight && (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">
                    {t.name} <span className="text-slate-500 font-normal text-lg">{t.subtitle}</span>
                  </h2>
                  <p className="text-sm font-semibold text-slate-900">{t.target}</p>
                </div>
                <p className="text-sm text-slate-500 max-w-xs leading-relaxed">{t.targetDesc}</p>
              </div>

              {/* Services grid */}
              <div className="px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {t.services.map(s => (
                  <div key={s.label} className="flex gap-4">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-sky-50 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-sky-600" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-900 mb-1">{s.label}</p>
                      <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Value */}
              <div className="mx-8 mb-8 p-6 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-widest text-sky-600 mb-2">Client Value</p>
                <p className="text-sm text-slate-600 leading-relaxed">{t.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6">
            Not sure which tier fits your business?
          </h2>
          <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto">
            Talk to our team to find the right digital operations layer for your scale.
          </p>
          <Link to="/contact" className="btn-primary text-base px-10 py-4 mx-auto inline-flex items-center gap-2">
            Talk to our team <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  )
}
