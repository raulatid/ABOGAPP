"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "./auth-context"

export function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const { register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validaciones básicas
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setIsLoading(true)

    try {
      // Registrar al usuario
      const success = await register(name, email, password)

      if (success) {
        setIsRegistered(true)

        // Redirigir a la sección de precios después de 2 segundos
        setTimeout(() => {
          const pricingSection = document.getElementById("pricing")
          if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: "smooth" })
          }
        }, 2000)
      } else {
        setError("Error al registrar la cuenta")
      }
    } catch (err) {
      setError("Ocurrió un error al registrarse")
    } finally {
      setIsLoading(false)
    }
  }

  if (isRegistered) {
    return (
      <div className="bg-green-50 border border-green-100 rounded-lg p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-800 mb-2">¡Registro exitoso!</h3>
            <p className="text-green-700">Bienvenido a ABOG.AI, {name}. Tu cuenta ha sido creada correctamente.</p>
            <p className="text-sm text-green-600 mt-2">Redirigiendo a la página de precios...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-50 border border-red-100 rounded-md p-3 text-sm text-red-600">{error}</div>}

      <div className="space-y-2">
        <Label htmlFor="name">Nombre completo</Label>
        <Input
          id="name"
          type="text"
          placeholder="Juan Pérez"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-email">Correo electrónico</Label>
        <Input
          id="register-email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-password">Contraseña</Label>
        <Input
          id="register-password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirmar contraseña</Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-blue-700" disabled={isLoading}>
        {isLoading ? "Registrando..." : "Crear Cuenta"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Al registrarte, aceptas nuestros{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Términos de Servicio
        </a>{" "}
        y{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Política de Privacidad
        </a>
        .
      </p>
    </form>
  )
}

