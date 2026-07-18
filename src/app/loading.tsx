export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white bg-opacity-90 backdrop-blur-sm flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Spinning Horse Logo */}
        <img 
          src="/logo/agora-white.png" 
          alt="جاري التحميل..." 
          className="w-20 h-20 object-contain invert animate-spin" 
        />
      </div>
      <h2 className="mt-6 text-xl font-black text-black animate-pulse tracking-wider">
        جاري التحميل...
      </h2>
    </div>
  );
}
