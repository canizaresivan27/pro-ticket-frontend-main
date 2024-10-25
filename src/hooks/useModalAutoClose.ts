import { useEffect, useState } from 'react'

export const useModalAutoClose = () => {
  const [isOpen, setIsOpen] = useState(false)

  const modalAutoClose = () => {
    setIsOpen(true)
  }

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false)
    }
  }, [isOpen])

  return { isOpen, modalAutoClose }
}
