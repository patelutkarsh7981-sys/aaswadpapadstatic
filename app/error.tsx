"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-4 pt-28 pb-16 text-center dark:bg-[#151914]">
      <div className="glass max-w-md rounded-2xl p-8 shadow-soft border border-white/60 dark:border-white/10 dark:bg-[#1b2119]">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400">
          <AlertTriangle size={28} />
        </div>
        <h1 className="mt-5 font-serif text-2xl font-black text-cacao dark:text-cream">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm text-cacao/75 dark:text-cream/75">
          We encountered an unexpected error while loading this page. Please try refreshing or return home.
        </p>
        {error?.digest && (
          <p className="mt-2 text-xs font-mono text-cacao/50 dark:text-cream/50">
            Error ID: {error.digest}
          </p>
        )}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-leaf px-5 py-2.5 text-sm font-black text-white transition hover:bg-cacao dark:bg-[#b9d58f] dark:text-cacao dark:hover:bg-white"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-leaf/30 px-5 py-2.5 text-sm font-black text-leaf transition hover:bg-leaf/10 dark:border-white/20 dark:text-[#d9efad] dark:hover:bg-white/10"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
