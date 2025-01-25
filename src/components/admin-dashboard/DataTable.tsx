/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface DataTableProps<T> {
  data: T[]
  columns: { key: any; label: string }[]
  onAdd: () => void
  onEdit: (item: T) => void
  onDelete: (item: T) => void
  onStatusChange: (item: T) => void
  filterOptions?: { value: string; label: string }[]
}

export function DataTable<T extends { id: string | number; slug: string; status: "active" | "inactive" }>({
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  onStatusChange,
  filterOptions,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValue, setFilterValue] = useState("all")

  const filteredData = data.filter(
    (item) =>
      Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterValue === "all" ||
        String(item[filterOptions?.[0].value as keyof T]).toLowerCase() === filterValue.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
          {filterOptions && (
            <Select onValueChange={setFilterValue} value={filterValue}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <div className="rounded-md border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              {columns.map((column) => (
                <TableHead key={String(column.key)} className="font-semibold text-gray-700">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="font-semibold text-gray-700">Slug</TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
              <TableHead className="font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {columns.map((column) => (
                  <TableCell key={String(column.key)}>{String(item[column.key])}</TableCell>
                ))}
                <TableCell>{item.slug}</TableCell>
                <TableCell>
                  <Badge
                    variant={item.status === "active" ? "secondary" : "destructive"}
                    className="cursor-pointer"
                    onClick={() => onStatusChange(item)}
                  >
                    {item.status === "active" ? (
                      <CheckCircle className="mr-1 h-3 w-3 inline" />
                    ) : (
                      <XCircle className="mr-1 h-3 w-3 inline" />
                    )}
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(item)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(item)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

