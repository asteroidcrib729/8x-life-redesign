import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { ensurePinnedTool } from "./tool-runner.mjs";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, ".local", "security");

function runGitleaks(binPath, args, label) {
  const result = spawnSync(binPath, args, {
    cwd: ROOT,
    encoding: "utf8",
  });

  if (result.error) {
    throw result.error;
  }

  // gitleaks exits 0 = no leaks, 1 = leaks found, >1 = tool error
  if (result.status !== 0 && result.status !== 1) {
    throw new Error(`${label} failed (exit ${result.status}): ${result.stderr}`);
  }

  return result.status === 1;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const gitleaksBin = await ensurePinnedTool("gitleaks");

  const historyReport = path.join(OUT_DIR, "gitleaks-history.json");
  const sourceReport = path.join(OUT_DIR, "gitleaks-source.json");

  const historyLeaks = runGitleaks(
    gitleaksBin,
    [
      "git",
      "--redact=100",
      "--report-format=json",
      `--report-path=${historyReport}`,
      "--no-banner",
    ],
    "gitleaks git"
  );

  const sourceLeaks = runGitleaks(
    gitleaksBin,
    [
      "dir",
      ".",
      "--redact=100",
      "--report-format=json",
      `--report-path=${sourceReport}`,
      "--no-banner",
    ],
    "gitleaks dir"
  );

  if (historyLeaks || sourceLeaks) {
    console.error(
      "Secret scanning detected potential leaks. Inspect redacted JSON reports under .local/security/."
    );
    process.exit(1);
  }

  console.log("Secret scan passed: zero leaks across Git history and source tree.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
