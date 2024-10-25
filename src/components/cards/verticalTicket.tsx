const positionStyles: Record<string, string> = {
  tl: 'top-2 left-2',
  tr: 'top-2 right-2',
  bl: 'bottom-2 left-2',
  br: 'bottom-2 right-2',
}
import QRCode from 'qrcode.react'

interface TicketProp {
  ticket: {
    ownerData: {
      name: string
      dni: string
      phone1: string
      phone2: string
      address: string
      other: string
    }
    seller: {
      name: string
    }
    project: {
      raffleConfig: {
        img: string
        numberPosition: string
        qrPosition: string
        orientation: string
        priceTicket: string
      }
    }
    number: string
    id: string
  }
}

export const VerticalTicket = ({ ticket }: TicketProp) => {
  return (
    <>
      <div className=" bg-white rounded-xl p-2 col-span-1 sm:col-span-2 md:col-span-6 xl:col-span-12 overflow-x-scroll  border border-gray-300 shadow-xl">
        <div className="flex flex-col w-[400px] py-6">
          {/* ----------------- TICKET FIELDS ---------------- */}
          <div className="flex flex-col w-full border p-4 overflow-hidden">
            <div>
              <div className="flex items-center gap-1 w-[360px]">
                <label
                  htmlFor="id"
                  className="text-gray-600 text-sm font-semibold font-mono"
                >
                  ID
                </label>
                <p className="text-sm font-mono">{ticket.id}</p>
              </div>

              <div className="flex gap-1 ">
                <label htmlFor="name" className="text-gray-600 font-semibold">
                  Nombre:
                </label>
                <input
                  type="text"
                  value={ticket.ownerData.name}
                  disabled
                  className="border-b border-gray-400 bg-inherit w-full px-1"
                />
              </div>

              <div className="flex gap-1">
                <label htmlFor="ci" className="text-gray-600 font-semibold">
                  C.I:
                </label>
                <input
                  type="text"
                  value={ticket.ownerData.dni}
                  disabled
                  className="border-b border-gray-400 bg-inherit w-full px-1"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex">
                  <label htmlFor="tlf" className="text-gray-600 font-semibold">
                    Telf:
                  </label>
                  <input
                    type="text"
                    value={ticket.ownerData.phone1}
                    disabled
                    className="border-b border-gray-400 bg-inherit w-full px-1"
                  />
                </div>
                <div className="flex">
                  <label htmlFor="tlf2" className="text-gray-600 font-semibold">
                    Telf:
                  </label>
                  <input
                    type="text"
                    value={ticket.ownerData.phone2}
                    disabled
                    className="border-b border-gray-400 bg-inherit w-full px-1"
                  />
                </div>
              </div>

              <div className="flex gap-1">
                <label htmlFor="address" className="text-gray-600 font-semibold ">
                  Dirección:
                </label>
                <input
                  type="text"
                  value={ticket.ownerData.address}
                  disabled
                  className="border-b border-gray-400 bg-inherit w-full px-1"
                />
              </div>

              <div className="flex gap-1">
                <label htmlFor="other" className="text-gray-600 font-semibold">
                  Otro:
                </label>
                <input
                  type="text"
                  value={ticket.ownerData.other}
                  disabled
                  className="border-b border-gray-400 bg-inherit w-full px-1"
                />
              </div>

              <div className="flex gap-1">
                <p className="font-bold text-lg uppercase text-red-600">
                  N° {ticket.number}
                </p>
              </div>

              <p className="text-[12px] w-full text-center text-gray-600 mt-1">
                Tipografia Mora Cel. (0414) 731.99.79 - Tovar{' '}
              </p>
            </div>
          </div>

          {/* ----------------- IMAGE & QR---------------- */}
          <div className="relative grid w-[400px]  h-[660px] overflow-hidden">
            <div className="absolute top-0 w-full h-full ">
              <img
                src={ticket.project?.raffleConfig?.img}
                alt="Raffle-picture"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Raffle Number 
            <div
              className={`absolute z-20 rounded-md p-1  backdrop-blur-sm bg-white/60  ${
                positionStyles[ticket.project.raffleConfig.numberPosition]
              }`}
            >
              <p className="text-lg font-bold">{ticket.number}</p>
            </div>
            */}

            {/* QR Code */}
            <div
              className={`absolute z-10 bg-white rounded-sm shadow-lg ${
                positionStyles[ticket.project.raffleConfig.qrPosition]
              }`}
            >
              <div className="py-1 bg-red-800 text-white">
                <p className="w-full text-center">
                  <span className="text-xl font-bold">VALOR </span>
                  <span className="text-xl font-bold ">
                    {ticket.project.raffleConfig.priceTicket}$
                  </span>
                </p>
              </div>

              <div className="border-y py-1">
                <p className="font-bold text-lg uppercase text-red-600 w-full text-center">
                  N° {ticket.number}
                </p>
              </div>

              <div className="p-1">
                <QRCode
                  value={`${'http:localhost/your-ticket'}/${ticket.id}`}
                  size={106}
                />
              </div>
            </div>
          </div>

          {/* disclaimer */}
          <div className="flex w-full h-min pt-1 pb-2 px-4 bg-black/90">
            <p className="text-md text-white/70">
              Número no pagado no participa en los premios / No se devuelve dinero de
              abono{' '}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
