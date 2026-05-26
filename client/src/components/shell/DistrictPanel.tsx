import { motion } from 'framer-motion'
import type { District } from '../../types/city'

type DistrictPanelProps = {
  district: District
}

export function DistrictPanel({ district }: DistrictPanelProps) {
  return (
    <motion.aside
      key={district.id}
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      className="pointer-events-auto rounded border border-white/15 bg-slate-950/75 p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur"
    >
      <p className="text-xs font-semibold tracking-[0.18em] text-cyan-200 uppercase">
        Active district
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-white">{district.name}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">{district.label}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-300">
        <span className="rounded border border-cyan-300/25 bg-cyan-300/10 px-2 py-2">Matching</span>
        <span className="rounded border border-pink-300/25 bg-pink-300/10 px-2 py-2">
          Chat ready
        </span>
        <span className="rounded border border-emerald-300/25 bg-emerald-300/10 px-2 py-2">
          Profiles
        </span>
        <span className="rounded border border-amber-300/25 bg-amber-300/10 px-2 py-2">Events</span>
      </div>
    </motion.aside>
  )
}
