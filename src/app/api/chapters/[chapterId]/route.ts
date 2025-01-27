import prisma from "@/lib/prisma";
import { ApiError, handleApiError } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { chapterId: string } }
  ) {
    try {
      const chapter = await prisma.chapters.findUnique({
        where: { id: params.chapterId },
        include: {
          board: true,
          class: true,
          subject: true,
        },
      });
  
      if (!chapter) {
        throw new ApiError('Chapter not found', 404);
      }
  
      return Response.json({status: 200, data: chapter});
    } catch (error) {
      return handleApiError(error);
    }
  }