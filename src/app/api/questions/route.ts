// app/api/generate-questions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AzureChatOpenAI, AzureOpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { generateQuestions } from "@/utils/pdfs/questionGenerator";

const AZURE_OPENAI_API_KEY = "dc9d752277fe44188a21982362b858ff";
const AZURE_OPENAI_API_VERSION = "2023-05-15";
const CHAT_MODEL_DEPLOYMENT = "gpt-4o";
const EMBEDDING_MODEL_DEPLOYMENT = "text-embedding-ada-002";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { chapter, mcqCount = 5, shortCount = 3, longCount = 2 } = body;
    console.log("chapter: ", chapter)
    // Initialize models
    // const embeddings = new AzureOpenAIEmbeddings({
    //   azureOpenAIApiKey: AZURE_OPENAI_API_KEY,
    //   azureOpenAIApiVersion: AZURE_OPENAI_API_VERSION,
    //   azureOpenAIApiDeploymentName: EMBEDDING_MODEL_DEPLOYMENT,
    //   azureOpenAIApiInstanceName: "agricortexdev",
    // });

    // const model = new AzureChatOpenAI({
    //   azureOpenAIApiKey: AZURE_OPENAI_API_KEY,
    //   azureOpenAIApiVersion: AZURE_OPENAI_API_VERSION,
    //   azureOpenAIApiDeploymentName: CHAT_MODEL_DEPLOYMENT,
    //   azureOpenAIApiInstanceName: "agricortexdev",
    //   temperature: 0.7,
    // });

    const model = new AzureChatOpenAI({
            azureOpenAIApiKey: AZURE_OPENAI_API_KEY,
            azureOpenAIApiVersion: AZURE_OPENAI_API_VERSION,
            azureOpenAIApiDeploymentName: CHAT_MODEL_DEPLOYMENT,
            azureOpenAIApiInstanceName: "agricortexdev",
            temperature: 0.7, // Lowered for more focused answers
          });
      
          const embeddings = new AzureOpenAIEmbeddings({
            azureOpenAIApiKey: AZURE_OPENAI_API_KEY,
            azureOpenAIApiVersion: AZURE_OPENAI_API_VERSION,
            azureOpenAIApiDeploymentName: EMBEDDING_MODEL_DEPLOYMENT,
            azureOpenAIApiInstanceName: "agricortexdev",
          });
          console.log("test 2")
    // Get chapter content
    const vectorStore = await MemoryVectorStore.fromExistingIndex(embeddings);
    // console.log("test 3", vectorStore )
    const relevantDocs = await vectorStore.similaritySearch(
      chapter,
      5,
      (doc) => doc.metadata.chapter === chapter
    );

    console.log("test 4", relevantDocs)

    // Combine relevant documents
    const context = relevantDocs.map(doc => doc.pageContent).join('\n\n');
    console.log("test 5 ", context)
    // Generate questions
    const questions = await generateQuestions(context, model, {
      mcqCount,
      shortCount,
      longCount,
    });

    // console.log("test 6 ", questions)

    return NextResponse.json({ questions });

  } catch (error: any) {
    console.error('Error generating questions:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate questions' },
      { status: 500 }
    );
  }
}