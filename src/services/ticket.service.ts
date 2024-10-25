import { apiRequest } from '@/api/request'
import { tesloApi } from '@/api/teslo'
import type { TicketCreate, TicketProp, TicketUpdate } from '@/contracts'
import { AxiosError } from 'axios'

//----------------------------------------------------- GET DATA ---------------------------------------------------------
export const getTickets = async (
  projectId: string,
  page: number,
  limit: number
): Promise<TicketProp> => {
  return apiRequest({
    url: `/tickets/list/${projectId}`,
    method: 'get',
    params: { page, limit },
  })
}

export const getTicketById = async (ticketId: string): Promise<TicketProp> => {
  return apiRequest({
    url: `/tickets/${ticketId}`,
    method: 'get',
    params: {},
  })
}

export const getTicketByIdPublic = async (ticketId: string): Promise<TicketProp> => {
  try {
    const response = await tesloApi.get<TicketProp>(`/public/ticket/${ticketId}`)

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw new Error('Failed to get project by ID')
  }
}

//----------------------------------------------------- CREATE DATA ---------------------------------------------------------
export const createTicket = async (ticket: TicketCreate) => {
  return apiRequest({
    url: '/tickets',
    method: 'post',
    data: new URLSearchParams({
      number: ticket.number.toString(),
      project: ticket.project,
      seller: ticket.seller,
      'ownerData[name]': ticket.ownerData.name,
      'ownerData[dni]': ticket.ownerData.dni,
      'ownerData[phone1]': ticket.ownerData.phone1,
      'ownerData[phone2]': ticket.ownerData.phone2 ?? '',
      'ownerData[address]': ticket.ownerData.address,
      'ownerData[other]': ticket.ownerData.other ?? '',
    }).toString(),
  })
}

//----------------------------------------------------- UPDATE DATA ---------------------------------------------------------

export const updateTicket = async (ticket: TicketUpdate) => {
  return apiRequest({
    url: '/tickets',
    method: 'put',
    data: new URLSearchParams({
      id: ticket.id,
      'ownerData[name]': ticket.ownerData.name,
      'ownerData[dni]': ticket.ownerData.dni,
      'ownerData[phone1]': ticket.ownerData.phone1,
      'ownerData[phone2]': ticket.ownerData.phone2 ?? '',
      'ownerData[address]': ticket.ownerData.address,
      'ownerData[other]': ticket.ownerData.other ?? '',
      state: ticket.state ?? '',
    }).toString(),
  })
}

//----------------------------------------------------- DELETE DATA ---------------------------------------------------------
export const deleteTicket = async (projectId: string) => {
  return apiRequest({
    url: '/tickets',
    method: 'delete',
    data: new URLSearchParams({ id: projectId }).toString(),
  })
}
