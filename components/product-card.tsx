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
      className={`group overflow-hidden rounded-[8px] border bg-white/74 shadow-soft backdrop-blur transition hover:shadow-lg dark:border-white/16 dark:bg-[#202a21] ${
        highlighted ? "border-saffron ring-4 ring-saffron/24" : "border-white/70"
      }`}
    >
      <Link href={`/products/${product.slug}`} className="block h-full cursor-pointer">
        <div className="relative aspect-[4/3] overflow-hidden bg-cream/70 p-3">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain transition duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf dark:text-[#b9d58f]">
                {product.category}
              </p>
              <h3 className="mt-2 text-xl font-black text-cacao transition group-hover:text-leaf dark:text-cream dark:group-hover:text-[#b9d58f]">
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
          <p className="mt-3 min-h-12 text-sm leading-6 text-cacao/70 dark:text-[#f8f0dc]">{product.description}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <span className="inline-flex items-center justify-center gap-2 rounded-full border border-leaf/30 px-4 py-3 text-sm font-black text-leaf transition group-hover:bg-leaf group-hover:text-white dark:border-[#b9d58f]/45 dark:bg-[#263528] dark:text-[#d9efad] dark:group-hover:bg-[#b9d58f] dark:group-hover:text-cacao">
              <Eye size={16} />
              View
            </span>
            <span className="inline-flex items-center justify-center gap-2 rounded-full bg-leaf px-4 py-3 text-sm font-black text-white transition group-hover:bg-cacao dark:bg-[#c5e69b] dark:text-[#172117] dark:group-hover:bg-white">
              <ShoppingBag size={16} />
              Details
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
