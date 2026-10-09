import { Link } from 'react-router-dom'

export default function TermsPage() {
  return (
    <div className="bg-white">
      <section className="pt-32 pb-20 px-6 border-b border-slate-100">
        <div className="max-w-2xl mx-auto">
          <span className="section-eyebrow mb-6 inline-flex">
            <span className="eyebrow-dot" />
            Legal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Terms of Use
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Symantum Pty Ltd · ABN 72 108 321 740 · Last updated 9 October 2026
          </p>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">These terms</h2>
              <p>
                These terms apply to your use of the DocFlow website operated by Symantum Pty Ltd
                (&ldquo;Symantum&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) and to the enquiry forms on this site,
                including Pilot, Get Started, and Contact. By using the site or submitting a form, you agree to
                these terms.
              </p>
              <p className="mt-3">
                Questions about these terms:{' '}
                <a href="mailto:support@symantum.com" className="text-sky-600 font-semibold hover:underline">
                  support@symantum.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">The site is not the service contract</h2>
              <p>
                This website describes DocFlow and lets an organisation ask about a pilot or the service. It does
                not, by itself, give access to the client portal, the operations portal, or document processing.
                Those are provided under a separate agreement between Symantum and the client organisation.
              </p>
              <p className="mt-3">
                If that agreement and these terms both speak to the same point about the paid service, the client
                agreement applies.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Using the site and the forms</h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>provide information that is accurate to the best of your knowledge</li>
                <li>use the forms for a genuine business enquiry</li>
                <li>not send passwords, API secrets, or connector credentials through the public forms</li>
                <li>not attempt to disrupt, probe, or misuse the site</li>
              </ul>
              <p className="mt-3">
                Submitting a form does not oblige Symantum to offer a pilot, open an account, or accept a client.
                How we handle the personal information in a form is set out in the{' '}
                <Link to="/privacy" className="text-sky-600 font-semibold hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">No professional advice</h2>
              <p>
                Content on this site is general information about DocFlow. It is not legal, tax, accounting, or
                financial advice. You should get your own advice before relying on it.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Our content</h2>
              <p>
                The site, its text, and its design belong to Symantum or its licensors. You may view it for your
                own business enquiry. You may not copy it for a competing service or remove notices of ownership.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Liability</h2>
              <p>
                The Australian Consumer Law gives rights that cannot be excluded. Nothing in these terms excludes,
                restricts, or modifies those rights, including consumer guarantees, where they apply.
              </p>
              <p className="mt-3">
                The site is provided for general information. To the extent the law allows, Symantum is not liable
                for loss arising from use of the marketing site or from reliance on its general content. Liability
                for the paid DocFlow service is dealt with in the client agreement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Governing law</h2>
              <p>
                These terms are governed by the laws of Australia. The courts of Australia may hear disputes about
                them.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Changes</h2>
              <p>
                We may update these terms. The current version is published on this page. Continuing to use the
                site after an update means you accept the updated terms.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}
