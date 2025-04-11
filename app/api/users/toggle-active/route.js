import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { cookies } from "next/headers";

const prisma = new PrismaClient();


export async function PATCH(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("user_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Get ID from body
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    await prisma.user.update({
      where: { id },
      data:{
        active: !user.active
      }
    });

    return NextResponse.json(
      { message: `User account ${user.active ? "deactivated" : "activated"} successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error ${user.active ? "deactivating" : "activating"} account`, error);
    return NextResponse.json(
      { error: `Failed to  ${user.active ? "deactivate" : "activate"} account` },
      { status: 500 }
    );
  }
}
