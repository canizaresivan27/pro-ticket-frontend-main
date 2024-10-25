import { AiOutlineNotification } from 'react-icons/ai'
import { LuTicket } from 'react-icons/lu'
import { PiUsersBold } from 'react-icons/pi'
import { TbDeviceAnalytics } from 'react-icons/tb'

//
export const adminMenu = [
  {
    icon: <TbDeviceAnalytics />,
    text: 'Estadísticas',
    url: 'overview',
    submenu: [],
  },
  {
    icon: <LuTicket />,
    text: 'Proyectos',
    url: 'project/list',
    submenu: [],
  },
  {
    icon: <PiUsersBold />,
    text: 'Usuarios',
    url: 'user/list',
    submenu: [
      /* { icon: <IoIosSearch />, text: "Buscar", url: "users/search" },*/
    ],
  },
  {
    icon: <AiOutlineNotification />,
    text: 'Notificaciones',
    url: 'notification',
    submenu: [
      /* { icon: <IoIosSearch />, text: "Buscar", url: "users/search" },*/
    ],
  },
]

//
export const userMenu = [
  {
    icon: <TbDeviceAnalytics />,
    text: 'Estadísticas',
    url: 'overview',
    submenu: [],
  },
  {
    icon: <LuTicket />,
    text: 'Rifas',
    url: 'project/list',
    submenu: [],
  },
  {
    icon: <PiUsersBold />,
    text: 'Vendedores',
    url: 'reseller/list',
    submenu: [
      /* { icon: <IoIosSearch />, text: "Buscar", url: "users/search" },*/
    ],
  },
]

//
export const resellerMenu = [
  {
    icon: <PiUsersBold />,
    text: 'Overview',
    url: 'overview',
    submenu: [],
  },
  {
    icon: <LuTicket />,
    text: 'Rifas',
    url: 'project/list',
    submenu: [],
  },
]
