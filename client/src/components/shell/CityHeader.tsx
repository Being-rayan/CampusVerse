import { Bell } from 'lucide-react'
import type { District } from '../../types/city'
import { DistrictPanel } from './DistrictPanel'

type CityHeaderProps = {
  activeDistrict: District
}

export function CityHeader({ activeDistrict }: CityHeaderProps) {
  return (
    <section className="city-panel pointer-events-none absolute top-4 right-4 left-4 mx-auto flex max-w-6xl flex-col gap-4 md:top-6 md:right-6 md:left-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-cyan-200 uppercase">
            CampusVerse / SkillCity
          </p>
          <h1 className="mt-2 text-3xl leading-tight font-semibold text-white md:text-5xl">
            Student network as a living 3D city
          </h1>
        </div>
        <div className="pointer-events-auto flex items-center gap-2 rounded border border-white/15 bg-black/35 px-3 py-2 text-sm text-slate-200 backdrop-blur">
          <Bell size={16} />
          <span>Live platform shell ready</span>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_340px]">
        <div className="hidden md:block" />
        <DistrictPanel district={activeDistrict} />
      </div>
    </section>
  )
}
