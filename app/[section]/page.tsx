import { notFound } from "next/navigation";

import Home from "../portfolio-home";
import type { PortfolioSection } from "../projects";

const sectionBySlug: Record<string, PortfolioSection> = {
  digital: "digital",
  exhibition: "exhibition",
  installation: "installation",
  commercial: "commercial",
  cv: "graphic",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(sectionBySlug).map((section) => ({ section }));
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const initialSection = sectionBySlug[section];

  if (!initialSection) notFound();

  return <Home initialSection={initialSection} />;
}
