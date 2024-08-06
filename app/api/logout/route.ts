import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"; // Adjust the import based on your project structure

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get("session")?.value;

  if (sessionToken) {
    // Delete the session from the database
    await prisma.session.delete({
      where: { token: sessionToken },
    });

    // Clear the session cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set("session", "", { maxAge: -1 });

    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
