/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { DataTable } from "@/components/admin-dashboard/DataTable"
import { AddChapterModal } from "@/components/admin-dashboard/modals/AddChapterModal"

interface Chapter {
  id: string
  name: string
  class: string
  subject: string
  slug: string
  file: string
  status: "active" | "inactive"
}

interface Class {
  id: string
  name: string
}

interface Subject {
  id: string
  name: string
  class: string
}

const initialChapters: Chapter[] = [
  {
    id: "1",
    name: "Algebra",
    class: "9th",
    subject: "Mathematics",
    slug: "algebra-9th",
    file: "/chapters/algebra.pdf",
    status: "active",
  },
  {
    id: "2",
    name: "Mechanics",
    class: "10th",
    subject: "Physics",
    slug: "mechanics-10th",
    file: "/chapters/mechanics.pdf",
    status: "active",
  },
  {
    id: "3",
    name: "Organic Chemistry",
    class: "11th",
    subject: "Chemistry",
    slug: "organic-chemistry-11th",
    file: "/chapters/organic-chemistry.pdf",
    status: "inactive",
  },
]

const classes: Class[] = [
  { id: "1", name: "9th" },
  { id: "2", name: "10th" },
  { id: "3", name: "11th" },
]

const subjects: Subject[] = [
  { id: "1", name: "Mathematics", class: "9th" },
  { id: "2", name: "Physics", class: "10th" },
  { id: "3", name: "Chemistry", class: "11th" },
]

export default function ChaptersPage() {
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast()

  const columns = [
    { key: "name", label: "Chapter Name" },
    { key: "class", label: "Class" },
    { key: "subject", label: "Subject" },
  ]

  const handleAddChapter = (data: {
    class: string
    subject: string
    name: string
    slug: string
    file: File | null
  }) => {
    const newChapter: Chapter = {
      id: (chapters.length + 1).toString(),
      name: data.name,
      class: classes.find((c) => c.id === data.class)?.name || "",
      subject: subjects.find((s) => s.id === data.subject)?.name || "",
      slug: data.slug,
      file: data.file ? URL.createObjectURL(data.file) : "/chapters/default.pdf",
      status: "active",
    }
    setChapters([...chapters, newChapter])
    setIsModalOpen(false)
    toast({ title: "Chapter added successfully", variant: "success" as any })
  }

  const handleEditChapter = (chapter: Chapter) => {
    // Implement edit functionality
    console.log(chapter)
  }

  const handleDeleteChapter = (chapter: Chapter) => {
    setChapters(chapters.filter((c) => c.id !== chapter.id))
    toast({ title: "Chapter deleted successfully", variant: "success" as any })
  }

  const handleStatusChange = (chapter: Chapter) => {
    setChapters(
      chapters.map((c) => (c.id === chapter.id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c)),
    )
    toast({
      title: `Chapter status changed to ${chapter.status === "active" ? "inactive" : "active"}`,
      variant: "success" as any,
    })
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Manage Chapters</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={chapters}
            columns={columns}
            onAdd={() => setIsModalOpen(true)}
            onEdit={handleEditChapter}
            onDelete={handleDeleteChapter}
            onStatusChange={handleStatusChange}
          />
        </CardContent>
      </Card>
      <AddChapterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddChapter}
        classes={classes}
        subjects={subjects}
      />
    </div>
  )
}

