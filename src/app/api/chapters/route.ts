import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiError, handleApiError } from "@/lib/utils";

const createChapterSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  chapterFile: z.string().url(),
  boardId: z.string(),
  classId: z.string(),
  subjectId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, chapterFile, boardId, classId, subjectId, slug } = createChapterSchema.parse(body);
        
    // Verify all relations exist
    const board = await prisma.board.findUnique({
      where: { id: boardId },
    });
    
    if (!board) {
      throw new ApiError('Board not found', 404);
    }

    const class_ = await prisma.classes.findUnique({
      where: { id: classId },
    });
    
    if (!class_) {
      throw new ApiError('Class not found', 404);
    }

    const subject = await prisma.subjects.findUnique({
      where: { id: subjectId },
    });
    
    if (!subject) {
      throw new ApiError('Subject not found', 404);
    }

    // Verify relationships
    if (class_.boardId !== boardId) {
      throw new ApiError('Class does not belong to the specified board', 400);
    }

    if (subject.classId !== classId || subject.boardId !== boardId) {
      throw new ApiError('Subject does not belong to the specified class or board', 400);
    }

    // Check for duplicate slug
    const existing = await prisma.chapters.findUnique({ where: { slug } });
    if (existing) {
      throw new ApiError('Chapter with this name already exists', 400);
    }

    const chapter = await prisma.chapters.create({
      data: {
        name,
        slug,
        chapterFile,
        boardId,
        classId,
        subjectId,
      },
    });

    return Response.json({ status: 201, data: chapter });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get('subjectId');
    console.log("subjectId: ", subjectId);
    const where = {
      ...(subjectId && { subjectId }),
    };
    
    const chapters = await prisma.chapters.findMany({
      where,
      include: {
        board: true,
        class: true,
        subject: true,
      },
    });
    
    return Response.json(chapters);
  } catch (error) {
    return handleApiError(error);
  }
}