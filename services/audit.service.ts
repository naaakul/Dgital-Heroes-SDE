import type { AuditResult } from "@/types/audit";

import { fetchHtml } from "./fetch.service";
import { parseHtml } from "./parser.service";

import { concurrencyLimiter } from "@/lib/concurrency";
import { cache } from "@/lib/cache-instance";
import { CONFIG } from "@/lib/constants";

import { createCacheKey } from "@/utils/hash";

export async function runAudit(
  url: string
): Promise<AuditResult> {
  const cacheKey = createCacheKey(url);

  const cachedResult = await cache.get<AuditResult>(cacheKey);

  if (cachedResult) {
    return {
      ...cachedResult,
      cached: true,
    };
  }

  const page = await concurrencyLimiter(() =>
    fetchHtml(url)
  );

  const seo = parseHtml(page.html);

  const result: AuditResult = {
    url,

    status: page.status,

    cached: false,

    seo,

    performance: {
      responseTime: page.responseTime,
      htmlSize: page.htmlSize,
    },
  };

  await cache.set(cacheKey, result, CONFIG.CACHE_TTL);

  return result;
}