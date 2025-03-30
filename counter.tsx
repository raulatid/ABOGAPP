"use client"

import { useState, useEffect, useRef } from "react"

interface CounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}

export function Counter({ end, duration = 2000, prefix = "", suffix = "", decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          animateCount()
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [])

  const animateCount = () => {
    const startTime = Date.now()
    const startValue = 0

    const step = () => {
      const currentTime = Date.now()
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Función de easing para hacer la animación más natural
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = startValue + easeOutQuart * (end - startValue)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(step)
  }

  const formattedCount = count.toLocaleString("es-ES", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={countRef} className="inline-block">
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  )
}

