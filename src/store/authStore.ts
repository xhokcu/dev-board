import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthState, User } from '@/types/index'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email, password) => {
        const stored = localStorage.getItem(`user:${email}`)
        if (!stored) return false

        const { password: storedPassword, user } = JSON.parse(stored)
        if (storedPassword !== password) return false

        set({ user, isAuthenticated: true })
        return true
      },
      register: (name, email, password) => {
        const exists = localStorage.getItem(`user:${email}`)
        if (exists) return false

        const user: User = {
          id: crypto.randomUUID(),
          email,
          name,
        }

        localStorage.setItem(
          `user:${email}`,
          JSON.stringify({ user, password })
        )
        set({ user, isAuthenticated: true })
        return true
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
)
