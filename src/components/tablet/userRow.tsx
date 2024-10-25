import { useUserRole } from '@/hooks/useUserRole'
import { useAuthStore, useUserStore } from '@/store'
import { AiOutlineDelete } from 'react-icons/ai'
import { MdOutlineDashboard } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CustomModal } from '../modal/customModal'

interface UserRowProp {
  id: string
  img: string
  name: string
  email: string
  role: string[]
  state: string[]
}

export const UserRow = ({ id, img, name, email, role, state }: UserRowProp) => {
  const navigate = useNavigate()
  const deleteUser = useUserStore((state) => state.deleteUser)
  const deleteUserReseller = useUserStore((state) => state.deleteUserReseller)

  const creatorId = useAuthStore((state) => state.user?.id)
  const userRole = useUserRole()

  const handleDelete = async () => {
    try {
      await deleteUser(creatorId || '', id)
      toast.success('Usuario eliminado exitosamente.')
    } catch (_error) {
      toast.error('Hubo un error al eliminar el proyecto.')
    }
  }

  const handleDeleteReseller = async () => {
    try {
      await deleteUserReseller(creatorId || '', id)
      toast.success('Uusario eliminado exitosamente.')
    } catch (_error) {
      toast.error('Hubo un error al eliminar el proyecto.')
    }
  }

  const handleDetails = () => {
    if (userRole === 'admin') {
      navigate(`/${userRole}/user/detail/${id}`)
    } else {
      navigate(`/${userRole}/reseller/detail/${id}`)
    }
  }

  return (
    <>
      <div className="grid  grid-cols-1 lg:grid-cols-5 border-b p-4 gap-y-2 xl:gap-0">
        {/* project info */}
        <div className="flex gap-2 col-span-1 lg:col-span-2 overflow-hidden">
          <div className="h-[64px] w-[64px]  bg-gray-200 rounded-md overflow-hidden">
            <img
              src={img || 'https://via.placeholder.com/150'}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold">{name}</h2>
            <p className="text-sm text-gray-400">ID: {id}</p>
            <p className="text-sm text-gray-400">ID: {email}</p>
          </div>
        </div>

        {/* tickets */}
        <div className="flex items-center">
          <label className="flex lg:hidden mr-2">Rol:</label>
          <div className="px-2 py-1 text-white bg-slate-900 rounded-full">
            {role.map((r) => (
              <p key={r} className="text-sm font-semibold">
                {r}
              </p>
            ))}
          </div>
        </div>

        {/* state */}
        <div className="flex items-center">
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
            {userRole === 'admin' && (
              <CustomModal
                header={<h2>Confirmar Eliminación</h2>}
                buttonText=""
                buttonType="delete"
                buttonIcon={<AiOutlineDelete />}
              >
                <p>
                  ¿Estás seguro de que deseas eliminar el usuario: <strong>{name}</strong>
                  ?
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

          <div>
            {userRole === 'user' && (
              <CustomModal
                header={<h2>Confirmar Eliminación</h2>}
                buttonText=""
                buttonType="delete"
                buttonIcon={<AiOutlineDelete />}
              >
                <p>
                  ¿Estás seguro de que deseas eliminar el usuario: <strong>{name}</strong>
                  ?
                </p>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={handleDeleteReseller}
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
