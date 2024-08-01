import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/app/lib";
import prisma from "@/prisma/client";
import { deleteCloudinaryImages } from "../deleteImgCloud/route";

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Invalid album ID" }, { status: 400 });
    }

    const albumList = await prisma.albumList.findUnique({
      where: { id: parseInt(id, 10) },
      include: { albums: true }
    });
    
    if (!albumList || albumList.userId !== user.id) {
      return NextResponse.json({ error: "Album not found or unauthorized" }, { status: 404 });
    }

    // Collect all Cloudinary public IDs
    const cloudinaryPublicIds = albumList.albums.map(album => album.imagePublicId);

    // Delete images from Cloudinary
    if (cloudinaryPublicIds.length > 0) {
      await deleteCloudinaryImages(cloudinaryPublicIds);
    }

    // Delete from database
    await prisma.album.deleteMany({ where: { albumListId: albumList.id } });
    await prisma.albumList.delete({ where: { id: albumList.id } });

    return NextResponse.json({ message: "Album and all images deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting album:", error);
    return NextResponse.json(
      { error: "Failed to delete album and images" },
      { status: 500 }
    );
  }
}