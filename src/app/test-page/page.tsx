// app/page.tsx
'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [chapters, setChapters] = useState<string[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files[0]);
    setLoading(true);

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      console.log("response: " , response)
      const data = await response.json();
      console.log("data: " , data)
      setChapters(data.chapters);
    } catch (error) {
      console.error('Error uploading file:', error);
    }

    setLoading(false);
  };

  const generateQuestions = async (chapter: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapter,
          mcqCount: 5,
          shortCount: 3,
          longCount: 2,
        }),
      });
      console.log("response: " , response)
      const data = await response.json();
      console.log("data: " , data)
      setQuestions(data.questions);
    } catch (error) {
      console.error('Error generating questions:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">PDF Question Generator</h1>
      
      <div className="mb-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="mb-4"
        />
      </div>

      {loading && <div>Loading...</div>}

      {chapters && chapters?.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Chapters</h2>
          <div className="grid gap-2">
            {chapters.map((chapter) => (
              <button
                key={chapter}
                onClick={() => generateQuestions(chapter)}
                className="p-2 bg-blue-500 text-white rounded"
              >
                {chapter}
              </button>
            ))}
          </div>
        </div>
      )}

      {questions.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Generated Questions</h2>
          <div className="space-y-4">
            {questions.map((q, i) => (
              <div key={i} className="p-4 border rounded">
                <p className="font-semibold">{q.question}</p>
                {q.type === 'mcq' && (
                  <ul className="ml-4 mt-2">
                    {q.options.map((option: string, j: number) => (
                      <li key={j}>{option}</li>
                    ))}
                  </ul>
                )}
                <p className="mt-2 text-sm text-gray-600">
                  Answer: {q.correctAnswer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}