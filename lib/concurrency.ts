import pLimit from "p-limit";
import { CONFIG } from "./constants";

export const concurrencyLimiter = pLimit(
  CONFIG.MAX_CONCURRENT_REQUESTS
);