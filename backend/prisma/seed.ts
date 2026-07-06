import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'demo@ojt.com';
  const existing = await prisma.user.findUnique({ where: { email } });

  if (!existing) {
    const passwordHash = await bcrypt.hash('demo123', 10);

    await prisma.user.create({
      data: {
        id: randomUUID(),
        email,
        password: passwordHash,
        name: 'Demo User',
      },
    });
  }

  console.log('Seeded demo user: demo@ojt.com / demo123');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
