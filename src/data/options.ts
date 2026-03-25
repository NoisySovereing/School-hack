import { Feature, StackOption, StarterTemplate } from "@/lib/types";

export const stackOptions: StackOption[] = ["Next.js", "React", "Node API"];

export const starterTemplates: StarterTemplate[] = [
  "SaaS landing page",
  "To-do app",
  "Simple CRM",
];

export const featureOptions: Feature[] = [
  { id: "auth", label: "Authentication", description: "Sign in / sign up flows" },
  { id: "billing", label: "Billing", description: "Plans, checkout, and subscriptions" },
  { id: "dashboard", label: "Dashboard", description: "Personalized analytics overview" },
  { id: "notifications", label: "Notifications", description: "Email and in-app alerts" },
  { id: "search", label: "Search", description: "Global search and filtering" },
  { id: "api", label: "Public API", description: "Documented API endpoints" },
  { id: "team", label: "Team Management", description: "Members, roles, and permissions" },
  { id: "file-upload", label: "File Upload", description: "Upload media and documents" },
];
