import type { MetadataRoute } from "next";
import { workItems } from "./lib/work-data";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://meet-yusra.vercel.app";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const workRoutes: MetadataRoute.Sitemap = workItems.map((item) => ({
    url: `${baseUrl}/work/${item.id}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes];
}
