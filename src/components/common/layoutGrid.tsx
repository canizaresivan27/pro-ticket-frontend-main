import type { ReactNode } from 'react'
import type React from 'react'
interface LayoutProps {
  children: ReactNode
}

export const LayoutGrid: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 xl:grid-cols-12 gap-3 max-w-[1200px] w-full h-min py-8 px-4">
        {children}
      </div>
    </div>
  )
}
