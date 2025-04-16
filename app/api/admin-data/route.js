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
      prisma.user.findMany({
        include: {
          userLocations: {
            include: {
              location: true, // include the actual location object
            },
          },
        },
        orderBy: { updatedAt: "asc" },
      }),
      prisma.location.findMany(),
      prisma.report.findMany({ orderBy: { createdAt: "asc" } }),
    ]);

    const users = usersRaw.map((user) => ({
      id: user.id,
      name: user.username,
      role: user.role,
      status: user.active,
      channels: user.userLocations.map((ul) => ul.location.name), // or ul.location.id
      lastActive: user.updatedAt.toLocaleString(),
    }));

    return NextResponse.json({ users, locations, reports });
  } catch (error) {
    console.error("Failed to fetch admin data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
