import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "App Factory",
  description: "Generate structured project blueprints for popular app stacks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen gradient-bg">{children}</body>
    </html>
  );
}
