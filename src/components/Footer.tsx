import { Link } from 'react-router-dom'
import { siteConfig } from '../config/site'

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const productLinks = [
  { to: '/automation', label: 'Automation' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/data-integrity', label: 'Data Integrity' },
  { to: '/resources', label: 'Resources' },
  { to: '/pricing', label: 'Pricing' },
]

const actionLinks = [
  { to: '/pilot#pilot-request', label: 'Request a Pilot' },
  { to: '/get-started', label: 'Get Started' },
  { to: '/contact', label: 'Contact' },
  { href: 'https://csa.symantum.com/login', label: 'Client Login', external: true },
]

const legalLinks = [
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
]

const socialLinks = [
  {
    label: 'Symantum on LinkedIn',
    href: siteConfig.social.linkedIn,
    icon: LinkedInIcon,
  },
  ...(siteConfig.social.youTube
    ? [{ label: 'DocFlow on YouTube', href: siteConfig.social.youTube, icon: YouTubeIcon }]
    : []),
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2.5 mb-3 group">
            <img
              src="/favicon.svg"
              alt="DocFlow"
              className="w-8 h-8 object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <span className="font-extrabold text-lg tracking-tighter" style={{ color: '#1A7BB8' }}>
              DocFlow
            </span>
          </Link>
          <p className="text-slate-700 text-sm leading-snug max-w-xs">
            A digital factory for your back office. Operated by {siteConfig.company.name}.
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700 mb-2.5">DocFlow</p>
          <ul className="space-y-1.5">
            {productLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-slate-700 hover:text-sky-600 text-sm transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700 mb-2.5">Get in touch</p>
          <ul className="space-y-1.5">
            {actionLinks.map((l) => (
              <li key={l.label}>
                {'external' in l && l.external ? (
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-sky-600 text-sm transition-colors"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link to={l.to!} className="text-slate-700 hover:text-sky-600 text-sm transition-colors">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-slate-50/60">
        <div className="max-w-5xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-sky-600 transition-colors"
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{label.includes('LinkedIn') ? 'LinkedIn' : 'YouTube'}</span>
              </a>
            ))}
          </div>

          <nav aria-label="Legal and policies" className="flex flex-wrap items-center justify-center gap-x-1 text-sm">
            {legalLinks.map((link, i) => (
              <span key={link.label} className="inline-flex items-center">
                {i > 0 && (
                  <span className="text-slate-300 mx-2 select-none" aria-hidden>
                    ·
                  </span>
                )}
                <Link to={link.to} className="text-slate-500 hover:text-sky-600 font-medium transition-colors">
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>

          <p className="text-slate-400 text-xs order-last sm:order-none">
            © 2026 {siteConfig.company.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
