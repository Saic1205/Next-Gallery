import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getUserFromToken } from "@/app/lib/auth";
import { AlbumType } from "@/app/types/types";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("session")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const albums = await prisma.albumList.findMany({
      where: { userId: user.id },
      include: { albums: true },
    });

    const formattedAlbums: AlbumType[] = albums.map(album => ({
      id: album.id,
      albumName: album.albumName,
      created_at: album.createdAt.toISOString(),
      albums: album.albums.map(image => ({
        imgName: image.imgName,
        imageUrl: image.imageUrl,
        id: image.imagePublicId,
        batchId: '', 
        asset_id: image.imagePublicId,
        public_id: image.imagePublicId,
        version: 1, 
        version_id: '', 
        signature: '', 
        width: 0, // A
        height: 0, // A
        format: '', // A
        resource_type: 'image',
        created_at: image.uploadedAt.toISOString(),
        tags: [],
        bytes: 0, // A
        type: 'upload',
        etag: '', // A
        placeholder: false,
        url: image.imageUrl,
        secure_url: image.imageUrl,
        asset_folder: '', 
        display_name: image.imgName,
        original_filename: image.imgName,
        path: '', 
        thumbnail_url: image.imageUrl,
      })),
    }));

    return NextResponse.json(formattedAlbums, { status: 200 });
  } catch (error) {
    console.error("Error fetching albums:", error);
    return NextResponse.json({ error: "Error fetching albums" }, { status: 500 });
  }
}