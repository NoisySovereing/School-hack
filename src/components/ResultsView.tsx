"use client";

import { GeneratedBlueprint } from "@/lib/types";
import { loadBlueprints } from "@/lib/storage";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function ResultsView() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [result, setResult] = useState<GeneratedBlueprint | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const all = loadBlueprints();
    if (id) {
      setResult(all.find((item) => item.id === id) ?? null);
    } else {
      setResult(all[0] ?? null);
    }
    setIsHydrated(true);
  }, [id]);

  if (!isHydrated) {
    return <p className="text-slate-600">Loading generated blueprint...</p>;
  }

  if (!result) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
        <p className="font-semibold">No generated blueprint found.</p>
        <p className="mt-2">Go back and generate a new app blueprint first.</p>
        <Link href="/" className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-white">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm text-slate-500">Generated {new Date(result.generatedAt).toLocaleString()}</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{result.input.appName}</h1>
        <p className="mt-2 text-slate-600">{result.input.appDescription}</p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold">Folder Structure</h2>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          {result.folderStructure.join("\n")}
        </pre>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold">package.json</h2>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{result.packageJson}</pre>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold">Setup Instructions</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-700">
            {result.setupInstructions.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold">README</h2>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{result.readme}</pre>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold">Starter Files</h2>
        <div className="mt-4 space-y-4">
          {result.starterFiles.map((file) => (
            <article key={file.path} className="rounded-lg border border-slate-200">
              <h3 className="border-b border-slate-200 bg-slate-50 px-4 py-2 font-mono text-sm">{file.path}</h3>
              <pre className="overflow-x-auto p-4 text-sm">{file.content}</pre>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
