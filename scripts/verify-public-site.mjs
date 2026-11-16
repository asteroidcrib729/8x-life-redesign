const siteUrl = (process.argv[2] || "https://8x-life-faraz.vercel.app").replace(
  /\/+$/,
  ""
);

async function checkEndpoint(url, { expectJson = false, expectImage = false } = {}) {
  const res = await fetch(url, {
    redirect: "manual",
    headers: { "user-agent": "8x-life-redesign-public-check/1.0" },
  });

  if (res.status >= 300 && res.status < 400) {
    const location = res.headers.get("location") || "";
    throw new Error(`Unexpected redirect (${res.status}) on ${url} -> ${location}`);
  }

  if (res.status !== 200) {
    throw new Error(`Expected HTTP 200 for ${url}, received ${res.status}`);
  }

  if (expectJson) {
    const data = await res.json();
    if (!data?.ok || data?.database !== "connected") {
      throw new Error(`Unexpected /api/health payload: ${JSON.stringify(data)}`);
    }
    return data;
  }

  if (expectImage) {
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) {
      throw new Error(`Expected image/* content-type on ${url}, got ${contentType}`);
    }
    return { contentType };
  }

  const html = await res.text();
  if (!html.includes("we orchestrate") || html.includes("Vercel Authentication")) {
    throw new Error(
      `Homepage content check failed or returned Vercel auth gate on ${url}`
    );
  }

  return { bytes: html.length };
}

async function main() {
  console.log(`Verifying anonymous public access for ${siteUrl}...`);
  const home = await checkEndpoint(`${siteUrl}/`);
  const health = await checkEndpoint(`${siteUrl}/api/health`, { expectJson: true });
  const og = await checkEndpoint(`${siteUrl}/opengraph-image`, { expectImage: true });

  console.log("Public homepage OK:", home);
  console.log("Public /api/health OK:", health);
  console.log("Public /opengraph-image OK:", og);
}

main().catch((err) => {
  console.error("Public release verification failed:", err);
  process.exit(1);
});
