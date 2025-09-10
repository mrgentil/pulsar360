import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Admin@123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'owner@pulsar360.test' },
    update: {},
    create: {
      email: 'owner@pulsar360.test',
      password,
      name: 'Owner Pulsar',
      role: 'OWNER' as any, // tu pourras remettre Role.OWNER plus tard
    },
  });

  const brand = await prisma.brand.create({
    data: {
      name: 'Pulsar Demo',
      ownerId: user.id,
      locale: 'fr',
      tone: 'pro',
      ctas: ['Découvrir', 'Acheter', 'En savoir plus'],
      forbidden: ['gratuit', 'urgent'],
      members: { create: { userId: user.id, role: 'OWNER' as any } },
    },
  });

  console.log('✔ SEED OK', { user: user.email, brand: brand.name });
}

main()
  .catch((e) => { console.error('❌ SEED ERROR', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
