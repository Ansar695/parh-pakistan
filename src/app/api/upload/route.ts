import { AzureOpenAIEmbeddings } from "@langchain/openai";
import { NextRequest, NextResponse } from "next/server";
import { processPDFBuffer, storeDocuments } from "@/utils/pdfs/pdfProcessor";

const AZURE_OPENAI_API_KEY = "dc9d752277fe44188a21982362b858ff";
// const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
const AZURE_OPENAI_API_VERSION = "2023-05-15";

// Model deployment names
// const CHAT_MODEL_DEPLOYMENT = "gpt-4o";
const EMBEDDING_MODEL_DEPLOYMENT = "text-embedding-ada-002";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Process PDF
    const docs = await processPDFBuffer(buffer);
  
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

    return NextResponse.json({ 
        message: 'PDF processed successfully',
        chapters ,
        vectorStore,
        docs
      });
  
    } catch (error: any) {
      console.error('Error:', error);
      return NextResponse.json(
        { error: error.message || 'An error occurred' },
        { status: 500 }
      );
    }
}