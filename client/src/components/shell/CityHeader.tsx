import type { District } from '../../types/city'
import { DistrictPanel } from './DistrictPanel'

type CityHeaderProps = {
  activeDistrict: District
}

export function CityHeader({ activeDistrict }: CityHeaderProps) {
  return (
    <section className="city-panel pointer-events-none absolute top-20 right-4 left-4 z-10 mx-auto grid max-w-7xl gap-4 md:top-24 md:right-6 md:left-6 md:grid-cols-[minmax(280px,430px)_minmax(280px,380px)] md:justify-between">
      <div className="max-w-[270px] md:max-w-[430px]">
        <p className="text-[0.64rem] font-extrabold tracking-[0.22em] text-emerald-800 uppercase md:text-xs md:tracking-[0.26em]">
          CampusVerse / SkillCity
        </p>
        <h1 className="mt-2 text-xl leading-tight font-extrabold text-slate-950 md:mt-3 md:text-5xl">
          Student network as a living 3D city
        </h1>
        <p className="mt-2 text-sm font-semibold text-slate-700 md:mt-3 md:text-lg">
          Explore. Connect. Build the future.
        </p>
      </div>

      <div className="hidden md:block">
        <DistrictPanel district={activeDistrict} />
      </div>
    </section>
  )
}
