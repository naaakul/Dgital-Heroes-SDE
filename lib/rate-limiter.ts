import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";
import { CONFIG } from "./constants";

export const rateLimiter = new Ratelimit({
  redis,

  limiter: Ratelimit.slidingWindow(
    CONFIG.RATE_LIMIT_REQUESTS,
    `${CONFIG.RATE_LIMIT_WINDOW} s`
  ),

  analytics: true,

  prefix: "page-pulse",
});