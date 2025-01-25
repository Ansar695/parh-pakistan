import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Upload } from "lucide-react"

interface Class {
  id: string
  name: string
}

interface Subject {
  id: string
  name: string
  class: string
}

interface AddChapterModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { class: string; subject: string; name: string; slug: string; file: File | null }) => void
  classes: Class[]
  subjects: Subject[]
}

export function AddChapterModal({ isOpen, onClose, onSubmit, classes, subjects }: AddChapterModalProps) {
  const [selectedClass, setSelectedClass] = useState("")
  const [subject, setSubject] = useState("")
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      simulateUpload()
    }
  }

  const simulateUpload = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
      }
    }, 500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ class: selectedClass, subject, name, slug, file })
    setSelectedClass("")
    setSubject("")
    setName("")
    setSlug("")
    setFile(null)
    setUploadProgress(0)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Chapter</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="class">Select Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Select Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects
                    .filter((s) => s.class === selectedClass)
                    .map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Chapter Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Chapter Slug</Label>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">Chapter File (PDF)</Label>
              <div className="flex items-center space-x-2">
                <Input id="file" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                <Label
                  htmlFor="file"
                  className="cursor-pointer flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  {file ? file.name : "Upload PDF"}
                </Label>
              </div>
              {uploadProgress > 0 && <Progress value={uploadProgress} className="w-full" />}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Chapter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

