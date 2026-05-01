import { notFound } from "next/navigation";
import { workItems } from "../../lib/work-data";
import WorkPageClient from "./work-page-client";

type WorkPageProps = {
  params: Promise<{ page: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return workItems.map((item) => ({ page: String(item.id) }));
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { page } = await params;
  const currentPage = Number(page);

  if (!Number.isInteger(currentPage)) {
    notFound();
  }

  const exists = workItems.some((item) => item.id === currentPage);
  if (!exists) {
    notFound();
  }

  return <WorkPageClient currentPage={currentPage} />;
}
