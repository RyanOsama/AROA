import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// In development, if globalThis.prisma was initialized before schema update, reset it
if (globalThis.prisma && !(globalThis.prisma as any).heroSettings) {
  try {
    (globalThis.prisma as any).$disconnect?.();
  } catch {}
  globalThis.prisma = undefined;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

