export default function LoadingCard() {
  const steps = [
    "Connecting to website...",
    "Downloading HTML...",
    "Checking SEO tags...",
    "Preparing report...",
  ];

  return (
    <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-8">
      <div className="flex flex-col items-center text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />

        <h2 className="mt-6 text-2xl font-semibold">
          Analyzing Website
        </h2>

        <p className="mt-2 text-neutral-400">
          This usually takes a few seconds.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-center gap-4 rounded-lg border border-neutral-800 bg-neutral-900 p-4"
            style={{
              animation: `pulse 1.2s ease-in-out ${index * 0.2}s infinite`,
            }}
          >
            <div className="h-3 w-3 rounded-full bg-blue-500" />

            <span className="text-neutral-300">
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}