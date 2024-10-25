export interface TicketList {
  id: string
  number: number
  qr: string
  price: number
  ownerData: OwnerData
  history: []
  state: string
  project: string
  seller: string
}

interface OwnerData {
  name: string
  dni: string
  phone1: string
  phone2: string
  address: string
  other: string
}

export interface TicketCreate {
  number: string
  project: string
  seller: string
  ownerData: {
    name: string
    dni: string
    phone1: string
    phone2?: string
    address: string
    other?: string
  }
}

export interface TicketUpdate {
  id: string
  ownerData: {
    name: string
    dni: string
    phone1: string
    phone2?: string
    address: string
    other?: string
  }
  state?: string
}

// --------------------------- PROPS --------------------------
export interface TicketProp {
  id: string
  number: number
  date: string
  qr: string
  price: number
  ownerData: OwnerData
  history?: []
  state?: string
  project: { id: string | '' }
  seller: { id: string | ''; name: string }
}

export type TicketTabletProp = {
  limit: number
  page: number
  tickets: TicketProp[]
  total: number
}
