import prisma from "@/lib/prisma";
import { ApiError, handleApiError } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { boardId: string } }) {
    try {
      console.log("boardId ", params?.boardId)
      if(!params?.boardId) return Response.json({status: 422, message: "Please enter board id."})
        const board = await prisma.board.findUnique({
          where: { id: params.boardId },
          include: {
            classes: true,
            subjects: true,
            chapters: true,
          },
        });
    
        if (!board) {
          throw new ApiError('Board not found', 404);
        }
    
        return Response.json({status: 200, data: board});
      } catch (error) {
        return handleApiError(error);
      }
  }