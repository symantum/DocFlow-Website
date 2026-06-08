import { Mail, ScanLine, Brain, UserCheck, Send, Database, Shield, Cloud, Cpu, GitBranch } from 'lucide-react'

const stack = [
  {
    phase: 'Ingestion Layer',
    color: 'text-blue-400',
    border: 'border-blue-400/20',
    bg: 'bg-blue-400/5',
    items: [
      { icon: Mail,    name: 'EIP — Email Ingestion Program', desc: 'Three-stage pipeline (S1/S2/S3) using MSAL OAuth2 and IMAP to poll the Outlook mailbox, validate PDF attachments, and route approved files to the watch folder.' },
      { icon: Database, name: 'Watch Folder Queue',          desc: 'Downloaded PDFs land in a structured folder hierarchy organised by client code, ready for the ingestion script to submit to the AP Portal API.' },
    ],
  },
  {
    phase: 'Extraction Layer',
    color: 'text-cyan-400',
    border: 'border-cyan-400/20',
    bg: 'bg-cyan-400/5',
    items: [
      { icon: ScanLine, name: 'OCR Engine v3.6.4',          desc: 'Custom-trained OCR with layout-aware field grouping. Extracts vendor name, ABN, invoice number, date, GST, totals, payment terms and full line items from any PDF structure.' },
      { icon: Cpu,      name: 'pdf2image + pdfplumber',     desc: 'PDF preprocessing pipeline converts pages to high-resolution images for OCR, while pdfplumber extracts text-layer data for hybrid validation.' },
      { icon: GitBranch, name: 'Line Item Extractor',       desc: 'Dedicated line-item engine handles multi-page supply chain invoices — SKU, quantity, unit price, description and totals across complex layouts.' },
    ],
  },
  {
    phase: 'Validation Layer',
    color: 'text-violet-400',
    border: 'border-violet-400/20',
    bg: 'bg-violet-400/5',
    items: [
      { icon: Brain,    name: 'Gemini Flash AI',            desc: 'Google Gemini Flash validates extracted fields for logical consistency, cross-checks line item totals against invoice totals, and flags anomalies with confidence scores.' },
      { icon: UserCheck, name: 'HITL Review Interface',     desc: 'Human-in-the-loop review workflow. Reviewers see the PDF alongside extracted fields, make corrections, and approve or reject with a full audit trail.' },
    ],
  },
  {
    phase: 'Integration Layer',
    color: 'text-emerald-400',
    border: 'border-emerald-400/20',
    bg: 'bg-emerald-400/5',
    items: [
      { icon: Send,   name: 'Accounting System Push',       desc: 'REST API connectors push approved invoice data to Xero, MYOB, NetSuite, Microsoft Dynamics 365 and SAP. CSV export available for all tiers.' },
      { icon: Cloud,  name: 'CSA Portal Bridge',            desc: 'Approved AP data flows automatically into the CSA Portal analytics engine — no manual export required. Single source of truth for spending intelligence.' },
    ],
  },
  {
    phase: 'Infrastructure',
    color: 'text-slate-400',
    border: 'border-slate-400/20',
    bg: 'bg-slate-400/5',
    items: [
      { icon: Cloud,   name: 'FastAPI + Render',            desc: 'Backend API built on Python FastAPI, deployed on Render. PostgreSQL on Supabase for multi-tenant data isolation.' },
      { icon: Shield,  name: 'React + Vite + Vercel',       desc: 'Frontend portals built with React 18 + TypeScript + Tailwind, deployed globally via Vercel CDN with zero-downtime deployments.' },
    ],
  },
]

const integrations = [
  'Xero', 'MYOB', 'QuickBooks', 'NetSuite', 'Dynamics 365', 'Sage', 'SAP', 'Oracle',
  'Microsoft 365', 'Outlook', 'Google Gemini', 'Supabase', 'Vercel', 'Render',
]

export default function TechnologyPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">Technology</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Built for precision at scale
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Every layer of the Symantum stack is purpose-built for financial document processing — from IMAP inbox to ERP endpoint.
          </p>
        </div>

        {/* Architecture pipeline visual */}
        <div className="glass-card border border-white/[0.08] p-8 mb-14 overflow-x-auto">
          <p className="section-label mb-6 text-center">Full Pipeline Architecture</p>
          <div className="flex items-stretch gap-0 min-w-[640px]">
            {[
              { label: 'Email\nInbox',     color: 'bg-blue-600',   sub: 'Outlook / IMAP' },
              { label: 'EIP\nS1 → S3',    color: 'bg-blue-500',   sub: 'OAuth2 + PDF sort' },
              { label: 'OCR\nEngine',      color: 'bg-cyan-600',   sub: 'v3.6.4 extraction' },
              { label: 'AI\nValidation',   color: 'bg-violet-600', sub: 'Gemini Flash' },
              { label: 'HITL\nReview',     color: 'bg-violet-500', sub: 'AP Portal UI' },
              { label: 'Analytics\nCSA',   color: 'bg-cyan-500',   sub: 'Spend dashboard' },
              { label: 'ERP\nPush',        color: 'bg-emerald-600', sub: 'Xero / SAP / API' },
            ].map((node, i, arr) => (
              <div key={node.label} className="flex items-center flex-1">
                <div className={`flex-1 ${node.color}/20 border border-white/[0.08] rounded-xl p-3 text-center`}>
                  <p className="text-white font-semibold text-xs whitespace-pre-line leading-tight">{node.label}</p>
                  <p className="text-slate-500 text-[10px] mt-1">{node.sub}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-4 flex items-center justify-center shrink-0">
                    <div className="w-3 h-px bg-slate-600" />
                    <div className="w-0 h-0 border-l-[4px] border-l-slate-600 border-y-[3px] border-y-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stack layers */}
        <div className="space-y-8">
          {stack.map(layer => (
            <div key={layer.phase} className={`glass-card border ${layer.border} overflow-hidden`}>
              <div className={`${layer.bg} border-b ${layer.border} px-8 py-4`}>
                <h2 className={`font-bold ${layer.color}`}>{layer.phase}</h2>
              </div>
              <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {layer.items.map(item => (
                  <div key={item.name} className="flex gap-4">
                    <div className={`w-9 h-9 ${layer.bg} rounded-lg flex items-center justify-center shrink-0`}>
                      <item.icon size={16} className={layer.color} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{item.name}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Integrations */}
        <div className="mt-14 text-center">
          <p className="section-label mb-6">Integrations & Platforms</p>
          <div className="flex flex-wrap justify-center gap-2">
            {integrations.map(i => (
              <span key={i} className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-slate-400">
                {i}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
