import { useModalAutoClose } from '@/hooks'
import { FaPlus } from 'react-icons/fa'
import { CreateHistoryForm } from '../form/createHistory.form'
import { CustomModal } from './customModal'

export const CreateHistoryModal = () => {
  const { isOpen, modalAutoClose } = useModalAutoClose()

  return (
    <CustomModal
      header={<h2 className="text-xl font-semibold">Abonar Pago</h2>}
      buttonText="Abonar"
      buttonType="create"
      buttonIcon={<FaPlus />}
      autoClose={isOpen}
    >
      <CreateHistoryForm modalAutoClose={modalAutoClose} />
    </CustomModal>
  )
}
