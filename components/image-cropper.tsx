"use client";

import Cropper, { type Area, type Point } from "react-easy-crop";
import { Check, ImagePlus, RotateCcw, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  compressImage,
  getCroppedImageBlob,
  readFileAsDataUrl,
  uploadImage,
  validateImage,
  type UploadedImage
} from "@/lib/image-upload";

type ImageCropperProps = {
  aspect?: number;
  onUploaded?: (image: UploadedImage) => void;
};

export function ImageCropper({ aspect = 1, onUploaded }: ImageCropperProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState("");
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [cropArea, setCropArea] = useState<Area | null>(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);

  const uploadLabel = useMemo(() => {
    if (isUploading) return "Uploading...";
    if (imageSrc) return "Crop and upload";
    return "Choose image";
  }, [imageSrc, isUploading]);

  const reset = useCallback(() => {
    setSelectedFile(null);
    setImageSrc("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCropArea(null);
    setError("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, []);

  const handleSelect = async (file: File | undefined) => {
    if (!file) return;

    const validation = validateImage(file);
    if (!validation.valid) {
      setError(validation.error || "Select a different image.");
      return;
    }

    try {
      setError("");
      setUploadedImage(null);
      const compressed = await compressImage(file);
      setSelectedFile(compressed);
      setImageSrc(await readFileAsDataUrl(compressed));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not prepare that image.");
    }
  };

  const handleCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCropArea(croppedAreaPixels);
  }, []);

  const handleUpload = async () => {
    if (!selectedFile || !imageSrc || !cropArea) {
      inputRef.current?.click();
      return;
    }

    try {
      setIsUploading(true);
      setError("");
      const blob = await getCroppedImageBlob(imageSrc, cropArea, rotation);
      const result = await uploadImage(blob, selectedFile.name);
      setUploadedImage(result);
      onUploaded?.(result);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-[8px] border border-white/70 bg-white/82 shadow-soft dark:border-white/18 dark:bg-[#202a21]">
      <div className="border-b border-cacao/10 p-5 dark:border-white/10">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf dark:text-[#b9d58f]">Image Upload</p>
        <h2 className="mt-2 font-serif text-3xl font-black text-cacao dark:text-cream">Crop Product Image</h2>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="relative aspect-square min-h-[320px] overflow-hidden rounded-[8px] bg-cacao/8 dark:bg-black/24">
          {imageSrc ? (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onCropChange={setCrop}
              onCropComplete={handleCropComplete}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              showGrid
            />
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex size-full flex-col items-center justify-center gap-4 text-cacao/72 transition hover:bg-white/40 dark:text-cream/84 dark:hover:bg-white/10"
            >
              <span className="inline-flex size-16 items-center justify-center rounded-full bg-leaf text-white">
                <ImagePlus size={26} />
              </span>
              <span className="text-sm font-black">Select JPEG, PNG, WebP, or GIF</span>
            </button>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            onChange={(event) => handleSelect(event.target.files?.[0])}
          />

          <div className="grid gap-3">
            <button
              type="button"
              onClick={imageSrc ? handleUpload : () => inputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-leaf px-5 py-3 text-sm font-black text-white transition hover:bg-cacao disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#b9d58f] dark:text-cacao"
            >
              {imageSrc ? <Upload size={17} /> : <ImagePlus size={17} />}
              {uploadLabel}
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-leaf/25 px-5 py-3 text-sm font-black text-leaf transition hover:bg-leaf hover:text-white dark:border-[#b9d58f]/45 dark:bg-[#263528] dark:text-[#d9efad]"
            >
              <ImagePlus size={17} />
              Replace image
            </button>
          </div>

          {imageSrc ? (
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm font-black text-cacao dark:text-cream">
                Zoom
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  onChange={(event) => setZoom(Number(event.target.value))}
                  className="accent-leaf"
                />
              </label>
              <label className="grid gap-2 text-sm font-black text-cacao dark:text-cream">
                Rotation
                <input
                  type="range"
                  min={0}
                  max={360}
                  step={1}
                  value={rotation}
                  onChange={(event) => setRotation(Number(event.target.value))}
                  className="accent-leaf"
                />
              </label>
              <button
                type="button"
                onClick={() => setRotation((value) => (value + 90) % 360)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-saffron/20 px-4 py-2 text-sm font-black text-cacao transition hover:bg-saffron/34 dark:text-cream"
              >
                <RotateCcw size={16} />
                Rotate 90
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-cacao/8 px-4 py-2 text-sm font-black text-cacao transition hover:bg-cacao/14 dark:bg-[#253126] dark:text-cream"
              >
                <X size={16} />
                Clear
              </button>
            </div>
          ) : null}

          {error ? (
            <p className="rounded-[8px] border border-red-500/25 bg-red-500/10 p-3 text-sm font-bold text-red-700 dark:text-red-200">
              {error}
            </p>
          ) : null}

          {uploadedImage ? (
            <div className="rounded-[8px] border border-leaf/20 bg-leaf/8 p-4">
              <div className="flex items-center gap-2 text-sm font-black text-leaf dark:text-[#b9d58f]">
                <Check size={16} />
                Uploaded
              </div>
              <div className="relative mt-3 aspect-square overflow-hidden rounded-[8px] bg-white">
                <Image src={uploadedImage.url} alt="Uploaded crop preview" fill sizes="320px" className="object-contain" />
              </div>
              <p className="mt-3 break-all text-xs font-bold text-cacao/72 dark:text-cream/82">{uploadedImage.url}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
