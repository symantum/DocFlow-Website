import { ArrowRight, BarChart3, Check, Plug, ScanLine } from 'lucide-react'
import { Link } from 'react-router-dom'

const productionPricing = [
  {
    title: 'Managed AP Automation',
    description:
      'Ongoing document intake, processing, verification and delivery operated as a managed service.',
    detail: 'Monthly service pricing based primarily on volume and processing complexity.',
    icon: ScanLine,
  },
  {
    title: 'Analytics & Assurance',
    description:
      'Optional intelligence, control and data-assurance capabilities built on verified operational data.',
    detail: 'Priced according to enabled modules, data scope and reporting requirements.',
    icon: BarChart3,
  },
  {
    title: 'Integration & Onboarding',
    description:
      'Workflow configuration and connection to your approved accounting, ERP or delivery environment.',
    detail: 'One-off pricing based on integration and implementation complexity.',
    icon: Plug,
  },
]

const pricingFactors = [
  'Monthly document volume',
  'Header and line-item complexity',
  'Verification and exception-handling requirements',
  'Enabled Automation, Analytics and Assurance capabilities',
  'Integration and delivery method',
  'Retention, security and support requirements',
]

export default function PricingPage() {
  return (
    <div className="bg-white">
      <section className="pt-32 pb-16 px-6 border-b border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            Production Service Pricing
          </h1>
          <p className="hero-lead max-w-2xl mx-auto">
            Scope an ongoing managed DocFlow service around your document volume, workflow,
            verification requirements, enabled capabilities and integration.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div
            id="production-pricing"
            className="text-center max-w-2xl mx-auto mb-9 scroll-mt-28"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              How Production Pricing Is Structured
            </h2>
            <p className="hero-lead max-w-xl mx-auto">
              A transparent commercial structure for a managed BPaaS service—not a generic software
              licence that leaves implementation and processing to your team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {productionPricing.map(({ title, description, detail, icon: Icon }) => (
              <article key={title} className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
                <span className="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 inline-flex items-center justify-center mb-5">
                  <Icon size={22} />
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                <p className="text-[13px] sm:text-sm text-slate-700 leading-relaxed font-medium mb-4">
                  {description}
                </p>
                <p className="text-sm font-semibold text-sky-700">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
              Your Estimate
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3 mb-5">
              What Determines Your Price
            </h2>
            <p className="hero-lead">
              We qualify these factors before providing a written estimate. Your proposal identifies
              the service scope, included volume, additional usage charges and any one-off
              implementation cost.
            </p>
          </div>
          <ul className="bg-slate-50 border border-slate-200 rounded-2xl p-7 space-y-4">
            {pricingFactors.map((factor) => (
              <li key={factor} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 inline-flex items-center justify-center shrink-0">
                  <Check size={14} strokeWidth={3} />
                </span>
                {factor}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 px-6 section-band-d">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">
            Get a Pricing Estimate for Your Workflow
          </h2>
          <p className="text-white text-base mb-8 max-w-lg mx-auto leading-relaxed font-medium">
            Tell us about your document volume, workflow and required capabilities. We will confirm
            the appropriate service structure before you proceed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/get-started" className="btn-primary text-sm px-8 py-3.5 font-bold">
              Request a Pricing Estimate <ArrowRight size={16} />
            </Link>
            <Link
              to="/pilot#pilot-request"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
            >
              Start with a Complimentary Pilot
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
