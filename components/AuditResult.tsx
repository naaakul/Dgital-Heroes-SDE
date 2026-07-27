import HealthBadge from "./HealthBadge";

type AuditResultProps = {
  result: {
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
};

export default function AuditResult({
  result,
}: AuditResultProps) {
  const score =
    Number(Boolean(result.seo.title)) +
    Number(Boolean(result.seo.description)) +
    Number(result.seo.h1Count > 0) +
    Number(result.performance.responseTime < 500);

  const recommendations: string[] = [];

  if (!result.seo.title) {
    recommendations.push(
      "Add a page title so search engines know what the page is about."
    );
  }

  if (!result.seo.description) {
    recommendations.push(
      "Add a meta description to improve how your page appears in search results."
    );
  }

  if (result.seo.h1Count === 0) {
    recommendations.push(
      "Add one main heading (H1) to clearly describe the page."
    );
  }

  if (result.performance.responseTime >= 500) {
    recommendations.push(
      "Improve server response time to make the website feel faster."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Great job! No major issues were detected in this basic audit."
    );
  }

  return (
    <div className="space-y-6">
      <HealthBadge score={score} />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-5 text-xl font-semibold">
            Website Information
          </h2>

          <div className="space-y-4">
            <Info
              label="Website"
              value={result.url}
            />

            <Info
              label="Status"
              value={`${result.status}`}
            />

            <Info
              label="Source"
              value={
                result.cached
                  ? "Served from cache"
                  : "Fresh analysis"
              }
            />
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-5 text-xl font-semibold">
            SEO Overview
          </h2>

          <div className="space-y-4">
            <Info
              label="Page Title"
              value={
                result.seo.title ?? "Not found"
              }
            />

            <Info
              label="Meta Description"
              value={
                result.seo.description ??
                "Not found"
              }
            />

            <Info
              label="Main Heading"
              value={
                result.seo.h1Count > 0
                  ? `${result.seo.h1Count} heading found`
                  : "No H1 heading found"
              }
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        <h2 className="mb-5 text-xl font-semibold">
          Performance
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-neutral-400">
              Response Time
            </p>

            <p className="mt-1 text-3xl font-bold">
              {result.performance.responseTime} ms
            </p>
          </div>

          <div>
            <p className="text-sm text-neutral-400">
              HTML Size
            </p>

            <p className="mt-1 text-3xl font-bold">
              {(result.performance.htmlSize / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        <h2 className="mb-5 text-xl font-semibold">
          Recommendations
        </h2>

        <ul className="space-y-3">
          {recommendations.map((item) => (
            <li
              key={item}
              className="flex gap-3"
            >
              <span>•</span>

              <span className="text-neutral-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-neutral-500">
        {label}
      </p>

      <p className="mt-1 break-all text-white">
        {value}
      </p>
    </div>
  );
}