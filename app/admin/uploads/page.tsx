import { ImageCropper } from "@/components/image-cropper";

export const metadata = {
  title: "Image Upload | Aaswad Papad",
  robots: {
    index: false,
    follow: false
  }
};

export default function UploadsPage() {
  return (
    <main className="min-h-screen bg-cream py-16 dark:bg-[#151914]">
      <div className="section-shell">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-leaf dark:text-[#b9d58f]">Admin Utility</p>
          <h1 className="mt-3 font-serif text-4xl font-black text-cacao dark:text-cream md:text-5xl">Product Image Cropper</h1>
          <p className="mt-3 text-cacao/76 dark:text-cream/82">
            Crop and optimize product images, then save them into the site&apos;s local upload folder.
          </p>
        </div>
        <ImageCropper />
      </div>
    </main>
  );
}
