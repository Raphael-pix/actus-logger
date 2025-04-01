import prisma from "./prisma";

export const getLocationData = async () => {
  // Count all locations
  const allSitesCount = await prisma.location.count();

  // Count active locations (assuming `active` is a Boolean field in your `Location` model)
  const activeSitesCount = await prisma.location.count({
    where: {
      active: true,
    },
  });

  // Count inactive locations
  const inactiveSitesCount = await prisma.location.count({
    where: {
      active: false,
    },
  });

  return {
    allSitesCount,
    activeSitesCount,
    inactiveSitesCount,
  };
};

export const getTVChannelData = async () => {
  const allTVCount = await prisma.channel.count();

  const lessGlitchesCount = await prisma.channel.count({
    where: {
      type: "TV",
      OR: [
        {
          comment: {
            contains: "less glitches",
            mode: "insensitive",
          },
        },
        {
          comment: {
            contains: "minimal glitches",
            mode: "insensitive",
          },
        },
      ],
    },
  });
  const excessiveGlitchesCount = await prisma.channel.count({
    where: {
      type: "TV",
      comment: {
        contains: "excessive glitches",
        mode: "insensitive",
      },
    },
  });
  const okCount = await prisma.channel.count({
    where: {
      type: "TV",
      comment: {
        contains: "clear/OK",
        mode: "insensitive",
      },
    },
  });
  const noLiveViewCount = await prisma.channel.count({
    where: {
      type: "TV",
      comment: {
        contains: "no live view",
        mode: "insensitive",
      },
    },
  });

  return {
    allTVCount,
    lessGlitchesCount,
    excessiveGlitchesCount,
    okCount,
    noLiveViewCount,
  };
};
export const getRadioChannelData = async () => {
  const allRadioCount = await prisma.channel.count();

  const whiteNoiseCount = await prisma.channel.count({
    where: {
      type: "Radio",
      comment: {
        contains: "white noise",
        mode: "insensitive",
      },
    },
  });
  const noModulationCount = await prisma.channel.count({
    where: {
      type: "Radio",
      comment: {
        contains: "no modulation",
        mode: "insensitive",
      },
    },
  });
  const okCount = await prisma.channel.count({
    where: {
      type: "Radio",
      comment: {
        contains: "clear/OK",
        mode: "insensitive",
      },
    },
  });
  const lowPowerCount = await prisma.channel.count({
    where: {
      type: "Radio",
      comment: {
        contains: "clear/low power",
        mode: "insensitive",
      },
    },
  });
  const staticCount = await prisma.channel.count({
    where: {
      type: "Radio",
      comment: {
        contains: "static",
        mode: "insensitive",
      },
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
};
export const getChannels = async (locationName?: string) => {
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
};

export const getReports = async () => {
  const reports = prisma.report.findMany();
  return reports;
};
