import { useAuthStore, useUserStore } from '@/store'
import { useState } from 'react'
import { toast } from 'react-toastify'
//import { UserSelect } from "./userSelect";

export const CreateResellerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    creatorId: '',
  })
  //const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const userId = useAuthStore((state) => state.user?.id)
  //const selectedProjectId = useProjectStore((state) => state.selectedProject?.id);
  const createReseller = useUserStore((state) => state.createReseller)

  // logic
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newUserData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      creatorId: userId || '',
    }

    try {
      await createReseller(newUserData)
      toast.success('Ticket creado exitosamente')
      // clean form
      setFormData({
        name: '',
        email: '',
        password: '',
        creatorId: '',
      })
      //setSelectedUser(null);
    } catch (_error) {
      toast.error('Error al crear el ticket!')
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
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Correo</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="cedula de identidad"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex gap-4 justify-between mb-4">
          <div className="w-full">
            <label className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/*
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4">Seleccionar Usuario</h2>
          <UserSelect onSelect={handleUserSelect} />
          {selectedUser && <p>Usuario seleccionado: {selectedUser}</p>}
        </div>
        */}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded mt-4"
        >
          Crear Usuario
        </button>
      </form>
    </>
  )
}
