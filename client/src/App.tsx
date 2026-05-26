import { useState } from 'react'
import { CityScene } from './components/city/CityScene'
import { CityHeader } from './components/shell/CityHeader'
import { DistrictNav } from './components/shell/DistrictNav'
import { districts } from './data/districts'

function App() {
  const [activeDistrict, setActiveDistrict] = useState(districts[0])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040711] text-slate-100">
      <CityScene activeDistrict={activeDistrict} onSelect={setActiveDistrict} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(17,217,255,0.16),transparent_32%),linear-gradient(180deg,rgba(4,7,17,0)_40%,rgba(4,7,17,0.9)_100%)]" />

      <CityHeader activeDistrict={activeDistrict} />
      <DistrictNav activeDistrict={activeDistrict} onSelect={setActiveDistrict} />
    </main>
  )
}

export default App
