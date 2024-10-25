import type { HistoryTabletProp } from '@/contracts'
import { useHistoryStore } from '@/store'
import { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Loading } from '../common/loading'
import { CreateHistoryModal } from '../modal/createHistory.modal'
import { HistoryRow } from './historyRow'

export const HistoryTablet = ({ ticketId = '' }) => {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const { limit, page, history, total } = useHistoryStore(
    (state) => state.data as HistoryTabletProp
  )
  const numberPages = Math.ceil(total / limit)
  const actualPage = useHistoryStore((state) => state.page)
  const actualLimit = useHistoryStore((state) => state.limit)
  const setPage = useHistoryStore((state) => state.setPage)
  const setLimit = useHistoryStore((state) => state.setLimit)
  const getHistories = useHistoryStore((state) => state.getHistories)

  useEffect(() => {
    if (ticketId) {
      getHistories(ticketId).then(() => setLoading(false))
      setPage(1)
    }
    ticketId
  }, [ticketId, getHistories, setPage])

  useEffect(() => {
    if (ticketId) getHistories(ticketId)
    actualPage
    actualLimit
  }, [actualPage, actualLimit, ticketId, getHistories])

  const handlePrevius = () => {
    if (page > 1) setPage(page - 1)
  }
  const handleNext = () => {
    if (page < numberPages) setPage(page + 1)
  }

  const filteredHistory = history?.filter((historyElement) =>
    historyElement.note.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) return <Loading />
  return (
    <>
      {/* filter & actions */}
      <div className="bg-white rounded-xl p-2 col-span-1 sm:col-span-2 md:col-span-4 xl:col-span-9">
        <input
          type="text"
          placeholder="Buscar pagos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-full p-2"
        />
      </div>

      <div className="bg-white rounded-xl h-[52px] overflow-hidden col-span-1 sm:col-span-2 md:col-span-2 xl:col-span-3">
        {/*<CreateTicketModal /> */}
        <div className="h-full min-h-[52px]">
          <CreateHistoryModal />
        </div>
      </div>

      {/* TABLET */}
      <div className="bg-white rounded-xl  overflow-hidden col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        {history.length > 0 ? (
          <>
            {/* head */}
            <div className="hidden lg:grid grid-cols-7 border-b p-4 text-sm text-gray-400">
              <p className="col-span-2">Nota</p>
              <p className=" text-center">Pago</p>
              <p className=" text-center">Typo</p>
              <p className=" text-center">Monto Dolar</p>
              <p className="text-center">Cobrado por</p>
              <p className="text-right">Acciones</p>
            </div>

            {/* rows */}
            <div>
              {filteredHistory.map((historyElement) => (
                <HistoryRow key={historyElement.id} history={historyElement} />
              ))}
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
