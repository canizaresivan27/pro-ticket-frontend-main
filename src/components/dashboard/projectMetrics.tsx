export const ProjectMetrics = () => {
  return (
    <>
      <div className="bg-white border border-gray-300 rounded-md h-[140px] p-2 col-span-1 md:col-span-3 xl:col-span-3">
        <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
          <h4 className="whitespace-nowrap">Total de tickets</h4>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-md h-[140px] p-2 col-span-1 md:col-span-3 xl:col-span-3">
        <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
          <h4 className="whitespace-nowrap">Vendidos</h4>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-md h-[140px] p-2 col-span-1 md:col-span-3 xl:col-span-3">
        <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
          <h4 className="whitespace-nowrap">Pendientes</h4>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-md h-[140px] p-2 col-span-1 md:col-span-3 xl:col-span-3">
        <div className="border w-min py-1 px-2 bg-slate-100 rounded-sm">
          <h4 className="whitespace-nowrap">Canelados</h4>
        </div>
      </div>
    </>
  )
}
