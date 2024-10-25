import { ErrorBox, HistoryTablet, LayoutGrid, Loading } from '@/components'
import { CustomModal } from '@/components'
import { UpdateTicketForm } from '@/components/form/updateTicket.form'
import type { TicketProp } from '@/contracts'
import type { HistoryTabletProp } from '@/contracts'
import { useModalAutoClose } from '@/hooks'
import { useHistoryStore, useProjectStore, useTicketStore } from '@/store'
import { useEffect, useState } from 'react'
import { FaSave } from 'react-icons/fa'
import { LuUser2 } from 'react-icons/lu'
import PhoneInput from 'react-phone-input-2'
import { useParams } from 'react-router-dom'

export const convertToDateFormat = (dateString: string) => {
  const dateObject = new Date(dateString)

  // get year, month, and day
  const year = dateObject.getFullYear()
  const month = String(dateObject.getMonth() + 1).padStart(2, '0') // months are zero-based
  const day = String(dateObject.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const DetailTicketPage = () => {
  const { ticketId } = useParams<{ ticketId: string }>()
  const { isOpen, modalAutoClose } = useModalAutoClose()
  const [loading, setLoading] = useState(true)
  const selectedProject = useProjectStore((state) => state.selectedProject)
  const selectedTicket = useTicketStore((state) => state.selectedTicket as TicketProp)
  const { history } = useHistoryStore((state) => state.data as HistoryTabletProp)
  const getTicket = useTicketStore((state) => state.getTicket)

  const received = history?.reduce((acc, item) => acc + (+item.dolarAmount || 0), 0) || 0

  useEffect(() => {
    if (ticketId) {
      getTicket(ticketId).finally(() => setLoading(false))
    }
  }, [ticketId, getTicket])

  if (loading) return <Loading />
  if (!selectedTicket || !selectedTicket)
    return <ErrorBox title={'Error'} message={'No se ha logrado obtener la data.'} />
  return (
    <LayoutGrid>
      <div className="flex flex-col rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-2xl font-semibold">Detalles del Ticket</h1>

        <div className="flex items-center gap-2 py-2">
          <p className="font-semibold">Vendido por</p>
          <div className="flex items-center gap-2 pl-2 pr-4 p-1 border w-min rounded-full bg-white">
            <div className="bg-slate-700 h-[32px] w-[32px] rounded-full text-white flex justify-center items-center">
              <LuUser2 />
            </div>
            {/* Add a check to ensure seller and seller.name exist */}
            <p className="min-w text-nowrap">
              {selectedTicket.seller?.name ?? 'Sin vendedor'}
            </p>
          </div>
        </div>
      </div>

      {/* info / update */}
      <div className="bg-white rounded-xl p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-4">
        <div className="flex justify-between items-center">
          <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
            <h4 className="whitespace-nowrap">Información</h4>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-3 gap-1 text-sm">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium w-[80px]">Nombre</label>
            <input
              type="text"
              name="name"
              value={selectedTicket.ownerData.name}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium w-[80px]">CI-DNI</label>
            <input
              type="text"
              name="dni"
              value={selectedTicket.ownerData.dni}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="">
            <PhoneInput
              country={'ve'}
              value={selectedTicket.ownerData.phone1}
              inputClass="phoneInput"
              inputProps={{
                name: 'phone1',
              }}
              disabled
            />
          </div>

          <div className="">
            <PhoneInput
              country={'ve'}
              value={selectedTicket.ownerData.phone2}
              inputClass="phoneInput"
              inputProps={{
                name: 'phone2',
              }}
              disabled
            />
          </div>

          <div className="flex gap-3 items-center">
            <label className=" text-sm font-medium w-[80px]">Dirección</label>
            <input
              type="text"
              name="address"
              value={selectedTicket.ownerData.address}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="flex gap-3 items-center">
            <label className=" text-sm font-medium w-[80px]">Otro</label>
            <input
              type="textarea"
              name="other"
              value={selectedTicket.ownerData.other}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              disabled
            />
          </div>
        </div>

        <div className="h-[38px] mt-2">
          <CustomModal
            header={<h2 className="text-xl font-semibold">Detalles Ticket</h2>}
            buttonText="Actualizar"
            buttonType="update"
            buttonIcon={<FaSave />}
            autoClose={isOpen}
          >
            {selectedTicket && (
              <UpdateTicketForm ticket={selectedTicket} modalAutoClose={modalAutoClose} />
            )}
          </CustomModal>
        </div>
      </div>

      {/* payments state */}
      <div className="flex flex-col justify-between bg-white rounded-xl p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-4">
        <div className="flex justify-between items-center">
          <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
            <h4 className="whitespace-nowrap">Pagos</h4>
          </div>

          <div className="flex items-center justify-center">
            {selectedTicket.state === 'WINNER' && (
              <div className="bg-yellow-300/50 px-4 p-1 rounded-full">
                <p className="text-sm font-bold">GANADOR</p>
              </div>
            )}

            {selectedTicket.state === 'RESERVED' && (
              <div className="bg-blue-300/50 px-4 p-1 rounded-full">
                <p className="text-sm font-bold">RESERVADO</p>
              </div>
            )}

            {selectedTicket.state === 'PAID' && (
              <div className="bg-green-600/50 px-4 p-1 rounded-full">
                <p className="text-sm font-bold">PAGADO</p>
              </div>
            )}

            {selectedTicket.state === 'UNPAID' && (
              <div className="bg-orange-300/50 px-4 p-1 rounded-full">
                <p className="text-sm font-bold">PENDIENTE</p>
              </div>
            )}

            {selectedTicket.state === 'CANCELLED' && (
              <div className="bg-red-500/50 px-4 p-1 rounded-full">
                <p className="text-sm font-bold">CANCELADO</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 w-full mt-8 gap-2 px-2">
          <p>Precio Ticket</p>
          <p className="text-right font-semibold">
            {selectedProject?.raffleConfig.priceTicket || 0}$
          </p>

          <p>Abonado</p>
          <p className="text-right font-semibold text-gray-500">- {received}$</p>
        </div>

        <div className="grid grid-cols-2 w-full border-t  bg-gray-200 rounded-md p-2 mt-6 font-semibold">
          <p>Deuda</p>
          <p className="text-right ">
            {((selectedProject?.raffleConfig.priceTicket || 0) - received).toFixed(2)}$
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl  p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-4">
        <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
          <h4 className="whitespace-nowrap">Fecha limite</h4>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <div>
            <label className=" text-sm font-medium w-[80px] mr-2">Inicio</label>
            <input
              type="date"
              value={convertToDateFormat(selectedTicket.date)}
              className="bg-inherit h-[40px] border px-2 rounded-md bg-slate-100"
              disabled
            />
          </div>
          ➤
          <div>
            <label className=" text-sm font-medium w-[80px] mr-2">Fin</label>
            <input
              type="date"
              value={selectedProject?.date.end}
              className="bg-inherit h-[40px] border px-2 rounded-md bg-slate-100"
              disabled
            />
          </div>
        </div>
      </div>

      <div className="mt-6 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h2 className="text-2xl font-semibold">Historial de pagos</h2>
      </div>

      <HistoryTablet ticketId={ticketId} />
    </LayoutGrid>
  )
}
