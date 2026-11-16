import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { ensurePinnedTool } from "./tool-runner.mjs";

const ROOT = process.cwd();
const WORKFLOWS_DIR = path.join(ROOT, ".github", "workflows");

async function main() {
  if (!fs.existsSync(WORKFLOWS_DIR)) {
    throw new Error("Missing .github/workflows directory.");
  }

  const files = fs
    .readdirSync(WORKFLOWS_DIR)
    .filter((f) => f.endsWith(".yml") || f.endsWith(".yaml"))
    .map((f) => path.join(".github", "workflows", f));

  if (files.length === 0) {
    throw new Error("No GitHub Actions workflow files found.");
  }

  const actionlintBin = await ensurePinnedTool("actionlint");
  const result = spawnSync(actionlintBin, files, {
    cwd: ROOT,
    stdio: "inherit",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  console.log(`actionlint passed cleanly across ${files.length} workflow(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
