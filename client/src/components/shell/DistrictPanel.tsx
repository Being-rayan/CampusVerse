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
      className="pointer-events-auto rounded border border-emerald-950/14 bg-[#fffdf6]/94 p-4 shadow-xl shadow-emerald-950/14 backdrop-blur"
    >
      <p className="text-xs font-semibold tracking-[0.18em] text-emerald-800 uppercase">
        Active district
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-950">{district.name}</h2>
      <p className="mt-2 text-sm leading-6 font-medium text-slate-600">{district.label}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-700">
        {actions.map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            className="flex items-center gap-2 rounded border border-emerald-900/14 bg-white px-2 py-2 text-left font-semibold transition hover:-translate-y-0.5 hover:border-emerald-700/24 hover:shadow-md"
          >
            <Icon size={15} className="text-emerald-800" />
            {label}
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-800">
        <Bell size={14} />
        Live platform shell ready
      </div>
    </aside>
  )
}
