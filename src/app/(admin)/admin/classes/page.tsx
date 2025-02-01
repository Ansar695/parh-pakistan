/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { DataTable } from "@/components/admin-dashboard/DataTable"
import { AddClassModal } from "@/components/admin-dashboard/modals/AddClassModal"

interface Class {
  id: string
  name: string
  board: string
  type: string
  slug: string
  status: "active" | "inactive"
}

interface Board {
  id: string
  name: string
}

const initialClasses: Class[] = [
  { id: "1", name: "9th", board: "Punjab Board", type: "secondary", slug: "9th-punjab", status: "active" },
  { id: "2", name: "10th", board: "Sindh Board", type: "secondary", slug: "10th-sindh", status: "active" },
  { id: "3", name: "11th", board: "Federal Board", type: "higher", slug: "11th-federal", status: "inactive" },
]

const boards: Board[] = [
  { id: "1", name: "Punjab Board" },
  { id: "2", name: "Sindh Board" },
  { id: "3", name: "Federal Board" },
]

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>(initialClasses)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast()

  const columns = [
    { key: "name", label: "Class Name" },
    { key: "board", label: "Board" },
    { key: "type", label: "Type" },
  ]

  const handleAddClass = (data: { board: string; name: string; type: string; slug: string }) => {
    const newClass: Class = {
      id: (classes.length + 1).toString(),
      name: data.name,
      board: boards.find((b) => b.id === data.board)?.name || "",
      type: data.type,
      slug: data.slug,
      status: "active",
    }
    setClasses([...classes, newClass])
    setIsModalOpen(false)
    toast({ title: "Class added successfully", variant: "success" as any })
  }

  const handleEditClass = (cls: Class) => {
    // Implement edit functionality
    console.log(cls)
  }

  const handleDeleteClass = (cls: Class) => {
    setClasses(classes.filter((c) => c.id !== cls.id))
    toast({ title: "Class deleted successfully", variant: "success" as any })
  }

  const handleStatusChange = (cls: Class) => {
    setClasses(
      classes.map((c) => (c.id === cls.id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c)),
    )
    toast({ title: `Class status changed to ${cls.status === "active" ? "inactive" : "active"}`, variant: "success" as any })
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Manage Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={classes}
            columns={columns}
            onAdd={() => setIsModalOpen(true)}
            onEdit={handleEditClass}
            onDelete={handleDeleteClass}
            onStatusChange={handleStatusChange}
          />
        </CardContent>
      </Card>
      <AddClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddClass}
        boards={boards}
      />
    </div>
  )
}

