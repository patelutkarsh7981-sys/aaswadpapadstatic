import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductExplorer } from "@/components/product-explorer";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore every Aaswad Papad product, including papad, rice papad, khichiya papad, mathiya, and chorafali.",
  alternates: {
    canonical: "/products"
  }
};

export default function ProductsPage() {
  return (
    <main className="bg-cream pt-28 dark:bg-[#151914]">
      <section className="section-shell">
        <Breadcrumbs items={[{ label: "Products" }]} />
      </section>
      <ProductExplorer />
    </main>
  );
}
