"use client";

import imageCompression from "browser-image-compression";
import type { Area } from "react-easy-crop";

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export type ImageValidationResult = {
  valid: boolean;
  error?: string;
};

export type UploadedImage = {
  url: string;
  filename: string;
  size: number;
};

export function validateImage(file: File): ImageValidationResult {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { valid: false, error: "Use a JPEG, PNG, WebP, or GIF image." };
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return { valid: false, error: "Image must be 5MB or smaller." };
  }

  return { valid: true };
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result)));
    reader.addEventListener("error", () => reject(new Error("Could not read the selected image.")));
    reader.readAsDataURL(file);
  });
}

export async function compressImage(file: File): Promise<File> {
  return imageCompression(file, {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1800,
    useWebWorker: true,
    initialQuality: 0.82
  });
}

export async function getCroppedImageBlob(imageSrc: string, cropArea: Area, rotation = 0): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Your browser could not prepare the cropped image.");
  }

  const radians = (rotation * Math.PI) / 180;
  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));
  const boundingWidth = image.width * cos + image.height * sin;
  const boundingHeight = image.width * sin + image.height * cos;

  canvas.width = Math.round(cropArea.width);
  canvas.height = Math.round(cropArea.height);

  context.translate(-cropArea.x, -cropArea.y);
  context.translate(boundingWidth / 2, boundingHeight / 2);
  context.rotate(radians);
  context.translate(-image.width / 2, -image.height / 2);
  context.drawImage(image, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }

        reject(new Error("Could not export the cropped image."));
      },
      "image/webp",
      0.88
    );
  });
}

export async function uploadImage(blob: Blob, filename: string): Promise<UploadedImage> {
  const formData = new FormData();
  formData.append("file", blob, toWebpFilename(filename));

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData
  });

  const payload = (await response.json()) as UploadedImage | { error?: string };

  if (!response.ok || !("url" in payload)) {
    const message = "error" in payload ? payload.error : undefined;
    throw new Error(message || "Upload failed.");
  }

  return payload;
}

function createImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", () => reject(new Error("Could not load the selected image.")));
    image.crossOrigin = "anonymous";
    image.src = src;
  });
}

function toWebpFilename(filename: string) {
  return filename.replace(/\.[^.]+$/, "") + ".webp";
}
