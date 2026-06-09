import { Link } from 'react-router-dom'
import { MapPin, Phone, PrinterIcon, ArrowRight } from 'lucide-react'

const productLinks = [
  { to: '/products', label: 'AP Workflows Engine' },
  { to: '/products', label: 'CSA Intelligence Portal' },
]
const companyLinks = [
  { to: '/services',   label: 'Services' },
  { to: '/technology', label: 'Technology' },
  { to: '/about',      label: 'About Us' },
  { to: '/contact',    label: 'Contact' },
]
const livePortals = [
  { href: 'https://ap.symantum.com/',   label: 'AP Portal →' },
  { href: 'https://csa.symantum.com/', label: 'CSA Dashboard →' },
]

export default function Footer() {
  return (
    <footer className="bg-[#030712] border-t border-white/[0.06]">

      {/* CTA band */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg mb-1">Ready to see it in action?</p>
            <p className="text-slate-400 text-sm">Start your free 30-day audit — no setup fees, no software to install.</p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500
                       text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-900/30 hover:-translate-y-0.5"
          >
            Request Free Pilot <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40">
              <span className="text-white font-black text-sm">S</span>
            </div>
            <span className="font-bold text-white text-lg tracking-tight">Symantum</span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
            High-integrity financial data pipelines and spend intelligence built for Australian enterprises. AI-powered. Human-verified.
          </p>
          <div className="flex flex-col gap-2">
            {livePortals.map(p => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
              >
                {p.label}
              </a>
            ))}
          </div>
        </div>

        {/* Products */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Products</p>
          <ul className="space-y-2.5">
            {productLinks.map(l => (
              <li key={l.label}>
                <Link to={l.to} className="text-slate-400 hover:text-white text-sm transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Company</p>
          <ul className="space-y-2.5">
            {companyLinks.map(l => (
              <li key={l.label}>
                <Link to={l.to} className="text-slate-400 hover:text-white text-sm transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Offices */}
        <div className="space-y-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">Australia</p>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex gap-2"><MapPin size={13} className="text-blue-400 mt-0.5 shrink-0" /><span>247 Bouverie Street, Carlton VIC 3053</span></div>
              <div className="flex gap-2"><Phone size={13} className="text-blue-400 mt-0.5 shrink-0" /><span>+61 3 9342 2458</span></div>
              <div className="flex gap-2"><PrinterIcon size={13} className="text-blue-400 mt-0.5 shrink-0" /><span>Fax: +61 3 9342 2478</span></div>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">China</p>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex gap-2"><MapPin size={13} className="text-blue-400 mt-0.5 shrink-0" /><span>B306 Han Yun, Xi'an Software Development Zone, Shaanxi</span></div>
              <div className="flex gap-2"><Phone size={13} className="text-blue-400 mt-0.5 shrink-0" /><span>+86 29 8760 7723</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04] px-6 py-5 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-slate-600 text-xs">© 2026 Symantum Pty Ltd. All rights reserved.</p>
        <div className="flex items-center gap-4">
          {['BPaaS', 'AI-Powered', 'ISO Compliant', 'Australian Hosted'].map(tag => (
            <span key={tag} className="text-slate-600 text-xs">{tag}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}
