import { tesloApi } from '@/api/teslo'
import { useAuthStore } from '@/store'
import type { AxiosRequestConfig } from 'axios'
import { AxiosError } from 'axios'

interface RequestOptions<T> extends AxiosRequestConfig {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  data?: T
}

export const apiRequest = async <TResponse, TRequest = undefined>({
  url,
  method,
  params,
  data,
}: RequestOptions<TRequest>): Promise<TResponse> => {
  try {
    const token = useAuthStore.getState().token

    if (!token) {
      throw new Error('Unauthorized')
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    const response = await tesloApi.request<TResponse>({
      url,
      method,
      headers,
      params,
      data: data
        ? new URLSearchParams(data as Record<string, string>).toString()
        : undefined,
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || 'Request failed'
      throw new Error(errorMessage)
    }
    throw new Error('An unexpected error occurred')
  }
}
