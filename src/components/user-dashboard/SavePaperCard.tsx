/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Printer, Clock, Book, Award, Calendar } from "lucide-react";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

const SavePaperCard = ({ paper }: any) => {
    const router = useRouter()
  console.log(paper);
  return (
    <Card className="w-full max-w-md relative overflow-hidden group hover:shadow-2xl transition-all duration-500 backdrop-blur-sm bg-white/80">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 rounded-full -ml-12 -mb-12" />

      {/* Top status bar */}
      <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
        <span className="font-sem tracking-wider">MID-TERM EXAM</span>
        <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          9th Grade
        </span>
      </div>

      <CardHeader className="space-y-4 relative z-10 p-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-blue-500 bg-clip-text">
            Computer Science
          </div>
          <Badge
            variant="secondary"
            className="bg-gray-300 px-2 py-1 text-md hover:bg-gray-300"
          >
            Draft
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 group">
              <div className="p-2 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                <Book className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Board</p>
                <p className="text-sm text-gray-700">Punjab Board</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 group">
              <div className="p-2 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="ftext-sm text-gray-700">01/12/2024</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 group">
              <div className="p-2 rounded-lg bg-pink-50 group-hover:bg-pink-100 transition-colors">
                <Clock className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Questions</p>
                <p className="text-sm text-gray-700">30 Items</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 group">
              <div className="p-2 rounded-lg bg-rose-50 group-hover:bg-rose-100 transition-colors">
                <Award className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Marks</p>
                <p className="text-sm text-gray-700">100 Points</p>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="pt-4 mt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="group hover:border-indigo-500 transition-all duration-300"
          >
            <Printer className="h-4 w-4 mr-2 group-hover:text-indigo-500" />
            <span className="group-hover:text-indigo-500">Print</span>
          </Button>

          <Button
            className="bg-blue-500 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
            onClick={() =>
              router.push("/punjab-board/9th/mathematics/view-paper")
            }
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
        </div>
      </CardContent>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Card>
  );
};

export default SavePaperCard;
