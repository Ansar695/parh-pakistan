'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SubjectCardProps {
  name: string
  description: string
  image: string
  onSelect: () => void
}

export function SubjectCard({ name, description, image, onSelect }: SubjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="overflow-hidden cursor-pointer h-full flex flex-col max-w-[350px]" onClick={onSelect}>
        <div className="relative h-48">
          <Image
            src={image}
            alt={name}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
          <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{name}</h3>
        </div>
        <CardContent className="flex-grow flex flex-col justify-between p-4">
          <p className="text-gray-600 mb-4">{description}</p>
          <Button variant="outline" className="w-full">Select Subject</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

