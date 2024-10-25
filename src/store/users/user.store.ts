//import type { AuthStatus, User } from "@/contracts";
import type { ResellerCreate, UserCreate, UserUpdate } from '@/contracts'
import {
  createReseller,
  createUser,
  deleteUser,
  deleteUserReseller,
  getUserById,
  getUsers,
  updateUser,
} from '@/services/user.service'
import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface UserState {
  data: object
  page: number
  limit: number
  selectedUser: object

  getUser: (userId: string) => Promise<void>
  getUserById: (userId: string) => Promise<void>
  createUser: (ticketData: UserCreate) => Promise<void>
  createReseller: (userData: ResellerCreate) => Promise<void>
  updateUser: (userData: UserUpdate) => Promise<void>
  deleteUser: (creatorId: string, userId: string) => Promise<void>
  deleteUserReseller: (creatorId: string, userId: string) => Promise<void>
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  cleanUserData: () => void
}

const storeApi: StateCreator<UserState> = (set, get) => ({
  data: {},
  page: 1,
  limit: 5,
  selectedUser: {},

  getUser: async (userId: string) => {
    try {
      const data = await getUsers(userId, get().page, get().limit)
      set({ data: data })
    } catch (_error) {
      set({ data: {} })
    }
  },
  getUserById: async (userId: string) => {
    try {
      const data = await getUserById(userId)
      set({ selectedUser: data })
    } catch (_error) {
      set({ data: {} })
    }
  },
  createUser: async (ticketData) => {
    try {
      const res = await createUser(ticketData)
      if (res) {
        await get().getUser(ticketData.creatorId)
      }
    } catch (_error) {
      console.log(_error)
    }
  },

  createReseller: async (userData) => {
    try {
      const res = await createReseller(userData)
      if (res) {
        await get().getUser(userData.creatorId)
      }
    } catch (_error) {
      console.log(_error)
    }
  },

  updateUser: async (userData) => {
    try {
      const res = await updateUser(userData)
      if (res) {
        await get().getUserById(userData.id)
      }
    } catch (_error) {
      console.log(_error)
    }
  },

  deleteUser: async (creatorId: string, userId: string) => {
    try {
      const res = await deleteUser(userId)
      if (res) {
        await get().getUser(creatorId)
      }
    } catch (_error) {
      throw 'Delete error'
    }
  },

  deleteUserReseller: async (creatorId: string, userId: string) => {
    try {
      const res = await deleteUserReseller(userId)
      if (res) {
        await get().getUser(creatorId)
      }
    } catch (_error) {
      throw 'Delete error'
    }
  },

  setPage: async (page: number) => set({ page: page }),
  setLimit: async (limit: number) => set({ limit: limit }),

  cleanUserData: () => set({ data: {} }),
})

export const useUserStore = create<UserState>()(
  devtools(persist(storeApi, { name: 'user-storage' }))
)
