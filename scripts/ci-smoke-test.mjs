import { spawn } from "node:child_process";

const BASE = "http://127.0.0.1:3000";

async function waitForServer(timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${BASE}/api/health`);
      if (res.ok) return;
    } catch {
      // Server still booting
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Timed out waiting for Next.js server on port 3000");
}

async function main() {
  const server = spawn("npx", ["next", "start", "-p", "3000"], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  try {
    await waitForServer();

    const homeRes = await fetch(`${BASE}/`);
    if (homeRes.status !== 200) {
      throw new Error(`Expected GET / 200, got ${homeRes.status}`);
    }
    const html = await homeRes.text();
    if (!html.includes("we orchestrate")) {
      throw new Error("Homepage SSR output missing expected headline");
    }

    const healthRes = await fetch(`${BASE}/api/health`);
    const health = await healthRes.json();
    if (!health?.ok || health?.database !== "connected") {
      throw new Error(`Unexpected /api/health payload: ${JSON.stringify(health)}`);
    }

    const postRes = await fetch(`${BASE}/api/signals`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        track: "Core Team",
        craft: "Product Design",
        shippedNote: "Verified CI Postgres write and read roundtrip.",
        alignmentHits: 3,
      }),
    });
    if (postRes.status !== 201) {
      throw new Error(`Expected POST /api/signals 201, got ${postRes.status}`);
    }
    const created = await postRes.json();
    if ((created?.totalCount ?? 0) < 3) {
      throw new Error(`Expected totalCount >= 3, got ${JSON.stringify(created)}`);
    }

    console.log("CI smoke test passed:", { health, totalCount: created.totalCount });
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error("CI smoke test failed:", err);
  process.exit(1);
});
