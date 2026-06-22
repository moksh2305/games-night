import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.event.deleteMany({});
  
  await prisma.event.createMany({
    data: [
      {
        title: "Board Games Championship",
        date: "24 May 2025 • 7:00 PM",
        venue: "The Royal Lounge, London",
        description: "An exclusive evening of strategy, fun and friendly competition.",
        price: 60.00,
        image: "/assets/board_game_event.png",
        type: "VIP Access"
      },
      {
        title: "Poker & Poker Night",
        date: "07 Jun 2025 • 8:00 PM",
        venue: "Ace Club, Birmingham",
        description: "Texas Hold'em, great vibes and big prizes.",
        price: 75.00,
        image: "/assets/poker_event.png",
        type: "Standard"
      },
      {
        title: "Retro Games Night",
        date: "21 Jun 2025 • 6:30 PM",
        venue: "Pixel Den, Manchester",
        description: "Classic games, old school feels and endless fun.",
        price: 50.00,
        image: "/assets/retro_game_event.png",
        type: "Standard"
      },
      {
        title: "Trivia Night Showdown",
        date: "05 Jul 2025 • 7:30 PM",
        venue: "Brainy Bar, Leeds",
        description: "Test your knowledge and win exciting rewards.",
        price: 40.00,
        image: "/assets/trivia_event.png",
        type: "Standard"
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
