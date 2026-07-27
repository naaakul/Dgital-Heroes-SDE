import { beforeEach, describe, expect, it, vi } from "vitest";

import { fetchHtml } from "@/services/fetch.service";
import { AppError } from "@/lib/errors";

describe("fetchHtml", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches html successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        status: 200,
        text: async () => "<html><title>Hello</title></html>",
      })
    );

    const result = await fetchHtml("https://example.com");

    expect(result.status).toBe(200);
    expect(result.html).toContain("Hello");
    expect(result.htmlSize).toBeGreaterThan(0);
    expect(result.responseTime).toBeGreaterThanOrEqual(0);
  });

  it("throws on failed fetch", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network Error"))
    );

    await expect(
      fetchHtml("https://example.com")
    ).rejects.toBeInstanceOf(AppError);
  });
});