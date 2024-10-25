import { apiRequest } from '@/api/request'
import type { HistoryCreate, HistoryUpdate } from '@/contracts'

//----------------------------------------------------- GET DATA ---------------------------------------------------------
export const getHistory = async (
  ticketId: string,
  page: number,
  limit: number
): Promise<object> => {
  return apiRequest({
    url: `/history/list/${ticketId}`,
    method: 'get',
    params: { page, limit },
  })
}

export const getHistoryById = async (historyId: string): Promise<object> => {
  return apiRequest({
    url: `/history/${historyId}`,
    method: 'get',
    params: {},
  })
}

//----------------------------------------------------- CREATE DATA---------------------------------------------------------
export const createHistory = async (history: HistoryCreate) => {
  return apiRequest({
    url: '/history',
    method: 'post',
    data: new URLSearchParams({
      note: history.note,
      date: history.date,
      dolarAmount: history.dolarAmount,
      amount: history.amount,
      badge: history.badge,
      paymentType: history.paymentType,
      ref: history.ref,
      ticket: history.ticket,
      seller: history.seller,
    }).toString(),
  })
}

//----------------------------------------------------- UPDATE DATA ---------------------------------------------------------
export const updateHistory = async (history: HistoryUpdate) => {
  return apiRequest({
    url: '/history',
    method: 'put',
    data: new URLSearchParams({
      id: history.id,
      note: history.note,
      date: history.date,
      dolarAmount: history.dolarAmount,
      amount: history.amount,
      badge: history.badge,
      paymentType: history.paymentType,
      ref: history.ref,
      ticket: history.ticket,
      seller: history.seller,
    }).toString(),
  })
}

//----------------------------------------------------- DELETE DATA ---------------------------------------------------------

export const deleteHistory = async (historyId: string) => {
  return apiRequest({
    url: '/history',
    method: 'delete',
    data: new URLSearchParams({ id: historyId }).toString(),
  })
}
