import type { ProjectMemberProp, ProjectProp } from '@/contracts'
import { useProjectStore } from '@/store'
import { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { UserSelect } from './userSelect'

interface UpdateProjectFormProps {
  project: ProjectProp
}

export const UpdateProjectMembersForm = ({ project }: UpdateProjectFormProps) => {
  const [formData, setFormData] = useState({
    members: project.members || [],
  })

  const updateProjectMembers = useProjectStore((state) => state.updateProjectMember)

  useEffect(() => {
    setFormData({
      members: project.members || [],
    })
  }, [project])

  const handleAddMember = (userId: string, userName: string) => {
    if (!formData.members.some((member) => member.id === userId)) {
      setFormData((prevData) => ({
        ...prevData,
        members: [...prevData.members, { id: userId, name: userName, state: [] }],
      }))
    }
  }

  const handleRemoveMember = (userId: string) => {
    setFormData((prevData) => ({
      ...prevData,
      members: prevData.members.filter((member) => member.id !== userId),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const updatedProjectData = {
      id: project.id as string,
      members: formData.members.map((member) => member.id),
    } as ProjectMemberProp

    try {
      await updateProjectMembers(updatedProjectData)
      toast.success('Proyecto actualizado exitosamente')
    } catch (_error) {
      toast.error('Error al actualizar el proyecto')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h3 className="text-lg font-semibold mb-2">Miembros Rifa</h3>
          <ul className="flex flex-col gap-1 h-[140px] overflow-x-hidden bg-gray-100 rounded-xl p-2 border ">
            {formData.members.map((member) => (
              <li
                key={member.id}
                className="border rounded-xl pl-4 pr-2 py-1 bg-white flex  justify-between "
              >
                <span className="text-md">{member.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveMember(member.id)}
                  className="ml-2 text-red-500 text-lg"
                >
                  <IoClose />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4 mt-6">
          <h3 className="text-xl font-semibold mb-2">Seleccionar Usuarios</h3>
          <UserSelect onSelect={handleAddMember} />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md mt-4"
        >
          Actualizar Miembros
        </button>
      </form>
    </>
  )
}
