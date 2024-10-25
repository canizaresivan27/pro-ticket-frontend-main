import { LayoutGrid, Loading } from '@/components'
import { UpdateUserForm } from '@/components/form/updateUser.form'
import type { UserProp } from '@/contracts'

import { useUserStore } from '@/store'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const DetailUserPage = () => {
  const { userId } = useParams<{ userId: string }>()
  const [loading, setLoading] = useState(true)
  const selectUser = useUserStore((state) => state.selectedUser as UserProp)
  const getUser = useUserStore((state) => state.getUserById)

  useEffect(() => {
    if (userId) {
      getUser(userId).then(() => setLoading(false))
    }
  }, [getUser, userId])

  if (loading) return <Loading />
  return (
    <LayoutGrid>
      <div className="flex flex-col rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-2xl font-semibold">Detalles de Uusario</h1>
      </div>

      <div className="bg-white rounded-xl  p-4 col-span-1 sm:col-span-2 md:col-span-4 xl:col-span-6">
        <div className="flex flex-col md:flex-row items-start gap-2">
          <div className="flex w-[180px] h-[180px] rounded-md overflow-hidden">
            <img src={selectUser.img} alt="" className="w-full object-cover" />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-md">
              <span className="font-semibold">ID:</span> {selectUser.id}
            </p>
            <p>
              <span className="font-semibold">Nombre:</span> {selectUser.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {selectUser.email}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {selectUser.role}
            </p>
            <p>
              <span className="font-semibold">Telefono: </span>
              {selectUser.phone}
            </p>
            <p>
              <span className="font-semibold">Estado: </span>
              <span className=" bg-slate-900 text-white px-3 py-1 rounded-full">
                {selectUser.state}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl  p-4 col-span-1 sm:col-span-2 md:col-span-4 xl:col-span-6">
        Detalles Edicion de Usuario {userId}
        <UpdateUserForm user={selectUser} />
      </div>
    </LayoutGrid>
  )
}
