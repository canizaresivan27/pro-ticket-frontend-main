import { ErrorBox, LayoutGrid, TicketsTablet } from '@/components'
import { UpdateProjectMembersForm } from '@/components/form/updateProjectMembers.form'
import { useProjectStore } from '@/store'
import { useParams } from 'react-router-dom'

export const UserDetailProjectsPage = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const selectedProject = useProjectStore((state) => state.selectedProject)

  if (!selectedProject)
    return <ErrorBox title={'Error'} message={'No se ha encontrado la rifa.'} />
  return (
    <LayoutGrid>
      <div className="flex flex-col rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-2xl font-semibold"> Detalles Rifa </h1>
      </div>

      {/* Project summary */}
      <div className=" flex flex-col gap-1 bg-white  rounded-xl p-4 col-span-1 mb-6 sm:col-span-2 md:col-span-3 xl:col-span-6">
        <div className="w-full bg-gray-100 h-[120px] rounded-md overflow-hidden">
          <img
            src={selectedProject.raffleConfig.img}
            alt={selectedProject.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold mb-2">Resumen de la rifa</h3>

          <p className="text-sm text-gray-600">
            Id:
            <span>{selectedProject.id}</span>
          </p>
        </div>
        <p>
          <strong>Nombre: </strong>
          {selectedProject.name}
        </p>

        {/* Config ticket */}
        <div className="flex flex-col gap-1 border-y py-2 my-2">
          <p>
            <strong>Precio del Ticket: </strong>
            {selectedProject.raffleConfig.priceTicket}$
          </p>
          <p>
            <strong>Numberos por Ticket: </strong>
            {selectedProject.raffleConfig.perTicket}
          </p>
          <p>
            <strong>Numeros de Tickets: </strong>
            {selectedProject.raffleConfig.totalTickets}
          </p>
          <div className="flex items-center gap-1 mb-2">
            <p>
              <strong>Fechas: </strong>
            </p>
            <div className="flex gap-4 border rounded-full w-min px-2 py-1">
              <p className="text-nowrap">
                <strong className="text-gray-600">Inicio: </strong>
                {selectedProject.date.start}
              </p>
              <p className="text-nowrap">
                <strong className="text-gray-600">Fin: </strong>
                {selectedProject.date.end}
              </p>
            </div>
          </div>
        </div>

        <p>
          <strong>Estado: </strong>{' '}
          <span className=" bg-gray-900 px-3 py-1 rounded-full text-white">
            {selectedProject.state}
          </span>
        </p>
      </div>

      <div className="bg-white  rounded-xl p-4 col-span-1 mb-6 sm:col-span-2 md:col-span-3 xl:col-span-6">
        <UpdateProjectMembersForm project={selectedProject} />
      </div>

      <TicketsTablet projectId={projectId} />
    </LayoutGrid>
  )
}
