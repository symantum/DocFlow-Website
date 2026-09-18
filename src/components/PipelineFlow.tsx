import { Mail, Cog, RefreshCw, TrendingUp, ChevronRight } from 'lucide-react'

const stages = [
  {
    icon: Mail,
    label: 'Receive',
    shortLabel: 'Receive',
    detail: 'DocFlow Gateway',
    color: 'bg-sky-50 text-sky-600 border-sky-100',
    ring: 'ring-sky-100',
  },
  {
    icon: Cog,
    label: 'Process',
    shortLabel: 'Process',
    detail: 'DocFlow Automation',
    color: 'bg-violet-50 text-violet-600 border-violet-100',
    ring: 'ring-violet-100',
  },
  {
    icon: RefreshCw,
    label: 'Sync',
    shortLabel: 'Sync',
    detail: 'Validated outputs',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    ring: 'ring-emerald-100',
  },
  {
    icon: TrendingUp,
    label: 'Analyse',
    shortLabel: 'Analyse',
    detail: 'DocFlow Analytics',
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    ring: 'ring-amber-100',
  },
]

export { stages as pipelineStages }

export default function PipelineFlow({ compact = false }: { compact?: boolean }) {
  return (
    <div className="w-full">
      <div
        className={`grid grid-cols-2 lg:grid-cols-4 gap-3 ${compact ? '' : 'sm:gap-4'}`}
        role="list"
        aria-label="DocFlow pipeline: Receive, Process, Sync, Analyse"
      >
        {stages.map((stage, i) => (
          <div key={stage.label} className="relative flex flex-col" role="listitem">
            <div
              className={`flex flex-col items-center text-center rounded-2xl border p-4 sm:p-5 h-full ring-1 ${stage.color} ${stage.ring}`}
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm">
                <stage.icon size={20} />
              </div>
              <p className="font-bold text-slate-900 text-sm leading-tight">{stage.label}</p>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1">{stage.detail}</p>
            </div>
            {i < stages.length - 1 && (
              <ChevronRight
                size={18}
                className="absolute -right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hidden lg:block"
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
      {!compact && (
        <p className="text-center text-xs text-slate-400 mt-4 max-w-md mx-auto">
          Symantum operates processing. You get validated sync — Analytics optional.
        </p>
      )}
    </div>
  )
}
