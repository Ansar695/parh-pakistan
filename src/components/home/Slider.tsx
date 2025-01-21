/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const slides = [
  {
    title: "Customized Exam Papers",
    description: "Create tailored exams for any subject or grade level with ease.",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Comprehensive Question Bank",
    description: "Access thousands of curated questions across various subjects and difficulty levels.",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Efficient Grading Tools",
    description: "Streamline your grading process with our advanced assessment features.",
    image: "/placeholder.svg?height=400&width=600"
  }
]

export function EducationalSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div className="flex-[0_0_100%] min-w-0 relative" key={index}>
              <div className="h-[400px] relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-white px-4"
                  >
                    <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                    <p className="text-xl">{slide.description}</p>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
        onClick={scrollNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}

