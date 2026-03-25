import { BlueprintForm } from "@/components/BlueprintForm";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 md:px-6">
      <section className="mb-8">
        <p className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
          App Factory v1
        </p>
        <h1 className="mt-4 text-4xl font-bold text-slate-900">Generate app blueprints in seconds</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Define your app idea, choose a stack and starter template, then generate a ready-to-follow project blueprint with
          structure, dependencies, starter files, and setup steps.
        </p>
      </section>
      <BlueprintForm />
    </main>
  );
}
