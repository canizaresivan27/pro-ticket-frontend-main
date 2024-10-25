import { getSocket, initializeSocket } from '@/services/socket.service' // Importamos las funciones del archivo de socket
import { useEffect, useState } from 'react'
import type { Socket } from 'socket.io-client'

interface UseSocketResult {
  socket: Socket | null
  message: string
}

export const useSocket = (): UseSocketResult => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [message, _setMessage] = useState<string>('')

  useEffect(() => {
    const socketToUse = getSocket() || initializeSocket()
    setSocket(socketToUse)

    socketToUse.on('connect', () => {
      console.log(`Conectado con ID: ${socketToUse.id}`)
    })

    // Cleanup
    return () => {
      socketToUse.close()
    }
  }, [])

  return { socket, message }
}
