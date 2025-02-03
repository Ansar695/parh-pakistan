// import { ChromaClient } from 'chromadb';
// import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
// import { Chroma } from 'langchain/vectorstores/chroma';
// import { Document } from 'langchain/document';
// import { Chapter } from '@/types';

// export class VectorStore {
//   private client: ChromaClient;
//   private embeddings: OpenAIEmbeddings;
//   private collectionName: string = 'book_chapters';

//   constructor() {
//     this.client = new ChromaClient({
//       path: process.env.CHROMA_DB_PATH || './chroma-db' // Local path to store the database
//     });
//     this.embeddings = new OpenAIEmbeddings({
//       openAIApiKey: process.env.OPENAI_API_KEY
//     });
//   }

//   async initialize() {
//     // Check if collection exists, if not create it
//     const collections = await this.client.listCollections();
//     if (!collections.find(c => c.name === this.collectionName)) {
//       await this.client.createCollection({
//         name: this.collectionName
//       });
//     }
//   }

//   async storeChapter(chapter: Chapter) {
//     const docs = [
//       new Document({
//         pageContent: chapter.content,
//         metadata: {
//           chapterId: chapter.id,
//           bookId: chapter.bookId,
//           title: chapter.title
//         }
//       })
//     ];

//     const vectorStore = await Chroma.fromDocuments(
//       docs,
//       this.embeddings,
//       {
//         collectionName: this.collectionName,
//         url: process.env.CHROMA_DB_PATH || './chroma-db'
//       }
//     );

//     return vectorStore;
//   }

//   async getChapterContent(chapterId: string) {
//     const vectorStore = await Chroma.fromExistingCollection(
//       this.embeddings,
//       {
//         collectionName: this.collectionName,
//         url: process.env.CHROMA_DB_PATH || './chroma-db'
//       }
//     );

//     const results = await vectorStore.similaritySearch(
//       '', // Empty query to get exact match
//       1,
//       { chapterId: chapterId }
//     );

//     return results[0].pageContent;
//   }
// }