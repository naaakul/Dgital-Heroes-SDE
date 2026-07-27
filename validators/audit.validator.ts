import { z } from "zod";
import { CONFIG } from "@/lib/constants";
import { AppError, ErrorCode } from "@/lib/errors";

const schema = z.object({
  url: z
    .string()
    .trim()
    .min(1)
    .max(CONFIG.MAX_URL_LENGTH),
});

const PRIVATE_IP =
  /^(localhost|127\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)/;

export function validateAuditRequest(input: unknown): string {
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    throw new AppError(
      ErrorCode.INVALID_REQUEST,
      "Invalid request body.",
      400
    );
  }

  let { url } = parsed.data;

  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(url);
  } catch {
    throw new AppError(
      ErrorCode.INVALID_URL,
      "Invalid URL.",
      400
    );
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new AppError(
      ErrorCode.INVALID_URL,
      "Only HTTP and HTTPS URLs are allowed.",
      400
    );
  }

  if (PRIVATE_IP.test(parsedUrl.hostname)) {
    throw new AppError(
      ErrorCode.INVALID_URL,
      "Private or localhost URLs are not allowed.",
      400
    );
  }

  return parsedUrl.toString();
}