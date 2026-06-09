import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const products = [
  { to: '/products', label: 'AP Workflows Engine',     sub: 'Automated invoice ingestion & ERP push' },
  { to: '/products', label: 'CSA Intelligence Portal', sub: 'Executive spend analytics dashboard' },
]

const links = [
  { to: '/services',   label: 'Services' },
  { to: '/technology', label: 'Technology' },
  { to: '/about',      label: 'About' },
  { to: '/contact',    label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [prodOpen, setProdOpen] = useState(false)
  const { pathname }          = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setProdOpen(false) }, [pathname])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[#030712]/90 backdrop-blur-md border-b border-white/[0.06]'
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: '72px' }}>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40 group-hover:bg-blue-500 transition-colors duration-200">
            <span className="text-white font-black text-sm tracking-tight">S</span>
          </div>
          <span className="font-bold text-lg text-white tracking-tight">Symantum</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">

          {/* Products dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProdOpen(true)}
            onMouseLeave={() => setProdOpen(false)}
          >
            <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors">
              Products
              <ChevronDown size={14} className={`transition-transform ${prodOpen ? 'rotate-180' : ''}`} />
            </button>

            {prodOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-slate-900/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 p-2 animate-fade-up">
                {products.map(p => (
                  <Link key={p.label} to={p.to}
                    className="flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-white/[0.06] transition-colors group"
                  >
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">{p.label}</span>
                    <span className="text-xs text-slate-500">{p.sub}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.to
                  ? 'text-white bg-white/[0.08]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://ap.symantum.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Sign In
          </a>
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold
                       transition-all duration-200 shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 hover:-translate-y-0.5"
          >
            Request Free Pilot →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#030712]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 mb-2">Products</p>
            {products.map(p => (
              <Link key={p.label} to={p.to}
                className="flex flex-col gap-0.5 px-3 py-3 rounded-xl hover:bg-white/[0.06] transition-colors"
              >
                <span className="text-sm font-semibold text-slate-200">{p.label}</span>
                <span className="text-xs text-slate-500">{p.sub}</span>
              </Link>
            ))}
            <div className="h-px bg-white/[0.06] my-2" />
            {links.map(l => (
              <Link key={l.to} to={l.to}
                className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  pathname === l.to ? 'bg-white/[0.08] text-white' : 'text-slate-400 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 pb-1">
              <Link to="/contact"
                className="block text-center py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
              >
                Request Free 30-Day Pilot →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
