import { Navbar, Sidebar } from '@/components'
import { Outlet } from 'react-router-dom'

export const DashboardAdminPage = () => {
  return (
    <div className="flex">
      <Navbar />

      <div className="flex">
        <Sidebar />
      </div>

      <div className="flex w-full h-[calc(100vh-70px)] mt-[70px] bg-gray-200 overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  )
}
