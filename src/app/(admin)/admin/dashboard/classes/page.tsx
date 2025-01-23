'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Mock data for boards (replace with actual data fetching)
const boards = ['Punjab Board', 'Federal Board', 'Sindh Board']

export default function UploadClasses() {
  const [selectedBoard, setSelectedBoard] = useState<string | undefined>()
  const [classes, setClasses] = useState<string[]>([])
  const [newClass, setNewClass] = useState('')

  const addClass = () => {
    if (newClass.trim() !== '' && !classes.includes(newClass.trim())) {
      setClasses([...classes, newClass.trim()])
      setNewClass('')
    }
  }

  const removeClass = (index: number) => {
    setClasses(classes.filter((_, i) => i !== index))
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Classes for Boards</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Board and Add Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Select onValueChange={setSelectedBoard}>
              <SelectTrigger>
                <SelectValue placeholder="Select a board" />
              </SelectTrigger>
              <SelectContent>
                {boards.map((board) => (
                  <SelectItem key={board} value={board}>
                    {board}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter class name"
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={addClass} disabled={!selectedBoard}>
                <Plus className="mr-2 h-4 w-4" /> Add Class
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {selectedBoard && (
        <Card>
          <CardHeader>
            <CardTitle>Classes for {selectedBoard}</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence>
              {classes.map((cls, index) => (
                <motion.div
                  key={cls}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between bg-gray-100 p-3 rounded-md mb-2"
                >
                  <span>{cls}</span>
                  <Button variant="destructive" size="sm" onClick={() => removeClass(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
