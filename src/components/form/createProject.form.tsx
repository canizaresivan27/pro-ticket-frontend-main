import { useProjectStore } from '@/store'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { UserSelect } from '../form/userSelect'

interface CreateProjectFormProps {
  modalAutoClose: () => void
}

export const CreateProjectForm = ({ modalAutoClose }: CreateProjectFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    image: '',
    priceTicket: '0',
    totalTickets: '100',
    perTicket: '1',
    qrPosition: 'bl',
    numberPosition: 'tl',
    state: 'ACTIVE',
    orientation: 'portrait',
  })
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const createProject = useProjectStore((state) => state.createProject)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId)
    //console.log('Selected User ID:', userId)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const projectData = {
      id: ' ',
      name: formData.name,
      date: {
        start: formData.startDate,
        end: formData.endDate,
      },
      raffleConfig: {
        img: formData.image,
        priceTicket: Number(formData.priceTicket),
        totalTickets: Number(formData.totalTickets),
        perTicket: Number(formData.perTicket),
        qrPosition: formData.qrPosition,
        numberPosition: formData.numberPosition,
        orientation: formData.orientation,
      },
      state: [formData.state],
      owner: {
        id: selectedUser,
      },
    }

    try {
      await createProject(projectData)
      toast.success('Proyecto creado exitosamente')

      // clean form
      setFormData({
        name: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        image: '',
        priceTicket: '0',
        totalTickets: '100',
        perTicket: '1',
        qrPosition: 'bl',
        numberPosition: 'tl',
        state: 'ACTIVE',
        orientation: 'portrait',
      })
      setSelectedUser(null)
      modalAutoClose()
    } catch (error) {
      const errorMessage =
        typeof error === 'string' ? error : 'Error al intentar crear la rifa'
      toast.error(errorMessage)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            placeholder="Nombre de la  Rifa"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Imagen</label>
          <input
            type="text"
            name="image"
            placeholder="URL de la imagen"
            value={formData.image}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex justify-between w-full gap-4">
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium">Fecha de Inicio</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4 w-full">
            <label className="block text-sm font-medium">Fecha de Finalización</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        <div className="flex justify-between gap-3 w-full">
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium">Precio Ticket $</label>
            <input
              type="number"
              name="priceTicket"
              placeholder="Precio Ticket"
              value={formData.priceTicket}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              min="0"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium">Tickets por Rifa</label>
            <select
              name="perTicket"
              value={formData.perTicket}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="mb-4 w-full">
            <label className="block text-sm font-medium">Total de Tickets</label>
            <input
              type="number"
              name="totalTickets"
              placeholder="Numero de Tickets"
              value={formData.totalTickets}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              min="0"
              required
            />
          </div>
        </div>

        <div className="mb-4 mt-2">
          <h2 className="text-md font-semibold mb-1">Seleccionar Usuario</h2>
          <UserSelect onSelect={handleUserSelect} />
          {selectedUser && (
            <p className="text-sm border text-gray-500 rounded-md px-3 mt-1">
              Usuario ID: {selectedUser}
            </p>
          )}
        </div>

        <div className="flex justify-between gap-4 w-full">
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium">Posición del QR</label>
            <select
              name="qrPosition"
              value={formData.qrPosition}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="bl">Inferior Izquierda</option>
              <option value="br">Inferior Derecha</option>
              <option value="tl">Superior Izquierda</option>
              <option value="tr">Superior Derecha</option>
            </select>
          </div>

          <div className="mb-4 w-full">
            <label className="block text-sm font-medium">Posición del Número</label>
            <select
              name="numberPosition"
              value={formData.numberPosition}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="bl">Inferior Izquierda</option>
              <option value="br">Inferior Derecha</option>
              <option value="tl">Superior Izquierda</option>
              <option value="tr">Superior Derecha</option>
            </select>
          </div>
        </div>

        {/* roientation */}
        <div className="w-full">
          <label className="block text-sm font-medium">Orientación</label>
          <select
            name="orientation"
            value={formData.orientation}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          >
            <option value="portrait">Vertical</option>
            <option value="landscape">Horizontal</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg mt-4"
        >
          Crear Rifa
        </button>
      </form>
    </>
  )
}
