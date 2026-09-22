import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import FaqAccordion from '../components/FaqAccordion'
import { TurnstileField, turnstileRequired } from '../components/TurnstileField'
import { submitPublicIntake } from '../services/publicIntake'

type ServiceChoice = 'ap-only' | 'client-portal' | 'intelligence'

const volumeProfiles: Record<string, { title: string; desc: string }> = {
  '1-199': {
    title: 'SME / multi-site operator',
    desc: 'Typical for growing businesses consolidating email intake and AP document handling.',
  },
  '200-999': {
    title: 'Commercial volume',
    desc: 'Structured Gateway routing and validated sync — we map delivery to your accounting workflow.',
  },
  '1000+': {
    title: 'Enterprise volume',
    desc: 'High-throughput processing — we schedule an integration mapping session during onboarding.',
  },
}

const onboardingSteps = [
  { step: '1', title: 'Submit request', desc: 'Receive an Application ID after successful submission.' },
  { step: '2', title: 'Verify work email', desc: 'Confirm the authorised contact before review.' },
  { step: '3', title: 'Review and approval', desc: 'Agree workflow, service scope, pricing, and implementation.' },
  { step: '4', title: 'Provision and activate', desc: 'Receive an Account ID and secure invitation where applicable.' },
]

const faqItems = [
  {
    question: 'Is DocFlow self-serve signup?',
    answer: 'No. Get Started begins production qualification; we send a secure activation invitation only after review and approval.',
  },
  {
    question: 'Can I get Analytics without Automation?',
    answer: 'No. DocFlow Analytics requires verified document data from DocFlow Automation. Choose Automation + Analytics when requesting onboarding.',
  },
  {
    question: 'Who operates document processing?',
    answer: 'Symantum operates the pipeline including human validation. You receive validated sync outputs and optional Analytics client login — not operator portal access.',
  },
  {
    question: 'How do documents get into DocFlow?',
    answer: 'Most clients forward supplier PDFs to a dedicated DocFlow Gateway alias at @df.symantum.com. Subject-line routing and batch upload are also available where configured.',
  },
  {
    question: 'Which accounting systems are supported?',
    answer: 'Xero, CSV, SFTP, and API delivery are commonly configured. MYOB, NetSuite, SAP, and custom ERP paths are scoped during onboarding.',
  },
  {
    question: 'What happens after I submit this form?',
    answer: 'After email verification, our team reviews your workflow and requested services. Account provisioning and activation occur only after commercial and operational approval.',
  },
]

