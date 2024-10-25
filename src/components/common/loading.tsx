import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-full ">
      <div className="flex justify-between items-center gap-2 animate-pulse">
        <div className="text-lg">Cargando</div>
        <div className=" mt-[2px] animate-spin ">
          <AiOutlineLoading3Quarters />
        </div>
      </div>
    </div>
  )
}
