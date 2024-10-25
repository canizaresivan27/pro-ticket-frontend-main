interface CustomCardProps {
  children?: React.ReactNode | undefined
  className?: string
  title: string
  icon: React.ReactNode
  textInfo?: [string, string]
}

export const CustomCard = ({
  children,
  className,
  title,
  icon,
  textInfo,
}: CustomCardProps) => {
  return (
    <div
      className={`flex flex-col bg-white rounded-xl p-4 col-span-1 md:col-span-2 xl:col-span-3 ${className}`}
    >
      <div className="relative flex justify-between items-center">
        <div className="">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>

        <div className="bg-gray-200 p-2 rounded-md">
          <span className="text-xl">{icon}</span>
        </div>
      </div>

      {textInfo && (
        <p className="mt-1 mb-2">
          <span className="text-3xl font-bold mr-1 text-gray-700">{textInfo[0]}</span>
          <span className="text-lg text-gray-600">{textInfo[1]}</span>
        </p>
      )}

      <div>{children && children}</div>
    </div>
  )
}
