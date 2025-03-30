"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  ArrowRight,
  Brain,
  Gavel,
  Scale,
  Shield,
  Star,
  Sparkles,
  Zap,
  Lightbulb,
  FileText,
  CheckCircle,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { LoginModal } from "@/components/login-modal"
import { MobileMenu } from "@/components/mobile-menu"
import { UserDropdown } from "@/components/user-dropdown"
import { useAuth } from "@/components/auth-context"
import { Counter } from "@/components/counter"
import { TestimonialSlider } from "@/components/testimonial-slider"
import { CtaBanner } from "@/components/cta-banner"
import { TrialPopup } from "@/components/trial-popup"
import { FloatingTrialButton } from "@/components/floating-trial-button"
import { Input } from "@/components/ui/input"
import { RegisterModal } from "@/components/register-modal"

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [heroEmail, setHeroEmail] = useState("")
  const [isHeroSubmitted, setIsHeroSubmitted] = useState(false)
  const { isAuthenticated } = useAuth()
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const openLoginModal = () => setIsLoginModalOpen(true)
  const closeLoginModal = () => setIsLoginModalOpen(false)
  const openRegisterModal = () => setIsRegisterModalOpen(true)
  const closeRegisterModal = () => setIsRegisterModalOpen(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Modificar la función handleHeroSubmit para que vaya directamente al checkout

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (heroEmail) {
      // Guardar en localStorage que el usuario ya ingresó su correo
      localStorage.setItem("emailSubmitted", "true")

      // Ir directamente al checkout del plan profesional (el más popular)
      window.open("https://buy.stripe.com/fZe7vAbut4etdigaEF", "_blank")
    }
  }

  // Añade este código después de la declaración de estados:
  useEffect(() => {
    const emailSubmitted = localStorage.getItem("emailSubmitted")
    if (emailSubmitted === "true") {
      setIsHeroSubmitted(true)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Gavel className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-blue-soft bg-clip-text text-transparent">ABOG.AI</span>
          </div>

          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium hover:text-primary transition-colors duration-300"
            >
              Características
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium hover:text-primary transition-colors duration-300"
            >
              Cómo Funciona
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm font-medium hover:text-primary transition-colors duration-300"
            >
              Testimonios
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-sm font-medium hover:text-primary transition-colors duration-300"
            >
              Precios
            </button>
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={openLoginModal}
                className="hidden md:flex hover:bg-blue-50 hover:text-primary transition-all duration-300"
              >
                Iniciar Sesión
              </Button>
            )}

            <Button
              size="sm"
              className="hidden md:flex bg-primary hover:bg-blue-600 transition-colors duration-300"
              onClick={openRegisterModal}
            >
              Prueba Gratuita
            </Button>

            <MobileMenu onLoginClick={openLoginModal} onRegisterClick={openRegisterModal} />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-28 relative overflow-hidden">
          {/* Subtle background elements */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-blue-50 px-3 py-1 text-sm text-blue-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    La revolución legal con IA
                  </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-900">
                  Inteligencia Artificial para Abogados Excepcionales
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  ABOG.AI potencia tu práctica legal con inteligencia artificial avanzada. Resuelve casos complejos,
                  optimiza tu tiempo y conviértete en el mejor abogado con nuestra plataforma revolucionaria.
                </p>

                <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Tu correo electrónico"
                    value={heroEmail}
                    onChange={(e) => setHeroEmail(e.target.value)}
                    required
                    className="flex-grow"
                  />
                  <Button
                    type="submit"
                    className="gap-1 bg-primary hover:bg-blue-600 transition-all duration-300 group"
                  >
                    Prueba Gratuita
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </form>

                <p className="text-sm text-muted-foreground">
                  Prueba gratuita por 14 días. Sin compromiso. Cancela cuando quieras.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl bg-gradient-blue-soft p-1 shadow-lg animate-glow-subtle">
                  <div className="absolute inset-0 flex flex-col justify-center">
                    <div className="p-4 overflow-hidden">
                      <div className="flex flex-col space-y-3 overflow-y-auto max-h-[300px] pr-2">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Gavel className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="bg-blue-50 rounded-lg p-3 text-sm max-w-[80%]">
                            <p className="text-blue-900">Bienvenido a ABOG.AI. ¿En qué puedo ayudarle hoy?</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 self-end">
                          <div className="bg-blue-600 text-white rounded-lg p-3 text-sm max-w-[80%]">
                            <p>
                              Necesito analizar un contrato de arrendamiento comercial. Hay una cláusula sobre
                              renovación automática que parece ambigua.
                            </p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-xs text-white font-medium">JL</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Brain className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="bg-blue-50 rounded-lg p-3 text-sm max-w-[80%]">
                            <p className="text-blue-900">
                              Analizando su contrato... He encontrado 3 precedentes legales relevantes sobre cláusulas
                              de renovación automática. La jurisprudencia reciente del Tribunal Supremo (STS 342/2023)
                              establece que estas cláusulas deben interpretarse restrictivamente y requieren
                              notificación expresa.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Brain className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="bg-blue-50 rounded-lg p-3 text-sm max-w-[80%]">
                            <p className="text-blue-900">
                              Recomendación: Según el análisis, la cláusula de renovación automática en su contrato
                              requiere notificación con 30 días de antelación. Le sugiero enviar una comunicación formal
                              al arrendador expresando su intención respecto a la renovación y solicitar confirmación
                              por escrito.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-blue-50 relative overflow-hidden">
          {/* Elementos de fondo sutiles */}
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-50/30 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-blue-900">Resultados Comprobados</h2>
              <p className="mt-2 text-xl text-muted-foreground max-w-[700px] mx-auto">
                ABOG.AI está transformando la práctica legal en todo el mundo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-blue-100 transform transition-all duration-300 hover:shadow-md hover:scale-105">
                <div className="rounded-full bg-blue-50 p-3 mb-4">
                  <Scale className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-blue-700 mb-2">
                  <Counter end={98} suffix="%" />
                </div>
                <p className="text-center text-muted-foreground font-medium">de efectividad en análisis legal</p>
              </div>

              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-blue-100 transform transition-all duration-300 hover:shadow-md hover:scale-105">
                <div className="rounded-full bg-blue-50 p-3 mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-blue-700 mb-2">
                  <Counter end={1350} prefix="+" />
                </div>
                <p className="text-center text-muted-foreground font-medium">casos legales resueltos con IA</p>
              </div>

              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-blue-100 transform transition-all duration-300 hover:shadow-md hover:scale-105">
                <div className="rounded-full bg-blue-50 p-3 mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-blue-700 mb-2">
                  <Counter end={14000} />
                </div>
                <p className="text-center text-muted-foreground font-medium">horas de trabajo ahorradas</p>
              </div>

              <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-blue-100 transform transition-all duration-300 hover:shadow-md hover:scale-105">
                <div className="rounded-full bg-blue-50 p-3 mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-blue-700 mb-2">
                  <Counter end={320} prefix="+" />
                </div>
                <p className="text-center text-muted-foreground font-medium">abogados de todo el mundo</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-block bg-blue-50 rounded-full px-4 py-2 text-blue-700 font-medium text-sm">
                Respaldado por los mejores bufetes de abogados
              </div>

              <div className="mt-8 flex flex-wrap justify-center items-center gap-8 opacity-70">
                <div className="text-xl font-bold text-gray-400">BUFETE LEGAL</div>
                <div className="text-xl font-bold text-gray-400">ABOGADOS & ASOCIADOS</div>
                <div className="text-xl font-bold text-gray-400">LEGAL PARTNERS</div>
                <div className="text-xl font-bold text-gray-400">DERECHO GLOBAL</div>
                <div className="text-xl font-bold text-gray-400">LEX CONSULTING</div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="bg-gradient-to-b from-background to-blue-50/50 py-16 md:py-20 relative overflow-hidden"
        >
          {/* Subtle background elements */}
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-50 px-3 py-1 text-sm text-blue-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    Características
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-blue-900">
                  Potencia tu Práctica Legal
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  ABOG.AI ofrece herramientas avanzadas para transformar tu trabajo legal
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-background/80 backdrop-blur transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:translate-y-[-5px] group">
                <div className="rounded-full bg-blue-100 p-3 transition-transform duration-300 group-hover:scale-110">
                  <Scale className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  Análisis de Casos
                </h3>
                <p className="text-center text-muted-foreground">
                  Analiza miles de precedentes legales en segundos para encontrar la mejor estrategia
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-background/80 backdrop-blur transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:translate-y-[-5px] group">
                <div className="rounded-full bg-blue-100 p-3 transition-transform duration-300 group-hover:scale-110">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  Asistente Legal
                </h3>
                <p className="text-center text-muted-foreground">
                  Tu colaborador virtual disponible 24/7 para consultas y redacción de documentos
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-background/80 backdrop-blur transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:translate-y-[-5px] group">
                <div className="rounded-full bg-blue-100 p-3 transition-transform duration-300 group-hover:scale-110">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  Predicción de Resultados
                </h3>
                <p className="text-center text-muted-foreground">
                  Algoritmos avanzados que predicen posibles resultados basados en datos históricos
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 md:py-20 relative overflow-hidden bg-blue-50/30">
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-50 px-3 py-1 text-sm text-blue-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Lightbulb className="h-4 w-4" />
                    Cómo Funciona
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-blue-900">
                  Simplificamos tu Trabajo Legal
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Integra ABOG.AI en tu flujo de trabajo en tres simples pasos
                </p>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 md:px-0">
              <div className="relative">
                {/* Línea conectora horizontal */}
                <div className="hidden md:block absolute top-[70px] left-[140px] right-[140px] h-[2px] bg-blue-200"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-[100px] h-[100px] rounded-full bg-blue-700 flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-md relative z-10">
                      1
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Sube tu Caso</h3>
                    <div className="flex justify-center mb-3">
                      <FileText className="h-6 w-6 text-blue-700" />
                    </div>
                    <p className="text-muted-foreground max-w-[300px]">
                      Carga documentos, transcripciones y detalles relevantes a la plataforma
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-[100px] h-[100px] rounded-full bg-blue-800 flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-md relative z-10">
                      2
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Análisis IA</h3>
                    <div className="flex justify-center mb-3">
                      <Brain className="h-6 w-6 text-blue-700" />
                    </div>
                    <p className="text-muted-foreground max-w-[300px]">
                      Nuestros algoritmos analizan la información y generan estrategias personalizadas
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-[100px] h-[100px] rounded-full bg-blue-900 flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-md relative z-10">
                      3
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Resultados Accionables</h3>
                    <div className="flex justify-center mb-3">
                      <CheckCircle className="h-6 w-6 text-blue-700" />
                    </div>
                    <p className="text-muted-foreground max-w-[300px]">
                      Recibe recomendaciones, documentos y estrategias listas para implementar
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="bg-gradient-to-b from-blue-50/50 to-background py-16 md:py-20 relative overflow-hidden"
        >
          {/* Subtle background elements */}
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-50/30 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-50 px-3 py-1 text-sm text-blue-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    Testimonios
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-blue-900">
                  Lo que Dicen los Profesionales
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Abogados de todo el mundo confían en ABOG.AI para mejorar su práctica
                </p>
              </div>
            </div>

            <TestimonialSlider />

            <div className="mt-16 text-center">
              <Button
                variant="outline"
                className="bg-white hover:bg-blue-50 hover:text-primary transition-all duration-300"
                onClick={() => scrollToSection("testimonials")}
              >
                Ver más testimonios
              </Button>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-16 md:py-20 relative overflow-hidden">
          {/* Subtle background elements */}
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-50/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-50 px-3 py-1 text-sm text-blue-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    Precios
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-blue-900">
                  Planes para Cada Necesidad
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Elige el plan que mejor se adapte a tu práctica legal
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col rounded-lg border p-6 shadow-sm bg-background/80 backdrop-blur transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:translate-y-[-5px] group">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">Básico</h3>
                  <p className="text-muted-foreground">Para profesionales independientes</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-blue-700">€99</span>
                  <span className="ml-1 text-muted-foreground">/mes</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-blue-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Hasta 10 casos mensuales</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-blue-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Análisis básico de documentos</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-blue-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Soporte por email</span>
                  </li>
                </ul>
                <Button
                  className="mt-8 bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                  onClick={() => {
                    if (localStorage.getItem("emailSubmitted") === "true") {
                      window.open("https://buy.stripe.com/6oE8zE8ih4etba8cMM", "_blank")
                    } else {
                      scrollToSection("trial-form")
                    }
                  }}
                >
                  {isHeroSubmitted ? "Comenzar ahora" : "Prueba 14 días gratis"}
                </Button>
              </div>
              <div className="flex flex-col rounded-lg border-2 border-primary bg-gradient-to-b from-blue-50 to-background p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] group">
                <div className="space-y-2">
                  <div className="inline-block rounded-full bg-blue-600 px-3 py-1 text-xs text-white">Popular</div>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                    Profesional
                  </h3>
                  <p className="text-muted-foreground">Para bufetes pequeños</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-blue-700">€249</span>
                  <span className="ml-1 text-muted-foreground">/mes</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-blue-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Hasta 50 casos mensuales</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-blue-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Análisis avanzado de documentos</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-blue-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Predicción de resultados</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-blue-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Soporte prioritario</span>
                  </li>
                </ul>
                <Button
                  className="mt-8 bg-primary hover:bg-blue-700 transition-colors duration-300"
                  onClick={() => {
                    if (localStorage.getItem("emailSubmitted") === "true") {
                      window.open("https://buy.stripe.com/fZe7vAbut4etdigaEF", "_blank")
                    } else {
                      scrollToSection("trial-form")
                    }
                  }}
                >
                  {isHeroSubmitted ? "Comenzar ahora" : "Prueba 14 días gratis"}
                </Button>
              </div>
              <div className="flex flex-col rounded-lg border p-6 shadow-sm bg-background/80 backdrop-blur transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:translate-y-[-5px] group">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                    Empresarial
                  </h3>
                  <p className="text-muted-foreground">Para grandes bufetes</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-blue-700">€599</span>
                  <span className="ml-1 text-muted-foreground">/mes</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-blue-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Casos ilimitados</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-blue-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Análisis premium de documentos</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-blue-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>API personalizada</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-blue-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Soporte 24/7 dedicado</span>
                  </li>
                </ul>
                <Button
                  className="mt-8 bg-blue-700 hover:bg-blue-800 transition-colors duration-300"
                  onClick={() => {
                    if (localStorage.getItem("emailSubmitted") === "true") {
                      window.open("https://buy.stripe.com/00gg26butbGVgus002", "_blank")
                    } else {
                      scrollToSection("trial-form")
                    }
                  }}
                >
                  {isHeroSubmitted ? "Comenzar ahora" : "Prueba 14 días gratis"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="trial-form" className="py-16 md:py-20 relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <CtaBanner />
          </div>
        </section>

        <section className="bg-blue-700 text-white py-16 md:py-20 relative overflow-hidden">
          {/* Subtle animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSI+PC9yZWN0PjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSI+PC9yZWN0Pjwvc3ZnPg==')]"></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400 mix-blend-overlay blur-3xl animate-float-subtle"></div>
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-blue-300 mix-blend-overlay blur-3xl animate-float-subtle delay-1000"></div>
            </div>
          </div>

          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  ¿Listo para Revolucionar tu Práctica Legal?
                </h2>
                <p className="max-w-[600px] md:text-xl">
                  Únete a miles de profesionales que ya están aprovechando el poder de la IA para transformar su trabajo
                  legal.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-end">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-1 bg-white/20 backdrop-blur hover:bg-white/30 transition-all duration-300"
                  onClick={() => {
                    if (localStorage.getItem("emailSubmitted") === "true") {
                      window.open("https://buy.stripe.com/fZe7vAbut4etdigaEF", "_blank")
                    } else {
                      scrollToSection("trial-form")
                    }
                  }}
                >
                  {isHeroSubmitted ? "Comenzar ahora" : "Solicitar Demo"}
                </Button>
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 gap-1 group transition-all duration-300"
                  onClick={() => {
                    if (localStorage.getItem("emailSubmitted") === "true") {
                      window.open("https://buy.stripe.com/fZe7vAbut4etdigaEF", "_blank")
                    } else {
                      scrollToSection("trial-form")
                    }
                  }}
                >
                  {isHeroSubmitted ? "Comenzar ahora" : "Comenzar Ahora"}{" "}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-50/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 relative">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold text-blue-700">ABOG.AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transformando la práctica legal con inteligencia artificial avanzada.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Producto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Características
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Precios
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Testimonios
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Guías
                  </button>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Sobre Nosotros
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Carreras
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("trial-form")}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Contacto
                  </button>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Términos de Servicio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Política de Privacidad
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    Cookies
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">© 2025 ABOG.AI. Todos los derechos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de inicio de sesión */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

      {/* Modal de registro */}
      <RegisterModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />

      {/* Popup de prueba gratuita */}
      <TrialPopup />

      {/* Botón flotante de prueba gratuita */}
      <FloatingTrialButton />
    </div>
  )
}

