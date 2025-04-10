import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request) {
  const token = request.cookies.get("user_token")?.value;

  if (!token) {
    return NextResponse.json([], { status: 401 });
  }

  try {
    const [usersRaw, locations, reports] = await Promise.all([
      prisma.user.findMany({ orderBy: { updatedAt: "asc" } }),
      prisma.location.findMany(),
      prisma.report.findMany({ orderBy: { createdAt: "asc" } }),
    ]);
    const users = usersRaw.map((user) => ({
      id: user.id,
      name: user.username,
      role: user.role,
      status: true, // Placeholder: update with actual status logic if needed
      channels: 3, // Placeholder: dynamically calculate if needed
      lastActive: user.updatedAt.toLocaleDateString(),
    }));

    return NextResponse.json({ users, locations, reports });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
