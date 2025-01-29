import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiError, handleApiError } from "@/lib/utils";
import { NextRequest } from "next/server";
import { groupByType } from "@/utils/groupByType";

const createClassSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['Primary', 'Secondary', 'High', 'Intermediate']),
  boardId: z.string(),
  slug: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, type, boardId, slug } = createClassSchema.parse(body);
        
    // Verify board exists
    const board = await prisma.board.findUnique({
      where: { id: boardId },
    });
    
    if (!board) {
      throw new ApiError('Board not found', 404);
    }

    // Check for duplicate slug
    const existing = await prisma.classes.findUnique({ where: { slug } });
    if (existing) {
      throw new ApiError('Class with this name already exists', 400);
    }

    const class_ = await prisma.classes.create({
      data: {
        name,
        type,
        slug,
        boardId,
      },
    });

    return Response.json({ status: 201, message: "Class created successfully", data: class_ });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const boardId = searchParams.get('boardId');

    const where = boardId ? { boardId } : {};
    
    const classes = await prisma.classes.findMany({
      where
    });

    if(!classes.length) return Response.json({status: 404, message:"No classes found."});

    const transformedClasses = groupByType(classes)
    
    return Response.json({status: 200, data:transformedClasses});
  } catch (error) {
    return handleApiError(error);
  }
}