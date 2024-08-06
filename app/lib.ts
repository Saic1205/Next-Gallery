import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { LoginRequest, User } from "@/app/types/types";

export async function login({ email, password }: LoginRequest) {
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (user && await bcrypt.compare(password, user.password)) {
    const sessionToken = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));
    
    await prisma.session.create({
      data: {
        token: sessionToken,
        userId: user.id,
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      }
    });

    return { ...user, sessionToken };
  }

  return null;
}

export async function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get("session")?.value;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      const user = await prisma.user.findUnique({ where: { id: payload.userId as number } });
      return user;
    } catch (err) {
      console.error("JWT verification failed:", err);
    }
  }

  return null;
}
