import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCoupons() {
  console.log('🎫 Seeding coupons...');

  const coupons = [
    // Launch coupons
    {
      code: 'LAUNCH2025',
      type: 'pro',
      maxUses: 100,
      expiresAt: new Date('2025-12-31'),
    },
    {
      code: 'WELCOME50',
      type: 'pro',
      maxUses: 50,
      expiresAt: new Date('2025-12-31'),
    },
    {
      code: 'PREMIUM2025',
      type: 'premium',
      maxUses: 25,
      expiresAt: new Date('2025-12-31'),
    },
    // Special unlimited coupons for testing
    {
      code: 'TESTPRO',
      type: 'pro',
      maxUses: null, // Unlimited
      expiresAt: null, // Never expires
    },
    {
      code: 'TESTPREMIUM',
      type: 'premium',
      maxUses: null, // Unlimited
      expiresAt: null, // Never expires
    },
    // Influencer/Partner coupons
    {
      code: 'CREATOR2024',
      type: 'pro',
      maxUses: 200,
      expiresAt: new Date('2025-12-31'),
    },
    {
      code: 'BETA2024',
      type: 'premium',
      maxUses: 10,
      expiresAt: new Date('2025-12-31'),
    },
  ];

  for (const coupon of coupons) {
    try {
      await prisma.coupon.upsert({
        where: { code: coupon.code },
        update: {},
        create: {
          code: coupon.code,
          type: coupon.type,
          maxUses: coupon.maxUses,
          expiresAt: coupon.expiresAt,
          isActive: true,
          currentUses: 0,
        },
      });
      console.log(`✅ Created/Updated coupon: ${coupon.code} (${coupon.type})`);
    } catch (error) {
      console.error(`❌ Failed to create coupon ${coupon.code}:`, error);
    }
  }

  console.log('🎉 Coupon seeding completed!');
}

seedCoupons()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });