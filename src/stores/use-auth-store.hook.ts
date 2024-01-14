import { create } from 'zustand'

interface IAuthStore {
  accessToken: string | null
  setAccessToken: (accessToken: string | null) => void
}

export const useAuthStore = create<IAuthStore>()((set) => ({
  accessToken: null,
  setAccessToken: (accessToken) => set({ accessToken }),
}))
