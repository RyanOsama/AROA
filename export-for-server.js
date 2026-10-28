const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function exportAll() {
  console.log('Fetching local data...');
  const brands = await prisma.brand.findMany();
  const products = await prisma.product.findMany();
  
  const hashedPassword = await bcrypt.hash('123aroa', 10);
  const adminData = {
    username: 'aroa123',
    password: hashedPassword,
  };

  const payload = {
    brands,
    products,
    admin: adminData
  };

  const outPath = path.join(__dirname, 'server-init-data.json');
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), 'utf-8');
  console.log(`Saved ${brands.length} brands, ${products.length} products, and admin ${adminData.username} to ${outPath}`);
}

exportAll()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
