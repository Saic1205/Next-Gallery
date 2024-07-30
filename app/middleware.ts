import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/server/auth";

export async function middleware(request: NextRequest) {
  const session = await getSession(request);
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/", "/login", "/signup"];

  console.log("pathname:", pathname); // Debugging line
  console.log("session:", session);   // Debugging line

  if (!session && !publicRoutes.includes(pathname)) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico).*)'],
};
