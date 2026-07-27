import AuditForm from "@/components/AuditForm";

export default function AuditPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 pt-16">
        <section className="text-center">
          <div className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-sm text-blue-300">
            Live Website Analyzer
          </div>

          <h1 className="text-5xl font-bold tracking-tight">Website Audit</h1>
        </section>

        <div className="pt-6">
          <AuditForm />
        </div>

        <footer className="mt-auto border-t border-neutral-800 p-5 text-center text-sm text-neutral-500">
          Built for{" "}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition hover:text-white"
          >
            Digital Heroes Task
          </a>{" "}
          by {" "}
          <a
            href="https://nakul.rest"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition hover:text-white"
          >
            Nakul Chouksey
          </a>{" "}|{" "}
          <a
            href="https://github.com/naaakul/Digital-Heroes-SDE"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition hover:text-white"
          >
            Github
          </a>
        </footer>
      </div>
    </main>
  );
}
