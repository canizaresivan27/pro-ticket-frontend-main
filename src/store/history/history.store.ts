import type { HistoryCreate, HistoryUpdate } from '@/contracts'
import {
  createHistory,
  deleteHistory,
  getHistory,
  getHistoryById,
  updateHistory,
} from '@/services/history.service'
import type { StateCreator } from 'zustand'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface HistoryState {
  data: object
  page: number
  limit: number
  selectedHistory: object

  getHistory: (historyId: string) => Promise<void>
  getHistories: (ticketId: string) => Promise<void>
  createHistory: (historyData: HistoryCreate) => Promise<void>
  updateHistory: (historyData: HistoryUpdate) => Promise<void>
  deleteHistory: (historyId: string, ticketId: string) => Promise<void>

  setPage: (page: number) => void
  setLimit: (limit: number) => void
  cleanHistoryData: () => void
}

const storeApi: StateCreator<HistoryState> = (set, get) => ({
  selectedHistory: {},
  data: {},
  page: 1,
  limit: 5,

  getHistory: async (historyId) => {
    try {
      const data = await getHistoryById(historyId)
      set({ selectedHistory: data })
    } catch (_error) {
      set({ data: {} })
    }
  },

  getHistories: async (ticketId) => {
    try {
      const data = await getHistory(ticketId, get().page, get().limit)
      set({ data: data })
    } catch (_error) {
      set({ data: {} })
    }
  },

  createHistory: async (historyData) => {
    try {
      const res = await createHistory(historyData)
      if (res) {
        await get().getHistories(historyData.ticket)
      }
    } catch (_error) {
      console.log(_error)
    }
  },

  updateHistory: async (historyData) => {
    try {
      const res = await updateHistory(historyData)
      if (res) {
        await get().getHistory(historyData.id)
      }
    } catch (_error) {
      throw 'Update error'
    }
  },

  deleteHistory: async (historyId, ticketId) => {
    try {
      const res = await deleteHistory(historyId)
      if (res) {
        await get().getHistories(ticketId)
      }
    } catch (_error) {
      throw 'Delete error'
    }
  },

  setPage: async (page: number) => set({ page: page }),
  setLimit: async (limit: number) => set({ limit: limit }),

  cleanHistoryData: () => set({ data: {}, selectedHistory: {} }),
})

export const useHistoryStore = create<HistoryState>()(
  devtools(persist(storeApi, { name: 'history-storage' }))
)
