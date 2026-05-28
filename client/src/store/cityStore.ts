import { create } from 'zustand'
import { districts } from '../data/districts'
import type { District } from '../types/city'

const defaultDistrict = districts.find((district) => district.id === 'startup-cafe') ?? districts[0]

type CityState = {
  activeDistrict: District
  setActiveDistrict: (district: District) => void
}

export const useCityStore = create<CityState>((set) => ({
  activeDistrict: defaultDistrict,
  setActiveDistrict: (district) => set({ activeDistrict: district }),
}))
