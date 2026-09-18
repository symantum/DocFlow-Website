import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const essays: {
  id: string
  number: string
  title: string
  takeaway: string
  paragraphs: string[]
  cta: { label: string; to: string }
}[] = [
  {
    id: 'model',
    number: '01',
    title: 'A Managed Digital Operations Platform, Operated for Outcomes',
    takeaway:
      'Stop buying labour arbitrage or “good enough” OCR when you still re-check every invoice before the books.',
    paragraphs: [
      'For years, finance teams scaled supplier-document work in two ways: more people in-house, or human-heavy BPO. Outsourcing moved keying and chasing to another timezone. It often cut labour cost — but variance, delay, and rework stayed in the process.',
      'The next wave promised escape through pure AI capture tools. Those systems guess layouts and fields. On complex, multi-page supply-chain invoices they misread lines, shift decimals, and still look confident. When the published “accuracy” rate leaves finance auditing the full batch, the tool did not remove work — it only moved where the risk sits.',
      'A digital operations factory is different. Unorganized supplier PDFs are inputs. They move through deterministic extraction, contextual AI checks that suggest rather than silently overwrite, and human confirmation before release. The output is verified data into your accounting workflow — delivered as a managed service (BPaaS), not software you install and staff alone.',
      'DocFlow is that factory: Gateway intake, Automation through to sync, and optional Analytics on verified invoice data. Symantum operates it. You buy outcomes — clean documents in the books, and spend intelligence when you need it.',
    ],
    cta: { label: 'See DocFlow Automation', to: '/automation' },
  },
  {
    id: 'credentials',
    number: '02',
    title: 'A 30-Day DocFlow Pilot Blueprint',
    takeaway:
      'Define volume, document mix, and “verified to sync” success before you talk about a wider rollout.',
    paragraphs: [
      'A useful pilot is not a feature tour. It is a short operating test with clear inputs and a clear pass mark.',
      'Before kickoff, lock four facts: monthly document volume band, document mix (invoices, credit notes, statements, bundled PDFs), primary accounting system and preferred delivery path, and whether you need Automation only or Automation plus Analytics. Those answers shape intake aliases, review load, and how outputs reach your books.',
      'During the 30-day pilot, success should be visible in the workflow: supplier documents arrive through your DocFlow Gateway; exceptions sit in a controlled review path instead of inbox chaos; confirmed records sync or export on the agreed path; and — if Analytics is in scope — verified totals are readable as spend, not as another spreadsheet rebuild.',
      'Use the pilot to decide scale, not to debate theory. If verified-to-sync quality and turnaround meet the bar you set, expand sites or volume. If not, adjust document mix, review rules, or delivery before a wider commitment.',
    ],
    cta: { label: 'Request a DocFlow pilot', to: '/pilot#pilot-request' },
  },
  {
    id: 'verified-capture',
    number: '03',
    title: 'Why Verified Data Matters More Than Capture Accuracy',
    takeaway:
      'If finance still audits the full batch, the tool didn’t remove work — it only moved where the risk sits.',
    paragraphs: [
      'Capture tools are often sold on a headline accuracy number. In AP, that number is the wrong north star. A batch that is “mostly right” still forces people to hunt for the wrong total, the wrong supplier, or the wrong buyer entity — because a confident error is more dangerous than an empty field.',
      'Verification means the figure is not trusted until it has passed controlled gates: structured extraction where rules hold, AI that flags context problems without silently rewriting the record, and human confirmation on what matters before anything is released downstream.',
      'That is why DocFlow separates suggestion from final value, holds delivery until confirmation is complete, and keeps a review path you can defend later. Integrity is not a slogan on this page — it is the condition that makes Automation safe and Analytics meaningful.',
    ],
    cta: { label: 'See Data Integrity', to: '/data-integrity' },
  },
  {
    id: 'spend-control',
    number: '04',
    title: 'When Verified Invoice Data Becomes Spend Control',
    takeaway:
      'Analytics protects margin only after Automation makes the figures trustworthy; it does not replace AP control.',
    paragraphs: [
      'Purchase analytics built on messy or half-checked invoices creates confident nonsense: wrong vendor concentration, false spikes, and budget alerts on totals nobody trusts. Spend control has to sit on verified invoice data — the same records that were fit to sync.',
      'When that foundation is in place, Analytics earns its keep: monthly spend you can open to the invoice, vendor and category share, anomaly signals, and budgetary guardrails while the period is still open. That is margin protection and operating visibility — not another capture product.',
      'When it does not apply: if your immediate problem is still inbox chaos, brittle extraction, or early push to the ledger, fix Automation and integrity first. Analytics will not heal bad inputs. Add it when you want to act on spend patterns — not when you still cannot trust the line.',
    ],
    cta: { label: 'See DocFlow Analytics', to: '/analytics' },
  },
]

