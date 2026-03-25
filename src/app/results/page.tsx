import { ResultsView } from "@/components/ResultsView";
import { Suspense } from "react";

export default function ResultsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <Suspense fallback={<p className="text-slate-600">Loading generated blueprint...</p>}>
        <ResultsView />
      </Suspense>
    </main>
  );
}
