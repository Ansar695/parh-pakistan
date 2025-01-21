import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PaperCard } from "@/components/user-dashboard/PaperCard"

// Mock data (replace with actual data fetching in a real application)
const mockPapers = [
  { id: 1, title: 'Math Exam - Class 10', date: '2023-06-15', subject: 'Mathematics' },
  { id: 2, title: 'Science Quiz - Class 8', date: '2023-06-10', subject: 'Science' },
  { id: 3, title: 'English Literature - Class 12', date: '2023-06-05', subject: 'English' },
]

export default function UserDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Papers</CardTitle>
            <CardDescription>Papers generated this month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">45</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Subscription Status</CardTitle>
            <CardDescription>Your current plan</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-green-600">Pro</p>
            <p className="text-sm text-gray-500">Expires on Dec 31, 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Paper Limit</CardTitle>
            <CardDescription>Papers generated / Total limit</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={45} max={100} className="mb-2" />
            <p className="text-sm text-gray-600">45 / 100 papers</p>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-bold mt-12 mb-6">Recent Papers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPapers.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </div>
  )
}

