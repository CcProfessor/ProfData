// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const players = [
    {
      username: 'Priscila',
      password: 'alfa',
      access: 4,
    },
    {
      username: 'Vitoria',
      password: 'matogrosso',
      access: 1,
    },
    {
      username: 'Amanda',
      password: 'second',
      access: 1,
    }
    {
      username: 'Julia',
      password: 'reserva',
      access: 1,
    }
  ];

  for (const player of players) {
    await prisma.player.create({
      data: player,
    });
    console.log(`✅ Player ${player.username} criado`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
