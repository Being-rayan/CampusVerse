import { Bell, CalendarDays, MessageCircle, Sparkles, UsersRound } from 'lucide-react'
import type { District } from '../../types/city'

type DistrictPanelProps = {
  district: District
}

export function DistrictPanel({ district }: DistrictPanelProps) {
  const actions = [
    { label: 'Matching', icon: Sparkles },
    { label: 'Chat ready', icon: MessageCircle },
    { label: 'Profiles', icon: UsersRound },
    { label: 'Events', icon: CalendarDays },
  ]

  return (
    <aside
      key={district.id}
      className="city-panel pointer-events-auto rounded border border-white/15 bg-slate-950/75 p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur"
    >
      <p className="text-xs font-semibold tracking-[0.18em] text-cyan-200 uppercase">
        Active district
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-white">{district.name}</h2>
      <p className="mt-2 text-sm leading-6 font-medium text-slate-300">{district.label}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-300">
        {actions.map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            className="flex items-center gap-2 rounded border border-white/12 bg-white/6 px-2 py-2 text-left font-semibold transition hover:-translate-y-0.5 hover:border-cyan-200/50 hover:bg-cyan-300/10"
          >
            <Icon size={15} className="text-cyan-200" />
            {label}
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-cyan-200">
        <Bell size={14} />
        Live platform shell ready
      </div>
    </aside>
  )
}
