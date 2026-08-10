"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

export function ProductCard({ product, highlighted }: { product: Product; highlighted?: boolean }) {
  return (
    <motion.article
      layout
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`group h-full overflow-hidden rounded-[1.25rem] border border-cacao/10 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-soft dark:border-white/16 dark:bg-[#202a21] ${
        highlighted ? "border-saffron ring-4 ring-saffron/24" : "border-white/70"
      }`}
    >
      <Link href={`/products/${product.slug}`} className="flex h-full cursor-pointer flex-col">
        <div className="relative aspect-square overflow-hidden bg-[#eee9df] p-5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-contain transition duration-300 group-hover:scale-105 ${["puri-papad", "flat-khichiya-papad"].includes(product.slug) ? "scale-[1.65] group-hover:scale-[1.75]" : ""}`}
          />
        </div>
        <div className="flex flex-1 flex-col p-5 max-sm:p-3.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf dark:text-[#b9d58f]">
                {product.category}
              </p>
              <h3 className="mt-2 text-lg font-black leading-tight text-cacao transition group-hover:text-leaf dark:text-cream dark:group-hover:text-[#b9d58f] max-sm:text-base">
                {product.name}
              </h3>
            </div>
            {product.featured ? (
              <span className="rounded-full bg-saffron/18 px-3 py-1 text-xs font-black text-cacao dark:text-cream">
                Featured
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-sm font-semibold text-cacao/75 dark:text-[#f8f0dc]">{product.weight.join(" / ")}</p>
          <p className="mt-3 min-h-12 flex-1 text-sm leading-6 text-cacao/70 dark:text-[#f8f0dc] max-sm:min-h-0 max-sm:text-xs max-sm:leading-5">{product.description}</p>
          <div className="mt-5 grid grid-cols-2 gap-3 max-sm:mt-4 max-sm:gap-1.5">
            <span className="inline-flex items-center justify-center gap-2 rounded-full border border-leaf/30 px-4 py-3 text-sm font-black text-leaf transition group-hover:bg-leaf group-hover:text-white dark:border-[#b9d58f]/45 dark:bg-[#263528] dark:text-[#d9efad] dark:group-hover:bg-[#b9d58f] dark:group-hover:text-cacao max-sm:gap-1 max-sm:px-1.5 max-sm:py-2 max-sm:text-[10px]">
              <Eye size={16} />
              View
            </span>
            <span className="inline-flex items-center justify-center gap-2 rounded-full bg-leaf px-4 py-3 text-sm font-black text-white transition group-hover:bg-cacao dark:bg-[#c5e69b] dark:text-[#172117] dark:group-hover:bg-white max-sm:gap-1 max-sm:px-1.5 max-sm:py-2 max-sm:text-[10px]">
              <ShoppingBag size={16} />
              Details
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
