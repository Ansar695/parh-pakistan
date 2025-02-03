// import { AzureChatOpenAI, AzureOpenAIEmbeddings } from "@langchain/openai";
// import { Chroma } from "@langchain/community/vectorstores/chroma";
// import { Document } from "@langchain/core/documents";
// import { NextResponse } from "next/server";
// import { HumanMessage } from "@langchain/core/messages";

// // AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME=text-embedding-ada-002
// // AZURE_OPENAI_EMBEDDING_API_VERSION="2023-05-15"
// // AZURE_OPENAI_EMBEDDING_ENDPOINT=https://agricortexdev.openai.azure.com/
// // AZURE_OPENAI_EMBEDDING_API_KEY=dc9d752277fe44188a21982362b858ff

// const AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME = "text-embedding-ada-002";
// const AZURE_OPENAI_EMBEDDING_API_VERSION = "2023-05-15";
// // const AZURE_OPENAI_EMBEDDING_ENDPOINT =
// //   "https://agricortexdev.openai.azure.com/";
// const AZURE_OPENAI_EMBEDDING_ENDPOINT = "https://agricortexdev.openai.azure.com";
// const AZURE_OPENAI_EMBEDDING_API_KEY = "dc9d752277fe44188a21982362b858ff";

// export async function GET() {
//   const model = new AzureChatOpenAI({
//     azureOpenAIApiDeploymentName: "gpt-4o",
//     temperature: 0.9,
//     deploymentName: "gpt-4o",
//     openAIApiVersion: "2024-08-01-preview",
//     openAIApiKey: "dc9d752277fe44188a21982362b858ff",
//     openAIBasePath: "https://agricortexdev.openai.azure.com/",
//     azureOpenAIApiInstanceName: "gpt-4o",
//   });
//   const response = await model.invoke([
//     new HumanMessage("What is the meaning of life?"),
//   ]);

//   // now create embedings model as well.

//   const embeddings = new AzureOpenAIEmbeddings({
//     azureOpenAIApiKey: AZURE_OPENAI_EMBEDDING_API_KEY,
//     azureOpenAIApiInstanceName: AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME,
//     azureOpenAIApiDeploymentName: AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME,
//     azureOpenAIApiVersion: AZURE_OPENAI_EMBEDDING_API_VERSION,
//     azureOpenAIBasePath: AZURE_OPENAI_EMBEDDING_ENDPOINT,
//   });

//   const documents = [
//     new Document({ pageContent: "Ansar is a software engineer from Mianwali" }),
//     new Document({ pageContent: "Bye bye" }),
//   ];

//   const vectorStore = await Chroma.fromDocuments(documents, embeddings, {});
//   const results = await vectorStore.similaritySearch("where do ansar live?", 1);
//   return NextResponse.json({ message: results, response });
// }


import { AzureOpenAIEmbeddings } from "@langchain/openai";
// import { Chroma } from "@langchain/community/vectorstores/chroma";
// import { MemoryVectorStore } from "langchain/vectorstores/memory";
// import { Document } from "@langchain/core/documents";
import { NextRequest, NextResponse } from "next/server";
// import { HumanMessage } from "@langchain/core/messages";
import { processPDFBuffer, storeDocuments } from "@/utils/pdfs/pdfProcessor";
import multer from "multer";
// It's better to use environment variables
const AZURE_OPENAI_API_KEY = "dc9d752277fe44188a21982362b858ff";
// const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
const AZURE_OPENAI_API_VERSION = "2023-05-15";

// Model deployment names
// const CHAT_MODEL_DEPLOYMENT = "gpt-4o";
const EMBEDDING_MODEL_DEPLOYMENT = "text-embedding-ada-002";


// Multer configuration
const upload = multer({ dest: "public/upload" });

// Middleware to handle file uploads
const uploadMiddleware = (req: any) =>
new Promise((resolve, reject) => {
    upload.single("file")(req, {} as any, (err) => {
        if (err) reject(err);
        else resolve(req);
    });
});

export async function POST(req: NextRequest) {
    try {
        // console.log("loading pdf...")
        // const result: any = await uploadMiddleware(req);
        // console.log("result ", result )
    // Extract the uploaded file
    // const file = result.file;
        const formData = await req.formData();
        console.log("formData", formData);
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Process PDF
    const docs = await processPDFBuffer(buffer);

    //   const model = new AzureChatOpenAI({
    //     azureOpenAIApiKey: AZURE_OPENAI_API_KEY,
    //     azureOpenAIApiVersion: AZURE_OPENAI_API_VERSION,
    //     azureOpenAIApiDeploymentName: CHAT_MODEL_DEPLOYMENT,
    //     azureOpenAIApiInstanceName: "agricortexdev",
    //     temperature: 0.7, // Lowered for more focused answers
    //   });
  
      const embeddings = new AzureOpenAIEmbeddings({
        azureOpenAIApiKey: AZURE_OPENAI_API_KEY,
        azureOpenAIApiVersion: AZURE_OPENAI_API_VERSION,
        azureOpenAIApiDeploymentName: EMBEDDING_MODEL_DEPLOYMENT,
        azureOpenAIApiInstanceName: "agricortexdev",
      });

      // Store documents
    const vectorStore = await storeDocuments(docs, embeddings);
      console.log("vectorStore ", vectorStore)
    // Return chapter information
    const chapters = [...new Set(docs.map(doc => doc.metadata.chapter))].sort();
  
    //   const documents = [
    //     new Document({ 
    //       pageContent: "Ansar is a software engineer from Mianwali, he is 24 years old and experienced developer.",
    //       metadata: { source: "profile" }
    //     })
    //   ];
  
    //   const vectorStore = await MemoryVectorStore.fromDocuments(
    //     documents,
    //     embeddings
    //   );
  
      // First get the relevant context
    //   const relevantDocs = await vectorStore.similaritySearch(
    //     "what is the name of city in which ansar live?",
    //     1
    //   );
  
      // Create a prompt that includes the context
    //   const prompt = `
    //   Context: ${relevantDocs[0].pageContent}
      
    //   Question: what is the name of city in which ansar live?
      
    //   Please answer the question based on the context provided.`;
  
    //   // Get the answer from the model using the context
    //   const chatResponse = await model.invoke([new HumanMessage(prompt)]);
  
    //   return NextResponse.json({ 
    //     context: relevantDocs[0].pageContent,
    //     answer: chatResponse.content, // This will give you the actual answer
    //     rawResponse: chatResponse // Full response object for debugging
    //   });

    return NextResponse.json({ 
        message: 'PDF processed successfully',
        chapters ,
        vectorStore
      });
  
    } catch (error: any) {
      console.error('Error:', error);
      return NextResponse.json(
        { error: error.message || 'An error occurred' },
        { status: 500 }
      );
    }
//     // 4. Initialize Chroma with a collection name
//     const vectorStore = await Chroma.fromDocuments(documents, embeddings, {
//       collectionName: "user_documents", // Adding a collection name helps with organization
//     });

//     // 5. Perform parallel operations for better performance
//     const [chatResponse, searchResults] = await Promise.all([
//       model.invoke([new HumanMessage("What is the meaning of life?")]),
//       vectorStore.similaritySearch("where does ansar live?", 1)
//     ]);

//     return NextResponse.json({ 
//       message: searchResults, 
//       response: chatResponse 
//     });

//   } catch (error: any) {
//     console.error('Error in API route:', error);
//     return NextResponse.json(
//       { error: error.message || 'An error occurred' },
//       { status: 500 }
//     );
//   }
}