import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getUserFromRequest } from "@/app/lib";

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, images } = body;

  const newAlbum = await prisma.albumList.create({
    data: {
      albumName: name,
      userId: user.id,
      albums: {
        create: images.map((image: any) => ({
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

  return NextResponse.json(newAlbum, { status: 201 });
}