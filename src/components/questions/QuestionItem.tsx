import { useState } from 'react'
import { motion } from 'framer-motion'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface QuestionItemProps {
  id: string
  text: string
  type: 'mcq' | 'short' | 'long'
  options?: string[]
  onSelect: (id: string, selected: boolean) => void
}

export function QuestionItem({ id, text, type, options, onSelect }: QuestionItemProps) {
  const [isSelected, setIsSelected] = useState(false)

  const handleToggle = () => {
    setIsSelected(!isSelected)
    onSelect(id, !isSelected)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`p-6 rounded-lg shadow-md mb-6 cursor-pointer transition-all duration-300 ${
        isSelected ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white hover:shadow-lg'
      }`}
      onClick={handleToggle}
    >
      <div className="flex items-start space-x-4">
        <Checkbox
          id={id}
          checked={isSelected}
          onCheckedChange={handleToggle}
          className="mt-1"
        />
        <div className="flex-grow">
          <Label htmlFor={id} className="text-lg font-semibold text-gray-800 mb-2 block cursor-pointer">
            {text}
          </Label>
          {type === 'mcq' && options && (
            <RadioGroup className="space-y-2 mt-3">
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={`option-${index}`} id={`${id}-option-${index}`} />
                  <Label htmlFor={`${id}-option-${index}`} className="text-gray-700">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>
      </div>
    </motion.div>
  )
}
