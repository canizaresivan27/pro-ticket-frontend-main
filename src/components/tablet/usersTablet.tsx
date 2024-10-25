import type { UserTabletProp } from '@/contracts'
import { useUserRole } from '@/hooks/useUserRole'
import { useAuthStore, useUserStore } from '@/store'
import { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Loading } from '../common/loading'
import { CreateUserModal } from '../modal/createUser.modal'
import { UserRow } from './userRow'

export const UsersTablet = () => {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const user = useAuthStore((state) => state.user)
  const userRole = useUserRole()
  const { limit, page, users, total } = useUserStore(
    (state) => state.data as UserTabletProp
  )
  const numberPages = Math.ceil(total / limit)
  const actualPage = useUserStore((state) => state.page)
  const actualLimit = useUserStore((state) => state.limit)
  const setPage = useUserStore((state) => state.setPage)
  const setLimit = useUserStore((state) => state.setLimit)

  const getUsers = useUserStore((state) => state.getUser)

  useEffect(() => {
    if (userRole === 'admin') {
      getUsers(user?.id || '').then(() => setLoading(false))
    } else {
      getUsers(user?.id || '').then(() => setLoading(false))
    }

    actualPage
    actualLimit
  }, [actualPage, userRole, actualLimit, getUsers, user])

  const handlePrevius = () => {
    if (page > 1) setPage(page - 1)
  }
  const handleNext = () => {
    if (page < numberPages) setPage(page + 1)
  }

  //filter
  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) return <Loading />
  return (
    <>
      <div
        className={
          'bg-white rounded-xl  p-2 col-span-1 sm:col-span-2 md:col-span-4 xl:col-span-9'
        }
      >
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-full p-2 outline-none"
        />
      </div>

      <div className="bg-white rounded-xl  overflow-hidden col-span-1 sm:col-span-2 md:col-span-2 xl:col-span-3">
        <div className="h-full min-h-[52px]">
          <CreateUserModal />
        </div>
      </div>

      <div className="bg-white overflow-hidden rounded-xl col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        {/* head */}
        <div className="hidden lg:grid grid-cols-5 border-b p-4 text-sm text-gray-400">
          <p className="col-span-2">Proyecto</p>
          <p>Rol</p>
          <p>Estado</p>
          <p className="text-right">Acciones</p>
        </div>

        {/* body */}
        <div>
          {users.length > 0 ? (
            filteredUsers.map((user) => (
              <UserRow
                key={user.id}
                id={user.id}
                img={user.img || ''}
                name={user.name}
                email={user.email}
                role={user.role}
                state={user.state}
              />
            ))
          ) : (
            <p>No hay usuarios</p>
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
              <option value={2}>2</option>
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
