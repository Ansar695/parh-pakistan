'use client';

import { useState } from 'react';

export default function Home() {
  const [questions, setQuestions] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">PDF Question Generator</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block mb-2">Upload PDF</label>
          <input 
            type="file" 
            name="pdf" 
            accept=".pdf"
            required 
            className="border p-2"
          />
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? 'Generating...' : 'Generate Questions'}
        </button>
      </form>

      {questions && (
        <div className="whitespace-pre-wrap">
          <h2 className="text-xl font-bold mb-4">Generated Questions:</h2>
          {questions}
        </div>
      )}
    </main>
  );
}