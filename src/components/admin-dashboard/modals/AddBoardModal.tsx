/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ImagePlus } from 'lucide-react'

interface AddBoardModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; logo: File | null; slug: string }) => void
}

export function AddBoardModal({ isOpen, onClose, onSubmit }: AddBoardModalProps) {
  const [name, setName] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [slug, setSlug] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setLogo(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, logo, slug })
    setName('')
    setLogo(null)
    setSlug('')
    setPreviewUrl(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Board</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="logo">Board Logo</Label>
              <Card className="w-full h-40 flex items-center justify-center cursor-pointer">
                <CardContent>
                  <input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <label htmlFor="logo" className="w-full h-full flex flex-col items-center justify-center">
                    {previewUrl ? (
                      <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <>
                        <ImagePlus className="w-12 h-12 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-500">Upload Logo</span>
                      </>
                    )}
                  </label>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Board Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))
                }}
                className="col-span-3"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Board Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Board</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
