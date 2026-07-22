import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_REQUEST_SIZE = MAX_FILE_SIZE + 256 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif"
};
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 20;
const uploadAttempts = new Map<string, { count: number; resetAt: number }>();

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const rateLimit = checkRateLimit(request);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many upload attempts. Please try again later." },
        {
          status: 429,
          headers: {
            "Cache-Control": "no-store",
            "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000))
          }
        }
      );
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_REQUEST_SIZE) {
      return NextResponse.json({ error: "Upload request is too large." }, { status: 413, headers: { "Cache-Control": "no-store" } });
    }

    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin && host && new URL(origin).host !== host) {
      return NextResponse.json({ error: "Cross-origin uploads are not allowed." }, { status: 403, headers: { "Cache-Control": "no-store" } });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Upload an image file." }, { status: 400, headers: { "Cache-Control": "no-store" } });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Only JPEG, PNG, WebP, and GIF images are allowed." }, { status: 415, headers: { "Cache-Control": "no-store" } });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Image must be 5MB or smaller." }, { status: 413, headers: { "Cache-Control": "no-store" } });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (!hasValidSignature(buffer, file.type)) {
      return NextResponse.json({ error: "The uploaded file does not match its image type." }, { status: 400, headers: { "Cache-Control": "no-store" } });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const extension = EXTENSIONS[file.type] || "img";
    const filename = `${crypto.randomUUID()}.${extension}`;
    await writeFile(path.join(uploadDir, filename), buffer);

    return NextResponse.json(
      {
        url: `/uploads/${filename}`,
        filename,
        size: file.size
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Image upload failed", error);
    return NextResponse.json({ error: "Could not upload image." }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}

function checkRateLimit(request: Request) {
  const now = Date.now();
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwardedFor || request.headers.get("x-real-ip") || "unknown-client";
  const current = uploadAttempts.get(key);

  if (!current || current.resetAt <= now) {
    const next = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
    uploadAttempts.set(key, next);
    return { allowed: true, resetAt: next.resetAt };
  }

  current.count += 1;
  return { allowed: current.count <= RATE_LIMIT_MAX, resetAt: current.resetAt };
}

function hasValidSignature(buffer: Buffer, mimeType: string) {
  if (buffer.length < 12) return false;

  if (mimeType === "image/jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  if (mimeType === "image/png") {
    return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }

  if (mimeType === "image/webp") {
    return buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP";
  }

  if (mimeType === "image/gif") {
    const header = buffer.subarray(0, 6).toString("ascii");
    return header === "GIF87a" || header === "GIF89a";
  }

  return false;
}
