import type { TicketCreate, TicketUpdate } from '@/contracts'
import {
  createTicket,
  deleteTicket,
  getTicketById,
  getTicketByIdPublic,
  getTickets,
  updateTicket,
} from '@/services/ticket.service'
import type { StateCreator } from 'zustand'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface TicketState {
  data: object
  page: number
  limit: number
  selectedTicket: object

  getTicket: (ticketId: string, isPublic?: boolean) => Promise<void>
  getTickets: (projectId: string) => Promise<void>
  createTicket: (ticketData: TicketCreate) => Promise<void>
  updateTicket: (ticketData: TicketUpdate) => Promise<void>
  deleteTicket: (ticketId: string, projectId: string) => Promise<void>
  cleanTicketsData: () => void

  setPage: (page: number) => void
  setLimit: (limit: number) => void
}

const storeApi: StateCreator<TicketState> = (set, get) => ({
  selectedTicket: {},
  data: {},
  page: 1,
  limit: 5,

  getTicket: async (ticketId, isPublic = false) => {
    try {
      if (isPublic) {
        const data = await getTicketByIdPublic(ticketId)
        set({ selectedTicket: data })
      } else {
        const data = await getTicketById(ticketId)
        set({ selectedTicket: data })
      }
    } catch (_error) {
      set({ data: {} })
    }
  },

  getTickets: async (projectId) => {
    try {
      const data = await getTickets(projectId, get().page, get().limit)
      set({ data: data })
    } catch (_error) {
      set({ data: {} })
    }
  },

  createTicket: async (ticketData) => {
    try {
      const res = await createTicket(ticketData)
      if (res) {
        await get().getTickets(ticketData.project)
      }
    } catch (_error) {
      console.log(_error)
    }
  },

  updateTicket: async (ticketData) => {
    try {
      const res = await updateTicket(ticketData)
      if (res) {
        await get().getTicket(ticketData.id)
      }
    } catch (_error) {
      throw 'Update error'
    }
  },

  deleteTicket: async (ticketId, projectId) => {
    try {
      const res = await deleteTicket(ticketId)
      if (res) {
        await get().getTickets(projectId)
      }
    } catch (_error) {
      throw 'Delete error'
    }
  },

  cleanTicketsData: () => set({ data: {}, selectedTicket: {} }),

  setPage: async (page: number) => set({ page: page }),
  setLimit: async (limit: number) => set({ limit: limit }),
})

export const useTicketStore = create<TicketState>()(
  devtools(persist(storeApi, { name: 'ticket-storage' }))
)
