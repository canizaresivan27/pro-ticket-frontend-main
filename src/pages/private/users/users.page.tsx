import { LayoutGrid, UsersTablet } from '@/components'
import { useUserRole } from '@/hooks/useUserRole'
//import type { UserProp, UserResponse } from '@/contracts'
//import { useAuthStore, useUserStore } from '@/store'
//import { useEffect, useState } from 'react'

export const UsersPage = () => {
  const userRole = useUserRole()
  return (
    <LayoutGrid>
      <div className="flex flex-col rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-2xl font-semibold">
          {userRole === 'admin' ? 'Usuarios' : 'Vendedores'}
        </h1>
      </div>

      <UsersTablet />
    </LayoutGrid>
  )
}
