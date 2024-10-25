import type { User } from '@/contracts'
import type { UserResponse } from '@/contracts'
import { useAuthStore, useUserStore } from '@/store'
import { useEffect, useMemo, useState } from 'react'

export const UserSelect: React.FC<{
  onSelect: (userId: string, userName: string) => void
}> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const userData = useUserStore((state) => state.data)
  const getUsers = useUserStore((state) => state.getUser)
  const user = useAuthStore((state) => state.user)

  const validUserData = Array.isArray((userData as UserResponse).users)
    ? (userData as UserResponse).users
    : []

  // filter list with by keyword
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return validUserData
    return validUserData.filter((user: User) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, validUserData])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUser = filteredUsers.find((user) => user.id === e.target.value)
    if (selectedUser) {
      onSelect(selectedUser.id || '', selectedUser.name || '') // Pasar id y nombre
    }
  }

  useEffect(() => {
    getUsers(user?.id || '')
  }, [getUsers, user])

  return (
    <div className="user-select-component">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar usuario..."
        className="border p-2 mb-2 w-full rounded"
      />
      <select onChange={handleSelectChange} className="border p-2 w-full rounded">
        <option value="">Seleccione un usuario</option>
        {filteredUsers.map((user: User) => (
          <option key={user.id} value={user.id} className="">
            {user.name} - {user.email}
          </option>
        ))}
      </select>
    </div>
  )
}
