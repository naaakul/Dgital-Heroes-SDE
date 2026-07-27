import { CONFIG } from "@/lib/constants";
import { AppError, ErrorCode } from "@/lib/errors";

export async function fetchHtml(url: string) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, CONFIG.REQUEST_TIMEOUT);

  const start = performance.now();

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": CONFIG.USER_AGENT,
      },
      redirect: "follow",
    });

    const html = await response.text();

    const responseTime = Math.round(performance.now() - start);

    return {
      html,
      status: response.status,
      responseTime,
      htmlSize: Buffer.byteLength(html),
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new AppError(
        ErrorCode.FETCH_TIMEOUT,
        "The target website took too long to respond.",
        504
      );
    }

    throw new AppError(
      ErrorCode.FETCH_FAILED,
      "Failed to fetch the target website.",
      502
    );
  } finally {
    clearTimeout(timeout);
  }
}