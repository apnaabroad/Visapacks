// Builds the `origin` option for the cors() middleware from CORS_ORIGIN.
// Automatically allows both the apex domain and its "www." counterpart for
// each entry, so setting CORS_ORIGIN to just one of
// "https://visapacks.com" / "https://www.visapacks.com" covers both -
// a mismatch between the two is one of the most common causes of a working
// site suddenly getting CORS-blocked after a domain change.
export function buildCorsOrigin(rawEnvValue) {
  if (!rawEnvValue) return "*";

  const origins = new Set();
  for (const entry of rawEnvValue.split(",").map((o) => o.trim()).filter(Boolean)) {
    origins.add(entry);
    try {
      const url = new URL(entry);
      const altHost = url.hostname.startsWith("www.") ? url.hostname.slice(4) : `www.${url.hostname}`;
      origins.add(`${url.protocol}//${altHost}${url.port ? `:${url.port}` : ""}`);
    } catch {
      // Not a parseable URL - keep it as-is, skip generating a www variant.
    }
  }
  return [...origins];
}
