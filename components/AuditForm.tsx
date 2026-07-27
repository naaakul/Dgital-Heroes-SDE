"use client";

import { useState } from "react";
import AuditResult from "./AuditResult";
import LoadingCard from "./LoadingCard";

type AuditResponse = {
  url: string;
  status: number;
  cached: boolean;
  seo: {
    title: string | null;
    description: string | null;
    h1Count: number;
  };
  performance: {
    responseTime: number;
    htmlSize: number;
  };
};

type ApiResponse = {
  success: boolean;
  requestId: string;
  timestamp: string;
  data: AuditResponse;
};

type ErrorResponse = {
  error: {
    message: string;
  };
};

export default function AuditForm() {
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<AuditResponse | null>(null);

  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch("/api/audit", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          url,
        }),
      });

      const data = (await response.json()) as ApiResponse | ErrorResponse;

      if (!response.ok) {
        const err = data as ErrorResponse;

        throw new Error(err.error?.message ?? "Unable to analyze the website.");
      }

      setResult((data as ApiResponse).data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 mb-6"
      >
        <label
          htmlFor="url"
          className="mb-3 block text-sm font-medium text-neutral-300"
        >
          Website URL
        </label>

        <div className="flex flex-col gap-4 md:flex-row">
          <input
            id="url"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="flex-1 rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg border border-green-500/30 text-green-400 bg-green-500/10 px-6 py-3 font-medium transition hover:bg-green-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Website"}
          </button>
        </div>

        <p className="mt-3 text-sm text-neutral-500">
          Example: https://example.com
        </p>
      </form>

      {loading && <LoadingCard />}

      {!loading && error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6">
          <h3 className="mb-2 text-lg font-semibold text-red-400">
            Couldn&apos;t analyze this website
          </h3>

          <p className="text-neutral-300">{error}</p>
        </div>
      )}

      {!loading && result && <AuditResult result={result} />}
    </>
  );
}
