import { apiRequest } from '@/api/request'

interface StatusRes {
  status: string
  qr: string
}

//----------------------------------------------------- GET DATA ---------------------------------------------------------
export const getWhatsappStatus = async (): Promise<StatusRes> => {
  return apiRequest<StatusRes>({
    url: '/projects/ws',
    method: 'get',
    params: {},
  })
}
