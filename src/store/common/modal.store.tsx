import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface ModalState {
  isOpen: boolean
  setOpen: () => void
}

const storeApi: StateCreator<ModalState> = (set) => ({
  isOpen: true,
  setOpen: () => set((state) => ({ isOpen: !state.isOpen })),
})

export const useModalStore = create<ModalState>()(
  devtools(storeApi, { name: 'modal-storage' })
)

/*
export const useSidebarStore = create<ModalState>()(
  devtools(persist(storeApi, { name: 'modal-storage' }))
)
*/
