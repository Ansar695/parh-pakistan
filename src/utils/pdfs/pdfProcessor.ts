// utils/pdfProcessor.ts
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import { AzureOpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export async function processPDFBuffer(buffer: Buffer) {
  // Create a Blob from the buffer
  const blob = new Blob([buffer]);
  const loader = new PDFLoader(blob);

  // Load PDF
  const docs = await loader.load();

  // Split text into chunks
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splitDocs = await textSplitter.splitDocuments(docs);

  // Add chapter metadata based on content
//   const processedDocs = splitDocs.map((doc, index) => {
//     // Basic chapter detection (you might need to adjust this based on your PDF structure)
//     // const chapterMatch = doc.pageContent.match(/Chapter \d+/i);
//     const chapterMatch = doc.pageContent.match(/(Chapter|CHAPTER|Unit|Topic|Lesson)\s+(\d+|\w+)/i);

//     return new Document({
//       pageContent: doc.pageContent,
//       metadata: {
//         ...doc.metadata,
//         chunk: index,
//         chapter: chapterMatch ? chapterMatch[0] : `Section ${Math.floor(index / 5)}`,
//       },
//     });
//   });

const processedDocs = splitDocs.map((doc, index) => {
    const chapterMatch = doc.pageContent.match(/(Chapter|CHAPTER|Unit|Topic|Lesson)\s+(\d+|\w+)/i);
    return new Document({
        pageContent: doc.pageContent,
        metadata: {
            chunk: index,
            chapter: chapterMatch ? chapterMatch[0] : `Section ${Math.floor(index / 5)}`,
            subtopics: extractSubtopics(doc.pageContent) // New function to extract subtopics
        },
    });
});

  return processedDocs;
}

function extractSubtopics(text: string) {
    const subtopicMatches = text.match(/(Section|Topic|Lesson)\s+\d+/gi);
    return subtopicMatches ? subtopicMatches.map(t => ({ topicName: t })) : [];
}

export async function storeDocuments(docs: Document[], embeddings: AzureOpenAIEmbeddings) {
  return await MemoryVectorStore.fromDocuments(docs, embeddings);
}