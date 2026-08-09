import type { MetadataRoute } from "next";
import products from "@/data/nfc-products.json";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://londontap.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/places", "/food", "/shopping", "/transport", "/services", "/offers"];
  const nfcRoutes = Object.keys(products).filter((key) => key !== "__comment").map((key) => `/nfc/${key}`);

  return [...staticRoutes, ...nfcRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route.startsWith("/nfc") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/nfc") ? 0.7 : 0.9
  }));
}
