"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export function QrExperience({ enabled }: { enabled: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    setVisible(true);
    const scrollTimer = window.setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1100);
    const hideTimer = window.setTimeout(() => setVisible(false), 5200);
    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(hideTimer);
    };
  }, [enabled]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.96 }}
          className="fixed bottom-5 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-full bg-leaf px-5 py-4 text-sm font-black text-white shadow-soft"
        >
          <Sparkles size={18} />
          Welcome to Aaswad Papad
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
