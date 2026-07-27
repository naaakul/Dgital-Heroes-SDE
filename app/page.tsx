import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
        <header className="flex gap-7">
          <h1 className="text-5xl font-bold tracking-tight">Page Pulse</h1>
          <Link href={"/audit"}>
            <div className="rounded-lg border border-green-500/30 text-green-400 bg-green-500/10 px-6 py-3 font-medium transition hover:bg-green-500/20 disabled:cursor-not-allowed disabled:opacity-50">
              Demo
            </div>
          </Link>
        </header>

        <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Features</h2>

          <ul className="space-y-2 text-neutral-300">
            <li>✅ URL validation</li>
            <li>✅ Request timeout handling</li>
            <li>✅ Configurable caching</li>
            <li>✅ Rate limiting</li>
            <li>✅ Concurrency limiting</li>
            <li>✅ Structured error responses</li>
            <li>✅ Request IDs & logging</li>
            <li>✅ Unit tests with Vitest</li>
            <li>✅ GitHub Actions CI</li>
          </ul>
        </section>

        <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-4 text-2xl font-semibold">API Endpoints</h2>

          <div className="space-y-6">
            <div>
              <p className="font-medium">GET /api/health</p>

              <p className="mt-1 text-neutral-400">
                Returns service health status.
              </p>
            </div>

            <div>
              <p className="font-medium">POST /api/audit</p>

              <p className="mt-2 text-neutral-400">Request Body</p>

              <pre className="mt-2 overflow-x-auto rounded-lg bg-black p-4 text-sm">
                {`{
  "url": "https://example.com"
}`}
              </pre>

              <p className="mt-4 text-neutral-400">Example Response</p>

              <pre className="mt-2 overflow-x-auto rounded-lg bg-black p-4 text-sm">
                {`{
  "success": true,
  "requestId": "req_abc123",
  "timestamp": "2026-07-28T12:34:56.789Z",
  "data": {
    "url": "https://example.com",
    "status": 200,
    "cached": false,
    "seo": {
      "title": "Example Domain",
      "description": "...",
      "h1Count": 1
    },
    "performance": {
      "responseTime": 182,
      "htmlSize": 12564
    }
  }
}`}
              </pre>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Project</h2>

          <div className="space-y-2 text-neutral-300">
            <p>Framework: Next.js 16</p>

            <p>Language: TypeScript</p>

            <p>Testing: Vitest</p>

            <p>CI: GitHub Actions</p>

            <p>Cache: Upstash Redis</p>
          </div>
        </section>
      </div>
    </main>
  );
}
