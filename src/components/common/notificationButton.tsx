import { useState } from 'react'
import { IoNotificationsOutline } from 'react-icons/io5'
import { IoCloseSharp } from 'react-icons/io5'

export const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClic = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClic}
        className="flex justify-center items-center gap-4 w-[52px] h-[52px] bg-gray-200 rounded-full"
      >
        <span className="text-2xl">
          <IoNotificationsOutline />
        </span>
      </button>

      {isOpen && (
        <div className="fixed md:absolute top-[68px] right-0 w-full md:w-[320px] px-4 md:px-0">
          {/* notification container */}
          <div className="flex flex-col bg-white w-full shadow-lg rounded-md overflow-hidden border border-gray-300">
            <div className="flex justify-between items-center h-[62px] bg-gray-200 w-full px-3">
              <p className="font-semibold">Notificaciones</p>
              <button type="button" onClick={handleClic}>
                <span className="text-xl">
                  <IoCloseSharp />
                </span>
              </button>
            </div>

            {/* element */}
            <ul className="flex flex-col gap-2 w-full">
              <li className="flex justify-between items-center border-b border-gray-300 rounded-md w-full h-[62px] px-3">
                <div className="flex items-center gap-2">
                  <p>Proyecto Creado</p>
                  <div className="h-[20px] w-[20px] bg-green-700 rounded-full">{''}</div>
                </div>

                <div>
                  <span className="text-xl text-gray-400">
                    <IoCloseSharp />
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
