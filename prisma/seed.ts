import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.booking.deleteMany({});
  await prisma.event.deleteMany({});
  
  await prisma.event.createMany({
    data: [
      {
        title: "Mafia Night - The Secret Syndicate",
        date: "25 Jul 2025 • 8:00 PM",
        venue: "Neon Lounge, Ghatkopar",
        description: "An exclusive invite-only Mafia game night with premium vibes.",
        price: 50.00,
        image: "/assets/mafia_event.png",
        type: "VIP Access"
      },
      {
        title: "Mafia Night - Underworld Kings",
        date: "01 Aug 2025 • 7:30 PM",
        venue: "Cyber Cafe East, Ghatkopar",
        description: "Deceive, survive, and dominate in this intense Mafia session.",
        price: 40.00,
        image: "/assets/mafia_event.png",
        type: "Standard"
      },
      {
        title: "Mafia Night - The Grand Betrayal",
        date: "08 Aug 2025 • 9:00 PM",
        venue: "Midnight Club, Ghatkopar",
        description: "High stakes, hidden roles, and endless deception.",
        price: 60.00,
        image: "/assets/mafia_event.png",
        type: "Premium"
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
