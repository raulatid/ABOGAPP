"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

type Testimonial = {
  content: string
  author: string
  role: string
  initials: string
}

const testimonials: Testimonial[] = [
  {
    content: "ABOG.AI ha transformado mi bufete. Ahora puedo manejar el doble de casos con la misma calidad.",
    author: "María Rodríguez",
    role: "Abogada Mercantil",
    initials: "MR",
  },
  {
    content: "La precisión de los análisis es impresionante. Ha cambiado completamente mi enfoque en casos complejos.",
    author: "Javier López",
    role: "Abogado Penal",
    initials: "JL",
  },
  {
    content: "Como bufete pequeño, ABOG.AI nos permite competir con firmas mucho más grandes. Una inversión esencial.",
    author: "Carmen Sánchez",
    role: "Abogada Laboral",
    initials: "CS",
  },
  {
    content: "Gracias a ABOG.AI, reduje mi tiempo de investigación en un 70%. La tecnología que todo abogado necesita.",
    author: "Alberto Méndez",
    role: "Abogado Fiscal",
    initials: "AM",
  },
  {
    content: "La capacidad de análisis predictivo me ha permitido ganar casos que parecían imposibles. Imprescindible.",
    author: "Laura Gómez",
    role: "Abogada Civil",
    initials: "LG",
  },
]

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handlePrev = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-xl bg-white shadow-md border border-blue-100 p-8">
        <div
          className="transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div className="flex">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="min-w-full px-4 flex flex-col items-center text-center">
                <div className="flex items-center gap-1 text-blue-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 italic mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-3 h-12 w-12 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-700">{testimonial.initials}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        <Button variant="outline" size="icon" onClick={handlePrev} className="rounded-full bg-white hover:bg-blue-50">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleNext} className="rounded-full bg-white hover:bg-blue-50">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-6 bg-blue-600" : "w-2 bg-blue-200"
            }`}
            onClick={() => {
              setIsAutoPlaying(false)
              setCurrentIndex(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}

