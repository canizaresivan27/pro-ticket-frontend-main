import { tesloApi } from '@/api/teslo'
import type { User } from '@/contracts'
import { AxiosError } from 'axios'

interface LoginResponse {
  user?: User
  token?: string
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const { data } = await tesloApi.post<LoginResponse>('/auth/login', {
      email,
      password,
    })
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || 'Error al autenticar'
      throw new Error(errorMessage)
    }
    throw new Error('Error desconocido al autenticar')
  }
}

export const checkStatus = async (): Promise<LoginResponse> => {
  try {
    const { data } = await tesloApi.get<LoginResponse>('/auth/check-status')
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || 'No autorizado'
      throw new Error(errorMessage)
    }
    throw new Error('Error desconocido al tratar de obtener el estado de la sesión')
  }
}
