import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch TV channel data
    const allTVCount = await prisma.channel.count({
      where: { type: "TV" },
    });

    const lessGlitchesCount = await prisma.channel.count({
      where: {
        type: "TV",
        OR: [
          { comment: { contains: "less glitches", mode: "insensitive" } },
          { comment: { contains: "minimal glitches", mode: "insensitive" } },
        ],
      },
    });

    const excessiveGlitchesCount = await prisma.channel.count({
      where: { type: "TV", comment: { contains: "excessive glitches", mode: "insensitive" } },
    });

    const okTVCount = await prisma.channel.count({
      where: { type: "TV", comment: { contains: "clear/OK", mode: "insensitive" } },
    });

    const noLiveViewCount = await prisma.channel.count({
      where: { type: "TV", comment: { contains: "no live view", mode: "insensitive" } },
    });

    // Fetch Radio channel data
    const allRadioCount = await prisma.channel.count({
      where: { type: "Radio" },
    });

    const whiteNoiseCount = await prisma.channel.count({
      where: { type: "Radio", comment: { contains: "white noise", mode: "insensitive" } },
    });

    const noModulationCount = await prisma.channel.count({
      where: { type: "Radio", comment: { contains: "no modulation", mode: "insensitive" } },
    });

    const okRadioCount = await prisma.channel.count({
      where: { type: "Radio", comment: { contains: "clear/OK", mode: "insensitive" } },
    });

    const lowPowerCount = await prisma.channel.count({
      where: { type: "Radio", comment: { contains: "clear/low power", mode: "insensitive" } },
    });

    const staticCount = await prisma.channel.count({
      where: { type: "Radio", comment: { contains: "static", mode: "insensitive" } },
    });

    // Return API Response
    return NextResponse.json({
      tv: {
        all: allTVCount,
        lessGlitches: lessGlitchesCount,
        excessiveGlitches: excessiveGlitchesCount,
        clear: okTVCount,
        noLiveView: noLiveViewCount,
      },
      radio: {
        all: allRadioCount,
        whiteNoise: whiteNoiseCount,
        lowPower: lowPowerCount,
        noModulation: noModulationCount,
        clear: okRadioCount,
        static: staticCount,
      },
    });
  } catch (error) {
    console.error("Error fetching channel status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
