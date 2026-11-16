import { prisma } from "@/lib/prisma";

export async function getVerticals() {
  return prisma.vertical.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getCoreRoles() {
  return prisma.coreRole.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getSignalsSummary() {
  const totalCount = await prisma.candidateSignal.count();
  const recent = await prisma.candidateSignal.findMany({
    orderBy: { createdAt: "desc" },
    take: 4,
    select: {
      id: true,
      track: true,
      craft: true,
      shippedNote: true,
      alignmentHits: true,
      createdAt: true,
    },
  });

  return { totalCount, recent };
}
