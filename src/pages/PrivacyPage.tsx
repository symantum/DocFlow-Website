import { Link } from 'react-router-dom'

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <section className="pt-32 pb-20 px-6 border-b border-slate-100">
        <div className="max-w-2xl mx-auto">
          <span className="section-eyebrow mb-6 inline-flex">
            <span className="eyebrow-dot" />
            Legal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Symantum Pty Ltd · ABN 72 108 321 740 · Last updated 9 October 2026
          </p>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Who we are</h2>
              <p>
                Symantum Pty Ltd (&ldquo;Symantum&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates DocFlow, a
                cloud document service for business clients. This policy explains how we handle personal
                information under the Privacy Act 1988 (Cth) and the Australian Privacy Principles.
              </p>
              <p className="mt-3">
                Privacy questions, access requests, correction requests, and complaints:{' '}
                <a href="mailto:support@symantum.com" className="text-sky-600 font-semibold hover:underline">
                  support@symantum.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">What this policy covers</h2>
              <p>
                It covers this website, including the Pilot, Get Started, and Contact forms, and personal
                information we handle when delivering DocFlow. Access to the client and operations portals is
                also covered by the agreement with your organisation.
              </p>
              <p className="mt-3">
                Do not send production passwords, API secrets, or connector credentials through the public forms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Information we collect</h2>
              <p>On the public forms we collect the details you submit, such as:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>your name, company, and work email</li>
                <li>the enquiry, pilot, or onboarding information you choose to provide</li>
                <li>your consent to be contacted about that request</li>
              </ul>
              <p className="mt-3">
                The site also receives ordinary technical data needed to run it, such as browser type and the
                security check on the form. We use that to operate the site and reduce abuse.
              </p>
              <p className="mt-3">
                When an organisation uses DocFlow, we handle the documents and fields that organisation sends us.
                Those files can contain personal information about people named on an invoice or related record,
                such as a name, email, phone number, or role. We collect that information from the client, not
                from those individuals directly.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Why we use it</h2>
              <p>We use personal information to:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>respond to an enquiry, pilot request, or onboarding request</li>
                <li>provide, secure, and support DocFlow for a client</li>
                <li>read, extract, and check document content as part of that service</li>
                <li>meet legal duties, including record-keeping and breach notification</li>
              </ul>
              <p className="mt-3">
                We do not use a client&rsquo;s documents, or the personal information in them, to market Symantum&rsquo;s
                own services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Client documents</h2>
              <p>
                Documents a client submits are used to perform the service for that client. If you ask about
                personal information that came from a client&rsquo;s documents, we will refer you to that client,
                who decides the content of those records.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Where information is held</h2>
              <p>
                Document files and extracted fields are stored in Australia. See{' '}
                <Link to="/data-integrity" className="text-sky-600 font-semibold hover:underline">
                  Data Integrity
                </Link>{' '}
                for how that storage is described.
              </p>
              <p className="mt-3">
                Authorised personnel may access information from outside Australia when their role requires it.
                We do not name a separate processing centre. Access is limited to what the role needs.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">AI models</h2>
              <p>
                Where an AI model is used, document text may be sent to an AI provider to carry out that part of
                the service, including reading, extracting, or checking document content. That provider may
                process the text outside Australia. The provider can change. Document storage stays in Australia.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Marketing messages</h2>
              <p>
                If we send a commercial email, it will identify Symantum and include a way to unsubscribe.
                We rely on the consent you give on a form, or on another basis the Spam Act 2003 (Cth) allows.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Security and retention</h2>
              <p>
                We take reasonable steps to protect personal information from misuse, interference, loss, and
                unauthorised access, modification, or disclosure. We keep enquiry and service records only for as
                long as we need them for the purpose we collected them, or as long as the law requires, and then
                delete or de-identify them.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Access and correction</h2>
              <p>
                You may ask us for access to personal information we hold about you, or ask us to correct it, by
                emailing{' '}
                <a href="mailto:support@symantum.com" className="text-sky-600 font-semibold hover:underline">
                  support@symantum.com
                </a>
                . We may need to confirm your identity. Where the information sits in a client&rsquo;s documents,
                we will direct you to that client. We may refuse access where the Privacy Act allows it, and we
                will explain the refusal.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Complaints and breaches</h2>
              <p>
                If you believe we have handled your personal information in a way that breaches the Australian
                Privacy Principles, email{' '}
                <a href="mailto:support@symantum.com" className="text-sky-600 font-semibold hover:underline">
                  support@symantum.com
                </a>
                . We will acknowledge the complaint and tell you the outcome. If you are not satisfied, you may
                contact the Office of the Australian Information Commissioner at{' '}
                <a
                  href="https://www.oaic.gov.au"
                  className="text-sky-600 font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  oaic.gov.au
                </a>
                .
              </p>
              <p className="mt-3">
                If we have eligible data breach obligations under the Privacy Act, we will assess the incident and
                notify the Commissioner and affected people when the law requires it.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Changes</h2>
              <p>
                We may update this policy when our service or the law changes. The current version is published
                on this page.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}
