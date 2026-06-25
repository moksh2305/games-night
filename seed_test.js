const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.testimonial.createMany({
    data: [
      { name: 'Sarah', role: 'Participant', content: 'Came for the games, stayed for the people. AYSG events are unmatched!' },
      { name: 'Rahul', role: 'Member', content: 'Best AYSG event I’ve attended till date. The Mafia night was incredible.' },
      { name: 'Priya', role: 'First-time attendee', content: 'I was nervous at first, but I made real friendships here within the first 10 minutes.' }
    ]
  });
  console.log('Seeded testimonials!');
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
