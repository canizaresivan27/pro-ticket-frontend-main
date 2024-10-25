import { CustomCard, LayoutGrid } from '@/components'
import type { ProjectResponse, UserResponse } from '@/contracts'
import { useAuthStore, useProjectStore, useUserStore } from '@/store'
import { useEffect } from 'react'
import { FiUsers } from 'react-icons/fi'
import { LuClock4 } from 'react-icons/lu'

export const OverviewPage = () => {
  const projects = useProjectStore((state) => state.data) as ProjectResponse
  const getProjects = useProjectStore((state) => state.getProjects)

  const users = useUserStore((state) => state.data as UserResponse)
  const getUser = useUserStore((state) => state.getUser)
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    getProjects()
    getUser(user?.id || '')
  }, [getProjects, getUser, user])

  return (
    <LayoutGrid>
      <div className="flex flex-col rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <p className="">
          ¡Bienvenid@ <span className="font-semibold">{user?.name}</span>!
        </p>

        <h1 className="text-2xl font-semibold">Estadísticas</h1>
      </div>

      <CustomCard
        className={''}
        title={'Rifas Creadas'}
        icon={<LuClock4 />}
        textInfo={[(projects.total || 0).toString(), 'rifas']}
      />

      <CustomCard
        className={''}
        title={'Usuarios'}
        icon={<FiUsers />}
        textInfo={[`${users.total || 0}`, 'usuarios']}
      />
    </LayoutGrid>
  )
}
