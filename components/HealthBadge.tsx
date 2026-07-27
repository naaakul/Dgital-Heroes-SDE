type HealthBadgeProps = {
  score: number;
};

export default function HealthBadge({
  score,
}: HealthBadgeProps) {
  let title = "";
  let description = "";
  let bg = "";
  let border = "";
  let text = "";

  if (score === 4) {
    title = "🟢 Excellent";
    description =
      "This website follows the important SEO and performance checks included in this audit.";
    bg = "bg-green-500/10";
    border = "border-green-500/30";
    text = "text-green-400";
  } else if (score === 3) {
    title = "🟡 Good";
    description =
      "The website is in good shape but there are a few improvements that would make it even better.";
    bg = "bg-yellow-500/10";
    border = "border-yellow-500/30";
    text = "text-yellow-400";
  } else if (score === 2) {
    title = "🟠 Fair";
    description =
      "The website works, but several improvements are recommended for better SEO and user experience.";
    bg = "bg-orange-500/10";
    border = "border-orange-500/30";
    text = "text-orange-400";
  } else {
    title = "🔴 Needs Attention";
    description =
      "Several important issues were found. Improving these areas can help search visibility and overall website quality.";
    bg = "bg-red-500/10";
    border = "border-red-500/30";
    text = "text-red-400";
  }

  return (
    <section
      className={`rounded-xl border ${border} ${bg} p-6`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wider text-neutral-400">
            Overall Website Health
          </p>

          <h2 className={`mt-2 text-3xl font-bold ${text}`}>
            {title}
          </h2>

          <p className="mt-3 max-w-2xl text-neutral-300">
            {description}
          </p>
        </div>

        <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/10 bg-neutral-950">
          <div className="text-center">
            <div className="text-4xl font-bold">
              {score}
            </div>

            <div className="text-sm text-neutral-400">
              / 4
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}