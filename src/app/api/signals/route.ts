import { revalidateTag } from "next/cache";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

const ALLOWED_TRACKS = new Set(["Core Team", "Platform Network"]);
const ALLOWED_CRAFTS = new Set([
  "Product Design",
  "Full-Stack Engineering",
  "Operations & Growth",
  "Creator / B2B / Sales",
]);

export async function GET() {
  await connection();
  try {
    const [totalCount, recent] = await Promise.all([
      prisma.candidateSignal.count(),
      prisma.candidateSignal.findMany({
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
      }),
    ]);

    return Response.json({ totalCount, recent });
  } catch (error) {
    console.error("GET /api/signals failed:", error);
    return Response.json({ error: "Unable to load builder signals." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      track?: unknown;
      craft?: unknown;
      shippedNote?: unknown;
      alignmentHits?: unknown;
    };

    const track =
      typeof body.track === "string" && ALLOWED_TRACKS.has(body.track)
        ? body.track
        : "Core Team";

    const craft =
      typeof body.craft === "string" && ALLOWED_CRAFTS.has(body.craft)
        ? body.craft
        : "Product Design";

    const shippedNote =
      typeof body.shippedNote === "string" ? body.shippedNote.trim() : "";

    if (shippedNote.length < 8 || shippedNote.length > 220) {
      return Response.json(
        {
          error: "Share a concise 8–220 character note on something real you shipped.",
        },
        { status: 400 }
      );
    }

    const rawHits = Number(body.alignmentHits ?? 0);
    const alignmentHits = Number.isFinite(rawHits)
      ? Math.max(0, Math.min(3, Math.trunc(rawHits)))
      : 0;

    const created = await prisma.candidateSignal.create({
      data: {
        track,
        craft,
        shippedNote,
        alignmentHits,
      },
      select: {
        id: true,
        track: true,
        craft: true,
        shippedNote: true,
        alignmentHits: true,
        createdAt: true,
      },
    });

    revalidateTag("signals", "max");

    const totalCount = await prisma.candidateSignal.count();

    return Response.json({ signal: created, totalCount }, { status: 201 });
  } catch (error) {
    console.error("POST /api/signals failed:", error);
    return Response.json({ error: "Unable to save signal right now." }, { status: 500 });
  }
}
