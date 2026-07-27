import { fetchHtml } from "./fetch.service";
import { parseHtml } from "./parser.service";

import type { AuditResult } from "@/types/audit";

export async function runAudit(
  url: string
): Promise<AuditResult> {
  const page = await fetchHtml(url);

  const seo = parseHtml(page.html);

  return {
    url,

    status: page.status,

    cached: false,

    seo,

    performance: {
      responseTime: page.responseTime,
      htmlSize: page.htmlSize,
    },
  };
}