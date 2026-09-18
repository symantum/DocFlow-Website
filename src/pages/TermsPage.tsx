import { Link } from 'react-router-dom'

export default function TermsPage() {
  return (
    <div className="bg-white">
      <section className="pt-32 pb-16 px-6 border-b border-slate-100">
        <div className="max-w-2xl mx-auto">
          <span className="section-eyebrow mb-6 inline-flex">
            <span className="eyebrow-dot" />
            Legal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-6">
            Terms of Use
          </h1>
          <p className="text-slate-600 leading-relaxed mb-4">
            Use of the DocFlow marketing site and enquiry forms is subject to standard website terms. Access to
            DocFlow processing, client portals, and operational services is governed by separate client agreements
            and service schedules between Symantum Pty Ltd and your organisation.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Full website terms of use will be published here. For onboarding, service scope, or contractual
            questions, request a{' '}
            <Link to="/pilot" className="text-sky-600 font-semibold hover:underline">
              30-Day Pilot
            </Link>
            , use{' '}
            <Link to="/get-started" className="text-sky-600 font-semibold hover:underline">
              Get Started
            </Link>{' '}
            or{' '}
            <Link to="/contact" className="text-sky-600 font-semibold hover:underline">
              Contact
            </Link>
            .
          </p>
          <p className="text-slate-500 text-sm">
            Last updated: September 2026
          </p>
        </div>
      </section>
    </div>
  )
}
