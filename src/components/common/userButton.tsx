import { useUserRole } from '@/hooks/useUserRole'
import {
  useAuthStore,
  useHistoryStore,
  useProjectStore,
  useTicketStore,
  useUserStore,
} from '@/store'
import { useState } from 'react'
import { LuUser2 } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

export const UserButton = () => {
  const userRole = useUserRole()
  const [isOpen, setIsOpen] = useState(false)
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  const logoutUser = useAuthStore((state) => state.logoutUser)
  const cleanHistoryData = useHistoryStore((state) => state.cleanHistoryData)
  const cleanTicketsData = useTicketStore((state) => state.cleanTicketsData)
  const cleanProjectData = useProjectStore((state) => state.cleanProjectData)
  const cleanUserData = useUserStore((state) => state.cleanUserData)

  const handleClic = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    cleanHistoryData()
    cleanTicketsData()
    cleanProjectData()
    cleanUserData()
    logoutUser()
    navigate('/')
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClic}
        className="flex justify-between items-center gap-4 md:pl-6 pl-2  pr-2 h-[52px] bg-gray-200 rounded-full"
      >
        <span className="hidden md:flex font-semibold">{user?.name || 'user'}</span>

        <div className=" flex justify-center items-center w-[40px] h-[40px] bg-slate-900 rounded-full text-white ">
          <LuUser2 />
        </div>
      </button>

      {isOpen && (
        <div className="absolute flex flex-col items-start gap-2 top-[68px] right-0 bg-white border w-[200px] p-2 rounded-md shadow-lg z-[100]">
          <button
            type="button"
            onClick={() => navigate(`/${userRole}/overview`)}
            className="w-full h-[42px] hover:bg-gray-200 text-left px-2 rounded-md capitalize"
          >
            {userRole} Dasboard
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full h-[42px] bg-red-600/20 hover:bg-gray-200 text-left px-2 rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
