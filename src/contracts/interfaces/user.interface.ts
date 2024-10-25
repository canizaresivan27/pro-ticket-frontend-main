export interface User {
  id?: string
  name?: string
  email?: string
  emailValidated?: string
  state?: string[]
  role?: string[]
  token?: string
}

export interface UserResponse {
  page: number
  limit: number
  total: number
  next: string
  prev: string
  users: User[]
}

// --------------------------- PROPS --------------------------
export interface UserProp {
  id: string
  img?: string
  name: string
  email: string
  phone?: string
  emailValidated: string
  role: string[]
  state: string[]
}

export type UserTabletProp = {
  limit: number
  page: number
  users: UserProp[]
  total: number
}

export interface UserUpdate {
  id: string
  name: string
  phone: string
  img: string
  state: string
}
