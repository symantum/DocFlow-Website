import { Mail, ScanLine, Brain, UserCheck, Send, Database, Shield, Cloud, Cpu, GitBranch } from 'lucide-react'

const stack = [
  {
    phase: 'Ingestion Layer',
    items: [
      { icon: Mail,    name: 'EIP — Email Ingestion Program', desc: 'Three-stage pipeline using MSAL OAuth2 and IMAP to poll the Outlook mailbox, validate PDF attachments, and route approved files to the watch folder.' },
      { icon: Database, name: 'Watch Folder Queue',          desc: 'Downloaded PDFs land in a structured folder hierarchy organised by client code, ready for the ingestion script to submit to the AP Portal API.' },
    ],
  },
  {
    phase: 'Extraction Layer',
    items: [
      { icon: ScanLine,  name: 'OCR Engine',    desc: 'Custom-trained OCR with layout-aware field grouping. Extracts vendor name, ABN, invoice number, date, GST, totals, payment terms and line items from any PDF.' },
      { icon: Cpu,       name: 'pdf2image + pdfplumber', desc: 'PDF preprocessing pipeline converts pages to high-resolution images for OCR, while pdfplumber extracts text-layer data for hybrid validation.' },
      { icon: GitBranch, name: 'Line Item Extractor',   desc: 'Dedicated line-item engine handles multi-page supply chain invoices — SKU, quantity, unit price, description and totals across complex layouts.' },
    ],
  },
  {
    phase: 'Validation Layer',
    items: [
      { icon: Brain,    name: 'Gemini AI',         desc: 'Google Gemini validates extracted fields for logical consistency, cross-checks line item totals against invoice totals, and flags anomalies with confidence scores.' },
      { icon: UserCheck, name: 'HITL Review Interface',  desc: 'Human-in-the-loop review workflow. Reviewers see the PDF alongside extracted fields, make corrections, and approve or reject with a full audit trail.' },
    ],
  },
  {
    phase: 'Integration Layer',
    items: [
      { icon: Send,  name: 'Accounting System Push', desc: 'REST API connectors push approved invoice data to Xero, MYOB, NetSuite, Microsoft Dynamics 365 and SAP. CSV export available for all tiers.' },
      { icon: Cloud, name: 'CSA Portal Bridge',      desc: 'Approved AP data flows automatically into the CSA Portal analytics engine — no manual export required. Single source of truth for spending intelligence.' },
    ],
  },
  {
    phase: 'Infrastructure',
    items: [
      { icon: Cloud,  name: 'FastAPI + Render',      desc: 'Backend API built on Python FastAPI, deployed on Render. PostgreSQL on Supabase for multi-tenant data isolation.' },
      { icon: Shield, name: 'React + Vite + Vercel', desc: 'Frontend portals built with React 18 + TypeScript + Tailwind, deployed globally via Vercel CDN with zero-downtime deployments.' },
    ],
  },
]

const integrations = [
  'Xero', 'MYOB', 'QuickBooks', 'NetSuite', 'Dynamics 365', 'Sage', 'SAP', 'Oracle',
  'Microsoft 365', 'Outlook', 'Google Gemini', 'Supabase', 'Vercel', 'Render',
]

export default function TechnologyPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="pt-32 pb-20 px-6 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="section-eyebrow mb-6 inline-flex">
            <span className="eyebrow-dot" />
            Technology
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            Built for precision at scale
          </h1>
          <p className="text-base text-slate-500 font-normal leading-relaxed max-w-xl mx-auto mb-10">
            Every layer is purpose-built for financial document processing — from IMAP inbox to ERP endpoint
          </p>
        </div>
      </section>

      {/* Pipeline diagram */}
      <section className="py-24 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-10 border border-slate-200 rounded-2xl shadow-sm overflow-x-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-8 text-center">Full Pipeline Architecture</p>
            <div className="flex items-stretch gap-0 min-w-[640px]">
              {[
                { label: 'Email\nInbox',   color: 'bg-sky-50 text-sky-700 border-sky-200',   sub: 'Outlook / IMAP' },
                { label: 'EIP\nS1 → S3',  color: 'bg-sky-50 text-sky-700 border-sky-200',   sub: 'OAuth2 + PDF sort' },
                { label: 'OCR\nEngine',    color: 'bg-cyan-50 text-cyan-700 border-cyan-200',   sub: 'v3.6.4 extraction' },
                { label: 'AI\nValidation', color: 'bg-violet-50 text-violet-700 border-violet-200', sub: 'Gemini Flash' },
                { label: 'HITL\nReview',   color: 'bg-violet-50 text-violet-700 border-violet-200', sub: 'AP Portal UI' },
                { label: 'Analytics\nCSA', color: 'bg-emerald-50 text-emerald-700 border-emerald-200',   sub: 'Spend dashboard' },
                { label: 'ERP\nPush',      color: 'bg-emerald-50 text-emerald-700 border-emerald-200', sub: 'Xero / SAP / API' },
              ].map((node, i, arr) => (
                <div key={node.label} className="flex items-center flex-1">
                  <div className={`flex-1 border rounded-xl p-4 text-center ${node.color}`}>
                    <p className="font-bold text-sm whitespace-pre-line leading-tight">{node.label}</p>
                    <p className="opacity-70 text-[10px] mt-2 font-medium">{node.sub}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-6 flex items-center justify-center shrink-0">
                      <div className="w-4 h-px bg-slate-300" />
                      <div className="w-0 h-0 border-l-[4px] border-l-slate-300 border-y-[3px] border-y-transparent" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stack layers */}
      <section className="py-24 px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto space-y-12">
          {stack.map(layer => (
            <div key={layer.phase} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 border-b border-slate-200 px-8 py-5">
                <h2 className="font-bold text-lg text-slate-900">{layer.phase}</h2>
              </div>
              <div className="px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {layer.items.map(item => (
                  <div key={item.name} className="flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center shrink-0">
                        <item.icon size={18} className="text-sky-600" />
                      </div>
                      <p className="text-base font-bold text-slate-900">{item.name}</p>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Integrations */}
      <section className="py-24 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-8">Integrations & Platforms</p>
          <div className="flex flex-wrap justify-center gap-3">
            {integrations.map(i => (
              <span key={i} className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-sm text-slate-600 font-semibold shadow-sm">
                {i}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
