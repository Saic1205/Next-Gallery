import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/lib/server/auth";

export async function GET(request: NextRequest) {
  const session = await getSession(request);

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: session.user }, { status: 200 });
}
