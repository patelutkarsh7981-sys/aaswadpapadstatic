import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "@/components/product-card";
import { getRicePapadSegmentForProduct, productSegments, products, ricePapadSegments, segmentToSlug, sortRicePapadProducts } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productSegments.map((segment) => ({ slug: segmentToSlug(segment.name) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const segment = productSegments.find((item) => segmentToSlug(item.name) === slug);
  if (!segment) return {};
  return {
    title: segment.name,
    description: `Explore Aaswad Papad's ${segment.name} range, including authentic Gujarati snacks from Nadiad.`,
    keywords: [segment.name, "Aaswad Papad", "Gujarati snacks", "Nadiad"],
    alternates: {
      canonical: `/categories/${slug}`
    }
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const segment = productSegments.find((item) => segmentToSlug(item.name) === slug);
  if (!segment) notFound();

  const categoryProducts = products.filter((product) => segment.categories.includes(product.category));
  const isRicePapadSegment = segment.name === "Rice Papad / Khichiya Papad";

  return (
    <main className="bg-cream pt-28 dark:bg-[#151914]">
      <section className="section-shell pb-20">
        <Breadcrumbs items={[{ label: segment.name }]} />
        <div className="mt-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-leaf dark:text-[#b9d58f]">Segment</p>
          <h1 className="mt-3 font-serif text-5xl font-black text-cacao dark:text-cream">{segment.name}</h1>
          <p className="mt-4 max-w-2xl text-cacao/70 dark:text-cream/70">
            Products in this segment, ready for customers scanning the QR code from Aaswad packaging.
          </p>
        </div>
        {isRicePapadSegment ? (
          <div className="mt-10 grid gap-12">
            {ricePapadSegments.map((riceSegment) => {
              const segmentProducts = sortRicePapadProducts(categoryProducts.filter((product) => getRicePapadSegmentForProduct(product) === riceSegment));
              if (!segmentProducts.length) return null;

              return (
                <section key={riceSegment}>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf dark:text-[#b9d58f]">Rice Papad Segment</p>
                    <h2 className="mt-2 font-serif text-3xl font-black text-cacao dark:text-cream">{riceSegment}</h2>
                  </div>
                  <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {segmentProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
