// utils/questionGenerator.ts
import { AzureChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";

export interface Question {
  type: 'mcq' | 'short' | 'long';
  question: string;
  options?: string[];
  correctAnswer: string;
}

export async function generateQuestions(
  context: string,
  model: AzureChatOpenAI,
  requirements: {
    mcqCount: number;
    shortCount: number;
    longCount: number;
  }
) {
    console.log("context: ", context);
  const prompt = `
    Given the following text, generate:
    - ${requirements.mcqCount} multiple choice questions (with 4 options each)
    - ${requirements.shortCount} short answer questions
    - ${requirements.longCount} long answer questions

    Text: ${context}

    Format your response as a JSON array of objects with the following structure:
    {
      type: "mcq" | "short" | "long",
      question: string,
      options?: string[], // only for MCQs
      correctAnswer: string
    }

    Ensure questions test understanding of key concepts and critical thinking.
    `;

  const response = await model.invoke([new HumanMessage(prompt)]);
  
  try {
    return JSON.parse(response.content as any) as Question[];
  } catch (error: any) {
    console.log("error in question generation ", error)
    throw new Error('Failed to parse questions from model response');
  }
}