import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request) {
  const token = request.cookies.get("user_token")?.value;

  if (!token) {
    return NextResponse.json([], { status: 401 });
  }

  try {
    const locations = await prisma.location.findMany()
    return NextResponse.json({ locations});
  } catch (error) {
    console.error("Failed to fetch sites data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
