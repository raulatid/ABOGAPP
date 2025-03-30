"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function FloatingTrialButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Guardar en localStorage que el usuario ya ingresó su correo
      localStorage.setItem("emailSubmitted", "true")

      // Cerrar el formulario e ir directamente al checkout
      setIsExpanded(false)
      window.open("https://buy.stripe.com/fZe7vAbut4etdigaEF", "_blank")
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isExpanded ? (
        <div className="bg-white rounded-lg shadow-lg p-4 w-80 border border-blue-100 animate-in slide-in-from-right">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900">Prueba gratuita de 14 días</h3>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ×
                </button>
              </div>
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Comenzar Prueba Gratuita
              </Button>
              <p className="text-xs text-gray-500 text-center">Sin compromiso</p>
            </div>
          </form>
        </div>
      ) : (
        <Button
          onClick={() => setIsExpanded(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg group"
          size="lg"
        >
          Prueba Gratuita
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      )}
    </div>
  )
}

