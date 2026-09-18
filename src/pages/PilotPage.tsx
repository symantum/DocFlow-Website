import { useEffect, useState } from 'react'
import { ArrowRight, Check, CheckCircle2, Clock3, Gauge, Workflow } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { submitPublicIntake } from '../services/publicIntake'

const pilotStages = [
  {
    title: 'Define the Operating Test',
    description:
      'Agree the document mix, workflow boundary, required outputs and measurable acceptance criteria.',
  },
  {
    title: 'Configure the Pilot',
    description:
      'Set up controlled intake, processing rules, verification and the approved delivery path.',
  },
  {
    title: 'Run with Real Documents',
    description:
      'Operate DocFlow against an agreed allowance while exceptions and outcomes remain visible.',
  },
  {
    title: 'Review and Decide',
    description:
      'Assess quality, turnaround and operational fit before adjusting, expanding or concluding the pilot.',
  },
]

const pilotFit = [
  'A defined supplier-document workflow',
  'An agreed representative document set',
  'An authorised operational contact',
  'Clear success measures and expected outputs',
]

export default function PilotPage() {
  const [searchParams] = useSearchParams()
  const [submission, setSubmission] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error'
    reference?: string
    message?: string
  }>({ status: 'idle' })
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    workEmail: '',
    country: '',
    locations: '',
    monthlyVolume: '',
    accountingSystem: '',
    intakeMethod: '',
    deliveryMethod: '',
    capability: 'automation',
    targetStart: '',
    objective: '',
    consent: false,
  })

  useEffect(() => {
    if (searchParams.get('module') === 'both') {
      setFormData((current) => ({ ...current, capability: 'both' }))
    }
  }, [searchParams])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, type, value } = event.target
    const nextValue =
      type === 'checkbox' ? (event.target as HTMLInputElement).checked : value
    setFormData((current) => ({ ...current, [name]: nextValue }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmission({ status: 'submitting' })
    try {
      const result = await submitPublicIntake('pilot', formData)
      setSubmission({ status: 'success', reference: result.reference })
    } catch (error) {
      setSubmission({
        status: 'error',
        message: error instanceof Error ? error.message : 'We could not submit your request.',
      })
    }
  }

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden hero-section-pad section-band-a">
        <div className="relative home-container">
          <div className="hero-copy max-w-3xl mx-auto text-center">
            <h1 className="type-h1 mb-5">
              Test DocFlow in a Complimentary 30-Day Pilot
            </h1>
            <p className="hero-lead mb-8 max-w-2xl mx-auto">
              Validate DocFlow against your documents, workflow and agreed outcomes before making a
              wider production commitment.
            </p>
            <a href="#pilot-request" className="btn-primary text-sm px-8 py-3.5 font-bold">
              Request Your Pilot <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="section-pad-home section-band-b">
        <div className="home-container">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="type-h2 mb-3">A Pilot Designed as an Operating Test</h2>
            <p className="hero-lead max-w-xl mx-auto">
              The pilot is scoped around a real process—not presented as a generic product tour.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Controlled Scope',
                description: 'Agreed documents, volume, capabilities and workflow boundary.',
                icon: Workflow,
              },
              {
                title: '30-Day Window',
                description: 'A defined period for configuration, operation and assessment.',
                icon: Clock3,
              },
              {
                title: 'Measurable Outcome',
                description: 'Quality, turnaround and delivery criteria established in advance.',
                icon: Gauge,
              },
            ].map(({ title, description, icon: Icon }) => (
              <article key={title} className="text-center">
                <span className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 inline-flex items-center justify-center mb-4">
                  <Icon size={22} />
                </span>
                <h3 className="type-h3 mb-2">{title}</h3>
                <p className="text-[13px] sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-home section-band-c">
        <div className="home-container">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="type-h2 mb-3">How the Pilot Works</h2>
            <p className="hero-lead max-w-xl mx-auto">
              Four controlled stages take the pilot from qualification to an evidence-based decision.
            </p>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {pilotStages.map((stage, index) => (
              <li key={stage.title} className="section-panel !p-6">
                <span className="text-xs font-black text-sky-700 tracking-widest">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-3 mb-2">{stage.title}</h3>
                <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                  {stage.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad-home section-band-a">
        <div className="home-container max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="type-h2 mb-4">What We Need to Qualify a Pilot</h2>
            <p className="hero-lead">
              No production passwords, API secrets or connector credentials are collected through
              the public website. Sensitive configuration follows qualification and approval.
            </p>
          </div>
          <ul className="section-panel !p-7 space-y-4">
            {pilotFit.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 inline-flex items-center justify-center shrink-0">
                  <Check size={14} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="pilot-request" className="section-pad-home section-band-b scroll-mt-28">
        <div className="home-container grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2">
            <h2 className="type-h2 mb-4">Request Your 30-Day Pilot</h2>
            <p className="hero-lead mb-7">
              Tell us enough to assess operational fit. Sensitive credentials and production
              configuration are collected only after qualification and approval.
            </p>
            <div className="space-y-4">
              {[
                'We review your workflow and objective.',
                'We confirm scope, allowance and success criteria.',
                'We confirm the complimentary scope and quote any additional requirements.',
              ].map((item, index) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-sky-50 text-sky-700 inline-flex items-center justify-center text-xs font-black shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 section-panel">
            {submission.status === 'success' ? (
              <div className="text-center py-10" role="status">
                <span className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 inline-flex items-center justify-center mb-5">
                  <CheckCircle2 size={30} />
                </span>
                <h3 className="type-h3 mb-3">Pilot Request Received</h3>
                <p className="text-sm text-slate-700 leading-relaxed font-medium max-w-md mx-auto mb-6">
                  We have received your request and will contact you after reviewing the proposed
                  workflow.
                </p>
                {submission.reference && (
                  <p className="text-sm font-bold text-sky-700 mb-6">
                    Application ID: {submission.reference}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setSubmission({ status: 'idle' })}
                  className="text-sm font-bold text-sky-700 hover:text-sky-600"
                >
                  Return to the form
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                aria-busy={submission.status === 'submitting'}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input
                      name="fullName"
                      aria-label="Full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Organisation
                    </label>
                    <input
                      name="companyName"
                      aria-label="Organisation"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Work Email</label>
                  <input
                    type="email"
                    name="workEmail"
                    aria-label="Work email"
                    value={formData.workEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Current Intake Method
                    </label>
                    <select
                      name="intakeMethod"
                      aria-label="Current intake method"
                      value={formData.intakeMethod}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      required
                    >
                      <option value="">Select method...</option>
                      <option value="email">Shared email inbox</option>
                      <option value="portal">Supplier portals</option>
                      <option value="upload">Batch upload</option>
                      <option value="mixed">Mixed methods</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Preferred Delivery Method
                    </label>
                    <select
                      name="deliveryMethod"
                      aria-label="Preferred delivery method"
                      value={formData.deliveryMethod}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      required
                    >
                      <option value="">Select method...</option>
                      <option value="accounting">Accounting-system connection</option>
                      <option value="csv">CSV</option>
                      <option value="sftp">SFTP</option>
                      <option value="api">API</option>
                      <option value="undecided">Undecided</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Country
                    </label>
                    <input
                      name="country"
                      aria-label="Country"
                      value={formData.country}
                      onChange={handleChange}
                      autoComplete="country-name"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Operating Locations
                    </label>
                    <select
                      name="locations"
                      aria-label="Operating locations"
                      value={formData.locations}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      required
                    >
                      <option value="">Select range...</option>
                      <option value="1">1 location</option>
                      <option value="2-5">2–5 locations</option>
                      <option value="6-20">6–20 locations</option>
                      <option value="20+">More than 20</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Monthly Document Volume
                    </label>
                    <select
                      name="monthlyVolume"
                      aria-label="Monthly document volume"
                      value={formData.monthlyVolume}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      required
                    >
                      <option value="">Select range...</option>
                      <option value="1-199">1–199</option>
                      <option value="200-999">200–999</option>
                      <option value="1000+">1,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Accounting or ERP System
                    </label>
                    <input
                      name="accountingSystem"
                      aria-label="Accounting or ERP system"
                      value={formData.accountingSystem}
                      onChange={handleChange}
                      placeholder="Xero, MYOB, SAP, other..."
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Pilot Capabilities
                    </label>
                    <select
                      name="capability"
                      aria-label="Pilot capabilities"
                      value={formData.capability}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    >
                      <option value="automation">Automation</option>
                      <option value="both">Automation + Analytics/Assurance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Preferred Start Period
                    </label>
                    <input
                      name="targetStart"
                      aria-label="Preferred start period"
                      value={formData.targetStart}
                      onChange={handleChange}
                      placeholder="For example, October 2026"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    What Should the Pilot Validate?
                  </label>
                  <textarea
                    name="objective"
                    aria-label="Pilot objective"
                    value={formData.objective}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe the current workflow, primary friction and desired outcome..."
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-none"
                    required
                  />
                </div>

                <label className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                    required
                  />
                  <span>
                    I agree that Symantum may use these details to assess and respond to this pilot
                    request under the{' '}
                    <Link to="/privacy" className="font-semibold text-sky-700 hover:underline">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link to="/terms" className="font-semibold text-sky-700 hover:underline">
                      Terms of Use
                    </Link>
                    .
                  </span>
                </label>

                {submission.status === 'error' && (
                  <div
                    role="alert"
                    className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900"
                  >
                    {submission.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submission.status === 'submitting'}
                  className="w-full btn-primary text-sm px-8 py-3.5 font-bold justify-center disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submission.status === 'submitting' ? 'Submitting…' : 'Submit Pilot Request'}
                  {submission.status !== 'submitting' && <ArrowRight size={16} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section-pad-home section-band-d">
        <div className="home-container-narrow text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Ready for Full Production Onboarding?
          </h2>
          <p className="text-white text-base mb-8 max-w-lg mx-auto leading-relaxed font-medium">
            If your requirements and rollout scope are already defined, proceed directly to the
            production onboarding journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/get-started" className="btn-primary text-sm px-8 py-3.5 font-bold">
              Get Started <ArrowRight size={16} />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
