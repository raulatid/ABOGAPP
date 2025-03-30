"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export function CtaBanner() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Guardar en localStorage que el usuario ya ingresó su correo
      localStorage.setItem("emailSubmitted", "true")

      // Ir directamente al checkout del plan profesional (el más popular)
      window.open("https://buy.stripe.com/fZe7vAbut4etdigaEF", "_blank")
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 p-8 md:p-12">
      {/* Elementos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSI+PC9yZWN0PjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSI+PC9yZWN0Pjwvc3ZnPg==')]"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400 mix-blend-overlay blur-3xl animate-float-subtle"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-blue-300 mix-blend-overlay blur-3xl animate-float-subtle delay-1000"></div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Accede a tu Prueba Gratuita de 14 Días</h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Te enviaremos por correo electrónico todo lo necesario para comenzar a revolucionar tu práctica legal hoy
            mismo
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-blue-200 mt-0.5 flex-shrink-0" />
              <p className="text-left text-blue-50">Acceso completo a todas las funciones premium</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-blue-200 mt-0.5 flex-shrink-0" />
              <p className="text-left text-blue-50">Configuración guiada por nuestro equipo</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-blue-200 mt-0.5 flex-shrink-0" />
              <p className="text-left text-blue-50">Cancela fácilmente antes de que finalice la prueba</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-blue-200 mt-0.5 flex-shrink-0" />
              <p className="text-left text-blue-50">Soporte prioritario durante la prueba</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Obtén acceso instantáneo</h3>
              <div className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Tu correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/20 border-white/20 text-white placeholder:text-blue-100"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-white text-blue-700 hover:bg-blue-50 transition-all duration-300"
                >
                  Comenzar Prueba Gratuita
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-blue-200 text-xs mt-4 text-center">
                No compartiremos tu correo con terceros. Cancela cuando quieras.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

