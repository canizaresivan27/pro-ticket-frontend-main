import type { TicketProp } from '@/contracts'
import { useUserRole } from '@/hooks/useUserRole'
import { useProjectStore, useTicketStore } from '@/store'
import { AiOutlineDelete } from 'react-icons/ai'
import { IoTicketOutline } from 'react-icons/io5'
import { LuUser2 } from 'react-icons/lu'
import { MdOutlineDashboard } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CustomModal } from '../modal/customModal'

type TabletRow = {
  ticket: TicketProp
}

export const TicketRow = ({ ticket }: TabletRow) => {
  const rolePath = useUserRole()
  const navigate = useNavigate()
  const getProjects = useProjectStore((state) => state.getProjects)
  const getTicket = useTicketStore((state) => state.getTicket)
  const deleteTicket = useTicketStore((state) => state.deleteTicket)
  const roleUser = useUserRole()

  const handleDetails = () => {
    getProjects(ticket.project.id)
    getTicket(ticket.id)
    navigate(`/${rolePath}/ticket/detail/${ticket.id}`)
  }

  const handleDelete = async () => {
    try {
      await deleteTicket(ticket.id, ticket.project.id)
      toast.success('Ticket eliminado exitosamente.')
    } catch (_error) {
      toast.error('Ha ocurrido un error!')
    }
  }

  return (
    <>
      <div className="grid  grid-cols-1 lg:grid-cols-7 border-b p-4 gap-y-2 xl:gap-0">
        {/* ticket info */}
        <div className="flex flex-col lg:flex-row gap-2 col-span-1 lg:col-span-2 overflow-hidden mb-2 lg:mb-0">
          <div className="flex justify-center items-center h-[64px] w-[64px]  bg-gray-200 rounded-md overflow-hidden">
            <span className="text-4xl">
              <IoTicketOutline />
            </span>
          </div>
          <div>
            <h2 className="font-semibold">{ticket.ownerData.name}</h2>
            <p className="text-sm font-semibold">CI {ticket.ownerData.dni}</p>
            <p className="text-sm text-gray-400">ID {ticket.id}</p>
          </div>
        </div>

        {/* ticket number */}
        <div className="flex items-center lg:justify-center">
          <label className="flex lg:hidden mr-2">Numero:</label>
          <div className="px-3 py-1 text-white bg-slate-800 rounded-md font-semibold">
            {ticket.number}
          </div>
        </div>

        {/* allowance status */}
        <div className="flex items-center">
          <label className="flex lg:hidden mr-2">Abonado:</label>
          <p>
            <span className=""> 0$ de {ticket.price}</span>$
          </p>
        </div>

        {/* seller */}
        <div className="flex items-center lg:justify-center">
          <label className="flex lg:hidden mr-2">Vendido por:</label>
          <div className="flex items-center gap-2 pl-2 pr-4 p-1 border w-min rounded-full">
            <div className="bg-slate-700 h-[32px] w-[32px] rounded-full text-white flex justify-center items-center">
              <LuUser2 />
            </div>
            <p className="min-w text-nowrap">{ticket.seller.name}</p>
          </div>
        </div>

        {/* state */}
        <div className="flex items-center lg:justify-center">
          <label className="flex lg:hidden mr-2">Estado:</label>
          {ticket.state === 'PAID' && (
            <div className="bg-green-600/50 px-4 p-1 rounded-full">
              <p className="text-sm font-bold">PAGADO</p>
            </div>
          )}

          {ticket.state === 'UNPAID' && (
            <div className="bg-orange-300/50 px-4 p-1 rounded-full">
              <p className="text-sm font-bold">PENDIENTE</p>
            </div>
          )}

          {ticket.state === 'RESERVED' && (
            <div className="bg-blue-300/50 px-4 p-1 rounded-full">
              <p className="text-sm font-bold">RESERVADO</p>
            </div>
          )}

          {ticket.state === 'CANCELLED' && (
            <div className="bg-red-500/50 px-4 p-1 rounded-full">
              <p className="text-sm font-bold">CANCELADO</p>
            </div>
          )}
        </div>

        {/* actions */}
        <div className="flex items-center justify-end gap-2 col-span-1 lg:col-span-1 mt-6 lg:mt-0">
          <button
            type="button"
            onClick={handleDetails}
            className="flex justify-center items-center h-[42px] min-w-[42px] w-full lg:w-min border rounded-md hover:bg-gray-300"
          >
            <MdOutlineDashboard />
          </button>

          {(roleUser === 'user' || roleUser === 'reseller') && (
            <div className="flex h-[40px] w-full lg:w-[40px]">
              <CustomModal
                header={<h2>Confirmar Eliminación</h2>}
                buttonText=""
                buttonType="delete"
                buttonIcon={<AiOutlineDelete />}
              >
                <p>
                  ¿Estás seguro de que deseas eliminar el ticket:
                  <span className="font-semibold ml-1">{ticket.number}</span> de
                  <span className="font-semibold ml-1">{ticket.ownerData.name}</span>?
                </p>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Confirmar
                  </button>
                </div>
              </CustomModal>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
