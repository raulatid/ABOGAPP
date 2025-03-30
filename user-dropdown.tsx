"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, LogOut, Settings, User } from "lucide-react"
import { useAuth } from "./auth-context"

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
      >
        <span className="hidden sm:inline">{user.name}</span>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
          {user.name.charAt(0)}
        </div>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white py-1 shadow-lg">
          <div className="border-b px-4 py-2">
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <ul>
            <li>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-blue-50">
                <User className="h-4 w-4" />
                Mi Perfil
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-blue-50">
                <Settings className="h-4 w-4" />
                Configuración
              </a>
            </li>
            <li className="border-t">
              <button
                onClick={logout}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

