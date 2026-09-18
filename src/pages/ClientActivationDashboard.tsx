import { CheckCircle2, Mail, FileText, BarChart3, Copy, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const routingOptions = [
  {
    label: 'Dedicated intake alias',
    instruction: 'Forward or CC supplier PDFs to your client-specific DocFlow Gateway address.',
    example: 'invoices-{code}@df.symantum.com',
    icon: Mail,
    recommended: true,
  },
  {
    label: 'Subject-line client code',
    instruction: 'Use the shared intake mailbox and include your client code in the subject line.',
    example: '[CLIENT-CODE] Invoice attached',
    icon: FileText,
    recommended: false,
  },
  {
    label: 'Historical CSV upload',
    instruction: 'Upload historical AP data for retrospective Analytics where configured.',
    example: 'CLIENT_HEADER_*.csv',
    icon: BarChart3,
    recommended: false,
  },
]

export default function ClientActivationDashboard() {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="bg-white">
      <section className="pt-32 pb-20 px-6 border-b border-sky-100 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full mb-8">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <span className="section-eyebrow mb-6 inline-flex">
            <span className="eyebrow-dot" />
            Activation
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            Your DocFlow Intake Is Active
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-sky-600 mb-6">
            Client code assigned and Gateway routing configured
          </p>
          <p className="text-base text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
            Use the routing options below to send supplier documents. Symantum validates extraction before sync to your configured workflow.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50/80 border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 mb-10 text-center">Routing Options</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {routingOptions.map((option, i) => {
              const Icon = option.icon
              return (
                <div key={i} className={`relative bg-white border rounded-2xl p-8 hover:shadow-md transition-shadow ${
                  option.recommended ? 'border-sky-300 ring-2 ring-sky-100' : 'border-slate-200'
                }`}>
                  {option.recommended && (
                    <span className="absolute -top-3 left-6 px-3 py-1 bg-sky-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      Recommended
                    </span>
                  )}
                  <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-6">
                    <Icon size={24} className="text-sky-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Route {String.fromCharCode(65 + i)}</h3>
                  <p className="text-sm font-bold text-sky-600 mb-4">{option.label}</p>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-1">{option.instruction}</p>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Example</p>
                    <div className="flex items-center justify-between gap-3">
                      <code className="text-sm text-slate-700 font-medium truncate bg-white px-2 py-1 border border-slate-200 rounded">{option.example}</code>
                      <button
                        onClick={() => handleCopy(option.example, `route-${i}`)}
                        className="p-1.5 hover:bg-slate-200 rounded-md transition-colors text-slate-500 hover:text-slate-900"
                        title="Copy"
                      >
                        {copied === `route-${i}` ? (
                          <CheckCircle2 size={16} className="text-emerald-500" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 mb-10 text-center">Your Configuration</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8 border-b border-slate-100 pb-4">Client details</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Client code</p>
                  <div className="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 p-3 rounded-lg">
                    <code className="text-sm font-bold text-slate-700">CLIENT-ABC-12345</code>
                    <button
                      onClick={() => handleCopy('CLIENT-ABC-12345', 'client-code')}
                      className="p-1.5 hover:bg-slate-200 rounded-md transition-colors text-slate-500 hover:text-slate-900"
                    >
                      {copied === 'client-code' ? (
                        <CheckCircle2 size={16} className="text-emerald-500" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Assigned intake alias</p>
                  <p className="text-slate-900 font-medium">invoices-abc@df.symantum.com</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">DocFlow Analytics</p>
                  <a href="https://csa.symantum.com/" target="_blank" rel="noopener noreferrer" className="text-sky-600 font-bold hover:text-sky-700 flex items-center gap-1 w-fit">
                    Open client login <ExternalLink size={14} className="ml-1" />
                  </a>
                  <p className="text-xs text-slate-400 mt-1">Available when Automation + Analytics is enabled</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8 border-b border-slate-100 pb-4">Enabled modules</h3>
              <div className="space-y-4">
                {[
                  'DocFlow Automation',
                  'DocFlow Gateway intake',
                  'DocFlow Analytics',
                  'Validated sync / export',
                ].map((service, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    <span className="text-slate-700 font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50/80 border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 mb-10 text-center">Getting Started</h2>
          
          <div className="space-y-6">
            {[
              {
                title: 'Set up intake routing',
                desc: 'Choose a routing option above. Most clients use the dedicated DocFlow Gateway alias for direct supplier email.',
                time: 'Estimated time: 5 minutes'
              },
              {
                title: 'Send test documents',
                desc: 'Forward 5–10 sample invoices, bills, or statements. Documents enter the DocFlow pipeline immediately.',
                time: 'Estimated time: 10–15 minutes'
              },
              {
                title: 'Symantum validates extraction',
                desc: 'Our operations team reviews flagged fields and confirms accuracy before production sync is enabled.',
                time: 'Handled by Symantum'
              },
              {
                title: 'Production sync enabled',
                desc: 'Validated outputs sync to your configured accounting workflow on the agreed schedule.',
                time: 'Configured at onboarding'
              }
            ].map((step, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex items-start gap-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-50 text-sky-600 font-black text-xl shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-500 mb-4 leading-relaxed">{step.desc}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-10 text-white">
              <h3 className="text-xl font-bold text-white mb-4">Resources</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Guides and frameworks for finance and procurement teams using DocFlow.
              </p>
              <Link to="/resources" className="inline-flex items-center gap-2 text-sky-400 font-bold hover:text-sky-300">
                View resources <ExternalLink size={16} />
              </Link>
            </div>

            <div className="bg-sky-900/40 border border-sky-800 rounded-2xl p-10 text-white">
              <h3 className="text-xl font-bold text-white mb-4">Support</h3>
              <p className="text-sky-200/80 mb-8 leading-relaxed">
                Contact us for routing changes, delivery configuration, or integration planning.
              </p>
              <Link to="/contact?type=client" className="inline-flex items-center gap-2 text-sky-400 font-bold hover:text-sky-300">
                Contact support <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
