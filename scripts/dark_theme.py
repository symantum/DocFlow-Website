"""
Converts remaining light-theme classes in HomePage.tsx to the dark portal theme.
Run: python scripts/dark_theme.py
"""
import re

path = "src/pages/HomePage.tsx"

with open(path, "r", encoding="utf-8") as f:
    c = f.read()

# ── Helpers ────────────────────────────────────────────────────────────────
def r(old, new):
    global c
    c = c.replace(old, new)

# Root wrapper bg
r('<div className="bg-white">', "<div>")

# Section wrappers
r('section className="py-20 px-6" style={{ backgroundColor: \'#F5F7FA\' }}',
  'section className="py-20 px-6 border-t border-white/[0.06]"')

# Advantage section
r('section className="advantage-bg py-28 px-6">',
  'section className="py-28 px-6 section-alt border-t border-white/[0.06]">')

# Testimonials
r('section className="bg-white py-28 px-6">',
  'section className="py-28 px-6 section-alt border-t border-white/[0.06]">')

# Bottom CTA
r('section className="bg-white py-32 px-6">',
  'section className="py-32 px-6 border-t border-white/[0.06]">')

# ── Hero / eyebrow pill ─────────────────────────────────────────────────────
r('bg-emerald-500/10 border border-emerald-500/20 mb-8 animate-fade-up',
  'bg-blue-500/10 border border-blue-500/20 mb-8 animate-fade-up')
r('w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse',
  'w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse')
r('text-emerald-400 text-xs font-bold uppercase tracking-[0.2em]">\n              AI-POWERED',
  'text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">\n              AI-POWERED')
r('gradient-text-emerald', 'gradient-text-blue')
r('text-slate-500 text-xs animate-fade-up delay-500">',
  'text-slate-400 text-xs animate-fade-up delay-500">')

# Stats icons in hero
r('text-emerald-400 mx-auto mb-2"', 'text-blue-400 mx-auto mb-2"')

# ── Section 2 — AP card ─────────────────────────────────────────────────────
r('bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest',
  'bg-white/[0.06] text-slate-400 text-[10px] font-bold uppercase tracking-widest')
r('font-black text-slate-900 mb-1 group-hover:text-emerald-700',
  'font-black text-white mb-1 group-hover:text-blue-400')
r('text-sm font-semibold text-emerald-600 mb-4">Built for CFOs',
  'text-sm font-semibold text-blue-400 mb-4">Built for CFOs')
r('text-slate-600 text-sm leading-relaxed mb-8 border-b border-slate-100 pb-8',
  'text-slate-400 text-sm leading-relaxed mb-8 border-b border-white/[0.06] pb-8')
r('bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5',
  'bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5')
r('text-emerald-600" />\n                    </div>\n                    <div>\n                      <p className="text-sm font-semibold text-slate-800 mb-0.5">{f.label}',
  'text-blue-400" />\n                    </div>\n                    <div>\n                      <p className="text-sm font-semibold text-slate-200 mb-0.5">{f.label}')
r('text-xs text-slate-500 leading-relaxed">{f.desc}',
  'text-xs text-slate-400 leading-relaxed">{f.desc}')
r('text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors group">',
  'text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group">')

# ── Section 2 — CSA card ────────────────────────────────────────────────────
r('group-hover:text-emerald-400 transition-colors">\n                Symantum CSA',
  'group-hover:text-cyan-400 transition-colors">\n                Symantum CSA')
r('text-sm font-semibold text-emerald-400 mb-4">Built for CEOs',
  'text-sm font-semibold text-cyan-400 mb-4">Built for CEOs')
r('bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5',
  'bg-cyan-500/10 flex items-center justify-center shrink-0 mt-0.5')
r('text-emerald-400" />\n                    </div>\n                    <div>\n                      <p className="text-sm font-semibold text-slate-200 mb-0.5">{f.label}',
  'text-cyan-400" />\n                    </div>\n                    <div>\n                      <p className="text-sm font-semibold text-slate-200 mb-0.5">{f.label}')
