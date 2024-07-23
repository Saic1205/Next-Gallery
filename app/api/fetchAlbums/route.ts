import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: Request) {
  try {
    console.log("Fetching albums...");
    const albums = await prisma.albumList.findMany({
      include: {
        albums: true,
      },
    });
    //console.log("Fetched albums:", albums);
    return NextResponse.json(albums, { status: 200 });
  } catch (error) {
    console.error("Error fetching albums in API:", error);
    return NextResponse.json(
      { error: "Error fetching albums" },
      { status: 500 }
    );
  }
}
