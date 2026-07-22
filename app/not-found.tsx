import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-cream px-4 pb-20 pt-32 dark:bg-[#151914]">
      <section className="section-shell text-center">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-leaf dark:text-[#b9d58f]">Page not found</p>
        <h1 className="mt-4 font-serif text-5xl font-black text-cacao dark:text-cream md:text-6xl">
          This page is not available
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-cacao/70 dark:text-cream/70">
          Explore Aaswad products or return home to continue browsing.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-leaf px-6 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-cacao dark:bg-[#b9d58f] dark:text-cacao"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="rounded-full border border-leaf/25 px-6 py-3 text-sm font-black text-leaf transition hover:-translate-y-0.5 hover:border-leaf dark:border-[#b9d58f]/45 dark:bg-[#253126] dark:text-[#d9efad]"
          >
            Products
          </Link>
        </div>
      </section>
    </main>
  );
}
