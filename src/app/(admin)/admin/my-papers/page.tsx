import Link from 'next/link'
import { Printer, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// This would typically come from your API or database
const mockPapers = [
  { 
    id: 1, 
    title: "Computer Science Mid-Term", 
    subject: "Computer Science",
    board: "Punjab Board",
    grade: "9th",
    createdDate: new Date(2023, 4, 15),
    questionsCount: 30,
    totalMarks: 100
  },
  { 
    id: 2, 
    title: "Physics Final Exam", 
    subject: "Physics",
    board: "Federal Board",
    grade: "10th",
    createdDate: new Date(2023, 5, 1),
    questionsCount: 45,
    totalMarks: 150
  },
  { 
    id: 3, 
    title: "Mathematics Quiz", 
    subject: "Mathematics",
    board: "Sindh Board",
    grade: "11th",
    createdDate: new Date(2023, 3, 22),
    questionsCount: 20,
    totalMarks: 50
  },
  { 
    id: 4, 
    title: "English Literature Test", 
    subject: "English",
    board: "KPK Board",
    grade: "12th",
    createdDate: new Date(2023, 4, 30),
    questionsCount: 35,
    totalMarks: 100
  },
]

export default function PapersListPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Created Papers</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPapers.map((paper) => (
          <Card key={paper.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{paper.title}</span>
                <Badge variant="secondary">{paper.grade}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <p><span className="font-medium">Subject:</span> {paper.subject}</p>
                <p><span className="font-medium">Board:</span> {paper.board}</p>
                <p><span className="font-medium">Created:</span> 01/12/2024</p>
                <p><span className="font-medium">Questions:</span> {paper.questionsCount}</p>
                <p><span className="font-medium">Total Marks:</span> {paper.totalMarks}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" /> Print
              </Button>
              <Link href={`/papers/${paper.id}`}>
                <Button size="sm">
                  <Eye className="mr-2 h-4 w-4" /> View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
