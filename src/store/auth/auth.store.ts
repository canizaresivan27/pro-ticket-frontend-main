import type { AuthStatus, User } from '@/contracts'
import { checkStatus, login } from '@/services/auth.service'
import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface AuthState {
  status: AuthStatus
  token?: string
  user: User | undefined

  loginUser: (email: string, password: string) => Promise<void>
  checkAuthStatus: () => Promise<void>
  logoutUser: () => void
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'pending',
  token: undefined,
  user: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const { token, user } = await login(email, password)
      set({ status: 'authorized', token, user: { ...user } })
    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined })
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      throw errorMessage
    }
  },
  checkAuthStatus: async () => {
    try {
      const { token, user } = await checkStatus()
      set({ status: 'authorized', token, user: { ...user } })
    } catch (_error) {
      set({ status: 'unauthorized', token: undefined, user: undefined })
    }
  },
  logoutUser: () => {
    set({ status: 'unauthorized', token: undefined, user: undefined })
  },
})

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: 'auth-storage' }))
)
