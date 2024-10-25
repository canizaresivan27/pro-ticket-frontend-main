import { useAuthStore, useProjectStore, useTicketStore } from '@/store'
import { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import { toast } from 'react-toastify'
import 'react-phone-input-2/lib/style.css'

interface ProjectStatusProp {
  collected: number
  goal: number
  pending: number
  sold: number
  grid: {
    number: string
    ticket: string
    status: string
  }[]
}

interface CreateTicketFormProps {
  ticketNumber?: string
  modalAutoClose: () => void
}

export const CreateTicketForm = ({
  ticketNumber,
  modalAutoClose,
}: CreateTicketFormProps) => {
  const [formData, setFormData] = useState({
    number: ticketNumber !== '' ? ticketNumber : ('' as string),
    name: '',
    dni: '',
    phone1: '',
    phone2: '',
    address: '',
    other: '',
  })

  const [searchTerm, setSearchTerm] = useState('')
  const getStatus = useProjectStore((state) => state.getStatus)
  const status = useProjectStore((state) => state.status as ProjectStatusProp)
  const userId = useAuthStore((state) => state.user?.id)
  const selectedProjectId = useProjectStore((state) => state.selectedProject?.id)
  const createTicket = useTicketStore((state) => state.createTicket)

  useEffect(() => {
    if (selectedProjectId) {
      getStatus(selectedProjectId)
    }
  }, [getStatus, selectedProjectId])

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Filtrar los números disponibles en base al término de búsqueda
  const filteredNumbers = status?.grid
    ? status.grid.filter((item) => item.number.includes(searchTerm))
    : []

  const handlePhoneChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: `+${value}`,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const ticketData = {
      number: formData.number || '',
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
    }

    try {
      await createTicket(ticketData)
      toast.success('Ticket creado exitosamente')

      // clean form
      setFormData({
        number: '',
        name: '',
        dni: '',
        phone1: '',
        phone2: '',
        address: '',
        other: '',
      })
      modalAutoClose()
    } catch (_error) {
      toast.error('Error al crear el ticket!')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Numero</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            placeholder="⌕ Buscar número"
          />

          {/* Select Numbers */}
          <select
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="font-mono w-full mt-1 p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Selecciona un número</option>
            {filteredNumbers.map((item) => (
              <option
                key={item.number}
                value={item.number}
                className="font-mono"
                disabled={
                  item.status === 'RESERVED' ||
                  item.status === 'UNPAID' ||
                  item.status === 'PAID' ||
                  item.status === 'WINNER'
                }
              >
                🎫[{String(item.number).padEnd(10, '.')}]{' '}
                {item.status === 'AVAILABLE' && '🚩 Disponible'}
                {item.status === 'RESERVED' && '🔵 Reservado'}
                {item.status === 'UNPAID' && '🟠 Pendiente'}
                {item.status === 'PAID' && '🟢 Pagado'}
                {item.status === 'WINNER' && '🏆 Ganador'}
                {item.status === 'CANCELLED' && '❌ Cancelado'}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            placeholder="Jhon Doe"
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
          <label className="block text-sm font-medium">Dirección</label>
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
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded mt-4"
        >
          Registrar Ticket
        </button>
      </form>
    </>
  )
}
