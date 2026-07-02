import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = 'demo@ojt.com';
  const password = await bcrypt.hash('demo123', 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: 'Demo User',
      password,
    },
  });

  const existingTodos = await prisma.todo.count({
    where: { userId: user.id },
  });

  if (existingTodos === 0) {
    await prisma.todo.createMany({
      data: [
        {
          title: 'Learn Vue 3 basics',
          description: 'Read the official Vue docs',
          completed: false,
          userId: user.id,
        },
        {
          title: 'Explore Nuxt 4',
          description: 'Run the dev server and browse the pages folder',
          completed: true,
          userId: user.id,
        },
      ],
    });
  }

  console.log('Seed complete — demo@ojt.com / demo123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
