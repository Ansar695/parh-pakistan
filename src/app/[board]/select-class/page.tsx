'use client'

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen, ChevronRight, ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const ClassSelection = () => {
    const router = useRouter()
    const pathname = usePathname()
    const currBoard = pathname?.split("/")?.[1]

    const educationLevels = [
    {
      title: "Secondary",
      icon: <BookOpen className="w-8 h-8" />,
      classes: [
        { number: 6, label: "6th Class", slug: "6th" },
        { number: 7, label: "7th Class", slug: "7th" },
        { number: 8, label: "8th Class", slug: "8th" }
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Higher Secondary",
      icon: <GraduationCap className="w-8 h-8" />,
      classes: [
        { number: 9, label: "9th Class", slug: "9th" },
        { number: 10, label: "10th Class", slug: "10th" }
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Intermediate",
      icon: <GraduationCap className="w-8 h-8" />,
      classes: [
        { number: 11, label: "11th Class", slug: "11th" },
        { number: 12, label: "12th Class", slug: "12th" }
      ],
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => router.push("/select-board")}>
            <ArrowLeft className="w-4 h-4" />
            Back to Board Selection
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">
            Select Your Class
          </h1>
          <p className="text-xl text-gray-600">
            Choose your class to access relevant study materials and question banks
          </p>
        </motion.div>

        {/* Education Levels */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 max-w-6xl mx-auto"
        >
          {educationLevels.map((level, levelIndex) => (
            <motion.div
              key={level.title}
              variants={itemVariants}
              className="relative"
            >
              <Card className="overflow-hidden">
                <div className={`bg-gradient-to-r ${level.color} p-6 text-white`}>
                  <div className="flex items-center gap-4">
                    {level.icon}
                    <h2 className="text-2xl font-semibold">{level.title}</h2>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    {level.classes.map((classInfo, classIndex) => (
                      <motion.div
                        key={classInfo.number}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: (levelIndex * 0.2) + (classIndex * 0.1) }}
                      >
                        <Card 
                          className="cursor-pointer group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                          <CardContent className="p-6">
                            <div className="text-center">
                              <div className="mb-4">
                                <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                  {classInfo.number}
                                </span>
                                <span className="text-xl text-gray-600">th</span>
                              </div>
                              <p className="text-gray-600 mb-4">{classInfo.label}</p>
                              <Button 
                                className="w-full group-hover:bg-blue-600 transition-colors"
                                onClick={() => router.push(`/${currBoard}/${classInfo?.slug}/select-subjects`)}
                              >
                                Select
                                <ChevronRight className="ml-2 w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center text-gray-600"
        >
          <p>
            Selected Board: <span className="font-semibold">Punjab Board</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ClassSelection;