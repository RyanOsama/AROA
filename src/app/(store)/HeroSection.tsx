'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection({ products, stats }: { products?: any[], stats?: any }) {
  const displayProducts = (products || []).slice(0, 4);

  const scrollToBestSellers = () => {
    document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden" style={{ minHeight: '94vh', background: '#050505' }}>

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '-10%', left: '-5%',
          width: '55vw', height: '55vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)', animation: 'pulseOrb 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-5%', right: '-5%',
          width: '45vw', height: '45vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          filter: 'blur(70px)', animation: 'pulseOrb 12s ease-in-out infinite',
        }} />
      </div>

      <div className="absolute pointer-events-none" style={{
        top: '50%', left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
        zIndex: 1,
      }} />

      <div className="container mx-auto px-6 relative flex items-center h-full z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full py-20 md:py-28">

          {/* LEFT: Text */}
          <div className="text-center md:text-right order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-[0.2em] mb-6"
              style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.6)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#ffffff' }} />
              المجموعة الحصرية
            </div>

            <p className="text-sm font-bold tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
              ترحيب بك في عالمنا
            </p>

            <h1 className="font-black leading-[1.1] mb-5" style={{ fontSize: 'clamp(2.5rem,6vw,4.8rem)', color: '#ffffff' }}>
              قوة <br />
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>الحضور</span>
            </h1>

            <p className="leading-relaxed mb-8 max-w-sm mx-auto md:mr-auto md:ml-0 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
              اكتشف مجموعتنا الفاخرة من العطور المصممة خصيصاً لتعكس شخصيتك الفريدة وتترك أثراً لا يُنسى.
            </p>

            {stats && (
              <div className="flex items-center gap-6 justify-center md:justify-end mb-8">
                <div className="text-center">
                  <div className="text-2xl font-black" style={{ color: '#ffffff' }}>{stats.products}+</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>عطر</div>
                </div>
                <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.1)' }} />
                <div className="text-center">
                  <div className="text-2xl font-black" style={{ color: '#ffffff' }}>{stats.brands}+</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>ماركة</div>
                </div>
                <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.1)' }} />
                <div className="text-center">
                  <div className="text-2xl font-black" style={{ color: '#ffffff' }}>{stats.clients}+</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>عميل</div>
                </div>
              </div>
            )}

            <button
              onClick={scrollToBestSellers}
              className="group relative px-10 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105 overflow-hidden"
              style={{ background: '#ffffff', color: '#000000', boxShadow: '0 0 30px rgba(255,255,255,0.15)' }}
            >
              <span className="relative z-10">تسوق الآن ←</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: '#f0f0f0' }} />
            </button>
          </div>

          {/* RIGHT: Orbital Ferris Wheel */}
          <div className="order-1 md:order-2 relative flex justify-center items-center" style={{ height: '650px' }}>

            {/* Static Logo in center */}
            <div className="absolute z-0 flex items-center justify-center">
              <div className="absolute w-[150px] h-[150px] bg-white/5 rounded-full blur-3xl animate-pulse" />
              <div className="relative w-28 h-28 md:w-40 md:h-40 z-10">
                <Image src="/logo/agora-white.png" alt="AROA Logo" fill className="object-contain opacity-90 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]" />
              </div>
            </div>

            {/* Inner decorative ring */}
            <div className="absolute w-[260px] h-[260px] md:w-[380px] md:h-[380px] rounded-full border border-white/5 flex items-center justify-center z-0"
              style={{ animation: 'reverse-spin-slow 40s linear infinite' }}>
              <div className="absolute top-0 w-1.5 h-1.5 bg-white/40 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              <div className="absolute bottom-0 w-2 h-2 bg-white/10 rounded-full" />
              <div className="absolute left-0 w-1 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Outer ring — carries perfumes */}
            <div className="relative w-[340px] h-[340px] md:w-[520px] md:h-[520px] rounded-full border border-white/10 flex items-center justify-center z-10 shadow-[inset_0_0_50px_rgba(255,255,255,0.02)]"
              style={{ animation: 'spin-slow 45s linear infinite' }}>

              {displayProducts.map((p, index) => {
                let positionClasses = "";
                if (index === 0) positionClasses = "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2";
                else if (index === 1) positionClasses = "right-0 top-1/2 -translate-y-1/2 translate-x-1/2";
                else if (index === 2) positionClasses = "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2";
                else if (index === 3) positionClasses = "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2";

                return (
                  <div key={p.id} className={`absolute z-20 ${positionClasses}`}>
                    <div style={{ animation: 'reverse-spin-slow 45s linear infinite' }}>
                      <Link
                        href={`/product/${p.id}`}
                        className="relative block w-24 h-32 md:w-36 md:h-48 group transition-all duration-500 hover:scale-125 hover:-translate-y-2"
                      >
                        <Image
                          src={p.imageUrl}
                          alt={p.name}
                          fill
                          className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                        />
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 blur-2xl rounded-full transition-opacity duration-500" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes pulseOrb {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 1; }
          50% { transform: scale(1.08) translate(2%, 2%); opacity: 0.85; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  );
}
