import { useState, useEffect } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { submitPublicIntake } from '../services/publicIntake'

const inquiryTypes = [
  'General enquiry',
  'ERP / integration',
  'Existing client support',
  'Analytics / reporting',
  'Other',
]

export default function ContactPage() {
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    workEmail: '',
    inquiryType: '',
    message: '',
    consent: false,
  })
  const [submission, setSubmission] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error'
    reference?: string
    message?: string
  }>({ status: 'idle' })

  useEffect(() => {
    const type = searchParams.get('type')
    if (type === 'client') {
      setFormData((prev) => ({ ...prev, inquiryType: 'Existing client support' }))
    }
  }, [searchParams])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, type, value } = e.target
    const nextValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData((prev) => ({ ...prev, [name]: nextValue }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmission({ status: 'submitting' })
    try {
      const result = await submitPublicIntake('contact', formData)
      setSubmission({ status: 'success', reference: result.reference })
    } catch (error) {
      setSubmission({
        status: 'error',
        message: error instanceof Error ? error.message : 'We could not send your message.',
      })
    }
  }

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden hero-section-pad section-band-a">
        <div className="relative home-container">
          <div className="hero-copy max-w-3xl mx-auto text-center">
            <h1 className="type-h1 mb-5">
              <span className="block">Connect with the</span>
              <span className="block">DocFlow Team</span>
            </h1>
            <p className="hero-lead mb-8 max-w-2xl mx-auto">
              Onboarding, integration, or account support — leave your details and we will respond
              within one business day
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad-home section-band-b">
        <div className="home-container max-w-3xl mx-auto">
          <div className="rounded-2xl bg-white shadow-[0_16px_36px_-28px_rgba(15,23,42,0.35)] px-6 py-8 sm:px-10 sm:py-10">
            {submission.status === 'success' ? (
              <div className="text-center py-10" role="status">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-50 rounded-full mb-5">
                  <Mail size={32} className="text-sky-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Thank You</h2>
                <p className="text-slate-600 font-medium mb-6 leading-relaxed">
                  We have received your inquiry and will respond within one business day.
                </p>
                {submission.reference && (
                  <p className="text-sm font-bold text-sky-700 mb-6">
                    Reference: {submission.reference}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setSubmission({ status: 'idle' })}
                  className="text-sky-600 hover:text-sky-700 font-bold transition-colors"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                  Send a Message
                </h2>
                <p className="text-slate-600 text-sm font-medium mb-8 leading-relaxed">
                  For a structured pilot setup,{' '}
                  <Link to="/pilot#pilot-request" className="text-sky-600 font-bold hover:text-sky-700">
                    request a DocFlow pilot
                  </Link>
                  . For production service, use{' '}
                  <Link to="/get-started" className="text-sky-600 font-bold hover:text-sky-700">
                    Get Started
                  </Link>
                  . This form remains for general enquiries and support.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  aria-busy={submission.status === 'submitting'}
                >
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full name</label>
                    <input
                      type="text"
                      name="fullName"
                      aria-label="Full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Company name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      aria-label="Company name"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Your company"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Work email</label>
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
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Inquiry type
                    </label>
                    <select
                      name="inquiryType"
                      aria-label="Inquiry type"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                      required
                    >
                      <option value="">Select inquiry type...</option>
                      {inquiryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      aria-label="Message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      rows={5}
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
                      I agree that Symantum may use these details to respond under the{' '}
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
                    className="w-full btn-primary text-sm px-8 py-3.5 font-bold mt-2 flex justify-center items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submission.status === 'submitting' ? 'Sending…' : 'Send Message'}
                    {submission.status !== 'submitting' && <ArrowRight size={16} />}
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-slate-600 font-medium mb-1">
              Australia-based operator — Symantum Pty Ltd
            </p>
            <p className="text-sm text-slate-500">
              General enquiries:{' '}
              <a
                href="mailto:hello@df.symantum.com"
                className="text-sky-600 font-bold hover:text-sky-700"
              >
                hello@df.symantum.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad-home section-band-d">
        <div className="home-container-narrow text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Ready to Start a Pilot?
          </h2>
          <p className="text-white text-base mb-8 max-w-lg mx-auto leading-relaxed font-medium">
            Tell us about your document volume and modules — we will map DocFlow to your workflow.
          </p>
          <Link to="/pilot#pilot-request" className="btn-primary text-sm px-8 py-3.5 font-bold">
            Request a DocFlow pilot <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
