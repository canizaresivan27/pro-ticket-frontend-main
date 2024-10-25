import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface MessageState {
  state: string
  qr?: string
  setData: (state: string, qr: string) => void
}

const storeApi: StateCreator<MessageState> = (set) => ({
  state: '',
  qr: '',
  setData: (state, qr) => set({ state, qr }),
})

export const useMessageStore = create<MessageState>()(
  devtools(persist(storeApi, { name: 'message-storage' }))
)
