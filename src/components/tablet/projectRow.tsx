import type { ProjectList } from '@/contracts'
import { useUserRole } from '@/hooks/useUserRole'
import { useProjectStore } from '@/store'
import { AiOutlineDelete } from 'react-icons/ai'
import { LuUser2 } from 'react-icons/lu'
import { MdOutlineDashboard } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CustomModal } from '../modal/customModal'

export const ProjectRow = ({
  id,
  name,
  image,
  priceTicket,
  totalTickets,
  state,
  owner,
}: ProjectList) => {
  const rolePath = useUserRole()
  const navigate = useNavigate()
  const getProjects = useProjectStore((state) => state.getProjects)
  const deleteProject = useProjectStore((state) => state.deleteProject)
  const ownerName = typeof owner === 'string' ? owner : owner.name
  const roleUser = useUserRole()

  const handleDetails = () => {
    getProjects(id)
    navigate(`/${rolePath}/project/detail/${id}`)
  }

  const handleDelete = async () => {
    try {
      await deleteProject(id)
      toast.success('Proyecto eliminado exitosamente.')
    } catch (_error) {
      toast.error('Ha ocurrido un error!')
    }
  }

  return (
    <>
      <div className="grid  grid-cols-1 lg:grid-cols-7 border-b p-4 gap-y-2 xl:gap-0">
        {/* project info */}
        <div className="flex flex-col lg:flex-row gap-2 col-span-1 lg:col-span-2 overflow-hidden">
          <div className="h-[160px] lg:h-[64px] lg:w-[64px] min-w-[64px]  bg-gray-200 rounded-md overflow-hidden">
            <img
              src={
                image
                  ? image
                  : 'https://plus.unsplash.com/premium_photo-1683134676662-645988a8074e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9uZG8lMjBkZSUyMGNvbG9yZXN8ZW58MHx8MHx8fDA%3D'
              }
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-lg lg:text-[16px]">
              {name.length > 20 ? `${name.slice(0, 20)}...` : name}
            </h2>
            <p className="text-sm text-gray-400">ID: {id}</p>
          </div>
        </div>

        {/* tickets */}
        <div className="flex items-center">
          <label className="flex lg:hidden mr-2">Total Tickets:</label>
          <div className="px-2 py-1 text-white bg-slate-900 rounded-md">
            {totalTickets}
          </div>
        </div>

        {/* owner */}
        <div className="flex items-center">
          <label className="flex lg:hidden mr-2">Precio:</label>
          <p>
            <span className="">{priceTicket}</span>$
          </p>
        </div>

        {/* owner */}
        <div className="flex items-center">
          <label className="flex lg:hidden mr-2">Dueño:</label>
          <div className="flex items-center gap-2 pl-2 pr-4 p-1 border w-min rounded-full">
            <div className="bg-slate-700 h-[32px] w-[32px] rounded-full text-white flex justify-center items-center">
              <LuUser2 />
            </div>
            <p className="min-w text-nowrap">
              {ownerName.length > 12 ? `${ownerName.slice(0, 12)}...` : ownerName}
            </p>
          </div>
        </div>

        {/* state */}
        <div className="flex items-center justify-start lg:justify-center">
          <label className="flex lg:hidden mr-2">Estado:</label>
          <div className="bg-green-700/50 px-4 p-1 rounded-full">
            <p className="text-sm font-bold">{state}</p>
          </div>
        </div>

        {/* actions */}
        <div className="flex items-center justify-end gap-2 col-span-1 lg:col-span-1 mt-6 lg:mt-0">
          <button
            type="button"
            onClick={handleDetails}
            className="flex justify-center items-center h-[42px] min-w-[42px] w-full lg:w-min border rounded-md hover:bg-gray-300"
          >
            <MdOutlineDashboard />
          </button>

          <div>
            {roleUser === 'admin' && (
              <CustomModal
                header={<h2>Confirmar Eliminación</h2>}
                buttonText=""
                buttonType="delete"
                buttonIcon={<AiOutlineDelete />}
              >
                <p>
                  ¿Estás seguro de que deseas eliminar la rifa: <strong>{name}</strong>?
                </p>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Confirmar
                  </button>
                </div>
              </CustomModal>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
