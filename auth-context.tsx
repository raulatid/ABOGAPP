"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type User = {
  name: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string) => {
    // Simulación de autenticación
    if (email && password.length >= 6) {
      // Simular una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Crear usuario simulado
      const firstName = email.split("@")[0].split(".")[0]
      const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1)

      setUser({
        name: capitalizedName,
        email: email,
        role: "usuario",
      })
      return true
    }
    return false
  }

  const register = async (name: string, email: string, password: string) => {
    // Simulación de registro
    if (name && email && password.length >= 6) {
      // Simular una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Crear usuario simulado
      const capitalizedName = name.split(" ")[0]

      setUser({
        name: capitalizedName,
        email: email,
        role: "usuario",
      })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}

