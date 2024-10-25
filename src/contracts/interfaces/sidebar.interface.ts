import type { ReactNode } from 'react'

export interface SubmenuItem {
  icon: ReactNode
  text: string
  url: string
}

export interface SidebarBtn {
  isOpen: boolean
  icon: ReactNode
  text: string
  url: string
  submenu: SubmenuItem[]
}
