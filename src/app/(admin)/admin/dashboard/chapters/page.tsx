"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Plus, Trash2, Upload, FileText } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Mock data (replace with actual data fetching)
const boards = ["Punjab Board", "Federal Board", "Sindh Board"]
const classes = ["9th", "10th", "11th", "12th"]
const subjects = ["Mathematics", "Physics", "Chemistry", "Biology"]

interface Chapter {
  name: string
  file: File | null
}

export default function UploadChapters() {
  const [selectedBoard, setSelectedBoard] = useState<string | undefined>()
  const [selectedClass, setSelectedClass] = useState<string | undefined>()
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>()
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [newChapter, setNewChapter] = useState<Chapter>({ name: "", file: null })
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addChapter = () => {
    if (newChapter.name.trim() !== "" && newChapter.file && !chapters.some((c) => c.name === newChapter.name.trim())) {
      setChapters([...chapters, { ...newChapter, name: newChapter.name.trim() }])
      setNewChapter({ name: "", file: null })
      setUploadProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const removeChapter = (index: number) => {
    setChapters(chapters.filter((_, i) => i !== index))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setNewChapter({ ...newChapter, file })
      simulateUpload()
    } else {
      alert("Please select a PDF file")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const simulateUpload = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Chapters for Subjects</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Board, Class, and Subject</CardTitle>
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
            <Select onValueChange={setSelectedClass} disabled={!selectedBoard}>
              <SelectTrigger>
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setSelectedSubject} disabled={!selectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      {selectedBoard && selectedClass && selectedSubject && (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Chapter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <Input
                  type="text"
                  placeholder="Enter chapter name"
                  value={newChapter.name}
                  onChange={(e) => setNewChapter({ ...newChapter, name: e.target.value })}
                  className="flex-grow"
                />
                <div className="flex items-center space-x-2">
                  <div className="relative flex-grow">
                    <Input
                      type="file"
                      accept=".pdf"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      {newChapter.file ? newChapter.file.name : "Upload PDF"}
                    </label>
                  </div>
                  <Button onClick={addChapter} disabled={!newChapter.file || !newChapter.name}>
                    <Plus className="mr-2 h-4 w-4" /> Add Chapter
                  </Button>
                </div>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full">
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                Chapters for {selectedSubject} - {selectedClass} ({selectedBoard})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence>
                {chapters.map((chapter, index) => (
                  <motion.div
                    key={chapter.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between bg-gray-100 p-3 rounded-md mb-2"
                  >
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <span>{chapter.name}</span>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => removeChapter(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

