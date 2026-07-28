"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#FAF6F0] p-4 text-center text-[#2A2118]">
        <div className="max-w-md rounded-2xl bg-white p-8 shadow-xl border border-black/10">
          <h1 className="font-serif text-3xl font-black text-[#2A2118]">
            System Exception
          </h1>
          <p className="mt-4 text-sm text-[#2A2118]/70">
            An internal server error occurred. Click below to reload the application.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2F5233] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#1E3520]"
          >
            <RefreshCw size={16} />
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
