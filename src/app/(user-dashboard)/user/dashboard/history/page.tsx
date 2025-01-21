/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Calendar,
  SlidersHorizontal,
  Download,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  XCircle,
  FileText
} from "lucide-react";

const ExamHistory = () => {
  // Sample data - in real app would come from API
  const examHistory = [
    {
      id: 1,
      title: "Computer Science Mid-Term",
      subject: "Computer Science",
      date: "Jan 15, 2024",
      grade: "9th",
      status: "Completed",
      score: "85/100",
      submittedBy: "Mr. Johnson",
      duration: "2 hours"
    },
    {
      id: 2,
      title: "Physics Final Exam",
      subject: "Physics",
      date: "Dec 20, 2023",
      grade: "9th",
      status: "Pending Review",
      score: "Pending",
      submittedBy: "Ms. Smith",
      duration: "3 hours"
    },
    {
      id: 3,
      title: "Mathematics Quiz",
      subject: "Mathematics",
      date: "Dec 15, 2023",
      grade: "9th",
      status: "Failed",
      score: "45/100",
      submittedBy: "Mr. Davis",
      duration: "1 hour"
    }
  ];

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: any) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'Pending Review':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Exam History
          </h1>
          <p className="text-gray-600">Track and manage your past examinations</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="relative md:col-span-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search exams..." 
              className="pl-10 bg-white/80 backdrop-blur-sm"
            />
          </div>
          
          <div className="md:col-span-6 flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Sort
            </Button>
          </div>
          
          <div className="md:col-span-2">
            <Button 
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {examHistory.map((exam) => (
            <Card key={exam.id} className="hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Exam Info */}
                  <div className="md:col-span-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-indigo-50">
                        <FileText className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{exam.title}</h3>
                        <p className="text-sm text-gray-500">{exam.subject} • {exam.grade}</p>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="md:col-span-3">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Submitted by</p>
                      <p className="font-medium">{exam.submittedBy}</p>
                    </div>
                  </div>

                  {/* Date & Duration */}
                  <div className="md:col-span-2">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{exam.date}</p>
                      <p className="text-sm text-gray-500">{exam.duration}</p>
                    </div>
                  </div>

                  {/* Status & Score */}
                  <div className="md:col-span-2">
                    <div className="space-y-2">
                      <Badge className={`flex items-center gap-1 w-fit ${getStatusColor(exam.status)}`}>
                        {getStatusIcon(exam.status)}
                        {exam.status}
                      </Badge>
                      <p className="font-semibold">{exam.score}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-1 flex justify-end">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamHistory;