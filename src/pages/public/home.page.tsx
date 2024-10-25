import { Navbar } from '@/components'

export const HomePage = () => {
  return (
    <div className="flex">
      <Navbar />

      <div className="flex flex-col justify-center items-center w-full h-[calc(100vh-70px)] mt-[70px] bg-gray-400 overflow-y-scroll">
        <h1 className="text-6xl text-gray-100">
          PRO<span className="text-black font-semibold">TICKET</span> PAGINA PRINCIPAL
        </h1>
      </div>
    </div>
  )
}

export default HomePage
