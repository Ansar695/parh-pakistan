import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiError, handleApiError } from "@/lib/utils";

const createSubjectSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  image: z.string().url(),
  description: z.string(),
  boardId: z.string(),
  classId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, image, description, boardId, classId, slug } = createSubjectSchema.parse(body);
        
    // Verify board and class exist
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

    // Verify class belongs to board
    if (class_.boardId !== boardId) {
      throw new ApiError('Class does not belong to the specified board', 400);
    }

    // Check for duplicate slug
    const existing = await prisma.subjects.findUnique({ where: { slug } });
    if (existing) {
      throw new ApiError('Subject with this name already exists', 400);
    }

    const subject = await prisma.subjects.create({
      data: {
        name,
        slug,
        image,
        description,
        boardId,
        classId,
      },
    });

    return Response.json({ status: 201, data: subject });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    // const boardId = searchParams.get('boardId');
    const className = searchParams.get('class') as any;
    const boardSlug = searchParams.get('board') as any;

    const board = await prisma.board.findFirst({
      where: {slug: boardSlug}
    });
    if(!board) return Response.json({status: 404, message:"Board not found."});

    const result = await prisma.classes.findFirst({
      where: {name: className, boardId: board.id}
    });
    if(!result) return Response.json({status: 404, message:"Class not found."});
    console.log("result: " ,result)
    const where = {
      ...(result.id && { classId: result?.id }),
    };
    
    const subjects = await prisma.subjects.findMany({
      where,
      include: {
        board: true,
        class: true,
        chapters: true,
      },
    });
    
    return Response.json({data: subjects, status: 200});
  } catch (error) {
    return handleApiError(error);
  }
}