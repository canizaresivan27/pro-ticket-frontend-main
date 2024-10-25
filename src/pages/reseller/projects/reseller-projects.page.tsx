import { LayoutGrid, ProjectTablet } from '@/components'

export const ResellerProjectsPage = () => {
  return (
    <LayoutGrid>
      <div className="flex flex-col rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-6">
        <h1 className="text-2xl font-semibold">Tus rifas</h1>
      </div>

      <ProjectTablet />
    </LayoutGrid>
  )
}
