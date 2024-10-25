import {
  HorizontalTicket,
  LayoutGrid,
  Loading,
  Navbar,
  VerticalTicket,
} from '@/components'
import { useTicketStore } from '@/store'
import { useEffect } from 'react'
import { LuUser2 } from 'react-icons/lu'
import { useParams } from 'react-router-dom'

interface TicketProp {
  ownerData: {
    name: string
    dni: string
    phone1: string
    phone2: string
    address: string
    other: string
  }
  seller: {
    name: string
  }
  project: {
    raffleConfig: {
      img: string
      numberPosition: string
      qrPosition: string
      orientation: string
      priceTicket: string
    }
  }
  number: string
  id: string
}

export const BuyerTicketPage = () => {
  const { ticketId } = useParams()
  const selectedTicket = useTicketStore((state) => state.selectedTicket as TicketProp)
  const getTicket = useTicketStore((state) => state.getTicket)

  useEffect(() => {
    getTicket(ticketId || '', true)
  }, [getTicket, ticketId])

  if (!selectedTicket || !selectedTicket.ownerData) return <Loading />
  return (
    <>
      <Navbar />
      <LayoutGrid>
        <div className="flex flex-col rounded-xl mt-[80px] p-0 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
          <h1 className="text-2xl font-semibold">Detalles del Ticket</h1>
        </div>

        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <p className="text-nowrap">Vendido por:</p>
            <div className="flex items-center gap-2 pl-2 pr-4 p-1 border w-min rounded-full">
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
        {selectedTicket.project?.raffleConfig?.orientation === 'portrait' ? (
          <VerticalTicket ticket={selectedTicket} />
        ) : (
          <HorizontalTicket ticket={selectedTicket} />
        )}
      </LayoutGrid>
    </>
  )
}
