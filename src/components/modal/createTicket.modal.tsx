import { useModalAutoClose } from '@/hooks'
import { FaPlus } from 'react-icons/fa'
import { CreateTicketForm } from '../form/createTicket.form'
import { CustomModal } from './customModal'

export const CreateTicketModal = () => {
  const { isOpen, modalAutoClose } = useModalAutoClose()
  return (
    <CustomModal
      header={<h2 className="text-xl font-semibold">Añádir Nuevo Ticket</h2>}
      buttonText="Nuevo Ticket"
      buttonType="create"
      buttonIcon={<FaPlus />}
      autoClose={isOpen}
    >
      <CreateTicketForm modalAutoClose={modalAutoClose} />
    </CustomModal>
  )
}
