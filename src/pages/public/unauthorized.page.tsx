import { useNavigate } from 'react-router-dom'

export const UnauthorizedPage = () => {
  const navigate = useNavigate()
  return (
    <div className="grid place-content-center w-full h-[100vh] ">
      <div className="flex flex-col border rounded-md shadow-md p-4 gap-1">
        <h1 className="text-lg font-semibold">¡Acceso no autorizado!</h1>
        <p>No tiene permisos para ver esta pagina.</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-min bg-slate-950 rounded-md text-white px-3 py-2 mt-4"
        >
          Inicio
        </button>
      </div>
    </div>
  )
}
