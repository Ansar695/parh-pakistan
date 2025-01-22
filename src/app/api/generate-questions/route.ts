/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/generate-questions/route.ts
import { NextRequest, NextResponse } from "next/server";
// import pdf from 'pdf-parse';
// import fs from 'fs';
// import pdfUtil from "pdf-to-text"
// import { PdfReader } from "pdfreader";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    console.log("test");
    const formData = await req.formData();
    const file = formData.get("pdf") as File;
    console.log("file ", file);
    if (!file) {
      return NextResponse.json(
        { error: "No PDF file provided" },
        { status: 400 }
      );
    }

    // new PdfReader().parseFileItems(
    //   "/file-sample_150kB.pdf",
    //   async (err, item) => {
    //     if (err) console.error("error:", err);
    //     else if (!item) console.warn("end of file");
    //     else if (item.text) {
    //       console.log(item.text);
          // Generate questions using OpenAI
          const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content:
                  "Generate questions based on the given text. Include 5 short questions, 5 MCQs, and 3 long questions.",
              },
              {
                role: "user",
                content: `
          Introduction to Computer Science
Computer science is the study of computers and computational systems, focusing on the theory, design, development, and application of software and hardware. It encompasses a wide range of topics, from algorithms and data structures to artificial intelligence and cybersecurity.

Key Areas of Computer Science

Algorithms and Data Structures

Algorithms are step-by-step procedures for solving problems, while data structures organize and store data efficiently.
Common data structures include arrays, linked lists, stacks, queues, and trees.
Programming Languages

Programming is the process of writing instructions for computers to execute.
Popular languages include Python, Java, C++, and JavaScript, each with its own strengths and use cases.
Software Engineering

Focuses on the design, development, testing, and maintenance of software applications.
Software engineering principles ensure scalability, reliability, and maintainability of systems.
Artificial Intelligence (AI) and Machine Learning (ML)

AI aims to create machines that can perform tasks requiring human intelligence, such as speech recognition and decision-making.
ML, a subset of AI, enables computers to learn from data and improve their performance over time.
Cybersecurity

Protecting computer systems and networks from cyber threats such as hacking, viruses, and data breaches.
Techniques include encryption, firewalls, and secure coding practices.
Databases and Big Data

Databases store and manage large volumes of data efficiently.
Big data technologies, such as Hadoop and SQL, process and analyze massive datasets for insights
          `,
              },
            ],
          });

          const questions = completion.choices[0].message.content;
          console.log("questions ", questions);
        // }
    //   }
    // );

    //   pdfUtil.info("/file-sample_150kB.pdf", function(err: any, info: any) {
    //     if (err) throw(err);
    //     console.log("info ", info);
    // });

    // const dataBuffer = fs.readFileSync("/file-sample_150kB.pdf");
    // console.log("dataBuffer ", dataBuffer)
    // pdf(dataBuffer)
    //     .then((data) => {
    //         console.log("Parsing successful.");
    //         console.log("Number of pages:", data.numpages);
    //         console.log("PDF text:", data.text.substring(0, 500)); // Print a preview of the text
    //     })
    //     .catch((err) => {
    //         console.error("Error parsing PDF:", err.message);
    //     });
    // pdf(dataBuffer).then(function(data) {

    //     // number of pages
    //     console.log("data.numpages ", data);
    //     // number of rendered pages
    //     console.log(data.numrender);
    //     // PDF info
    //     console.log(data.info);
    //     // PDF metadata
    //     console.log(data.metadata);
    //     // PDF.js version
    //     // check https://mozilla.github.io/pdf.js/getting_started/
    //     console.log(data.version);
    //     // PDF text
    //     console.log(data.text);

    // });

    // const bytes = await file.arrayBuffer();
    // const buffer = Buffer.from(bytes);
    // console.log("buffer ", buffer)
    // // Extract text from PDF
    //     const pdfData = await pdf(dataBuffer);
    // console.log("pdf data ", pdfData)
    // console.log("Extracted PDF text:", pdfData.text);
    // const text = pdfData.text;
    // const text = data.text;
    // console.log("test ", pdfData)
    // // Generate questions using OpenAI
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4",
    //   messages: [
    //     {
    //       role: "system",
    //       content: "Generate questions based on the given text. Include 5 short questions, 5 MCQs, and 3 long questions."
    //     },
    //     {
    //       role: "user",
    //       content: text
    //     }
    //   ]
    // });

    // const questions = completion.choices[0].message.content;

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 }
    );
  }
}
