export type StackOption = "Next.js" | "React" | "Node API";

export type StarterTemplate = "SaaS landing page" | "To-do app" | "Simple CRM";

export interface Feature {
  id: string;
  label: string;
  description: string;
}

export interface BlueprintForm {
  appName: string;
  appDescription: string;
  stack: StackOption;
  template: StarterTemplate;
  features: string[];
}

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface GeneratedBlueprint {
  id: string;
  generatedAt: string;
  input: BlueprintForm;
  folderStructure: string[];
  packageJson: string;
  readme: string;
  setupInstructions: string[];
  starterFiles: GeneratedFile[];
}
