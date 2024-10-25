import type { TicketProp } from '@/contracts'
import { useAuthStore, useHistoryStore, useTicketStore } from '@/store'
import { useState } from 'react'
import { toast } from 'react-toastify'
//import { UserSelect } from "./userSelect";

interface CreateHistoryFormProps {
  modalAutoClose: () => void
}

export const CreateHistoryForm = ({ modalAutoClose }: CreateHistoryFormProps) => {
  const [formData, setFormData] = useState({
    note: '',
    date: new Date().toISOString().split('T')[0],
    dolarAmount: '0',
    amount: '0',
    badge: 'VES',
    paymentType: 'TRANSFER',
    ref: '',
  })

  const user = useAuthStore((state) => state.user)
  const selectedTicket = useTicketStore((state) => state.selectedTicket as TicketProp)
  const createHistory = useHistoryStore((state) => state.createHistory)

  // logic
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target

    // Remove leading zeros for amount and dolarAmount fields
    if (name === 'amount' || name === 'dolarAmount') {
      // Prevent multiple leading zeros
      if (value.startsWith('0') && value.length > 1 && !value.startsWith('0.')) {
        value = value.replace(/^0+/, '')
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const historyData = {
      note: formData.note,
      date: formData.date,
      dolarAmount: formData.dolarAmount,
      amount: formData.amount,
      badge: formData.badge,
      paymentType: formData.paymentType,
      ref: formData.ref,
      ticket: selectedTicket.id,
      seller: user?.id || '',
    }

    try {
      await createHistory(historyData)
      toast.success('Abono registrado exitosamente')
      // clean form
      setFormData({
        note: '',
        date: '',
        dolarAmount: '',
        amount: '',
        badge: 'VES',
        paymentType: 'TRANSFER',
        ref: '',
      })
      modalAutoClose()
    } catch (_error) {
      toast.error('Error al intentar intentar guardar abono!')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Nota</label>
          <input
            type="text"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Abono de 10$..."
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Fecha</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Monto en dolares $</label>
          <input
            type="number"
            name="dolarAmount"
            value={formData.dolarAmount}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4 flex justify-between w-full gap-1">
          <div className="w-full">
            <label className="block text-sm font-medium">Monto</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium">Tipo</label>
            <select
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            >
              <option value="VES">VES</option>
              <option value="USD">USD</option>
              <option value="COP">COP</option>
            </select>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium">Tipo de Pago</label>
            <select
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            >
              <option value="CASH">Efectivo</option>
              <option value="TRANSFER">Transferencia</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Nro. Referencia</label>
          <input
            type="text"
            name="ref"
            placeholder="000012345678912"
            value={formData.ref}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md mt-4"
        >
          Registrar
        </button>
      </form>
    </>
  )
}
