"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "./auth-context"

type MobileMenuProps = {
  onLoginClick: () => void
  onRegisterClick: () => void
}

export function MobileMenu({ onLoginClick, onRegisterClick }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-primary" aria-label="Menú">
        <Menu className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-blue-soft bg-clip-text text-transparent">ABOG.AI</span>
            </div>
            <Button variant="ghost" size="icon" onClick={closeMenu} className="text-primary" aria-label="Cerrar menú">
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="px-4 py-8">
            <ul className="space-y-6">
              <li>
                <Link href="#features" className="text-lg font-medium hover:text-primary" onClick={closeMenu}>
                  Características
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-lg font-medium hover:text-primary" onClick={closeMenu}>
                  Cómo Funciona
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-lg font-medium hover:text-primary" onClick={closeMenu}>
                  Testimonios
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-lg font-medium hover:text-primary" onClick={closeMenu}>
                  Precios
                </Link>
              </li>
            </ul>

            <div className="mt-8 space-y-4">
              {isAuthenticated ? (
                <Button
                  className="w-full bg-red-500 hover:bg-red-600"
                  onClick={() => {
                    logout()
                    closeMenu()
                  }}
                >
                  Cerrar Sesión
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-blue-50 hover:text-primary"
                    onClick={() => {
                      onLoginClick()
                      closeMenu()
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    className="w-full bg-primary hover:bg-blue-600"
                    onClick={() => {
                      onRegisterClick()
                      closeMenu()
                    }}
                  >
                    Prueba Gratuita
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

