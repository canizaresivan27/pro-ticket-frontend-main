import { useUserRole } from '@/hooks/useUserRole'
import { useSidebarStore } from '@/store'
import { useEffect, useState } from 'react'
import { adminMenu, resellerMenu, userMenu } from './menuList'
import { SidebarButton } from './sidebarBtn'

interface MenuItem {
  icon: JSX.Element
  text: string
  url: string
  submenu: MenuItem[]
}

export const Sidebar = () => {
  const [menu, setMenu] = useState<MenuItem[]>([])
  const isOpen = useSidebarStore((state) => state.isOpen)
  const role = useUserRole()

  useEffect(() => {
    switch (role) {
      case 'admin':
        setMenu(adminMenu)
        break
      case 'user':
        setMenu(userMenu)
        break
      case 'reseller':
        setMenu(resellerMenu)
        break
    }
  }, [role])

  return (
    <aside
      className={`fixed md:relative ${
        isOpen ? 'w-[320px]' : 'w-[0px] md:w-[70px]'
      } h-[calc(100vh-70px)] z-[1000] mt-[70px] bg-white border-r border-gray-300 border-l duration-150 ease-in-out overflow-hidden`}
    >
      <div className="flex flex-col gap-1 w-full h-full px-2 py-4">
        {menu.map((element) => (
          <SidebarButton
            key={element.text}
            isOpen={isOpen}
            icon={element.icon}
            text={element.text}
            url={element.url}
            submenu={element.submenu}
          />
        ))}
      </div>
    </aside>
  )
}
