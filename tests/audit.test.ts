import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/services/fetch.service", () => ({
  fetchHtml: vi.fn(),
}));

vi.mock("@/services/parser.service", () => ({
  parseHtml: vi.fn(),
}));

vi.mock("@/lib/cache-instance", () => ({
  cache: {
    get: vi.fn(),
    set: vi.fn(),
  },
}));

import { runAudit } from "@/services/audit.service";
import { fetchHtml } from "@/services/fetch.service";
import { parseHtml } from "@/services/parser.service";
import { cache } from "@/lib/cache-instance";

describe("runAudit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns cached result", async () => {
    vi.mocked(cache.get).mockResolvedValue({
      url: "https://example.com/",
      status: 200,
      cached: false,
      seo: {
        title: "Cached",
        description: null,
        h1Count: 1,
      },
      performance: {
        responseTime: 100,
        htmlSize: 1000,
      },
    });

    const result = await runAudit("https://example.com");

    expect(result.cached).toBe(true);
    expect(fetchHtml).not.toHaveBeenCalled();
  });

  it("fetches and caches when cache miss", async () => {
    vi.mocked(cache.get).mockResolvedValue(null);

    vi.mocked(fetchHtml).mockResolvedValue({
      html: "<title>Hello</title><h1>Hi</h1>",
      status: 200,
      responseTime: 150,
      htmlSize: 500,
    });

    vi.mocked(parseHtml).mockReturnValue({
      title: "Hello",
      description: null,
      h1Count: 1,
    });

    const result = await runAudit("https://example.com");

    expect(fetchHtml).toHaveBeenCalledOnce();
    expect(parseHtml).toHaveBeenCalledOnce();
    expect(cache.set).toHaveBeenCalledOnce();

    expect(result.status).toBe(200);
    expect(result.cached).toBe(false);
  });
});