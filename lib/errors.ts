export enum ErrorCode {
  INVALID_URL = "INVALID_URL",
  INVALID_REQUEST = "INVALID_REQUEST",

  FETCH_TIMEOUT = "FETCH_TIMEOUT",
  FETCH_FAILED = "FETCH_FAILED",

  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",

  CACHE_ERROR = "CACHE_ERROR",

  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly statusCode: number
  ) {
    super(message);

    this.name = "AppError";
  }
}