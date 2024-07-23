import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing album ID" }, { status: 400 });
  }

  try {
    //console.log("Fetching album with ID:", id);
    const album = await prisma.albumList.findUnique({
      where: { id: Number(id) },
      include: { albums: true },
    });

    if (!album) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }
  //console.log("album:", album);
    return NextResponse.json(album, { status: 200 });
  } catch (error) {
    console.error("Error fetching album in API:", error);
    return NextResponse.json(
      { error: "Error fetching album" },
      { status: 500 }
    );
  }
}
