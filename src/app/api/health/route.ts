import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  await connection();
  try {
    await prisma.$queryRaw`SELECT 1`;
    const [verticals, roles, signals] = await Promise.all([
      prisma.vertical.count(),
      prisma.coreRole.count(),
      prisma.candidateSignal.count(),
    ]);

    return Response.json({
      ok: true,
      database: "connected",
      counts: { verticals, roles, signals },
    });
  } catch (error) {
    console.error("Health check failed:", error);
    return Response.json({ ok: false, database: "error" }, { status: 500 });
  }
}
