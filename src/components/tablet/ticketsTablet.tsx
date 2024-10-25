import type { TicketTabletProp } from '@/contracts'
import { useModalAutoClose, useUserRole } from '@/hooks'
import { useTicketStore } from '@/store/tickets/ticket.store'
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'
import { ErrorBox } from '../common/errorBox'
import { Loading } from '../common/loading'
import { CreateTicketForm } from '../form/createTicket.form'
import { CustomModal } from '../modal/customModal'
import { TicketRow } from './ticketRow'

export const TicketsTablet = ({ projectId = '' }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const userRole = useUserRole()
  const ticketNumber = new URLSearchParams(location.search).get('number')
  const [autoOpen, setAutoOpen] = useState(false)
  const { isOpen, modalAutoClose } = useModalAutoClose()
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const { limit, page, tickets, total } = useTicketStore(
    (state) => state.data as TicketTabletProp
  )
  const numberPages = Math.ceil(total / limit)
  const actualPage = useTicketStore((state) => state.page)
  const actualLimit = useTicketStore((state) => state.limit)
  const setPage = useTicketStore((state) => state.setPage)
  const setLimit = useTicketStore((state) => state.setLimit)
  const getTickets = useTicketStore((state) => state.getTickets)

  //modal
  useEffect(() => {
    if (ticketNumber) {
      setAutoOpen(true)
    }

    if (isOpen) {
      setAutoOpen(false)
      modalAutoClose()
      navigate(`/${userRole}/overview`)
    }
  }, [ticketNumber, isOpen, modalAutoClose, navigate, userRole])

  // get tickets
  useEffect(() => {
    if (projectId) {
      getTickets(projectId).then(() => setLoading(false))
      setPage(1)
    }
    projectId
  }, [projectId, getTickets, setPage])

  useEffect(() => {
    if (projectId) getTickets(projectId)
    actualPage
    actualLimit
  }, [actualPage, actualLimit, projectId, getTickets])

  const handlePrevius = () => {
    if (page > 1) setPage(page - 1)
  }
  const handleNext = () => {
    if (page < numberPages) setPage(page + 1)
  }

  const filteredTicket = tickets?.filter((ticket) =>
    ticket.ownerData.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // render
  if (loading) return <Loading />
  if (!tickets || !tickets)
    return <ErrorBox title={'Error'} message={'No se han encontrado tickets.'} />
  return (
    <>
      {/* filter & actions */}
      <div className="bg-white rounded-xl  p-2 col-span-1 sm:col-span-2 md:col-span-4 xl:col-span-9">
        <input
          type="text"
          placeholder="Buscar tickets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-full p-2 outline-none"
        />
      </div>

      <div className="bg-white rounded-xl p-0 overflow-hidden col-span-1 sm:col-span-2 md:col-span-2 xl:col-span-3">
        <div className="h-full min-h-[52px]">
          <CustomModal
            header={<h2 className="text-xl font-semibold">Añádir Nuevo Ticket</h2>}
            buttonText="Nuevo Ticket"
            buttonType="create"
            buttonIcon={<FaPlus />}
            autoOpen={autoOpen}
            autoClose={isOpen}
          >
            <CreateTicketForm
              ticketNumber={ticketNumber?.toString()}
              modalAutoClose={modalAutoClose}
            />
          </CustomModal>
        </div>
      </div>

      {/* TABLET */}
      <div className="bg-white overflow-hidden rounded-xl col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        {tickets.length > 0 ? (
          <>
            {/* head */}
            <div className="hidden lg:grid grid-cols-7 border-b p-4 text-sm text-gray-400">
              <p className="col-span-2">Propietario</p>
              <p className=" text-center">Numero</p>
              <p>Abonado</p>
              <p className=" text-center">Vendido por</p>
              <p className="text-center">Estado</p>
              <p className="text-right">Acciones</p>
            </div>

            {/* rows */}
            <div>
              {tickets.length > 0 ? (
                filteredTicket.map((ticket) => (
                  <TicketRow key={ticket.id} ticket={ticket} />
                ))
              ) : (
                <div className="flex justify-center items-center w-full h-24 text-gray-500">
                  No se encontraron tickets
                </div>
              )}
            </div>

            {/* pagination */}
            <nav className="flex justify-between gap-2 items-center p-4">
              <div className="flex">
                <select
                  name="limit"
                  id="limit"
                  onChange={(e) => {
                    setLimit(+e.target.value)
                    setPage(1)
                  }}
                  className="border rounded-md h-[42px] px-2"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={40}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevius}
                  className="h-[42px] w-[42px] border flex justify-center items-center rounded-md hover:bg-gray-400"
                >
                  <IoIosArrowBack />
                </button>
                <div className="h-[42px] w-[42px] border flex justify-center items-center rounded-md">
                  {page}
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="h-[42px] w-[42px] border flex justify-center items-center rounded-md hover:bg-gray-400"
                >
                  <IoIosArrowForward />
                </button>
              </div>
              pag. {numberPages}
            </nav>
          </>
        ) : (
          <div className="flex justify-center items-center w-full h-24 text-gray-500">
            No se encontraron tickets
          </div>
        )}
      </div>
    </>
  )
}
