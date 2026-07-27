import type { MetadataRoute } from "next";
import { productSegments, products, segmentToSlug } from "@/data/products";

const baseUrl = "https://aaswadpapad.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.7 },
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    ...productSegments.map((segment) => ({
      url: `${baseUrl}/categories/${segmentToSlug(segment.name)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
