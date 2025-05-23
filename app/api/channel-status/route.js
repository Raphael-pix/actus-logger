import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { getTVChannelData, getRadioChannelData } from "@/lib/services";

const prisma = new PrismaClient();

// GET: Retrieve all channel statuses
export async function GET(request) {
  const token = request.cookies.get("user_token")?.value;
  if (!token) {
    return NextResponse.json([], { status: 401 });
  }
  try {
    const data = await prisma.channelStatus.findMany({
      orderBy: { date: "asc" },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Insert or update today's channel status
export async function POST(req) {
  const authHeader = req.headers.get("authorization");
  const token = req.cookies.get("user_token")?.value;

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const tvData = await getTVChannelData(token);
  const radioData = await getRadioChannelData(token);

  const clearTvChannels = tvData.okCount;
  const unclearTvChannels = tvData.allTVCount - tvData.okCount;
  const clearRadioChannels = radioData.okCount;
  const unclearRadioChannels = radioData.allRadioCount - tvData.okCount;

  try {
    await prisma.channelStatus.upsert({
      where: { date: today },
      update: {
        clearTvChannels,
        unclearTvChannels,
        clearRadioChannels,
        unclearRadioChannels,
      },
      create: {
        date: today,
        clearTvChannels,
        unclearTvChannels,
        clearRadioChannels,
        unclearRadioChannels,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
