"use client"
import { X } from "lucide-react"
import { RegisterForm } from "./register-form"

type RegisterModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100">
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-blue-900">Crear Cuenta</h2>
          <p className="text-sm text-muted-foreground">Únete a ABOG.AI y potencia tu práctica legal</p>
        </div>

        <RegisterForm />
      </div>
    </div>
  )
}

