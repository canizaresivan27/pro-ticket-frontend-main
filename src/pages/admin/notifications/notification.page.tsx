import { LayoutGrid } from '@/components'
import { getWhatsappStatus } from '@/services/notification.service'
import { useMessageStore, useSocket } from '@/store'
import QRCode from 'qrcode.react'
import { useEffect } from 'react'

export const NotificationPage = () => {
  const setData = useMessageStore((state) => state.setData)
  const state = useMessageStore((state) => state.state)
  const qr = useMessageStore((state) => state.qr)
  const { socket } = useSocket()

  const fetchData = async () => {
    try {
      const response = await getWhatsappStatus()
      setData(response.status, response.qr)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (socket) {
      socket.on('whatsapp-qr', (data) => {
        setData(data.status, data.qr)
      })
    }
  }, [socket, setData])

  return (
    <LayoutGrid>
      <div className="flex flex-col rounded-xl p-0 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12">
        <h1 className="text-2xl font-semibold">Notificaciones Mainhub</h1>
      </div>

      <div className="flex flex-col gap-2 bg-white rounded-xl py-3 px-2 col-span-1 sm:col-span-2 md:col-span-4  xl:col-span-5 min-h-[120px]">
        <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
          <h2 className="whitespace-nowrap">Whatsapp QR</h2>
        </div>

        <div>
          {state === 'linkup' && <p>Escanea el código QR para vincular tu cuenta</p>}
          {state === 'connected' && <p>Conectado a whatsapp ✅</p>}
          {state === 'disconnected' && <p>Desconectado</p>}
        </div>
        <div className=" p-4 border rounded-md w-min">
          {qr !== '' && <QRCode value={qr || ''} size={340} />}
          {state === 'connected' && <QRCode value={''} size={340} />}
        </div>
      </div>
    </LayoutGrid>
  )
}
