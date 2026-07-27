import crypto from "crypto";

export function createCacheKey(url: string) {
  return crypto
    .createHash("sha256")
    .update(url)
    .digest("hex");
}