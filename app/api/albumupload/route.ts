import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

type CloudinaryResult = {
  id: string;
  batchId: string;
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  original_filename: string;
  path: string;
  thumbnail_url: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json(); 
    //console.log("Request Body:", body);

    const { name, images }: { name: string; images: CloudinaryResult[] } = body;

    
    const newAlbum = await prisma.albumList.create({
      data: {
        albumName: name,
        albums: {
          create: images.map((image) => ({
            imgName: image.display_name,
            imagePublicId: image.public_id,
            imageUrl: image.url,
          })),
        },
      },
      include: {
        albums: true,
      },
    });
    //console.log("New Album created:", newAlbum);
    return NextResponse.json(newAlbum, { status: 201 });
  } catch (error) {
    console.error("Error creating album:", error);
    return NextResponse.json(
      { error: "Error creating album" },
      { status: 500 }
    );
  }
}
