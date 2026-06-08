import { useState } from 'react'
import { Send, MapPin, Phone } from 'lucide-react'

const countries = [
  'Australia','China','United States','United Kingdom','Canada','New Zealand','Singapore',
  'Hong Kong','Japan','South Korea','India','Germany','France','Netherlands','Other',
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', company: '', country: '', phone: '', email: '', comments: '',
  })

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production this would POST to a backend endpoint or form service
    setSubmitted(true)
  }

  const inputClass = "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all"
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5"

  return (
    <div className="pt-28 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label mb-3">Get In Touch</p>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Talk to us
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Tell us about your business and we'll recommend the right service tier. No obligation, no hard sell.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-12 text-center">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Send size={24} className="text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Message received</h2>
                <p className="text-slate-500">Thank you — our team will be in touch within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-slate-100 shadow-sm rounded-2xl p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>First Name <span className="text-emerald-500">*</span></label>
                    <input required className={inputClass} placeholder="Jane" value={form.firstName} onChange={set('firstName')} />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name <span className="text-emerald-500">*</span></label>
                    <input required className={inputClass} placeholder="Smith" value={form.lastName} onChange={set('lastName')} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Company Name <span className="text-emerald-500">*</span></label>
                  <input required className={inputClass} placeholder="Acme Pty Ltd" value={form.company} onChange={set('company')} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Country <span className="text-emerald-500">*</span></label>
                    <select required className={inputClass + ' cursor-pointer'} value={form.country} onChange={set('country')}>
                      <option value="">Select country</option>
                      {countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number <span className="text-emerald-500">*</span></label>
                    <input required className={inputClass} placeholder="+61 4XX XXX XXX" value={form.phone} onChange={set('phone')} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Email Address <span className="text-emerald-500">*</span></label>
                  <input required type="email" className={inputClass} placeholder="jane@company.com" value={form.email} onChange={set('email')} />
                </div>

                <div>
                  <label className={labelClass}>Comments</label>
                  <textarea
                    rows={4}
                    className={inputClass + ' resize-none'}
                    placeholder="Tell us about your invoice volume, current systems, or what you're looking to automate..."
                    value={form.comments}
                    onChange={set('comments')}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  Send Message <Send size={15} />
                </button>
              </form>
            )}
          </div>

          {/* Side info */}
          <div className="space-y-5">
            <div className="feature-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🇦🇺</span>
                <p className="font-semibold text-slate-800 text-sm">Australia</p>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex gap-2">
                  <MapPin size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span>247 Bouverie Street, Carlton VIC 3053</span>
                </div>
                <div className="flex gap-2">
                  <Phone size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span>+61 3 9342 2458</span>
                </div>
              </div>
            </div>

            <div className="feature-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🇨🇳</span>
                <p className="font-semibold text-slate-800 text-sm">China</p>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex gap-2">
                  <MapPin size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span>B306 Han Yun, Xi'an Software Development Zone, Shaanxi</span>
                </div>
                <div className="flex gap-2">
                  <Phone size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span>+86 29 8760 7723</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <p className="section-label mb-3">Try Before You Talk</p>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Both portals are live and open for exploration. Log in with the demo credentials to see the full workflow before reaching out.
              </p>
              <div className="space-y-2">
                <a
                  href="https://frontend-apportal.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2 rounded-lg bg-blue-600/20 border border-blue-400/20 text-blue-400 text-xs font-semibold hover:bg-blue-600/30 transition-colors"
                >
                  AP Portal Demo →
                </a>
                <a
                  href="https://csa-dashboard-omega.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2 rounded-lg bg-cyan-600/20 border border-cyan-400/20 text-cyan-400 text-xs font-semibold hover:bg-cyan-600/30 transition-colors"
                >
                  CSA Portal Demo →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
