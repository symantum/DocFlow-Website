import { Link } from 'react-router-dom'

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <section className="pt-32 pb-16 px-6 border-b border-slate-100">
        <div className="max-w-2xl mx-auto">
          <span className="section-eyebrow mb-6 inline-flex">
            <span className="eyebrow-dot" />
            Legal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-slate-600 leading-relaxed mb-4">
            Symantum Pty Ltd (&ldquo;Symantum&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates DocFlow and related
            document processing services for business clients. We handle supplier and accounts payable documents
            and derived datasets on your behalf under agreed service terms.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Our Pilot, Get Started, and Contact journeys may collect business contact and workflow
            information needed to qualify and respond to your request. Production passwords, API
            secrets, and connector credentials must not be submitted through these public forms.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            A full privacy policy aligned with Australian privacy law and our operational model is being finalised.
            Until published here, please contact us for questions about how client data is collected, used, stored,
            and protected — including data residency and access controls described on our{' '}
            <Link to="/data-integrity" className="text-sky-600 font-semibold hover:underline">
              Data Integrity
            </Link>{' '}
            page.
          </p>
          <p className="text-slate-500 text-sm">
            Last updated: September 2026 ·{' '}
            <Link to="/contact" className="text-sky-600 font-semibold hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
