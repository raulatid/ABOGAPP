"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { useAuth } from "./auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type LoginModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        onClose()
      } else {
        setError("Credenciales inválidas. Intente nuevamente.")
      }
    } catch (err) {
      setError("Ocurrió un error al iniciar sesión.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100">
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-blue-900">Iniciar Sesión</h2>
          <p className="text-sm text-muted-foreground">Accede a tu cuenta de ABOG.AI</p>
        </div>

        {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <a href="#" className="text-xs text-blue-600 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">¿No tienes una cuenta? </span>
            <a href="#" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

