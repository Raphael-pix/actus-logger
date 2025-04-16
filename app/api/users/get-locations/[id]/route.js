import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = await params;
  const userId = id;

  const token = req.cookies.get("user_token")?.value;
  if (!token) {
    return NextResponse.json("Unable to fetch user locations", { status: 401 });
  }

  try {
    const userLocations = await prisma.userLocation.findMany({
      where: { userId },
      include: { location: true },
    });

    const locations = userLocations.map((ul) => ul.location);

    const formattedLocations = locations.map((location) => {
      return {
        id: location.id,
        name: location.name,
        title: location.name,
      };
    });
    // TODO: FIX ALL LOCATIONS LOGICAL, Refer to getChannels() function in /lib/services
    return NextResponse.json([
      { id: "a1g6d4c3", name: "all", title: "all" },
      ...formattedLocations,
    ]);
  } catch (error) {
    console.error("Error fetching user locations:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}
