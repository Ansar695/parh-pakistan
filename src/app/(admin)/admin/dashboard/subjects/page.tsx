/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { DataTable } from "@/components/admin-dashboard/DataTable"
import { AddSubjectModal } from "@/components/admin-dashboard/modals/AddSubjectModal"

interface Subject {
  id: string
  name: string
  board: string
  class: string
  image: string
  about: string
  slug: string
  status: "active" | "inactive"
}

interface Board {
  id: string
  name: string
}

interface Class {
  id: string
  name: string
  board: string
}

const initialSubjects: Subject[] = [
  {
    id: "1",
    name: "Mathematics",
    board: "Punjab Board",
    class: "9th",
    image: "/subjects/math.png",
    about: "Study of numbers and quantities",
    slug: "mathematics-9th-punjab",
    status: "active",
  },
  {
    id: "2",
    name: "Physics",
    board: "Sindh Board",
    class: "10th",
    image: "/subjects/physics.png",
    about: "Study of matter and energy",
    slug: "physics-10th-sindh",
    status: "active",
  },
  {
    id: "3",
    name: "Chemistry",
    board: "Federal Board",
    class: "11th",
    image: "/subjects/chemistry.png",
    about: "Study of substances and their interactions",
    slug: "chemistry-11th-federal",
    status: "inactive",
  },
]

const boards: Board[] = [
  { id: "1", name: "Punjab Board" },
  { id: "2", name: "Sindh Board" },
  { id: "3", name: "Federal Board" },
]

const classes: Class[] = [
  { id: "1", name: "9th", board: "Punjab Board" },
  { id: "2", name: "10th", board: "Sindh Board" },
  { id: "3", name: "11th", board: "Federal Board" },
]

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast()

  const columns = [
    { key: "name", label: "Subject Name" },
    { key: "board", label: "Board" },
    { key: "class", label: "Class" },
  ]

  const handleAddSubject = (data: {
    board: string
    class: string
    image: File | null
    name: string
    about: string
    slug: string
  }) => {
    const newSubject: Subject = {
      id: (subjects.length + 1).toString(),
      name: data.name,
      board: boards.find((b) => b.id === data.board)?.name || "",
      class: classes.find((c) => c.id === data.class)?.name || "",
      image: data.image ? URL.createObjectURL(data.image) : "/subjects/default.png",
      about: data.about,
      slug: data.slug,
      status: "active",
    }
    setSubjects([...subjects, newSubject])
    setIsModalOpen(false)
    toast({ title: "Subject added successfully", variant: "success" as any })
  }

  const handleEditSubject = (subject: Subject) => {
    // Implement edit functionality
    console.log(subject)
  }

  const handleDeleteSubject = (subject: Subject) => {
    setSubjects(subjects.filter((s) => s.id !== subject.id))
    toast({ title: "Subject deleted successfully", variant: "success" as any })
  }

  const handleStatusChange = (subject: Subject) => {
    setSubjects(
      subjects.map((s) => (s.id === subject.id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s)),
    )
    toast({
      title: `Subject status changed to ${subject.status === "active" ? "inactive" : "active"}`,
      variant: "success" as any,
    })
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Manage Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={subjects}
            columns={columns}
            onAdd={() => setIsModalOpen(true)}
            onEdit={handleEditSubject}
            onDelete={handleDeleteSubject}
            onStatusChange={handleStatusChange}
          />
        </CardContent>
      </Card>
      <AddSubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddSubject}
        boards={boards}
        classes={classes}
      />
    </div>
  )
}

