const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.loginAttempt.deleteMany({});
  await prisma.adminUser.deleteMany({});
  
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.adminUser.create({
    data: {
      username: 'admin',
      password: hashedPassword,
    },
  });
  console.log('Admin user ready:', admin.username);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
