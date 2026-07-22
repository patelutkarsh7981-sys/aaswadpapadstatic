import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  const parent = items.length > 1 && items[0].href ? items[0] : { href: "/", label: "Home" };

  return (
    <nav aria-label="Back navigation">
      <Link
        href={parent.href ?? "/"}
        aria-label={`Back to ${parent.label}`}
        title={`Back to ${parent.label}`}
        className="inline-flex size-11 items-center justify-center rounded-full border border-leaf/20 bg-white/60 text-cacao/75 transition hover:-translate-x-0.5 hover:border-leaf hover:text-leaf dark:border-white/25 dark:bg-[#253126] dark:text-[#f8f0dc] dark:hover:border-[#b9d58f] dark:hover:text-[#d9efad]"
      >
        <ArrowLeft size={16} />
      </Link>
    </nav>
  );
}
