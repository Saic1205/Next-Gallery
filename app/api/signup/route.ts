import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/client"; // Ensure this import points to your Prisma instance
import { encrypt } from "@/app/lib/server/auth";// Adjust import based on your project structure

interface SignupRequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SignupRequestBody = await req.json();
    const { name, email, password } = body;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new NextResponse(JSON.stringify({ message: "User already exists" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token for the user
    const session = await encrypt({ userId: newUser.id });
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    // Store the session in the database
    await prisma.session.create({
      data: {
        userId: newUser.id,
        token: session,
        expires,
      },
    });

    // Set the token in the response cookies
    const response = new NextResponse(JSON.stringify({ user: newUser }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
    response.cookies.set("session", session, { expires, httpOnly: true });

    return response;
  } catch (error: any) {
    console.error("Error during signup:", error);
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
