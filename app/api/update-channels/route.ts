import { NextRequest, NextResponse } from "next/server";
import { updateChannels } from "@/lib/services";

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get("user_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      );
    }
    const result = await updateChannels(body, token);

    return NextResponse.json({
      message: "Channels updated successfully",
      result
    });
  } catch (error) {
    console.error("PATCH /api/channels error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
