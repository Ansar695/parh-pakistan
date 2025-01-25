/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { DataTable } from "@/components/admin-dashboard/DataTable"
import { AddBoardModal } from "@/components/admin-dashboard/modals/AddBoardModal"

interface Board {
  id: string
  name: string
  logo: string
  slug: string
  status: "active" | "inactive"
}

const initialBoards: Board[] = [
  { id: "1", name: "Punjab Board", logo: "/logos/punjab-board.png", slug: "punjab-board", status: "active" },
  { id: "2", name: "Sindh Board", logo: "/logos/sindh-board.png", slug: "sindh-board", status: "active" },
  { id: "3", name: "Federal Board", logo: "/logos/federal-board.png", slug: "federal-board", status: "inactive" },
]

export default function BoardsPage() {
  const [boards, setBoards] = useState<Board[]>(initialBoards)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast()

  const columns = [
    { key: "logo", label: "Logo" },
    { key: "name", label: "Board Name" },
  ]

  const handleAddBoard = (data: { name: string; logo: File | null; slug: string }) => {
    const newBoard: Board = {
      id: (boards.length + 1).toString(),
      name: data.name,
      logo: data.logo ? URL.createObjectURL(data.logo) : "/logos/default-board.png",
      slug: data.slug,
      status: "active",
    }
    setBoards([...boards, newBoard])
    setIsModalOpen(false)
    toast({ title: "Board added successfully", variant: "success" as any })
  }

  const handleEditBoard = (board: Board) => {
    // Implement edit functionality
    console.log("add ", board)
  }

  const handleDeleteBoard = (board: Board) => {
    setBoards(boards.filter((b) => b.id !== board.id))
    toast({ title: "Board deleted successfully", variant: "success" as any })
  }

  const handleStatusChange = (board: Board) => {
    setBoards(
      boards.map((b) => (b.id === board.id ? { ...b, status: b.status === "active" ? "inactive" : "active" } : b)),
    )
    toast({ title: `Board status changed to ${board.status === "active" ? "inactive" : "active"}`, variant: "success" as any })
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Manage Boards</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={boards}
            columns={columns}
            onAdd={() => setIsModalOpen(true)}
            onEdit={handleEditBoard}
            onDelete={handleDeleteBoard}
            onStatusChange={handleStatusChange}
          />
        </CardContent>
      </Card>
      <AddBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBoard}
      />
    </div>
  )
}
