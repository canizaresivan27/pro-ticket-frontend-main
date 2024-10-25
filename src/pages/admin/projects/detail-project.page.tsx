import { ErrorBox, LayoutGrid, RaffleDisplay, TicketsTablet } from '@/components'
import { UpdateProjectForm } from '@/components/form/updateProject.form'
import { useProjectStore } from '@/store'
//import { FaPlug, FaPlus } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

export const DetailProjectsPage = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const selectedProject = useProjectStore((state) => state.selectedProject)

  if (!selectedProject)
    return <ErrorBox title={'Error'} message={'No se ha encontrado la rifa.'} />
  return (
    <LayoutGrid>
      <div className="flex flex-col rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-2xl font-semibold">Detalles de Rifa</h1>
      </div>

      {/* ticket view */}
      <div className="bg-white rounded-xl p-4 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-7">
        <RaffleDisplay
          id={selectedProject?.id || ''}
          number="0001"
          price={selectedProject?.raffleConfig?.priceTicket || 0}
          qr="https://example.com/qr-code.png"
          numberPosition={selectedProject?.raffleConfig?.numberPosition}
          qrPosition={selectedProject?.raffleConfig?.qrPosition}
          img={selectedProject?.raffleConfig?.img}
          orientation={selectedProject?.raffleConfig?.orientation}
        />
      </div>

      {/* update form */}
      <div className="bg-white  rounded-xl p-4 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-5">
        {selectedProject && <UpdateProjectForm project={selectedProject} />}
      </div>

      {/* Related tickets */}
      <div className="flex flex-col mt-12 rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-2xl font-semibold">Detalles de Rifa</h1>
      </div>

      {/* <ProjectMetrics /> */}

      <TicketsTablet projectId={projectId} />
    </LayoutGrid>
  )
}
