"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      title="Scroll to top"
      className="fixed bottom-24 right-5 z-[70] grid size-11 place-items-center rounded-full border border-leaf/20 bg-white/90 text-leaf shadow-soft backdrop-blur transition hover:-translate-y-1 hover:bg-leaf hover:text-white dark:border-white/25 dark:bg-[#253126] dark:text-[#e5f5c2]"
    >
      <ArrowUp size={19} />
    </button>
  );
}
