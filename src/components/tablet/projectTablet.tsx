import type { ProjectTabletProp } from '@/contracts'
import { useUserRole } from '@/hooks/useUserRole'
import { useAuthStore, useProjectStore } from '@/store'
import { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Loading } from '../common/loading'
import { CreateProjectModal } from '../modal/createProject.modal'
import { ProjectRow } from './projectRow'

export const ProjectTablet = () => {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const userRole = useUserRole()
  const user = useAuthStore((state) => state.user)
  const { limit, page, projects, total } = useProjectStore(
    (state) => state.data as ProjectTabletProp
  )
  const numberPages = Math.ceil(total / limit)
  const actualPage = useProjectStore((state) => state.page)
  const actualLimit = useProjectStore((state) => state.limit)
  const setPage = useProjectStore((state) => state.setPage)
  const setLimit = useProjectStore((state) => state.setLimit)
  const getProjects = useProjectStore((state) => state.getProjects)
  const getRelatedProjects = useProjectStore((state) => state.getRelatedProjects)
  const getRelatedProjectReseller = useProjectStore(
    (state) => state.getRelatedProjectReseller
  )

  useEffect(() => {
    if (userRole === 'admin') {
      getProjects().then(() => setLoading(false))
    } else if (userRole === 'user') {
      getRelatedProjects(user?.id || '').then(() => setLoading(false))
    } else {
      getRelatedProjectReseller(user?.id || '').then(() => setLoading(false))
    }

    actualPage
    actualLimit
  }, [
    user,
    userRole,
    actualPage,
    actualLimit,
    getProjects,
    getRelatedProjects,
    getRelatedProjectReseller,
  ])

  const handlePrevius = () => {
    if (page > 1) setPage(page - 1)
  }
  const handleNext = () => {
    if (page < numberPages) setPage(page + 1)
  }

  //filter
  const filteredProjects = projects?.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) return <Loading />
  return (
    <>
      <div
        className={`bg-white rounded-xl  p-2 col-span-1 sm:col-span-2 ${
          userRole === 'admin'
            ? 'md:col-span-4 xl:col-span-9'
            : 'md:col-span-6 xl:col-span-12'
        }`}
      >
        <input
          type="text"
          placeholder="Buscar proyectos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-full p-2 outline-none"
        />
      </div>

      {userRole === 'admin' && (
        <div className="bg-white rounded-xl  overflow-hidden col-span-1 sm:col-span-2 md:col-span-2 xl:col-span-3">
          <div className="h-full min-h-[52px]">
            <CreateProjectModal />
          </div>
        </div>
      )}

      <div className="bg-white  overflow-hidden rounded-xl col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        {/* head */}
        <div className="hidden lg:grid grid-cols-7 border-b p-4 text-sm text-gray-400">
          <p className="col-span-2">Proyecto</p>
          <p>Total Tickets</p>
          <p>Precio</p>
          <p>Dueño</p>
          <p className="text-center">Estado</p>
          <p className="text-right">Acciones</p>
        </div>

        {/* body */}
        <div>
          {projects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectRow
                key={project.id}
                id={project.id}
                name={project.name}
                image={project.image}
                priceTicket={project.priceTicket}
                totalTickets={project.totalTickets}
                state={project.state}
                owner={project.owner}
              />
            ))
          ) : (
            <div className="flex justify-center items-center w-full h-[120px]">
              No se encontraron proyectos
            </div>
          )}
        </div>

        {/* pagination */}
        <nav className="flex justify-between gap-2 items-center p-4">
          <div className="flex">
            <select
              name="limit"
              id="limit"
              onChange={(e) => {
                setLimit(+e.target.value)
                setPage(1)
              }}
              className="border rounded-md h-[42px] px-2"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={40}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevius}
              className="h-[42px] w-[42px] border flex justify-center items-center rounded-md hover:bg-gray-400"
            >
              <IoIosArrowBack />
            </button>
            <div className="h-[42px] w-[42px] border flex justify-center items-center rounded-md">
              {page}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="h-[42px] w-[42px] border flex justify-center items-center rounded-md hover:bg-gray-400"
            >
              <IoIosArrowForward />
            </button>
          </div>
          pag. {numberPages}
        </nav>
      </div>
    </>
  )
}
