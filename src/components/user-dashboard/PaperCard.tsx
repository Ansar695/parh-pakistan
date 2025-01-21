import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Trash } from 'lucide-react'

interface Paper {
  id: number
  title: string
  date: string
  subject: string
}

interface PaperCardProps {
  paper: Paper
}

export function PaperCard({ paper }: PaperCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-blue-500" />
          {paper.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">Subject: {paper.subject}</p>
        <p className="text-sm text-gray-500">Created: {new Date(paper.date).toLocaleDateString()}</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button variant="destructive" size="sm">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

