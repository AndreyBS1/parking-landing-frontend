import { create } from 'zustand'

interface IFloorStore {
  floor: number | null
  setFloor: (floor: number | null) => void
}

export const useFloorStore = create<IFloorStore>()((set) => ({
  floor: null,
  setFloor: (floor) => set({ floor }),
}))
