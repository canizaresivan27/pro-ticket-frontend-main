import { LayoutGrid, ProjectTablet } from '@/components'

export const ProjectsPage = () => {
  return (
    <LayoutGrid>
      <div className="flex flex-col rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-6">
        <h1 className="text-2xl font-semibold">Rifas</h1>
      </div>

      <ProjectTablet />
    </LayoutGrid>
  )
}
