import type React from 'react'
import { type ReactNode, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'

interface CustomModalProps {
  header: ReactNode
  children: ReactNode
  buttonText: string
  buttonType: 'create' | 'delete' | 'update'
  buttonIcon?: ReactNode
  autoOpen?: boolean
  autoClose?: boolean
}

export const CustomModal: React.FC<CustomModalProps> = ({
  header,
  children,
  buttonText,
  buttonType,
  buttonIcon,
  autoOpen = false,
  autoClose = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (autoOpen) {
      openModal()
    }
  }, [autoOpen, openModal])

  useEffect(() => {
    if (autoClose) {
      closeModal()
    }
  }, [autoClose, closeModal])

  // Estilos de botones según el tipo
  const buttonStyles = {
    create: 'bg-green-500 hover:bg-green-600 w-full',
    delete: 'bg-red-500 hover:bg-red-600',
    update: 'bg-yellow-500 hover:bg-yellow-600',
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={`flex items-center justify-center gap-2 text-white rounded-md px-3 min-h-[40px] h-full w-full ${buttonStyles[buttonType]}`}
      >
        {buttonIcon && <span>{buttonIcon}</span>}
        {buttonText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg max-h-[80%]  overflow-x-hidden ">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>{header}</div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  <IoMdClose />
                </button>
              </div>
            </div>
            <div className="p-4">{children}</div>
          </div>
        </div>
      )}
    </>
  )
}
