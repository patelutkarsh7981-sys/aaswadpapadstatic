import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep generated files outside OneDrive. OneDrive cloud placeholders make
  // Node's readlink() fail when Next.js loads its server manifests.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async headers() {
    const scriptPolicy = process.env.NODE_ENV === "development" ? "'self' 'unsafe-inline' 'unsafe-eval'" : "'self' 'unsafe-inline'";
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          {
            key: "Content-Security-Policy",
            value:
              `default-src 'self'; img-src 'self' data: blob: https:; script-src ${scriptPolicy}; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`
          }
        ]
      }
    ];
  }
};

export default nextConfig;
