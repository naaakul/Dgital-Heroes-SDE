import { logger } from "./logger";

export function createRequestLogger(requestId: string) {
  return logger.child({
    requestId,
  });
}