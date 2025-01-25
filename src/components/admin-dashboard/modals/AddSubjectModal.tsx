/* eslint-disable @next/next/no-img-element */
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ImagePlus } from "lucide-react"

interface Board {
  id: string
  name: string
}

interface Class {
  id: string
  name: string
  board: string
}

interface AddSubjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    board: string
    class: string
    image: File | null
    name: string
    about: string
    slug: string
  }) => void
  boards: Board[]
  classes: Class[]
}

export function AddSubjectModal({ isOpen, onClose, onSubmit, boards, classes }: AddSubjectModalProps) {
  const [board, setBoard] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [name, setName] = useState("")
  const [about, setAbout] = useState("")
  const [slug, setSlug] = useState("")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ board, class: selectedClass, image, name, about, slug })
    setBoard("")
    setSelectedClass("")
    setImage(null)
    setName("")
    setAbout("")
    setSlug("")
    setPreviewUrl(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Subject</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="board">Select Board</Label>
              <Select value={board} onValueChange={setBoard}>
                <SelectTrigger id="board">
                  <SelectValue placeholder="Select a board" />
                </SelectTrigger>
                <SelectContent>
                  {boards.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="class">Select Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes
                    .filter((c) => c.board === board)
                    .map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Subject Image</Label>
              <Card className="w-full h-40 flex items-center justify-center cursor-pointer">
                <CardContent>
                  <input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  <label htmlFor="image" className="w-full h-full flex flex-col items-center justify-center">
                    {previewUrl ? (
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <>
                        <ImagePlus className="w-12 h-12 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-500">Upload Image</span>
                      </>
                    )}
                  </label>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Subject Name</Label>
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
              <Label htmlFor="about">About Subject</Label>
              <Textarea id="about" value={about} onChange={(e) => setAbout(e.target.value)} rows={3} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Subject Slug</Label>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Subject</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

