/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SubjectCard } from "@/components/subjects/SubjectCard";

// Mock data (replace with actual data fetching)
const boards = ["Punjab Board", "Federal Board", "Sindh Board"];
const classes = ["9th", "10th", "11th", "12th"];

interface Subject {
  name: string;
  description: string;
  image: string;
}

export default function UploadSubjects() {
  const [selectedBoard, setSelectedBoard] = useState<string | undefined>();
  const [selectedClass, setSelectedClass] = useState<string | undefined>();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState<Subject>({
    name: "",
    description: "",
    image: "",
  });

  const addSubject = () => {
    if (
      newSubject.name.trim() !== "" &&
      !subjects.some((s) => s.name === newSubject.name.trim())
    ) {
      setSubjects([
        ...subjects,
        { ...newSubject, name: newSubject.name.trim() },
      ]);
      setNewSubject({ name: "", description: "", image: "" });
    }
  };

//   const removeSubject = (index: number) => {
//     setSubjects(subjects.filter((_, i) => i !== index));
//   };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Subjects for Classes</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Board and Class</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Select onValueChange={setSelectedBoard}>
              <SelectTrigger>
                <SelectValue placeholder="Select a board" />
              </SelectTrigger>
              <SelectContent>
                {boards.map((board) => (
                  <SelectItem key={board} value={board}>
                    {board}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setSelectedClass} disabled={!selectedBoard}>
              <SelectTrigger>
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      {selectedBoard && selectedClass && (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <Input
                  type="text"
                  placeholder="Subject name"
                  value={newSubject.name}
                  onChange={(e) =>
                    setNewSubject({ ...newSubject, name: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Short description"
                  value={newSubject.description}
                  onChange={(e) =>
                    setNewSubject({
                      ...newSubject,
                      description: e.target.value,
                    })
                  }
                />
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setNewSubject({
                            ...newSubject,
                            image: reader.result as string,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="flex-grow"
                  />
                  <Button onClick={addSubject}>
                    <Plus className="mr-2 h-4 w-4" /> Add Subject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                Subjects for {selectedBoard} - {selectedClass}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {subjects.map((subject, index) => (
                  <motion.div
                    key={subject.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <SubjectCard
                      name={subject?.name}
                      description={subject?.description}
                      image={subject.image}
                      onSelect={() => console.log("test")}
                    />
                  </motion.div>
                ))}
                </div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
