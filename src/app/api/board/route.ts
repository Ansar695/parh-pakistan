import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { ApiError, handleApiError } from "@/lib/utils";

const createBoardSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, image, slug, description } = createBoardSchema.parse(body);
        
    // Check for duplicate slug
    const existing = await prisma.board.findUnique({ where: {name: name, slug: slug}})
    if (existing) {
      throw new ApiError('Board with this name already exists', 400);
    }

    const board = await prisma.board.create({
      data: {
        name,
        slug,
        image,
        description
      },
    });

    return Response.json({data: board, status: 201, message: "Board created successfully." });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET() {
  try {
    const boards = await prisma.board.findMany({
      include: {
        classes: true,
        subjects: true,
      },
    });
    
    return Response.json({status: 200, data: boards});
  } catch (error) {
    return handleApiError(error);
  }
}