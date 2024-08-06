import { SignJWT, jwtVerify } from "jose";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { LoginRequest, User } from "@/app/types/types";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const JWT_EXPIRY = "6h";

interface CustomJWTPayload {
  [key: string]: any;
  userId: number;
}

export async function login({ email, password }: LoginRequest): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  console.log("User from auth",user);
  if (user && await bcrypt.compare(password, user.password)) {
    const sessionToken = await createJWT({ userId: user.id });
    
    await prisma.session.create({
      data: {
        token: sessionToken,
        userId: user.id,
        expires: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
      }
    });
    
    return { 
      name: user.name,
      id: user.id,
      email: user.email,
      sessionToken 
    };
  }
  
  return null;
}

export async function getUserFromToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    const userId = Number(payload.userId);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    if (user) {
      return { 
        name: user.name,
        id: user.id,
        email: user.email,
        sessionToken: token 
      };
    }
    return null;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

export async function createJWT(payload: CustomJWTPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(JWT_EXPIRY)
    .sign(new TextEncoder().encode(JWT_SECRET));
}

