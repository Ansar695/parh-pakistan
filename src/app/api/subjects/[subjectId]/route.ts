import prisma from "@/lib/prisma";
import { ApiError, handleApiError } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { subjectId: string } }
  ) {
    try {
      const subject = await prisma.subjects.findUnique({
        where: { id: params.subjectId },
        include: {
          board: true,
          class: true,
          chapters: true,
        },
      });
  
      if (!subject) {
        throw new ApiError('Subject not found', 404);
      }
  
      return Response.json({status: 200, data: subject});
    } catch (error) {
      return handleApiError(error);
    }
  }