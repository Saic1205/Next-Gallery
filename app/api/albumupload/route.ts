import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getUserFromToken } from "@/app/lib/auth";
import { CloudinaryResult } from "@/app/types/types";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserFromToken(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, images } = await req.json();

  const newAlbum = await prisma.albumList.create({
    data: {
      albumName: name,
      userId: user.id,
      albums: {
        create: images.map((image: CloudinaryResult) => ({
          imgName: image.display_name,
          imagePublicId: image.public_id,
          imageUrl: image.secure_url,
        })),
      },
    },
    include: {
      albums: true,
    },
  });

  return NextResponse.json(newAlbum, { status: 201 });
}