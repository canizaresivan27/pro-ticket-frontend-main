import { CreateTicketForm, LayoutGrid } from '@/components'
import { useModalAutoClose } from '@/hooks'
import { useParams } from 'react-router-dom'

export const CreateTicketPage = () => {
  const { ticketNumber } = useParams<{
    ticketId: string
    ticketNumber: string
  }>()
  const { modalAutoClose } = useModalAutoClose()

  return (
    <LayoutGrid>
      <div className="flex flex-col rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-2xl font-semibold">Crear Nuevo Ticket</h1>
      </div>

      {/* info / update */}
      <div className="bg-white rounded-xl p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-6">
        <CreateTicketForm ticketNumber={ticketNumber} modalAutoClose={modalAutoClose} />
      </div>
    </LayoutGrid>
  )
}
