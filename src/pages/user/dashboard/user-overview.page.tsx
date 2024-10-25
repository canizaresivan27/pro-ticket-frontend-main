import { CustomCard, LayoutGrid, ProjectSelector } from '@/components'
import { useUserRole } from '@/hooks/useUserRole'
import { useAuthStore, useProjectStore, useSocket } from '@/store'
import { useEffect, useState } from 'react'
import { AiOutlineFlag } from 'react-icons/ai'
import { LuCheckCheck } from 'react-icons/lu'
import { LuClock4 } from 'react-icons/lu'
import { MdOutlineSavings } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

interface ProjectStatusProp {
  collected: number
  goal: number
  reserved: number
  pending: number
  sold: number
  grid: {
    number: string
    ticket: string
    status: string
    ownerData: {
      name: string
      dni: string
      phone1: string
    }
  }[]
}

export const UserOverviewPage = () => {
  const navigate = useNavigate()
  const rolePath = useUserRole()
  const [searchQuery, setSearchQuery] = useState('')
  const user = useAuthStore((state) => state.user)
  const projectStatus = useProjectStore((state) => state.status as ProjectStatusProp)
  const selectProject = useProjectStore((state) => state.selectedProject)
  const getStatus = useProjectStore((state) => state.getStatus)

  const { socket } = useSocket() // Obtener el socket
  const [_status, setProjectStatus] = useState<ProjectStatusProp>({
    collected: 0,
    goal: 0,
    reserved: 0,
    pending: 0,
    sold: 0,
    grid: [],
  })

  useEffect(() => {
    if (socket) {
      socket.on('project-status', (data) => {
        setProjectStatus(data)
        //console.log('user:', data)
      })

      // cleanup
      return () => {
        socket.off('project-status')
      }
    }
  }, [socket])

  useEffect(() => {
    if (selectProject?.id) {
      getStatus(selectProject.id)
    }
  }, [getStatus, selectProject])

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectProject?.id) {
        getStatus(selectProject.id)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [getStatus, selectProject])

  const handleTicketClick = (ticketId: string, number: string) => {
    if (ticketId) {
      navigate(`/${rolePath}/ticket/detail/${ticketId}`)
    } else {
      navigate(`/${rolePath}/project/detail/${selectProject?.id}?number=${number}`)
    }
  }

  const filteredTickets = projectStatus.grid?.filter(
    (ticket) =>
      ticket.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ownerData?.dni.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ownerData?.phone1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ownerData?.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <LayoutGrid>
      <div className="flex flex-col rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-6">
        <p className="">
          ¡Bienvenid@ <span className="font-semibold">{user?.name}</span>!
        </p>
        <h1 className="text-2xl font-semibold">Estadísticas</h1>
      </div>

      <div className="flex lg:justify-end  items-center h-full  rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-6">
        <ProjectSelector />
      </div>

      <CustomCard
        className={'border-l-8 border-blue-400'}
        title={'Reservados'}
        icon={<LuClock4 />}
        textInfo={[(projectStatus?.reserved || 0).toString(), 'tickets']}
      />

      <CustomCard
        className={'border-l-8 border-orange-400'}
        title={'Pendientes'}
        icon={<LuClock4 />}
        textInfo={[(projectStatus?.pending || 0).toString(), 'tickets']}
      />

      <CustomCard
        className={'border-l-8 border-green-400'}
        title={'Pagados'}
        icon={<LuCheckCheck />}
        textInfo={[
          `${projectStatus?.sold || 0}/${projectStatus?.grid?.length || 0}`,
          'tickets',
        ]}
      />

      <CustomCard
        className={'hidden sm:flex'}
        title={'Precio del Ticket'}
        icon={<LuCheckCheck />}
        textInfo={[`${selectProject?.raffleConfig.priceTicket || 0}`, '$']}
      />

      <CustomCard
        className={''}
        title={'Total Recaudado'}
        icon={<MdOutlineSavings />}
        textInfo={[(projectStatus?.collected || 0).toString(), '$']}
      />

      <CustomCard
        className={''}
        title={'Meta Recaudación'}
        icon={<AiOutlineFlag />}
        textInfo={[(projectStatus?.goal || 0).toString(), '$']}
      />

      <div className="flex flex-col  rounded-xl p-0 mt-6 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-2xl font-semibold text-gray-500">
          Tabla de: <span className="text-gray-900">{selectProject?.name}</span>
        </h1>
      </div>

      <div
        className={`bg-white rounded-xl  p-2 col-span-1 sm:col-span-2 ${'md:col-span-6 xl:col-span-12'}`}
      >
        <input
          type="text"
          placeholder="⌕ Buscar CI, Teléfono, Nombre o Número"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-full p-2 outline-none"
        />
      </div>

      <div className="flex flex-col bg-white rounded-xl py-3 px-2 col-span-1 sm:col-span-2 md:col-span-6  xl:col-span-12 min-h-[120px]">
        <div className="flex flex-wrap gap-1 p-3 justify-start max-h-[500px] overflow-y-scroll">
          {filteredTickets && filteredTickets.length > 0 ? (
            filteredTickets.map((item) => {
              let statusColor = ''

              switch (item.status) {
                case 'WINNER':
                  statusColor = '#FDE047'
                  break
                case 'PAID':
                  statusColor = '#4ADE80'
                  break
                case 'UNPAID':
                  statusColor = '#FB923C'
                  break
                case 'RESERVED':
                  statusColor = '#60A5FA'
                  break
                case 'CANCELLED':
                  statusColor = '#8E232A'
                  break
                default:
                  statusColor = ''
              }

              return (
                <button
                  key={item.number}
                  type="button"
                  style={{ backgroundColor: statusColor }}
                  onClick={() => handleTicketClick(item.ticket, item.number)}
                  className={`
                ${statusColor}
                 flex flex-col justify-around items-center min-h-[68px] w-[68px] border rounded-md overflow-hidden bg-gray-50 cursor-pointer text-sm`}
                >
                  {item.number.split('-').map((num) => (
                    <p key={num} className="text-[14px]">
                      {num}
                    </p>
                  ))}
                </button>
              )
            })
          ) : (
            <div className="flex justify-center items-center w-full h-[120px]">
              No hay tickets
            </div>
          )}
        </div>
      </div>
    </LayoutGrid>
  )
}