r('text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group">',
  'text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group">')

# ── Section 3 — Flow ────────────────────────────────────────────────────────
r('text-slate-500 text-lg max-w-xl mx-auto">\n            The self-correcting',
  'text-slate-400 text-lg max-w-xl mx-auto">\n            The self-correcting')
r('bg-emerald-500 flex items-center justify-center mb-6 shadow-md shadow-emerald-500/25',
  'bg-blue-600 flex items-center justify-center mb-6 shadow-md shadow-blue-900/40')
r('font-bold text-slate-900 mb-1">{step.title}',
  'font-bold text-white mb-1">{step.title}')
r('text-emerald-600 uppercase tracking-wider mb-4">{step.sub}',
  'text-blue-400 uppercase tracking-wider mb-4">{step.sub}')
r('text-sm text-slate-600 leading-relaxed">{step.desc}',
  'text-sm text-slate-400 leading-relaxed">{step.desc}')
r('w-8 h-px bg-emerald-300', 'w-8 h-px bg-blue-500/40')
r('text-emerald-400 -ml-1', 'text-blue-400 -ml-1')

# ── Section 4 — Advantage ───────────────────────────────────────────────────
r('section-eyebrow-light"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />',
  'section-eyebrow"><span className="eyebrow-dot" />')
r('icon-badge-dark group-hover:bg-emerald-500/25', 'icon-badge-dark group-hover:bg-blue-500/20')
r('text-emerald-400 uppercase tracking-wider mb-4">{a.sub}',
  'text-blue-400 uppercase tracking-wider mb-4">{a.sub}')

# ── Stats section ───────────────────────────────────────────────────────────
r('bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center',
  'glass-card p-6 text-center')
r('bg-emerald-50 flex items-center justify-center mx-auto mb-4',
  'bg-blue-500/10 flex items-center justify-center mx-auto mb-4')
r('text-emerald-600" />\n                </div>\n                <p className="text-3xl font-black text-slate-900',
  'text-blue-400" />\n                </div>\n                <p className="text-3xl font-black text-white')
r('text-xs text-slate-500 font-medium leading-snug">{s.label}',
  'text-xs text-slate-400 font-medium leading-snug">{s.label}')

# ── Testimonials ────────────────────────────────────────────────────────────
r('font-black text-slate-900 mb-4">\n            What our clients say',
  'font-black text-white mb-4">\n            What our clients say')
r('bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 p-8 flex flex-col',
  'glass-card p-8 flex flex-col hover:border-white/10 transition-all duration-300')
r('text-slate-700 text-sm leading-relaxed flex-1 mb-6',
  'text-slate-300 text-sm leading-relaxed flex-1 mb-6')
r('pt-4 border-t border-slate-100', 'pt-4 border-t border-white/[0.06]')
r('bg-emerald-600 flex items-center justify-center shrink-0',
  'bg-blue-600 flex items-center justify-center shrink-0')
r('text-sm font-semibold text-slate-800">{t.name}',
  'text-sm font-semibold text-white">{t.name}')

# ── FAQ ─────────────────────────────────────────────────────────────────────
r('font-black text-slate-900">Frequently Asked Questions',
  'font-black text-white">Frequently Asked Questions')
r('bg-white rounded-2xl border border-slate-100 shadow-sm px-8 divide-y divide-slate-100',
  'glass-card px-8 divide-y divide-white/[0.06]')

# ── Bottom CTA ──────────────────────────────────────────────────────────────
r('font-black text-slate-900 mb-6 leading-tight',
  'font-black text-white mb-6 leading-tight')
r('text-slate-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed',
  'text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed')
r('CheckCircle2 size={14} className="text-emerald-500"',
  'CheckCircle2 size={14} className="text-blue-400"')

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("Done — dark theme applied to HomePage.tsx")
