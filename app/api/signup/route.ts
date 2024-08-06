import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";

interface SignupRequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password }: SignupRequestBody = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error("Error during signup:", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}