import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const user = await prisma?.user.create({
    data: {
      email,
      name,
      hashedPassword: await bcrypt.hash(password, 12),
    },
  });

  return NextResponse.json(user);
}
