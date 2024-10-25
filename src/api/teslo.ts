import { useAuthStore } from '@/store'
import axios from 'axios'

const tesloApi = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
})

// Todo: interceptors
// read zutand store
tesloApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  //console.log({ token })

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export { tesloApi }
