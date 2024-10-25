import type { ProjectTabletProp } from '@/contracts'
import { useUserRole } from '@/hooks/useUserRole'
import { useAuthStore, useProjectStore } from '@/store'
import { useEffect, useState } from 'react'
//import { useSocket } from '@/store'

export const ProjectSelector = () => {
  const user = useAuthStore((state) => state.user)
  const userRole = useUserRole()
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    localStorage.getItem('selectedProjectId') || ''
  )
  const data = useProjectStore((state) => state.data as ProjectTabletProp)
  const getRelatedProjects = useProjectStore((state) => state.getRelatedProjects)
  const getRelatedProjectReseller = useProjectStore(
    (state) => state.getRelatedProjectReseller
  )
  const setSelectedProject = useProjectStore((state) => state.getProjects)

  //const { socket } = useSocket()
  /*
  const _joinRoom = (projectId: string) => {
    if (socket) {
      socket.emit('joinProjectRoom', { projectId })
      //console.log(`Evento JoinProject enviado: ${projectId}`)
    }
  }*/

  useEffect(() => {
    if (user?.id) {
      if (userRole === 'user') {
        getRelatedProjects(user.id)
      } else {
        getRelatedProjectReseller(user.id)
      }
    }
  }, [userRole, user?.id, getRelatedProjects, getRelatedProjectReseller])

  useEffect(() => {
    if (data?.projects?.length && !selectedProjectId) {
      const firstProjectId = data.projects[0].id
      setSelectedProjectId(firstProjectId)
      setSelectedProject(firstProjectId)
      localStorage.setItem('selectedProjectId', firstProjectId)
    }
  }, [data.projects, selectedProjectId, setSelectedProject])

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = event.target.value
    setSelectedProjectId(projectId)
    setSelectedProject(projectId)
    localStorage.setItem('selectedProjectId', projectId)
    //joinRoom(projectId)
  }

  return (
    <div className="w-full lg:max-w-[260px]">
      <select
        id="projectSelector"
        value={selectedProjectId}
        onChange={handleProjectChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-slate-950 focus:border-slate-950 sm:text-sm rounded-xl h-[52px]"
      >
        <option value="" disabled>
          Selecciona un proyecto
        </option>
        {data?.projects?.length > 0 ? (
          data.projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))
        ) : (
          <option disabled>No hay proyectos disponibles</option>
        )}
      </select>
    </div>
  )
}
