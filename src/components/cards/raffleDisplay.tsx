import QRCode from 'qrcode.react'

interface RaffleDisplayProps {
  id: string
  number: string
  qr: string
  price: number
  numberPosition: string
  qrPosition: string
  img: string
  orientation: string
}

const positionStyles: Record<string, string> = {
  tl: 'top-2 left-2',
  tr: 'top-2 right-2',
  bl: 'bottom-2 left-2',
  br: 'bottom-2 right-2',
}

export const RaffleDisplay: React.FC<RaffleDisplayProps> = ({
  id,
  number,
  qr,
  price,
  qrPosition,
  img,
  orientation,
}) => {
  const fliedList = ['nombre', 'ci', 'telefono', 'direccion', 'otro']

  return (
    <div
      className={`flex ${orientation === 'portrait' ? 'flex-col' : 'flex-row'} w-full`}
    >
      {/* Inputs section */}
      <div className="flex flex-col gap-1 w-full border p-2 rounded">
        <div className="flex items-center gap-1">
          <label htmlFor="id" className="text-gray-600 text-sm font-semibold font-mono">
            ID
          </label>
          <p className="text-sm font-mono">{id}</p>
        </div>
        {fliedList.map((item) => (
          <div key={item} className="flex gap-1 items-baseline w-full">
            <input
              type="text"
              className="w-full border-gray-300 border-b text-[12px] px-2 bg-white"
              disabled
              placeholder={item}
            />
          </div>
        ))}
      </div>

      {/* Image and QR code section */}
      <div className="relative grid border min-h-[340px] overflow-hidden w-full">
        <div className="absolute top-0 w-full h-full">
          <img src={img} alt="Raffle-picture" className="w-full h-full object-cover" />
        </div>

        {/* Raffle Number
        <div
          className={`absolute z-20 rounded-md p-1 backdrop-blur-sm bg-white/60 ${positionStyles[numberPosition]}`}
        >
          <p className="text-lg font-bold">{number}</p>
        </div>
        */}

        {/* QR Code */}
        <div className={`absolute z-10 bg-white shadow-lg ${positionStyles[qrPosition]}`}>
          <div className="py-1 bg-red-800 text-white">
            <p className="w-full text-center">
              <span className="text-xl font-bold">VALOR </span>
              <span className="text-xl font-bold ">{price}$</span>
            </p>
          </div>

          <div className="border-y py-1">
            <p className="font-bold text-lg uppercase text-red-600 w-full text-center">
              N° {number}
            </p>
          </div>

          <div className="p-1">
            <QRCode value={`${'http:localhost/your-ticket'}/${qr}`} size={106} />
          </div>
        </div>
      </div>
    </div>
  )
}
