"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TrialPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")

  // Mostrar el popup después de 15 segundos de navegación
  useEffect(() => {
    const timer = setTimeout(() => {
      // Verificar si el usuario ya ha cerrado el popup antes (usando localStorage)
      const hasClosedPopup = localStorage.getItem("hasClosedTrialPopup")
      if (!hasClosedPopup) {
        setIsOpen(true)
      }
    }, 15000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    // Guardar en localStorage que el usuario ha cerrado el popup
    localStorage.setItem("hasClosedTrialPopup", "true")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Guardar en localStorage que el usuario ya ingresó su correo
      localStorage.setItem("emailSubmitted", "true")

      // Cerrar el popup e ir directamente al checkout
      setIsOpen(false)
      window.open("https://buy.stripe.com/fZe7vAbut4etdigaEF", "_blank")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <h3 className="text-xl font-bold">¿Quieres probar ABOG.AI gratis?</h3>
          <p className="text-blue-100 mt-2">Accede a todas las funciones premium durante 14 días</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Tu correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Comenzar Prueba Gratuita
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-xs text-gray-500 text-center">Sin compromiso. Cancela cuando quieras.</p>
          </form>
        </div>
      </div>
    </div>
  )
}

