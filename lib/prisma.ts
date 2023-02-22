import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // @ts-expect-error
  // explanation
  if (!global.prisma) {
    // @ts-expect-error
    // explanation

    global.prisma = new PrismaClient();
  }

  // @ts-expect-error
  // explanation

  prisma = global.prisma;
}

export default prisma;
