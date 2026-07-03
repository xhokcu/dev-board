import { create } from 'zustand'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>()((set) => {
  // listen to Firebase auth state changes
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      set({
        user: {
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          name: firebaseUser.displayName || firebaseUser.email!,
        },
        isAuthenticated: true,
      })
    } else {
      set({ user: null, isAuthenticated: false })
    }
  })

  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (email, password) => {
      set({ isLoading: true, error: null })
      try {
        await signInWithEmailAndPassword(auth, email, password)
        set({ isLoading: false })
        return true
      } catch {
        set({ error: 'Invalid email or password', isLoading: false })
        return false
      }
    },

    register: async (name, email, password) => {
      set({ isLoading: true, error: null })
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        await updateProfile(result.user, { displayName: name })
        set({ isLoading: false })
        return true
      } catch {
        set({ error: 'Email already in use', isLoading: false })
        return false
      }
    },

    logout: async () => {
      await signOut(auth)
    },

    clearError: () => set({ error: null }),
  }
})
