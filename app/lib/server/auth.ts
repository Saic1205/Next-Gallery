import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { LoginRequest, User } from "@/app/types/types";

const secretKey = process.env.JWT_SECRET || "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m") // 10 minutes
    .sign(key);
}

export async function decrypt(token: string): Promise<any | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export async function login({ email, password }: LoginRequest): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
  const sessionToken = await encrypt({ userId: user.id, expires });

  await prisma.session.create({
    data: {
      userId: user.id,
      token: sessionToken,
      expires,
    },
  });

  cookies().set("session", sessionToken, {
    expires,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
  });

  return {
    email: user.email,
    sessionToken,
  };
}

export async function getSession(request: NextRequest) {
  const sessionToken = request.cookies.get("session")?.value;

  if (!sessionToken) return null;

  const session = await prisma.session.findUnique({
    where: { token: sessionToken },
    include: { user: true },
  });

  if (!session || new Date(session.expires) < new Date()) {
    return null;
  }

  return { user: session.user };
}
