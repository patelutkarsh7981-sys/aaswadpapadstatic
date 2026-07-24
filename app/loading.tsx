export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-6 dark:bg-[#151914]">
      <div className="text-center">
        <div className="papad-loader" role="status" aria-label="Loading Aaswad Papad">
          <span className="papad-half papad-half-left" />
          <span className="papad-half papad-half-right" />
          <span className="papad-crumb papad-crumb-one" />
          <span className="papad-crumb papad-crumb-two" />
          <span className="papad-crumb papad-crumb-three" />
        </div>
        <p className="mt-6 text-xs font-black uppercase tracking-[0.25em] text-leaf dark:text-[#b9d58f]">Preparing something crisp</p>
      </div>
    </main>
  );
}
