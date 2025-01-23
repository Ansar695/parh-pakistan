'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function UploadBoards() {
  const [boards, setBoards] = useState<string[]>([])
  const [newBoard, setNewBoard] = useState('')

  const addBoard = () => {
    if (newBoard.trim() !== '' && !boards.includes(newBoard.trim())) {
      setBoards([...boards, newBoard.trim()])
      setNewBoard('')
    }
  }

  const removeBoard = (index: number) => {
    setBoards(boards.filter((_, i) => i !== index))
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Boards</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Board</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter board name"
              value={newBoard}
              onChange={(e) => setNewBoard(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={addBoard}>
              <Plus className="mr-2 h-4 w-4" /> Add Board
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Boards</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {boards.map((board, index) => (
              <motion.div
                key={board}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-md mb-2"
              >
                <span>{board}</span>
                <Button variant="destructive" size="sm" onClick={() => removeBoard(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
