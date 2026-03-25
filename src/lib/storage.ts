import { GeneratedBlueprint } from "@/lib/types";

export const STORAGE_KEY = "app-factory-blueprints";

function isGeneratedBlueprint(value: unknown): value is GeneratedBlueprint {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<GeneratedBlueprint>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.generatedAt === "string" &&
    !!candidate.input &&
    Array.isArray(candidate.folderStructure) &&
    typeof candidate.packageJson === "string" &&
    typeof candidate.readme === "string" &&
    Array.isArray(candidate.setupInstructions) &&
    Array.isArray(candidate.starterFiles)
  );
}

export function loadBlueprints(): GeneratedBlueprint[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isGeneratedBlueprint);
  } catch {
    return [];
  }
}

export function saveBlueprint(blueprint: GeneratedBlueprint): void {
  if (typeof window === "undefined") return;

  const all = loadBlueprints();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([blueprint, ...all]));
}
