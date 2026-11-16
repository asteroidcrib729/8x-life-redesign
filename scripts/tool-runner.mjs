import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MANIFEST_PATH = path.join(ROOT, ".github", "tool-manifest.json");

function getPlatformKey() {
  if (process.platform === "linux" && process.arch === "x64") {
    return "linux-x64";
  }
  if (process.platform === "win32" && process.arch === "x64") {
    return "win32-x64";
  }
  throw new Error(
    `Unsupported platform/arch for pinned binary runner: ${process.platform}-${process.arch}`
  );
}

/**
 * Downloads, SHA-256 verifies, and caches a pinned CLI binary from `.github/tool-manifest.json`.
 */
export async function ensurePinnedTool(toolName) {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  const spec = manifest[toolName];
  if (!spec) {
    throw new Error(`Tool "${toolName}" not found in .github/tool-manifest.json`);
  }

  const platformKey = getPlatformKey();
  const asset = spec.assets[platformKey];
  if (!asset) {
    throw new Error(`No asset configured for ${toolName} on ${platformKey}`);
  }

  const toolDir = path.join(ROOT, ".local", "tools", `${toolName}-${spec.version}`);
  const binName = process.platform === "win32" ? `${toolName}.exe` : toolName;
  const binPath = path.join(toolDir, binName);

  if (fs.existsSync(binPath)) {
    return binPath;
  }

  fs.mkdirSync(toolDir, { recursive: true });
  const archivePath = path.join(toolDir, asset.name);
  const url = `https://github.com/${spec.repository}/releases/download/v${spec.version}/${asset.name}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: HTTP ${res.status}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  const actualSha = crypto.createHash("sha256").update(buffer).digest("hex");
  if (actualSha !== asset.sha256) {
    throw new Error(
      `SHA-256 mismatch for ${asset.name}: expected ${asset.sha256}, got ${actualSha}`
    );
  }

  fs.writeFileSync(archivePath, buffer);

  if (asset.name.endsWith(".tar.gz")) {
    execFileSync("tar", ["-xzf", archivePath, "-C", toolDir], { stdio: "inherit" });
  } else if (asset.name.endsWith(".zip")) {
    execFileSync(
      "powershell",
      [
        "-NoProfile",
        "-Command",
        `Expand-Archive -LiteralPath '${archivePath}' -DestinationPath '${toolDir}' -Force`,
      ],
      { stdio: "inherit" }
    );
  } else {
    throw new Error(`Unsupported archive format: ${asset.name}`);
  }

  fs.rmSync(archivePath, { force: true });

  if (!fs.existsSync(binPath)) {
    throw new Error(`Expected extracted binary at ${binPath}`);
  }

  if (process.platform !== "win32") {
    fs.chmodSync(binPath, 0o755);
  }

  return binPath;
}
