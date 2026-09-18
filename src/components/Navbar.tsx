import { useState, useEffect } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { Menu, X } from 'lucide-react'



const navMenu = [

  {

    label: 'Automation',

    to: '/automation',

    abstract: 'Engine',

    items: [

      { label: 'Operational Friction', sub: 'What DocFlow Automation reduces', to: '/automation#friction' },

      { label: 'Automation Engine', sub: 'How DocFlow works from intake to sync', to: '/automation#pipeline' },

      { label: 'Expected Outcomes', sub: 'Verified data delivered into your workflow', to: '/automation#outcome' },

    ],

  },

  {

    label: 'Analytics',

    to: '/analytics',

    abstract: 'Intelligence',

    items: [

      { label: 'Cost Vulnerabilities', sub: 'What spend exposures are mitigated', to: '/analytics#vulnerabilities' },

      { label: 'Analytics Capabilities', sub: 'How verified data becomes intelligence', to: '/analytics#intelligence' },

      { label: 'Expected Outcomes', sub: 'Visibility finance teams can act on', to: '/analytics#outcome' },

    ],

  },

  {

    label: 'Data Integrity',

    to: '/data-integrity',

    abstract: 'Assurance',

    items: [

      { label: 'Integrity Risks', sub: 'What reliability and control risks are managed', to: '/data-integrity#risks' },

      { label: 'Assurance Architecture', sub: 'How DocFlow protects data integrity', to: '/data-integrity#architecture' },

      { label: 'Expected Outcomes', sub: 'Verified data trusted before delivery', to: '/data-integrity#outcome' },

    ],

  },

  {

    label: 'Resources',

    to: '/resources',

    abstract: 'Blueprint',

    items: [

      {
        label: 'Company Journey',
        sub: 'How process expertise became digital operations',
        to: '/resources#company',
      },

      {
        label: 'Managed Digital Operations',
        sub: 'How Symantum operates DocFlow for outcomes',
        to: '/resources#model',
      },

      {
        label: 'Decision Frameworks',
        sub: 'Pilot, verification and spend-control guidance',
        to: '/resources#credentials',
      },

    ],

  },

  {

    label: 'Pricing',

    to: '/pricing',

    abstract: 'Engagement Options',

    items: [

      {
        label: 'Complimentary 30-Day Pilot',
        sub: 'Qualified, fixed-scope operational validation',
        to: '/pilot',
      },

      {
        label: 'Production Service Pricing',
        sub: 'Managed BPaaS pricing for ongoing operation',
        to: '/pricing',
      },

    ],

  },

]



const CLIENT_LOGIN_URL = 'https://csa.symantum.com/login'



export default function Navbar() {

  const [open, setOpen] = useState(false)

  const [scrolled, setScrolled] = useState(false)

  const { pathname } = useLocation()



  useEffect(() => {

    const onScroll = () => setScrolled(window.scrollY > 24)

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)

  }, [])



  useEffect(() => { setOpen(false) }, [pathname])



  return (

    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled

        ? 'bg-white/90 backdrop-blur-md border-b border-slate-200'

        : 'bg-transparent'

      }`}>

      <nav className="max-w-5xl mx-auto px-6 md:px-8 flex items-center justify-between" style={{ height: '72px' }}>



        <div className="flex items-center gap-8">

          <Link to="/" className="flex items-center gap-3 group shrink-0">

            <img src="/favicon.svg" alt="DocFlow" className="w-9 h-9 object-contain group-hover:scale-105 transition-transform duration-300" />

            <div className="flex flex-col leading-none">

              <span className="font-extrabold text-lg tracking-tighter" style={{ color: '#1A7BB8' }}>DocFlow</span>

              <span className="text-[9px] text-slate-400 font-medium tracking-wide hidden sm:block">by Symantum</span>

            </div>

          </Link>



          <div className="hidden md:flex items-center gap-1">

            {navMenu.map(menu => (

              <div key={menu.label} className="relative group">

                <Link to={menu.to}

                  className={`px-4 py-2 rounded-lg text-[15px] font-bold tracking-tight transition-colors duration-200 ${

                    pathname === menu.to

                      ? 'text-sky-600 bg-sky-50'

                      : 'text-slate-900 hover:bg-slate-100'

                  }`}

                >

                  {menu.label}

                </Link>



                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">

                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xl min-w-80">

                    <div className="mb-4 pb-3 border-b border-slate-100">

                      <p className="text-lg font-bold text-sky-600">{menu.abstract}</p>

                    </div>



                    <div className="space-y-2">

                      {menu.items.map(item => (

                        <Link key={item.label} to={item.to}

                          className="block px-3 py-2 rounded-lg hover:bg-sky-50 transition-colors group/item"

                        >

                          <p className="text-sm font-semibold text-slate-800 group-hover/item:text-sky-600 transition-colors duration-200">{item.label}</p>

                          <p className="text-xs text-slate-500">{item.sub}</p>

                        </Link>

                      ))}

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>



        <div className="hidden md:flex items-center gap-3">

          <a

            href={CLIENT_LOGIN_URL}

            target="_blank"

            rel="noopener noreferrer"

            title="For activated DocFlow clients"

            className="text-[15px] font-bold text-slate-700 hover:text-sky-600 transition-colors"

          >

            Client Login

          </a>

          <Link

            to="/get-started"

            className="px-5 py-2.5 rounded-full bg-sky-600 hover:bg-sky-500 text-white text-[15px] font-bold

                       transition-all duration-200 shadow-md shadow-sky-600/20 hover:shadow-lg hover:-translate-y-0.5"

          >

            Get Started

          </Link>

        </div>



        <button

          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"

          onClick={() => setOpen(o => !o)}

          aria-label="Toggle menu"

        >

          {open ? <X size={20} /> : <Menu size={20} />}

        </button>

      </nav>



      {open && (

        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl">

          <div className="max-w-5xl mx-auto px-6 py-4 space-y-3">

            {navMenu.map(menu => (

              <div key={menu.label}>

                <Link to={menu.to}

                  className={`block px-3 py-2.5 rounded-xl text-[15px] font-bold tracking-tight transition-colors ${pathname === menu.to ? 'bg-sky-50 text-sky-600' : 'text-slate-900 hover:bg-slate-100'

                    }`}

                >

                  {menu.label}

                </Link>

                <div className="ml-3 mt-2 space-y-1 border-l border-slate-200 pl-3">

                  <p className="text-xs font-bold uppercase tracking-widest text-sky-600/70 mb-2">{menu.abstract}</p>

                  {menu.items.map(item => (

                    <Link key={item.label} to={item.to}

                      onClick={() => setOpen(false)}

                      className="block px-2 py-1.5 rounded text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"

                    >

                      {item.label}

                    </Link>

                  ))}

                </div>

              </div>

            ))}

            <div className="h-px bg-slate-100 my-2" />

            <a

              href={CLIENT_LOGIN_URL}

              target="_blank"

              rel="noopener noreferrer"

              title="For activated DocFlow clients"

              className="block px-3 py-2.5 text-sm font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 rounded-xl transition-colors"

            >

              Client Login

            </a>

            <div className="pt-3 pb-1">

              <Link to="/get-started"

                className="block text-center py-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold transition-colors shadow-md"

              >

                Get Started

              </Link>

            </div>

          </div>

        </div>

      )}

    </header>

  )

}


