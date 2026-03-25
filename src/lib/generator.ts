import { featureOptions } from "@/data/options";
import {
  BlueprintForm,
  GeneratedBlueprint,
  GeneratedFile,
  StackOption,
  StarterTemplate,
} from "@/lib/types";

const stackBaseFiles: Record<StackOption, string[]> = {
  "Next.js": ["src/app/layout.tsx", "src/app/page.tsx", "src/components/ui"],
  React: ["src/main.tsx", "src/App.tsx", "src/components"],
  "Node API": ["src/server.ts", "src/routes", "src/controllers"],
};

const templateFiles: Record<StarterTemplate, GeneratedFile[]> = {
  "SaaS landing page": [
    {
      path: "src/components/Hero.tsx",
      content: `export function Hero() {\n  return (\n    <section className=\"py-16\">\n      <h1 className=\"text-4xl font-bold\">Launch your SaaS faster</h1>\n      <p className=\"mt-4 text-slate-600\">A clean landing page starter with conversion-focused sections.</p>\n    </section>\n  );\n}`,
    },
    {
      path: "src/components/Pricing.tsx",
      content: `export function Pricing() {\n  return <section className=\"py-12\">Pricing cards go here.</section>;\n}`,
    },
  ],
  "To-do app": [
    {
      path: "src/components/TodoList.tsx",
      content: `export function TodoList() {\n  return (\n    <section className=\"space-y-3\">\n      <h2 className=\"text-2xl font-semibold\">Your Tasks</h2>\n      <ul className=\"space-y-2\">\n        <li className=\"rounded-lg bg-white p-3 shadow\">Design initial schema</li>\n        <li className=\"rounded-lg bg-white p-3 shadow\">Build API endpoint</li>\n      </ul>\n    </section>\n  );\n}`,
    },
    {
      path: "src/components/TodoComposer.tsx",
      content: `export function TodoComposer() {\n  return <form className=\"mt-4\">Task input and add button.</form>;\n}`,
    },
  ],
  "Simple CRM": [
    {
      path: "src/components/ContactTable.tsx",
      content: `export function ContactTable() {\n  return <section className=\"rounded-xl bg-white p-6 shadow\">Contact list table starter.</section>;\n}`,
    },
    {
      path: "src/components/PipelineBoard.tsx",
      content: `export function PipelineBoard() {\n  return <section className=\"rounded-xl bg-white p-6 shadow\">Sales pipeline columns starter.</section>;\n}`,
    },
  ],
};

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function renderPackageJson(form: BlueprintForm): string {
  const packageJson = {
    name: toSlug(form.appName),
    version: "0.1.0",
    private: true,
    scripts:
      form.stack === "Node API"
        ? { dev: "tsx watch src/server.ts", build: "tsc", start: "node dist/server.js" }
        : { dev: "npm run dev", build: "npm run build", start: "npm run start" },
    starterTemplate: form.template,
    features: form.features,
  };

  return JSON.stringify(packageJson, null, 2);
}

function renderReadme(form: BlueprintForm, setupInstructions: string[]): string {
  const selectedFeatures = form.features.length
    ? form.features
        .map((feature) => `- ${featureOptions.find((item) => item.id === feature)?.label ?? feature}`)
        .join("\\n")
    : "- None selected";

  return `# ${form.appName}\n\n${form.appDescription}\n\n## Stack\n- ${form.stack}\n- Template: ${form.template}\n\n## Selected Features\n${selectedFeatures}\n\n## Setup\n${setupInstructions
    .map((step, index) => `${index + 1}. ${step}`)
    .join("\\n")}\n`;
}

export function generateBlueprint(form: BlueprintForm): GeneratedBlueprint {
  const root = toSlug(form.appName);
  const setupInstructions = [
    `Create project folder: mkdir ${root}`,
    `Initialize the project with the ${form.stack} stack`,
    "Install dependencies: npm install",
    "Start development server: npm run dev",
  ];

  const folderStructure = [
    `${root}/`,
    `├── package.json`,
    `├── README.md`,
    `├── src/`,
    `│   ├── components/`,
    `│   └── ${form.stack === "Node API" ? "routes/" : "app/"}`,
    ...stackBaseFiles[form.stack].map((entry) => `├── ${entry}`),
    ...templateFiles[form.template].map((file) => `└── ${file.path}`),
  ];

  return {
    id: crypto.randomUUID(),
    generatedAt: new Date().toISOString(),
    input: form,
    folderStructure,
    packageJson: renderPackageJson(form),
    readme: renderReadme(form, setupInstructions),
    setupInstructions,
    starterFiles: templateFiles[form.template],
  };
}
