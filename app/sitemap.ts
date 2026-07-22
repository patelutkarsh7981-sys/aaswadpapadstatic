import type { MetadataRoute } from "next";
import { productSegments, products, segmentToSlug } from "@/data/products";

const baseUrl = "https://aaswadpapad.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    ...productSegments.map((segment) => ({
      url: `${baseUrl}/categories/${segmentToSlug(segment.name)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
