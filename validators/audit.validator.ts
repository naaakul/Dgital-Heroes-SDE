import { z } from "zod";

import { CONFIG } from "@/lib/constants";
import { AppError, ErrorCode } from "@/lib/errors";

const schema = z.object({
  url: z.string().trim().min(1),
});

export function validateAuditRequest(body: unknown): string {
  const result = schema.safeParse(body);

  if (!result.success) {
    throw new AppError(
      ErrorCode.INVALID_REQUEST,
      "Invalid request body.",
      400
    );
  }

  let { url } = result.data;

  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  let parsed: URL;

  try {
    parsed = new URL(url);
  } catch {
    throw new AppError(
      ErrorCode.INVALID_URL,
      "Invalid URL.",
      400
    );
  }

  if (parsed.href.length > CONFIG.MAX_URL_LENGTH) {
    throw new AppError(
      ErrorCode.INVALID_URL,
      "URL is too long.",
      400
    );
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new AppError(
      ErrorCode.INVALID_URL,
      "Only HTTP and HTTPS URLs are allowed.",
      400
    );
  }

  const hostname = parsed.hostname.toLowerCase();

  if (hostname === "localhost") {
    throw new AppError(
      ErrorCode.INVALID_URL,
      "Private or localhost URLs are not allowed.",
      400
    );
  }

  if (!hostname.includes(".")) {
    throw new AppError(
      ErrorCode.INVALID_URL,
      "Invalid URL.",
      400
    );
  }

  if (
    /^127\./.test(hostname) ||
    /^10\./.test(hostname) ||
    /^192\.168\./.test(hostname) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)
  ) {
    throw new AppError(
      ErrorCode.INVALID_URL,
      "Private or localhost URLs are not allowed.",
      400
    );
  }

  return parsed.toString();
}