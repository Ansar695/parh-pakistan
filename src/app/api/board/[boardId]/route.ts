import prisma from "@/lib/prisma";
import { ApiError, handleApiError } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  try {
    if (!params?.boardId)
      return Response.json({ status: 422, message: "Please enter board id." });
    const board = await prisma.board.findUnique({
      where: { id: params.boardId },
      include: {
        classes: true,
        subjects: true,
        chapters: true,
      },
    });

    if (!board) {
      throw new ApiError("Board not found", 404);
    }

    return Response.json({ status: 200, data: board });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  try {
    const boardId = params?.boardId;
    console.log("boardid ", boardId);
    if (!boardId)
      return Response.json({ status: 422, message: "Please enter board id." });

    const deletedBoard = await prisma.board.delete({
      where: {
        id: boardId,
      },
    });

    if (!deletedBoard) {
      throw new ApiError("Board not found");
    }

    return Response.json({ status: 200, data: deletedBoard });
  } catch (error) {
    console.log("error ", error);
    return handleApiError(error);
  }
}
