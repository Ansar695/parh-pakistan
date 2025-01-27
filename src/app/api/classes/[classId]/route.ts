import prisma from "@/lib/prisma";
import { ApiError, handleApiError } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { classId: string } }
  ) {
    try {
      const class_ = await prisma.classes.findUnique({
        where: { id: params.classId },
        include: {
          board: true,
          subjects: true,
          chapters: true,
        },
      });
  
      if (!class_) {
        throw new ApiError('Class not found', 404);
      }
  
      return Response.json({status: 200, data: class_});
    } catch (error) {
      return handleApiError(error);
    }
  }