export default function ResourcesPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden hero-section-pad section-band-a">
        <div className="relative home-container">
          <div className="hero-copy max-w-3xl mx-auto text-center">
            <h1 className="type-h1 mb-5">
              <span className="block">Digital Operations Intelligence</span>
              <span className="block">and Frameworks</span>
            </h1>
            <p className="hero-lead mb-8 max-w-2xl mx-auto">
              Practical frameworks for finance and procurement leaders — how to choose a model, run
              a pilot, demand verified data, and know when spend analytics is worth it
            </p>
            <a href="#model" className="btn-primary text-sm px-8 py-3.5 font-bold inline-flex items-center gap-2">
              Read the frameworks <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section id="company" className="section-pad-home section-band-b scroll-mt-28">
        <div className="home-container max-w-3xl mx-auto text-center">
          <p className="text-sm font-bold text-sky-600 tracking-wide mb-3">Company</p>
          <h2 className="type-h2 mb-5">From Process Expertise to Digital Operations</h2>
          <p className="hero-lead mb-6">
            Symantum began in Melbourne in 2004 as an Australian-owned outsourced business process
            services provider. Over more than two decades, we have built practical expertise in
            complex document processing, data extraction, workflow design, quality control and
            client-specific service delivery across document-intensive operations.
          </p>
          <p className="text-[13px] sm:text-sm text-slate-700 leading-relaxed font-medium">
            Advances in cloud technology, intelligent automation and AI enabled us to transform
            that accumulated operating experience into a more scalable digital service. DocFlow
            is the natural outcome: a cloud-based service platform that brings controlled Gateway
            intake, Automation, contextual AI, human verification, validated delivery and optional
            spend intelligence into one managed workflow. Delivered through a BPaaS model,
            DocFlow combines technology with Symantum&apos;s operational expertise, giving clients
            a dependable digital capability while we remain accountable for operating the process
            and delivering the outcome.
          </p>
        </div>
      </section>

      {essays.map((essay, index) => {
        const band = index % 2 === 0 ? 'section-band-c' : 'section-band-a'
        return (
          <section
            key={essay.id}
            id={essay.id}
            className={`section-pad-home ${band} scroll-mt-28`}
          >
            <div className="home-container max-w-3xl mx-auto">
              <p className="text-sm font-bold text-sky-600 tracking-wide mb-3 tabular-nums">
                Framework {essay.number}
              </p>
              <h2 className="type-h2 mb-5">{essay.title}</h2>

              <div className="rounded-2xl bg-[#F8FAFC] px-5 py-4 sm:px-6 sm:py-5 mb-8 flex gap-3 items-start">
                <span className="mt-0.5 w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 inline-flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} />
                </span>
                <p className="text-sm sm:text-[15px] text-slate-800 leading-relaxed font-semibold">
                  {essay.takeaway}
                </p>
              </div>

              <div className="space-y-5 mb-8">
                {essay.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 48)}
                    className="text-[13px] sm:text-sm text-slate-700 leading-relaxed font-medium"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <Link
                to={essay.cta.to}
                className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700"
              >
                {essay.cta.label} <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        )
      })}

      <section className="section-pad-home section-band-d">
        <div className="home-container-narrow text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Ready to Test This on Your Documents?
          </h2>
          <p className="text-white text-base mb-8 max-w-lg mx-auto leading-relaxed font-medium">
            Request a DocFlow pilot — we map Automation and optional Analytics to your volume and
            systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link to="/pilot#pilot-request" className="btn-primary text-sm px-8 py-3.5 font-bold">
              Request a DocFlow pilot <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="text-sm font-bold text-white/90 hover:text-white underline underline-offset-4"
            >
              Or contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
