import type { TicketProp } from '@/contracts'
import { useAuthStore, useProjectStore, useTicketStore } from '@/store'
import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import { toast } from 'react-toastify'
import 'react-phone-input-2/lib/style.css'

interface UpdateTicketFormProps {
  ticket: TicketProp
  modalAutoClose: () => void
}

export const UpdateTicketForm = ({ ticket, modalAutoClose }: UpdateTicketFormProps) => {
  const [formData, setFormData] = useState({
    number: ticket.number || '',
    name: ticket.ownerData.name || '',
    dni: ticket.ownerData.dni || '',
    phone1: ticket.ownerData.phone1 || '',
    phone2: ticket.ownerData.phone2 || '',
    address: ticket.ownerData.address || '',
    other: ticket.ownerData.other || '',
    state: ticket.state || '',
  })

  const userId = useAuthStore((state) => state.user?.id)
  const selectedProjectId = useProjectStore((state) => state.selectedProject?.id)
  const updateTicket = useTicketStore((state) => state.updateTicket)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePhoneChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: `+${value}`,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const ticketData = {
      id: ticket.id,
      number: formData.number,
      project: selectedProjectId || '',
      seller: userId || '',
      ownerData: {
        name: formData.name,
        dni: formData.dni,
        phone1: formData.phone1,
        phone2: formData.phone2,
        address: formData.address,
        other: formData.other,
      },
      state: formData.state,
    }

    try {
      await updateTicket(ticketData)
      toast.success('Ticket actualizado exitosamente')
      modalAutoClose()
    } catch (_error) {
      toast.error('Error al actualizar el ticket')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Numero</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            disabled
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jhon Doe"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">CI - DNI</label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            placeholder="v-012345678"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex flex-col gap-4 justify-between mb-4 border rounded-md p-2">
          <div className="">
            <label className="block text-sm font-medium">Teléfonos</label>
            <PhoneInput
              country={'ve'}
              value={formData.phone1}
              onChange={(value) => handlePhoneChange(value, 'phone1')}
              inputClass="phoneInput"
              inputProps={{
                name: 'phone1',
                required: true,
              }}
            />
          </div>

          <div className="">
            <PhoneInput
              country={'ve'}
              value={formData.phone2}
              onChange={(value) => handlePhoneChange(value, 'phone2')}
              inputClass="phoneInput"
              inputProps={{
                name: 'phone2',
              }}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Direccion</label>
          <input
            type="text"
            name="address"
            placeholder="Calle 123, Ciudad, Estado"
            value={formData.address}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Otro</label>
          <input
            type="text"
            name="other"
            placeholder="Referencias, notas, etc."
            value={formData.other}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>

        {/*
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4">Seleccionar Usuario</h2>
          <UserSelect onSelect={handleUserSelect} />
          {selectedUser && <p>Usuario seleccionado: {selectedUser}</p>}
        </div>
        */}

        <div className="mb-4">
          <label className="block text-sm font-medium">Estado</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          >
            <option value="WINNER">🏆 Ganador</option>
            <option value="PAID">🟢 Pagado</option>
            <option value="UNPAID">🟠 Pendiente</option>
            <option value="RESERVED">🔵 Reservado</option>
            <option value="CANCELLED">❌ Cancelado</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md mt-4"
        >
          Actualizar Ticket
        </button>
      </form>
    </>
  )
}
