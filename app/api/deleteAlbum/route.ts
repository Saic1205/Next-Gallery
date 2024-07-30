import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/app/lib";
import prisma from "@/prisma/client";

export async function DELETE(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = req.nextUrl.searchParams.get("id");
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid album ID" }, { status: 400 });
    }

    const album = await prisma.albumList.findUnique({ where: { id: parseInt(id, 10) } });
    if (!album || album.userId !== user.id) {
      return NextResponse.json({ error: "Album not found or unauthorized" }, { status: 404 });
    }

    await prisma.album.deleteMany({ where: { albumListId: album.id } });
    await prisma.albumList.delete({ where: { id: album.id } });

    return NextResponse.json({ message: "Album deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting album:", error);
    return NextResponse.json(
      { error: "Failed to delete album" },
      { status: 500 }
    );
  }
}
