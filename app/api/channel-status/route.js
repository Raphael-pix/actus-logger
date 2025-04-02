import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import {getTVChannelData, getRadioChannelData} from "@/lib/services"

const prisma = new PrismaClient();

// GET: Retrieve all channel statuses
export async function GET() {
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
export async function POST() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const tvData = await getTVChannelData();
  const radioData = await getRadioChannelData()

  const clearTvChannels = tvData.okCount;
  const unclearTvChannels = tvData.allTvCount - tvData.okCount;
  const clearRadioChannels = radioData.okCount;
  const unclearRadioChannels = radioData.allRadioCount - tvData.okCount;


  try {
    await prisma.channelStatus.upsert({
      where: { date: today },
      update: { clearTvChannels, unclearTvChannels, clearRadioChannels, unclearRadioChannels },
      create: { date: today, clearTvChannels, unclearTvChannels, clearRadioChannels, unclearRadioChannels },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
