/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddEditItemModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Record<string, string>) => void
  fields: { key: string; label: string; type: string, options?: any }[]
  title: string
  initialData?: Record<string, string>
}

export function AddItemModal({ isOpen, onClose, onSubmit, fields, title, initialData }: AddEditItemModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({})
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({})
  }

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/ /g, "-")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {fields.map((field) => (
              <div key={field.key} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={field.key} className="text-right">
                  {field.label}
                </Label>
                <Input
                  id={field.key}
                  type={field.type}
                  value={formData[field.key] || ""}
                  onChange={(e) => {
                    const newValue = e.target.value
                    setFormData((prev) => ({
                      ...prev,
                      [field.key]: newValue,
                      slug: field.key === "name" ? generateSlug(newValue) : prev.slug,
                    }))
                  }}
                  className="col-span-3"
                />
              </div>
            ))}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slug" className="text-right">
                Slug
              </Label>
              <Input
                id="slug"
                type="text"
                value={formData.slug || ""}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {initialData ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

