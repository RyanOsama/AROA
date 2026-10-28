const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const dataFile = path.join(__dirname, 'server-init-data.json');
  if (!fs.existsSync(dataFile)) {
    console.error('File server-init-data.json not found!');
    process.exit(1);
  }

  const raw = fs.readFileSync(dataFile, 'utf-8');
  const { brands, products, admin } = JSON.parse(raw);

  console.log('Seeding server database...');

  // 1. Admin
  await prisma.loginAttempt.deleteMany({});
  await prisma.adminUser.deleteMany({});
  const createdAdmin = await prisma.adminUser.create({
    data: {
      username: admin.username,
      password: admin.password
    }
  });
  console.log(`✓ Admin user created: ${createdAdmin.username}`);

  // 2. Brands
  for (const b of brands) {
    await prisma.brand.upsert({
      where: { id: b.id },
      update: {
        name: b.name,
        logoUrl: b.logoUrl,
        description: b.description
      },
      create: {
        id: b.id,
        name: b.name,
        logoUrl: b.logoUrl,
        description: b.description
      }
    });
  }
  console.log(`✓ ${brands.length} brands upserted`);

  // 3. Products
  for (const p of products) {
    const { createdAt, updatedAt, packageItems, partOfPackages, brand, ...rest } = p;
    await prisma.product.upsert({
      where: { id: rest.id },
      update: {
        ...rest,
        price: rest.price ? String(rest.price) : undefined,
        originalPrice: rest.originalPrice ? String(rest.originalPrice) : null,
      },
      create: {
        ...rest,
        price: rest.price ? String(rest.price) : undefined,
        originalPrice: rest.originalPrice ? String(rest.originalPrice) : null,
      }
    });
  }
  console.log(`✓ ${products.length} products upserted`);
  console.log('Server database initialized successfully!');
}

main()
  .catch((e) => {
    console.error('Import error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
