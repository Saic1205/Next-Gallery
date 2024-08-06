import { NextRequest, NextResponse } from "next/server";
import { login } from "@/app/lib/auth";
import { LoginRequest } from "@/app/types/types";

export async function POST(req: NextRequest) {
  try {
    const body: LoginRequest = await req.json();
    const user = await login(body);
    
    if (user) {
      const response = NextResponse.json({ user }, { status: 200 });
      response.cookies.set("session", user.sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 6 * 60 * 60, // 6 hours
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