import prisma from "@/lib/prisma";


async function main() {
  const sampleLocations = [
    { name: "CACENTRE-1", active: true },
    { name: "CAENTRE-2", active: true },
    { name: "CACENTRE-3", active: true },
    { name: "CACENTRE-4", active: true },
    { name: "Kahawa", active: true },
    { name: "Kisumu", active: true },
    { name: "Kisii", active: true },
    { name: "Kitale", active: true },
    { name: "Garissa", active: true },
    { name: "Kitui", active: true },
    { name: "South B", active: true },
    { name: "Nakuru", active: true },
    { name: "Mombasa", active: true },
    { name: "Embu", active: true },
    { name: "Eldoret", active: true },
    { name: "Meru", active: true },
    { name: "Bungoma", active: true },
    { name: "Narok", active: true },
    { name: "Marsabit", active: true },
    { name: "Migori", active: true },
    { name: "Lodwar", active: true },
    { name: "Kabarnet", active: true },
    { name: "Maralal", active: true },
    { name: "Malindi", active: true },
    { name: "Nyeri", active: true },
    { name: "Busia", active: true },
    { name: "Wundanyi", active: true },
    { name: "Kakuma", active: true },
    { name: "Siaya", active: true },
    { name: "Rumuruti", active: true },
    { name: "Kericho", active: true },
  ];

  await prisma.location.createMany({
    data: sampleLocations,
  });

  console.log("locations have been created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
