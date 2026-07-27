export const CONFIG = {
  REQUEST_TIMEOUT: Number(process.env.REQUEST_TIMEOUT ?? 5000),
  CACHE_TTL: Number(process.env.CACHE_TTL ?? 300),

  MAX_CONCURRENT_REQUESTS: Number(
    process.env.MAX_CONCURRENT_REQUESTS ?? 10
  ),

  RATE_LIMIT_REQUESTS: Number(
    process.env.RATE_LIMIT_REQUESTS ?? 20
  ),

  RATE_LIMIT_WINDOW: Number(
    process.env.RATE_LIMIT_WINDOW ?? 60
  ),

  MAX_URL_LENGTH: 2048,

  USER_AGENT:
    "PagePulse/1.0 (+https://digitalheroesco.com)",
} as const;