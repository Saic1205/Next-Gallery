import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getUserFromRequest } from "@/app/lib";

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const albums = await prisma.albumList.findMany({
      where: { userId: user.id },
      include: {
        albums: true,
      },
    });

    return NextResponse.json(albums, { status: 200 });
  } catch (error) {
    console.error("Error fetching albums in API:", error);
    return NextResponse.json(
      { error: "Error fetching albums" },
      { status: 500 }
    );
  }
}
