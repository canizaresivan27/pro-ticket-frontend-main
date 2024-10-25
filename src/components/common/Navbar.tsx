import { useAuthStore, useSidebarStore } from '@/store'
import { CgMenuGridO } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { NotificationButton } from './notificationButton'
import { UserButton } from './userButton'

export const Navbar = () => {
  const navigate = useNavigate()
  const isOpen = useSidebarStore((state) => state.isOpen)
  const setOpen = useSidebarStore((state) => state.setOpen)
  const status = useAuthStore((state) => state.status)

  return (
    <header className="fixed flex w-full h-[70px] bg-white border-b border-gray-300 z-[100]">
      {/* menu button */}
      <div
        className={`flex  items-center h-full pl-2 ${
          isOpen ? 'w-[320px]' : 'min-w-[70px]'
        }  duration-150 ease-in-out`}
      >
        {status === 'authorized' && (
          <button
            onClick={setOpen}
            type="button"
            className="flex justify-center items-center min-w-[52px] h-[52px] w-[52px] text-[38px] text-gray-500 rounded-md"
          >
            <CgMenuGridO />
          </button>
        )}

        <a href="/" className="ml-2 text-xl">
          <span className="font-bold text-gray-400">PRO</span>
          <span className="font-bold">TICKET</span>
        </a>
      </div>

      <div className="flex justify-end items-center gap-2 md:gap-4 w-[calc(100vw-70px)] pr-4 ">
        {/* user button && notification*/}

        {status === 'authorized' ? (
          <>
            <NotificationButton />
            <UserButton />
          </>
        ) : (
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="py-2 px-4 bg-slate-900 rounded-md text-white"
          >
            Login
          </button>
        )}
      </div>
    </header>
  )
}
