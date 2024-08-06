import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/app/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  
  if (!token) {
    return NextResponse.json({ error: "No session found" }, { status: 401 });
  }

  const user = await getUserFromToken(token);
  
  if (user) {
    return NextResponse.json({ user }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
}