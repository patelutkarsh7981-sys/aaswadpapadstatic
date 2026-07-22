"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";

const storageKey = "aaswad-recent-products";

export function RecentlyViewed({ currentSlug }: { currentSlug: string }) {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) || "[]") as string[];
    const next = [currentSlug, ...saved.filter((slug) => slug !== currentSlug)].slice(0, 6);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    setSlugs(next);
  }, [currentSlug]);

  const recent = useMemo(
    () => slugs.filter((slug) => slug !== currentSlug).map((slug) => products.find((product) => product.slug === slug)).filter(Boolean).slice(0, 4),
    [currentSlug, slugs]
  );

  if (!recent.length) return null;

  return (
    <section className="bg-cream py-16 dark:bg-[#151914]">
      <div className="section-shell">
        <h2 className="font-serif text-3xl font-black text-cacao dark:text-cream">Recently Viewed</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recent.map((product) => (product ? <ProductCard key={product.id} product={product} /> : null))}
        </div>
      </div>
    </section>
  );
}
