import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const {id} = await params;
  const userId = id;
  const token = req.cookies.get("user_token")?.value;
  if (!token) {
    return NextResponse.json("Unable to update user", { status: 401 });
  }
  try {
    const { role, locations } = await req.json();

    if (!role || !Array.isArray(locations)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // 1. Update user role
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    // 2. Remove existing user-location relations
    await prisma.userLocation.deleteMany({
      where: { userId },
    });

    // 3. Reconnect user to selected locations (assume `locations` are location names)
    const foundLocations = await prisma.location.findMany({
      where: { name: { in: locations } },
    });

    const newRelations = foundLocations.map((location) => ({
      userId,
      locationId: location.id,
    }));

    if (newRelations.length > 0) {
      await prisma.userLocation.createMany({
        data: newRelations,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
