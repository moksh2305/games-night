import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.booking.deleteMany({});
  await prisma.event.deleteMany({});
  
  await prisma.event.createMany({
    data: [
      {
        title: "GAME Night",
        date: "Friday, 26th June • 9:00 PM Onwards",
        venue: "Moderated by Arham Yuva Seva Group",
        description: "An evening to connect with new faces, share laughs, and bond over games like Mafia, Coup, Human Napoleon, etc.",
        price: 0.00,
        image: "/assets/game_night.jpg",
        type: "Free Access",
        capacity: 30
      }
    ]
  });

  console.log("Database seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
