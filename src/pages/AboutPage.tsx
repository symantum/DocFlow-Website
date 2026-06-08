import { Shield, Globe, Zap, Users, Award, TrendingDown } from 'lucide-react'

const highlights = [
  { icon: Award,       value: '20+',  label: 'Years of Experience',       desc: 'Two decades serving financial services, government and education clients globally.' },
  { icon: TrendingDown, value: '70%', label: 'Client Cost Reduction',     desc: 'Proven minimum 70% reduction in document processing costs across our client base.' },
  { icon: Globe,       value: '24/7', label: 'Global Support',            desc: 'Strategically located offshore teams in Australia and China providing round-the-clock coverage.' },
  { icon: Shield,      value: '100%', label: 'Data Security Compliance',  desc: 'Strictest security protocols and full compliance with relevant data protection regulations.' },
  { icon: Zap,         value: 'AI',   label: 'Powered Automation',        desc: 'Latest intelligent automation and AI tools deployed on every client engagement.' },
  { icon: Users,       value: 'BPaaS', label: 'Business Process as a Service', desc: 'Evolved from traditional BPO to cloud-native BPaaS — the same expertise, delivered as software.' },
]

const timeline = [
  { year: 'Founded',  event: 'Symantum established in Melbourne, Australia as a specialist document processing and BPO services firm.' },
  { year: 'Growth',   event: 'Xi\'an, China operations centre opened — enabling 24/7 service delivery and multi-lingual processing capabilities.' },
  { year: '20 Years', event: 'Two decades of delivering BPO excellence across financial services, government, education and healthcare sectors.' },
  { year: '2025',     event: 'AP Portal v1 launched — first generation AI-assisted invoice processing with human-in-the-loop review.' },
  { year: '2026',     event: 'Full BPaaS platform live: EIP email ingestion, OCR v3.6 extraction, Gemini AI validation, CSA spend analytics, and accounting system push integrations.' },
]

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">About Symantum</p>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Twenty years of expertise,<br />now delivered as software
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Symantum began as a specialist BPO firm and has evolved into a full BPaaS platform — bringing the same domain expertise that drove 70% cost reductions for clients into intelligent, always-on software.
          </p>
        </div>

        {/* Highlights grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {highlights.map(h => (
            <div key={h.label} className="feature-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <h.icon size={18} className="text-emerald-600" />
                </div>
                <span className="text-2xl font-black text-slate-900">{h.value}</span>
              </div>
              <p className="text-sm font-semibold text-slate-800 mb-1">{h.label}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>

        {/* Story / Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <span className="section-eyebrow"><span className="eyebrow-dot" />Our Story</span>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">From BPO to BPaaS</h2>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                Symantum was founded with a single mission: deliver operational excellence in document processing so that businesses could focus on what they do best. Over twenty years, we built deep expertise across financial services, government agencies, and educational institutions — processing millions of documents with accuracy and security at the core.
              </p>
              <p>
                As AI and cloud technology matured, we made a deliberate transformation. The same methodologies that drove 70% cost reductions for BPO clients are now embedded in our BPaaS platform — accessible to any business, at any scale, as a subscription service.
              </p>
              <p>
                Today, AP Portal and CSA Portal represent the culmination of that journey: purpose-built software that ingests invoices from email, extracts every field with AI-validated precision, and pushes clean data straight into your accounting system — all with a human reviewer in the loop.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <span className="section-eyebrow"><span className="eyebrow-dot" />Timeline</span>
            <div className="space-y-1">
              {timeline.map((t, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-emerald-200 my-1" />}
                  </div>
                  <div className="pb-5">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{t.year}</span>
                    <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Offices */}
        <div>
          <div className="text-center mb-6"><span className="section-eyebrow"><span className="eyebrow-dot" />Our Offices</span></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="feature-card p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🇦🇺</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Australia — Head Office</h3>
                  <p className="text-xs text-slate-500">Melbourne, Victoria</p>
                </div>
              </div>
              <div className="space-y-1 text-sm text-slate-600">
                <p>247 Bouverie Street, Carlton VIC 3053</p>
                <p>Tel: +61 3 9342 2458</p>
                <p>Fax: +61 3 9342 2478</p>
              </div>
            </div>
            <div className="feature-card p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🇨🇳</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">China — Operations Centre</h3>
                  <p className="text-xs text-slate-500">Xi'an, Shaanxi</p>
                </div>
              </div>
              <div className="space-y-1 text-sm text-slate-600">
                <p>B306 Han Yun, Xi'an Software Development Zone</p>
                <p>Xi'an, Shaanxi Province</p>
                <p>Tel: +86 29 8760 7723</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
