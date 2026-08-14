"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, MessageCircle, Package, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const nav = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

const productLinks = [
  { href: "/products", label: "All Products", description: "Explore the complete range" },
  { href: "/categories/papad", label: "Papad", description: "Classic crispy varieties" },
  { href: "/categories/mathiya", label: "Mathiya", description: "Traditional Gujarati favourites" },
  { href: "/categories/chorafali", label: "Chorafali", description: "Festive, airy crunch" },
  { href: "/categories/rice-papad-khichiya-papad", label: "Rice Papad & Khichiya", description: "Our signature rice-based range" },
  { href: "/categories/coin-papad", label: "Coin Papad", description: "Small, crispy snack-size papads" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();
  const whatsapp = getWhatsAppUrl();

  const productsActive = pathname === "/products" || pathname.startsWith("/products/") || pathname.startsWith("/categories/");

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  function linkClasses(active: boolean) {
    return `rounded-full px-3.5 py-2 transition ${
      active
        ? "bg-saffron/30 text-leaf"
        : "text-cacao hover:bg-white hover:text-leaf"
    }`;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cacao/10 bg-[#f7f4ee]/94 backdrop-blur-xl">
      <div className="section-shell flex h-[76px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3.5" aria-label="Aaswad Papad home">
          <span className="relative size-12 overflow-hidden rounded-full border-2 border-white bg-cream shadow-soft">
            <Image
              src="/brand/aaswad-logo.png"
              alt=""
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-black uppercase tracking-[0.18em] text-leaf">
              Aaswad
            </span>
            <span className="block text-sm font-black uppercase tracking-[0.18em] text-leaf">Papad</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm font-black md:flex" aria-label="Primary navigation">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={linkClasses(pathname === "/")}>
            Home
          </Link>
          <div className="relative">
            <button
              type="button"
              aria-expanded={productsOpen}
              aria-haspopup="true"
              onClick={() => setProductsOpen((value) => !value)}
              className={`${linkClasses(productsActive)} inline-flex items-center gap-1.5`}
            >
              Products
              <ChevronDown size={15} className={`transition-transform ${productsOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {productsOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 top-12 z-50 w-80 rounded-2xl border border-leaf/10 bg-white/95 p-2 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-[#1b2119]/98"
                >
                  {productLinks.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setProductsOpen(false)}
                      className="group flex items-start gap-3 rounded-xl px-3 py-3 transition hover:bg-cream dark:hover:bg-white/10"
                    >
                      <span className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full ${index === 0 ? "bg-leaf text-white" : "bg-leaf/10 text-leaf dark:bg-white/10 dark:text-[#d5eba8]"}`}>
                        <Package size={15} />
                      </span>
                      <span>
                        <span className="block text-sm font-black text-cacao dark:text-cream">{item.label}</span>
                        <span className="mt-0.5 block text-xs font-semibold text-cacao/65 dark:text-[#dcebc2]">{item.description}</span>
                      </span>
                    </Link>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={linkClasses(pathname === item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-leaf px-5 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-cacao dark:bg-[#b9d58f] dark:text-cacao"
          >
            <MessageCircle size={16} />
            Contact Us
          </Link>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
            className="grid size-10 place-items-center rounded-full border border-leaf/25 bg-white/70 text-leaf shadow-sm dark:border-white/25 dark:bg-[#253126] dark:text-[#e5f5c2]"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="section-shell mb-4 rounded-[8px] border border-white/50 bg-white/88 p-3 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-[#1b2119]/92 md:hidden"
          >
            <nav className="grid gap-1" aria-label="Mobile navigation">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                aria-current={pathname === "/" ? "page" : undefined}
                className={`${linkClasses(pathname === "/")} rounded-xl px-4 py-3`}
              >
                Home
              </Link>
              <div className="rounded-xl bg-cream/60 p-2 dark:bg-white/5">
                <Link
                  href="/products"
                  onClick={() => setOpen(false)}
                  aria-current={productsActive ? "page" : undefined}
                  className={`${linkClasses(productsActive)} flex items-center gap-2 rounded-lg px-2 py-2.5`}
                >
                  <Package size={16} />
                  Products
                </Link>
                <div className="mt-1 grid gap-0.5 border-l border-leaf/20 pl-3 dark:border-white/15">
                  {productLinks.slice(1).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2 text-xs font-bold text-cacao/70 transition hover:bg-white hover:text-leaf dark:text-[#f8f0dc] dark:hover:bg-white/10 dark:hover:text-[#e5f5c2]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`${linkClasses(pathname === item.href)} rounded-xl px-4 py-3`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-white"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
