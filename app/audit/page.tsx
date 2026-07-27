import AuditForm from "@/components/AuditForm";

export default function AuditPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16">
        <section className="text-center">
          <div className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-sm text-blue-300">
            Live Website Analyzer
          </div>

          <h1 className="text-5xl font-bold tracking-tight">Website Audit</h1>
        </section>

        <AuditForm />
      </div>
    </main>
  );
}
