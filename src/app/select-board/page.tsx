'use client'

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, BookOpen, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BoardSelection = () => {
    const router = useRouter()
  const boards = [
    {
      id: 'punjab',
      name: 'Punjab Board',
      fullName: 'Board of Intermediate & Secondary Education',
      location: 'Punjab',
      icon: <Building2 className="w-12 h-12" />,
      description: 'Access curriculum and question banks for all Punjab educational boards including Lahore, Gujranwala, Faisalabad, and more.',
      subjects: '12+ Subjects',
      classes: '6 Classes',
      slug: "punjab-board"
    },
    {
      id: 'federal',
      name: 'Federal Board',
      fullName: 'Board of Intermediate & Secondary Education',
      location: 'Islamabad',
      icon: <BookOpen className="w-12 h-12" />,
      description: 'Comprehensive coverage of Federal Board curriculum with updated question banks and examination patterns.',
      subjects: '10+ Subjects',
      classes: '6 Classes',
      slug: "federal-board"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Select Your Educational Board
          </h1>
          <p className="text-xl text-gray-600">
            Choose your board to access curriculum-aligned question banks and paper templates
          </p>
        </motion.div>

        {/* Boards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {boards.map((board, index) => (
            <motion.div
              key={board.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="p-4 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {board.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold mb-1">{board.name}</h2>
                      <p className="text-sm text-gray-500 mb-4">{board.fullName}</p>
                      <p className="text-gray-600 mb-6">{board.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-3 bg-gray-50 rounded-lg text-center">
                          <p className="text-sm text-gray-500">Available Subjects</p>
                          <p className="font-semibold text-gray-700">{board.subjects}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg text-center">
                          <p className="text-sm text-gray-500">Class Range</p>
                          <p className="font-semibold text-gray-700">{board.classes}</p>
                        </div>
                      </div>

                      <Button 
                        className="w-full group-hover:bg-blue-600 transition-colors"
                        onClick={() => {
                            router.push(`/${board?.slug}/select-class`)
                        }}
                      >
                        <span>Select Board</span>
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600">
            Don not see your board? More boards coming soon. 
            <Button variant="link" className="text-blue-600 hover:text-blue-700">
              Get notified when your board is added
            </Button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BoardSelection;