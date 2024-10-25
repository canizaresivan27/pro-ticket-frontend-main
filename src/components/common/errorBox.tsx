import { useNavigate } from 'react-router-dom'

export const ErrorBox = ({ title = '', message = '' }) => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col border bg-white gap-2 p-4 rounded-md">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p>{message}</p>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-2 w-min rounded-md py-2 px-4 bg-slate-800 text-white"
        >
          Vovler
        </button>
      </div>
    </div>
  )
}
