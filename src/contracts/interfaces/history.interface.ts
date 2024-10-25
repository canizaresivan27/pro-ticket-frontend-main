export interface History {
  id: string
  note: string
  date: string
  dolarAmount: string
  amount: string
  badge: string
  paymentType: string
  ref: string
  ticket: string
  seller: string
}

export interface HistoryCreate {
  note: string
  date: string
  dolarAmount: string
  amount: string
  badge: string
  paymentType: string
  ref: string
  ticket: string
  seller: string
}

export interface HistoryUpdate {
  id: string
  note: string
  date: string
  dolarAmount: string
  amount: string
  badge: string
  paymentType: string
  ref: string
  ticket: string
  seller: string
}

// --------------------------- PROPS --------------------------

interface Seller {
  id: string | ''
  name: string
  role: string[]
}

export interface HistoryProp {
  id: string
  note: string
  date: string
  dolarAmount: string
  amount: string
  badge: 'VES' | 'USD' | 'COP'
  paymentType: 'CASH' | 'TRANSFER'
  ref: string
  ticket: string
  seller: Seller
}

export type HistoryTabletProp = {
  limit: number
  page: number
  history: HistoryProp[]
  total: number
}
