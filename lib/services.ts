import prisma from "./prisma";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export const getLocationData = async (token?: string) => {
  try {
    if (!token) {
      console.log("Unauthorized: No token provided");
      return {
        allSitesCount: 0,
        activeSitesCount: 0,
        inactiveSitesCount: 0,
      };
    }

    // Verify the token
    await jwtVerify(token, JWT_SECRET);

    // If token is valid, fetch location data
    const allSitesCount = await prisma.location.count();
    const activeSitesCount = await prisma.location.count({
      where: { active: true },
    });
    const inactiveSitesCount = await prisma.location.count({
      where: { active: false },
    });

    return {
      allSitesCount,
      activeSitesCount,
      inactiveSitesCount,
    };
  } catch (error) {
    console.error("Error in getLocationData:", error);
    return {
      allSitesCount: 0,
      activeSitesCount: 0,
      inactiveSitesCount: 0,
    };
  }
};

export const getTVChannelData = async (token?: string) => {
  try {
    if (!token) {
      console.log("Unauthorized: No token provided");
      return {
        allTVCount: 0,
        lessGlitchesCount: 0,
        excessiveGlitchesCount: 0,
        okCount: 0,
        noLiveViewCount: 0,
      };
    }

    // Verify the token
    await jwtVerify(token, JWT_SECRET);

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
      where: {
        type: "TV",
        comment: { contains: "excessive glitches", mode: "insensitive" },
      },
    });
    const okCount = await prisma.channel.count({
      where: {
        type: "TV",
        comment: { contains: "clear/OK", mode: "insensitive" },
      },
    });
    const noLiveViewCount = await prisma.channel.count({
      where: {
        type: "TV",
        comment: { contains: "no live view", mode: "insensitive" },
      },
    });

    return {
      allTVCount,
      lessGlitchesCount,
      excessiveGlitchesCount,
      okCount,
      noLiveViewCount,
    };
  } catch (error) {
    console.error("Error in getTVChannelData:", error);
    return {
      allTVCount: 0,
      lessGlitchesCount: 0,
      excessiveGlitchesCount: 0,
      okCount: 0,
      noLiveViewCount: 0,
    };
  }
};

export const getRadioChannelData = async (token?: string) => {
  try {
    if (!token) {
      console.log("Unauthorized: No token provided");
      return {
        allRadioCount: 0,
        whiteNoiseCount: 0,
        lowPowerCount: 0,
        noModulationCount: 0,
        okCount: 0,
        staticCount: 0,
      };
    }

    // Verify the token
    await jwtVerify(token, JWT_SECRET);

    // Fetch radio channel data
    const allRadioCount = await prisma.channel.count({
      where: { type: "Radio" },
    });
    const whiteNoiseCount = await prisma.channel.count({
      where: {
        type: "Radio",
        comment: { contains: "white noise", mode: "insensitive" },
      },
    });
    const noModulationCount = await prisma.channel.count({
      where: {
        type: "Radio",
        comment: { contains: "no modulation", mode: "insensitive" },
      },
    });
    const okCount = await prisma.channel.count({
      where: {
        type: "Radio",
        comment: { contains: "clear/OK", mode: "insensitive" },
      },
    });
    const lowPowerCount = await prisma.channel.count({
      where: {
        type: "Radio",
        comment: { contains: "clear/low power", mode: "insensitive" },
      },
    });
    const staticCount = await prisma.channel.count({
      where: {
        type: "Radio",
        comment: { contains: "static", mode: "insensitive" },
      },
    });

    return {
      allRadioCount,
      whiteNoiseCount,
      lowPowerCount,
      noModulationCount,
      okCount,
      staticCount,
    };
  } catch (error) {
    console.error("Error in getRadioChannelData:", error);
    return {
      allRadioCount: 0,
      whiteNoiseCount: 0,
      lowPowerCount: 0,
      noModulationCount: 0,
      okCount: 0,
      staticCount: 0,
    };
  }
};

export const getChannels = async (token?: string, locationName?: string) => {
  try {
    if (!token) {
      console.log("Unauthorized: No token provided");
      return [];
    }

    // Verify the token
    await jwtVerify(token, JWT_SECRET);

    if (locationName) {
      const location = await prisma.location.findUnique({
        where: { name: locationName },
        select: { id: true },
      });

      if (!location) {
        throw new Error(`Location '${locationName}' not found.`);
      }

      return prisma.channel.findMany({
        where: { locationId: location.id },
        select: {
          id: true,
          name: true,
          title: true,
          type: true,
          comment: true,
        },
      });
    }

    return prisma.channel.findMany({
      select: {
        id: true,
        name: true,
        title: true,
        type: true,
        comment: true,
      },
    });
  } catch (error) {
    console.error("Error in getChannels:", error);
    return [];
  }
};

export const getReports = async (token?: string) => {
  try {
    if (!token) {
      console.log("Unauthorized: No token provided");
      return [];
    }

    // Verify the token
    await jwtVerify(token, JWT_SECRET);

    const reports = await prisma.report.findMany();
    return reports;
  } catch (error) {
    console.error("Error in getReports:", error);
    return [];
  }
};

export const getChannelStatus = async (token?: string) => {
  try {
    if (!token) {
      console.log("Unauthorized: No token provided");
      return [];
    }

    // Verify the token
    await jwtVerify(token, JWT_SECRET);

    const status = await prisma.channelStatus.findMany({
      orderBy: { date: "asc" },
    });
    return status;
  } catch (error) {
    console.error("Error in getChannelStatus:", error);
    return [];
  }
};

export const getUserProfile = async (token?: string) => {
  try {
    if (!token) {
      console.log("Unauthorized: No token provided");
      return;
    }

    // Verify the token
    const { payload } = await jwtVerify(token, JWT_SECRET);

    const profile = await prisma.admin.findUnique({
      where: { username: payload.username },
      select: { username: true, id: true },
    });
    return profile;
  } catch (error) {
    console.error("Error in fetching user profile:", error);
    return;
  }
};
