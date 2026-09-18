import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export type FaqItem = { question: string; answer: string }

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={item.question} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
            >
              <span className="font-semibold text-slate-900 text-sm">{item.question}</span>
              <ChevronDown
                size={18}
                className={`text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {item.answer}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
