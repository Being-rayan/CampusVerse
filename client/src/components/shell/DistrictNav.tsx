import { BriefcaseBusiness, Coffee, Code2, FlaskConical, Rocket, Users } from 'lucide-react'
import { districts } from '../../data/districts'
import type { District } from '../../types/city'

const districtIcons = [
  Users,
  FlaskConical,
  Rocket,
  BriefcaseBusiness,
  Code2,
  BriefcaseBusiness,
  Coffee,
]

type DistrictNavProps = {
  activeDistrict: District
  onSelect: (district: District) => void
}

export function DistrictNav({ activeDistrict, onSelect }: DistrictNavProps) {
  return (
    <nav className="pointer-events-auto absolute right-4 bottom-4 left-4 mx-auto flex max-w-6xl gap-2 overflow-x-auto pb-1 md:bottom-6 md:grid md:grid-cols-7 md:overflow-visible md:pb-0">
      {districts.map((district, index) => {
        const Icon = districtIcons[index]
        const isActive = district.id === activeDistrict.id

        return (
          <button
            key={district.id}
            type="button"
            onClick={() => onSelect(district)}
            className={`flex min-h-12 min-w-44 items-center gap-2 rounded border px-3 py-2 text-left text-xs font-semibold backdrop-blur transition md:min-h-14 md:min-w-0 ${
              isActive
                ? 'border-emerald-700/35 bg-white/88 text-emerald-950 shadow-lg shadow-emerald-950/10'
                : 'border-emerald-950/10 bg-white/60 text-slate-800 hover:border-emerald-700/25 hover:bg-white/86'
            }`}
          >
            <Icon size={17} />
            <span>{district.name}</span>
          </button>
        )
      })}
    </nav>
  )
}
