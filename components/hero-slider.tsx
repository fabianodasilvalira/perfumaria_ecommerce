"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SlideProps {
  image: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
  buttonVariant?: "default" | "secondary" | "outline"
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const slides: SlideProps[] = [
    {
      image: "https://images.unsplash.com/photo-1615104100945-249c3c0d55cb?q=80&w=1200&auto=format&fit=crop",
      title: "Descubra sua fragrância ideal",
      description:
        "Perfumes exclusivos que combinam com sua personalidade. Fragrâncias únicas para momentos especiais.",
      buttonText: "Ver Coleção",
      buttonLink: "/produtos",
      secondaryButtonText: "Perfumes Masculinos",
      secondaryButtonLink: "/produtos?categoria=masculino",
    },
    {
      image: "https://images.unsplash.com/photo-1592945403486-a0f38c51e80e?q=80&w=1200&auto=format&fit=crop",
      title: "Descubra seu perfume perfeito",
      description: "Responda algumas perguntas e encontre o perfume que combina com você",
      buttonText: "Fazer o Quiz",
      buttonLink: "/quiz",
      buttonVariant: "secondary",
    },
    {
      image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=1200&auto=format&fit=crop",
      title: "Novidades e Lançamentos",
      description: "Conheça as fragrâncias recém-chegadas à nossa coleção",
      buttonText: "Ver Lançamentos",
      buttonLink: "/produtos?ordenar=novidades",
      buttonVariant: "outline",
    },
  ]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [nextSlide, isHovering])

  return (
    <section
      className="relative h-[500px] md:h-[600px] overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            currentSlide === index && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                    <div className="container px-4 md:px-6">
                      <motion.div
                        className="max-w-lg text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                          {slide.title}
                        </h1>
                        <p className="text-white/80 md:text-lg mb-6">{slide.description}</p>
                        <div className="flex flex-wrap gap-3">
                          <Button
                            size="lg"
                            variant={slide.buttonVariant || "default"}
                            asChild
                            className={`${slide.buttonLink === "/quiz" ? "gap-2" : ""} shadow-lg hover:shadow-xl transition-all`}
                          >
                            <Link href={slide.buttonLink}>
                              {slide.buttonLink === "/quiz" && <Sparkles className="h-4 w-4" />}
                              {slide.buttonText}
                            </Link>
                          </Button>
                          {slide.secondaryButtonText && (
                            <Button
                              size="lg"
                              variant="outline"
                              asChild
                              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                            >
                              <Link href={slide.secondaryButtonLink || "#"}>{slide.secondaryButtonText}</Link>
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ),
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-all z-10 backdrop-blur-sm"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-all z-10 backdrop-blur-sm"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </section>
  )
}

