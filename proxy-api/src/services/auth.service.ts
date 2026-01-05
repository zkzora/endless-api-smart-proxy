export function validateApiKey(provided: string | undefined, expected: string | undefined): boolean {
  if (!expected) return false;
  if (!provided) return false;
  return provided === expected;
}
