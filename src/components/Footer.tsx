import { Link } from 'react-router-dom'
import { MapPin, Phone, PrinterIcon } from 'lucide-react'

const quickLinks = [
  { to: '/services',   label: 'Services' },
  { to: '/products',   label: 'Products' },
  { to: '/technology', label: 'Technology' },
  { to: '/about',      label: 'About' },
  { to: '/contact',    label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#030712]">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">S</span>
            </div>
            <span className="font-bold text-white text-lg">Symantum</span>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed">
            Intelligent finance automation for businesses of every size. From email to ERP in minutes.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <p className="section-label mb-4">Quick Links</p>
          <ul className="space-y-2">
            {quickLinks.map(l => (
              <li key={l.to}>
                <Link to={l.to} className="text-slate-400 hover:text-white text-sm transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Australia office */}
        <div>
          <p className="section-label mb-4">Australia</p>
          <div className="space-y-2 text-sm text-slate-400">
            <div className="flex gap-2">
              <MapPin size={14} className="text-blue-400 mt-0.5 shrink-0" />
              <span>247 Bouverie Street, Carlton VIC 3053</span>
            </div>
            <div className="flex gap-2">
              <Phone size={14} className="text-blue-400 mt-0.5 shrink-0" />
              <span>+61 3 9342 2458</span>
            </div>
            <div className="flex gap-2">
              <PrinterIcon size={14} className="text-blue-400 mt-0.5 shrink-0" />
              <span>Fax: +61 3 9342 2478</span>
            </div>
          </div>
        </div>

        {/* China office */}
        <div>
          <p className="section-label mb-4">China</p>
          <div className="space-y-2 text-sm text-slate-400">
            <div className="flex gap-2">
              <MapPin size={14} className="text-blue-400 mt-0.5 shrink-0" />
              <span>B306 Han Yun, Xi'an Software Development Zone, Shaanxi</span>
            </div>
            <div className="flex gap-2">
              <Phone size={14} className="text-blue-400 mt-0.5 shrink-0" />
              <span>+86 29 8760 7723</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.04] px-6 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-slate-600 text-xs">© 2026 Symantum Pty Ltd. All rights reserved.</p>
        <p className="text-slate-600 text-xs">BPaaS · AI-Powered · ISO Compliant</p>
      </div>
    </footer>
  )
}