export default function GetStartedPage() {
  const [searchParams] = useSearchParams()

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    workEmail: '',
    monthlyVolume: '',
    locations: '',
    accountingSystem: '',
    intakeMethod: '',
    country: '',
    integrationType: '',
    targetStart: '',
    objective: '',
    serviceChoice: 'ap-only' as ServiceChoice,
    consent: false,
  })

  const [botToken, setBotToken] = useState<string | undefined>()
  const [submission, setSubmission] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error'
    reference?: string
    message?: string
  }>({ status: 'idle' })

  useEffect(() => {
    const module = searchParams.get('module')
    if (module === 'analytics' || module === 'both') {
      setFormData(prev => ({ ...prev, serviceChoice: 'intelligence' }))
    } else if (module === 'automation') {
      setFormData(prev => ({ ...prev, serviceChoice: 'ap-only' }))
    }
  }, [searchParams])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, type, value } = e.target
    const nextValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData(prev => ({ ...prev, [name]: nextValue }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (turnstileRequired() && !botToken) {
      setSubmission({
        status: 'error',
        message: 'Please complete the security check before submitting.',
      })
      return
    }
    setSubmission({ status: 'submitting' })
    try {
      const result = await submitPublicIntake('production', formData, botToken)
      setSubmission({ status: 'success', reference: result.reference })
    } catch (error) {
      setSubmission({
        status: 'error',
        message: error instanceof Error ? error.message : 'We could not submit your request.',
      })
    }
  }

  const volumeProfile = formData.monthlyVolume ? volumeProfiles[formData.monthlyVolume] : null

  return (
    <div className="bg-white">
      <section className="pt-32 pb-12 px-6 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            Start Your Production Onboarding
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Request a full DocFlow service configuration for your document workflow
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-1.5 mt-5 text-sm font-bold text-sky-700 hover:text-sky-600 transition-colors"
          >
            See how DocFlow pricing works <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10">

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6">What Happens Next</h2>
              <ol className="space-y-5">
                {onboardingSteps.map((s) => (
                  <li key={s.step} className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 font-bold text-sm flex items-center justify-center shrink-0 border border-sky-100">
                      {s.step}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{s.title}</p>
                      <p className="text-slate-500 text-sm mt-0.5">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Included with Onboarding</h2>
              <ul className="space-y-2 text-sm text-slate-600 mt-4">
                <li>• Configured intake and routing</li>
                <li>• Symantum-operated processing and verification</li>
                <li>• Approved integration or delivery path</li>
                <li>• DocFlow Client Portal access when subscribed</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Questions</h2>
              <FaqAccordion items={faqItems} />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm sticky top-28">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Request Production Onboarding</h2>

              {submission.status === 'success' ? (
                <div className="text-center py-12" role="status">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full mb-6">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Thank you!</h3>
                  <p className="text-slate-600 mb-6 text-sm">
                    Your production request has been received. Verify your work email when prompted;
                    provisioning will occur only after review and approval.
                  </p>
                  {submission.reference && (
                    <p className="text-sm font-bold text-sky-700 mb-6">
                      Application ID: {submission.reference}
                    </p>
                  )}
                  <button
                    onClick={() => setSubmission({ status: 'idle' })}
                    className="text-sky-600 hover:text-sky-700 font-semibold text-sm transition-colors"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  aria-busy={submission.status === 'submitting'}
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        aria-label="Full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        aria-label="Company name"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Your Company Ltd"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Work Email</label>
                      <input
                        type="email"
                        name="workEmail"
                        aria-label="Work email"
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Country</label>
                      <input
                        name="country"
                        aria-label="Country"
                        value={formData.country}
                        onChange={handleChange}
                        autoComplete="country-name"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Monthly document volume</label>
                      <select
                        name="monthlyVolume"
                        aria-label="Monthly document volume"
                        value={formData.monthlyVolume}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                        required
                      >
                        <option value="">Select range...</option>
                        <option value="1-199">1–199</option>
                        <option value="200-999">200–999</option>
                        <option value="1000+">1000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Number of locations</label>
                      <select
                        name="locations"
                        aria-label="Number of locations"
                        value={formData.locations}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                        required
                      >
                        <option value="">Select range...</option>
                        <option value="1">1 location</option>
                        <option value="2-5">2–5 locations</option>
                        <option value="6-20">6–20 locations</option>
                        <option value="20+">20+ locations</option>
                      </select>
                    </div>
                  </div>

                  {volumeProfile && (
                    <div className="p-4 bg-sky-50 border border-sky-100 rounded-xl">
                      <p className="text-sm font-bold text-sky-800">{volumeProfile.title}</p>
                      <p className="text-sm text-sky-700/80 mt-1">{volumeProfile.desc}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Primary accounting system</label>
                      <select
                        name="accountingSystem"
                        aria-label="Primary accounting system"
                        value={formData.accountingSystem}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                        required
                      >
                        <option value="">Select system...</option>
                        <option value="Xero">Xero</option>
                        <option value="MYOB">MYOB</option>
                        <option value="QuickBooks">QuickBooks</option>
                        <option value="NetSuite">NetSuite</option>
                        <option value="SAP">SAP</option>
                        <option value="Other">Other / CSV export</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Current intake method</label>
                      <select
                        name="intakeMethod"
                        aria-label="Current intake method"
                        value={formData.intakeMethod}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                        required
                      >
                        <option value="">Select method...</option>
                        <option value="Email">Email to shared inbox</option>
                        <option value="Portal">Supplier portal downloads</option>
                        <option value="Manual">Manual file collection</option>
                        <option value="CSV">CSV / batch upload</option>
                        <option value="Mixed">Mixed methods</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Production Service
                    </label>
                    <div className="space-y-2">
                      {[
                        {
                          value: 'ap-only' as ServiceChoice,
                          label: 'DocFlow Automation only',
                          desc: 'Managed processing with delivery through an agreed external channel',
                        },
                        {
                          value: 'client-portal' as ServiceChoice,
                          label: 'DocFlow Automation + Client Portal',
                          desc: 'Managed processing with authenticated client account access',
                        },
                        {
                          value: 'intelligence' as ServiceChoice,
                          label: 'Automation + Analytics and Assurance',
                          desc: 'Verified processing, intelligence and assurance through the Client Portal',
                        },
                      ].map(opt => (
                        <label key={opt.value} className={`flex items-start gap-3 cursor-pointer p-3 border rounded-lg transition-colors ${
                          formData.serviceChoice === opt.value ? 'border-sky-400 bg-sky-50' : 'border-slate-200 hover:bg-slate-50'
                        }`}>
                          <input
                            type="radio"
                            name="serviceChoice"
                            aria-label={opt.label}
                            value={opt.value}
                            checked={formData.serviceChoice === opt.value}
                            onChange={handleChange}
                            className="w-5 h-5 mt-0.5 border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                          />
                          <div>
                            <span className="text-slate-800 font-semibold block text-sm">{opt.label}</span>
                            <span className="text-slate-500 text-xs">{opt.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Integration or Delivery
                      </label>
                      <select
                        name="integrationType"
                        aria-label="Integration or delivery"
                        value={formData.integrationType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                        required
                      >
                        <option value="">Select type...</option>
                        <option value="accounting">Accounting-system connection</option>
                        <option value="csv">CSV</option>
                        <option value="sftp">SFTP</option>
                        <option value="api">API</option>
                        <option value="other">Other</option>
                        <option value="undecided">Undecided</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Preferred Commencement
                      </label>
                      <input
                        name="targetStart"
                        aria-label="Preferred commencement"
                        value={formData.targetStart}
                        onChange={handleChange}
                        placeholder="For example, November 2026"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Production Workflow and Objectives
                    </label>
                    <textarea
                      name="objective"
                      aria-label="Production workflow and objectives"
                      value={formData.objective}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe your current workflow, required outputs and implementation objective..."
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors resize-none"
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
                      I agree that Symantum may use these details to assess and respond to this
                      onboarding request under the{' '}
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

                  <TurnstileField onTokenChange={setBotToken} className="pt-1" />

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
                    className="w-full btn-primary text-base px-8 py-4 mt-4 flex justify-center items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submission.status === 'submitting' ? 'Submitting…' : 'Submit Production Request'}
                    {submission.status !== 'submitting' && <ArrowRight size={18} />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
