'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SavePaperCard from '@/components/user-dashboard/SavePaperCard'
import { Plus, Search } from 'lucide-react'

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
    <div className="container mx-auto px-4 ">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-blue-500">
            Exam Papers
          </h1>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search papers..." 
                className="pl-10 bg-white/80 backdrop-blur-sm h-12 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <Button
              className="bg-blue-500 hover:bg-blue-600 h-12 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Paper
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPapers.map((paper, index) => (
          <SavePaperCard key={index} paper={paper} />
        ))}
      </div>
    </div>
  )
}
