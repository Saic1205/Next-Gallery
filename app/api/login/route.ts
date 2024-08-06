import { NextRequest, NextResponse } from "next/server";
import { login } from "@/app/lib";
import { LoginRequest } from "@/app/types/types";

export async function POST(req: NextRequest) {
  try {
    const body: LoginRequest = await req.json();
    const user = await login(body);

    if (user) {
      const response = NextResponse.json({ user }, { status: 200 });
      response.cookies.set("session", user.sessionToken, {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
        httpOnly: true,
      });
      return response;
    } else {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error: any) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
