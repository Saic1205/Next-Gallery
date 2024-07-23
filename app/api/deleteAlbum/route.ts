
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    console.log("id", id, typeof id === "string", typeof id === "number");
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid album ID" }, { status: 400 });
    }

    // Delete the album's images
    await prisma.album.deleteMany({
      where: {
        albumListId: parseInt(id, 10),
      },
    });

    // Delete the album
    await prisma.albumList.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    return NextResponse.json(
      { message: "Album deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting album:", error);
    return NextResponse.json(
      { error: "Failed to delete album" },
      { status: 500 }
    );
  }
}
