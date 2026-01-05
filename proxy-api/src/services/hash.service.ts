import crypto from "crypto";

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);

  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj).sort();
    const out: Record<string, unknown> = {};
    for (const k of keys) out[k] = canonicalize(obj[k]);
    return out;
  }

  return value;
}

export function canonicalJsonStringify(input: unknown): string {
  const canonical = canonicalize(input);
  return JSON.stringify(canonical);
}

export function sha256Hex(inputUtf8: string): string {
  return crypto.createHash("sha256").update(inputUtf8, "utf8").digest("hex");
}

export function as0x(hexNoPrefix: string): string {
  const h = hexNoPrefix.startsWith("0x") ? hexNoPrefix.slice(2) : hexNoPrefix;
  return "0x" + h.toLowerCase();
}
