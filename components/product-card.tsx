"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/data/products";

export function ProductCard({ product, highlighted }: { product: Product; highlighted?: boolean }) {
  const [broken, setBroken] = useState(false);

  function breakPapad() {
    if (broken) return;
    setBroken(true);
    window.setTimeout(() => setBroken(false), 720);
  }

  return (
    <motion.article
      layout
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`group overflow-hidden rounded-[8px] border bg-white/74 shadow-soft backdrop-blur transition dark:border-white/16 dark:bg-[#202a21] ${
        highlighted ? "border-saffron ring-4 ring-saffron/24" : "border-white/70"
      }`}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={`Break ${product.name}`}
        onClick={breakPapad}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            breakPapad();
          }
        }}
        className="relative aspect-[4/3] cursor-pointer overflow-hidden bg-cream/70 p-3 outline-none focus-visible:ring-4 focus-visible:ring-saffron/60"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-contain transition duration-200 group-hover:scale-[1.02] ${broken ? "opacity-0" : "opacity-100"}`}
        />
        <AnimatePresence>
          {broken ? (
            <>
              <motion.div
                initial={{ x: 0, rotate: 0, opacity: 1 }}
                animate={{ x: -28, rotate: -8, opacity: 0 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              >
                <Image src={product.image} alt="" fill sizes="33vw" className="object-contain" />
              </motion.div>
              <motion.div
                initial={{ x: 0, rotate: 0, opacity: 1 }}
                animate={{ x: 28, rotate: 8, opacity: 0 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
                style={{ clipPath: "inset(0 0 0 50%)" }}
              >
                <Image src={product.image} alt="" fill sizes="33vw" className="object-contain" />
              </motion.div>
              {["left-1/2 top-1/2", "left-[42%] top-[38%]", "left-[58%] top-[60%]"].map((position, index) => (
                <motion.span
                  key={position}
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{ x: index === 1 ? -20 : 18, y: index === 0 ? 22 : -18, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.02 }}
                  className={`absolute ${position} size-2 rounded-full bg-saffron shadow-sm`}
                />
              ))}
            </>
          ) : null}
        </AnimatePresence>
        <span className={`pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-cacao/80 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white transition duration-200 ${broken ? "opacity-0" : "opacity-0 group-hover:opacity-100"}`}>
          Tap to crack
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf dark:text-[#b9d58f]">
              {product.category}
            </p>
            <h3 className="mt-2 text-xl font-black text-cacao dark:text-cream">{product.name}</h3>
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
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-leaf/30 px-4 py-3 text-sm font-black text-leaf transition hover:bg-leaf hover:text-white dark:border-[#b9d58f]/45 dark:bg-[#263528] dark:text-[#d9efad]"
          >
            <Eye size={16} />
            View
          </Link>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-leaf px-4 py-3 text-sm font-black text-white transition hover:bg-cacao dark:bg-[#c5e69b] dark:text-[#172117]"
          >
            <ShoppingBag size={16} />
            Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
