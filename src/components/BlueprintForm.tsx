"use client";

import { featureOptions, stackOptions, starterTemplates } from "@/data/options";
import { generateBlueprint } from "@/lib/generator";
import { saveBlueprint } from "@/lib/storage";
import { BlueprintForm as BlueprintFormData } from "@/lib/types";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

const initialForm: BlueprintFormData = {
  appName: "",
  appDescription: "",
  stack: "Next.js",
  template: "SaaS landing page",
  features: [],
};

export function BlueprintForm() {
  const router = useRouter();
  const [form, setForm] = useState<BlueprintFormData>(initialForm);

  const canSubmit = useMemo(
    () => form.appName.trim().length > 2 && form.appDescription.trim().length > 10,
    [form.appDescription, form.appName],
  );

  const toggleFeature = (featureId: string) => {
    setForm((current) => ({
      ...current,
      features: current.features.includes(featureId)
        ? current.features.filter((feature) => feature !== featureId)
        : [...current.features, featureId],
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const generated = generateBlueprint(form);
    saveBlueprint(generated);

    router.push(`/results?id=${generated.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-soft">
      <div>
        <label htmlFor="appName" className="text-sm font-medium text-slate-700">
          App Name
        </label>
        <input
          id="appName"
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          placeholder="Acme App Builder"
          value={form.appName}
          onChange={(event) => setForm((current) => ({ ...current, appName: event.target.value }))}
          required
        />
      </div>

      <div>
        <label htmlFor="appDescription" className="text-sm font-medium text-slate-700">
          Short Description
        </label>
        <textarea
          id="appDescription"
          className="mt-2 h-24 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          placeholder="Describe what your app does and who it helps..."
          value={form.appDescription}
          onChange={(event) => setForm((current) => ({ ...current, appDescription: event.target.value }))}
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="stack" className="text-sm font-medium text-slate-700">
            Stack
          </label>
          <select
            id="stack"
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            value={form.stack}
            onChange={(event) => setForm((current) => ({ ...current, stack: event.target.value as BlueprintFormData["stack"] }))}
          >
            {stackOptions.map((stack) => (
              <option key={stack} value={stack}>
                {stack}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="template" className="text-sm font-medium text-slate-700">
            Starter Template
          </label>
          <select
            id="template"
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            value={form.template}
            onChange={(event) =>
              setForm((current) => ({ ...current, template: event.target.value as BlueprintFormData["template"] }))
            }
          >
            {starterTemplates.map((template) => (
              <option key={template} value={template}>
                {template}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-slate-700">Features</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {featureOptions.map((feature) => (
            <label
              key={feature.id}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-300"
            >
              <input
                type="checkbox"
                className="mt-1"
                checked={form.features.includes(feature.id)}
                onChange={() => toggleFeature(feature.id)}
              />
              <span>
                <span className="block font-medium text-slate-800">{feature.label}</span>
                <span className="text-sm text-slate-500">{feature.description}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-lg bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        Generate Blueprint
      </button>
    </form>
  );
}
