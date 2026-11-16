import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pgPool: Pool | undefined;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL_POOLED ?? process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("Missing DATABASE_URL or DATABASE_URL_POOLED environment variable.");
  }

  const isLocal =
    connectionString.includes("localhost") || connectionString.includes("127.0.0.1");

  const pool =
    globalForPrisma.pgPool ??
    new Pool({
      connectionString,
      max: isLocal ? 1 : 3,
      idleTimeoutMillis: 5000,
    });

  if (process.env.VERCEL === "1") {
    attachDatabasePool(pool);
  }

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pgPool = pool;
  }

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
