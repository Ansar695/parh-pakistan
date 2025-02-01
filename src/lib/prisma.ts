// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as { prisma?: PrismaClient };

// if (!globalForPrisma.prisma) {
//   globalForPrisma.prisma = new PrismaClient();
// }

// const prisma = globalForPrisma.prisma;

// export default prisma;

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-namespace */

import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient
declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
