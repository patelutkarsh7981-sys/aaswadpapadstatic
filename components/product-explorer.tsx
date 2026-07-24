"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { getRicePapadSegmentForProduct, productSegments, products, ricePapadSegments, sortRicePapadProducts, type ProductSegment, type RicePapadSegment } from "@/data/products";
import { ProductCard } from "@/components/product-card";

const filterOptions: Array<{ value: ProductSegment; label: string }> = [
  { value: "Papad", label: "Papad" },
  { value: "Coin Papad", label: "Coin Papad" },
  { value: "Mathiya", label: "Mathiya" },
  { value: "Chorafali", label: "Chorafali" },
  { value: "Rice Papad / Khichiya Papad", label: "Rice / Khichiya Papad" }
];
const riceFilterLabels: Array<RicePapadSegment | "All"> = ["All", ...ricePapadSegments];

export function ProductExplorer({ qrMode = false }: { qrMode?: boolean }) {
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState<ProductSegment | "All">("All");
  const [riceSegment, setRiceSegment] = useState<RicePapadSegment | "All">("All");
  const showRiceFilters = segment === "Rice Papad / Khichiya Papad";

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const selectedSegment = productSegments.find((item) => item.name === segment);
    const filteredProducts = products.filter((product) => {
      const matchesSegment = segment === "All" || selectedSegment?.categories.includes(product.category);
      const productRiceSegment = getRicePapadSegmentForProduct(product);
      const matchesRiceSegment = !showRiceFilters || riceSegment === "All" || productRiceSegment === riceSegment;
      const haystack = [product.name, product.category, productRiceSegment, product.weight.join(" ")].filter(Boolean).join(" ").toLowerCase();
      return matchesSegment && matchesRiceSegment && (!normalized || haystack.includes(normalized));
    });

    return showRiceFilters ? sortRicePapadProducts(filteredProducts) : filteredProducts;
  }, [query, riceSegment, segment, showRiceFilters]);

  function selectSegment(item: ProductSegment | "All") {
    setSegment(item);
    if (item !== "Rice Papad / Khichiya Papad") setRiceSegment("All");
  }

  return (
    <section id="products" className="bg-cream py-20 dark:bg-[#151914]">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-leaf dark:text-[#b9d58f]">Our Signature Range</p>
            <h2 className="mt-3 font-serif text-4xl font-black text-cacao dark:text-cream md:text-5xl">Our Products</h2>
          </div>
          <div className="glass flex min-h-14 items-center gap-3 rounded-full px-5">
            <Search size={18} className="text-leaf" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              className="w-full bg-transparent text-sm font-semibold text-cacao outline-none placeholder:text-cacao/55 dark:text-cream dark:placeholder:text-cream/70 md:w-64"
            />
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-leaf shadow-sm dark:bg-[#253126]" aria-hidden="true">
            <SlidersHorizontal size={17} />
          </span>
          {filterOptions.map((item) => (
            <motion.button
              key={item.value}
              type="button"
              onClick={() => selectSegment(item.value)}
              whileTap={{ scale: 0.95 }}
              className={`relative shrink-0 rounded-full px-5 py-3 text-sm font-black transition ${
                segment === item.value
                  ? "bg-leaf text-white shadow-soft"
                  : "bg-white/70 text-cacao hover:bg-white dark:bg-[#253126] dark:text-cream dark:hover:bg-[#30402f]"
              }`}
            >
              {item.label}
            </motion.button>
          ))}
        </div>
        {showRiceFilters ? (
          <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2">
            <span className="shrink-0 text-sm font-black uppercase tracking-[0.16em] text-cacao/65 dark:text-[#f8f0dc]">Rice Size</span>
            {riceFilterLabels.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRiceSegment(item)}
                className={`shrink-0 rounded-full px-5 py-3 text-sm font-black transition ${
                  riceSegment === item
                    ? "bg-saffron text-cacao shadow-soft"
                    : "bg-white/70 text-cacao hover:bg-white dark:bg-[#253126] dark:text-cream dark:hover:bg-[#30402f]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        ) : null}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, index) => (
              <motion.div key={product.id} layout initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.97 }} transition={{ duration: 0.35, delay: Math.min(index * 0.035, 0.2) }}>
                <ProductCard product={product} highlighted={qrMode && product.featured} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {filtered.length === 0 ? (
          <div className="mt-10 rounded-[8px] border border-dashed border-leaf/30 bg-white/60 p-10 text-center font-bold text-cacao/75 dark:bg-[#202a21] dark:text-[#f8f0dc]">
            No products match this search.
          </div>
        ) : null}
      </div>
    </section>
  );
}
