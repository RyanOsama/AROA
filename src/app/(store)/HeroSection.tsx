'use client';

import { useState } from 'react';
import Image from 'next/image';
import ProductModal from '@/components/ProductModal';

type HeroProduct = {
  id: string;
  name: string;
  description: string | null;
  price: any;
  originalPrice: any;
  imageUrl: string | null;
  isAvailable: boolean;
  topNotes: string | null;
  heartNotes: string | null;
  baseNotes: string | null;
  originCountry: string | null;
  gender: string | null;
  size: string | null;
  perfumeType: string | null;
};

const floatClasses = ['float-1', 'float-2', 'float-3', 'float-4', 'float-5'];

// Positions for floating bottles
const positions = [
  { style: { left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 5 }, size: 'large' },
  { style: { right: '-5%', top: '5%', zIndex: 3 }, size: 'medium' },
  { style: { left: '-5%', top: '15%', zIndex: 2 }, size: 'medium' },
  { style: { right: '5%', bottom: '0%', zIndex: 4 }, size: 'small' },
  { style: { left: '10%', bottom: '-5%', zIndex: 3 }, size: 'small' },
];

const sizeMap = {
  large: { w: 120, h: 200 },
  medium: { w: 80, h: 130 },
  small: { w: 60, h: 100 },
};

export default function HeroSection({ 
  products, 
  stats = { products: 50, brands: 10, clients: 120 } 
}: { 
  products: HeroProduct[], 
  stats?: { products: number, brands: number, clients: number } 
}) {
  const [selectedProduct, setSelectedProduct] = useState<HeroProduct | null>(null);

  const openModal = (product: HeroProduct) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <>
      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={{
            id: selectedProduct.id,
            name: selectedProduct.name,
            description: selectedProduct.description,
            price: Number(selectedProduct.price),
            originalPrice: selectedProduct.originalPrice ? Number(selectedProduct.originalPrice) : null,
            imageUrl: selectedProduct.imageUrl,
            isAvailable: selectedProduct.isAvailable,
            topNotes: selectedProduct.topNotes,
            heartNotes: selectedProduct.heartNotes,
            baseNotes: selectedProduct.baseNotes,
            originCountry: selectedProduct.originCountry,
            gender: selectedProduct.gender,
            size: selectedProduct.size,
            perfumeType: selectedProduct.perfumeType,
          }}
          onClose={closeModal}
        />
      )}

      {/* ===== HERO SECTION ===== */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: '92vh',
          background: 'linear-gradient(145deg, #F5EFE6 0%, #EDE3D6 40%, #E8DDCC 70%, #F0E8DA 100%)',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute top-[-80px] right-[-80px] w-[450px] h-[450px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #1B2A4A, transparent)' }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-[350px] h-[350px] rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #C9A96E, transparent)' }} />

        {/* Grid dots */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #1B2A4A 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container mx-auto px-6 h-full flex items-center relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full py-24">

            {/* Left: Text */}
            <div className="text-center md:text-right order-1">
              <div className="fade-up-1 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-[0.25em] mb-8" style={{ backgroundColor: '#1B2A4A', color: '#C9A96E' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#C9A96E' }} />
                مجموعة حصرية ٢٠٢٥
              </div>

              <h1 className="fade-up-2 font-black leading-[1.1] tracking-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#1B2A4A' }}>
                اكتشف
                <br />
                <span style={{ color: '#8B7355', fontStyle: 'italic' }}>روحك</span>
                <br />
                في عطر
              </h1>

              <p className="fade-up-3 text-lg leading-relaxed mb-10 max-w-md mx-auto md:mr-auto md:ml-0" style={{ color: '#6B5B45' }}>
                تشكيلة فاخرة من أرقى العطور العالمية، مصممة خصيصاً لمن يسعى إلى التميّز في كل لحظة.
              </p>

              <div className="fade-up-4 flex items-center justify-center md:justify-end flex-wrap gap-4">
                <a
                  href="#best-sellers"
                  className="btn-shimmer px-10 py-4 rounded-full font-bold text-sm tracking-wide text-white shadow-xl hover:scale-105 transition-transform"
                >
                  تسوّق الآن
                </a>
              </div>

              {/* Stats */}
              <div className="fade-up-4 flex gap-8 mt-14 justify-center md:justify-end">
                {[
                  { num: `+${stats.products}`, label: 'منتج' },
                  { num: `+${stats.brands}`, label: 'شركة' },
                  { num: `+${stats.clients}`, label: 'عميل' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center md:text-right">
                    <p className="text-3xl font-black" style={{ color: '#1B2A4A' }}>{stat.num}</p>
                    <p className="text-xs tracking-widest" style={{ color: '#8B7355' }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Real Floating Product Images */}
            <div className="scale-in order-2 relative flex items-center justify-center min-h-[350px] md:min-h-[460px]">
              {/* Glow behind */}
              <div
                className="absolute inset-0 rounded-full blur-[80px] opacity-25"
                style={{ background: 'radial-gradient(circle, #C9A96E 0%, transparent 70%)' }}
              />
              {/* Decorative rings */}
              <div className="absolute w-[300px] h-[300px] rounded-full border opacity-20" style={{ borderColor: '#1B2A4A' }} />
              <div className="absolute w-[400px] h-[400px] rounded-full border opacity-10" style={{ borderColor: '#1B2A4A' }} />

              <div className="relative w-[300px] h-[350px] md:w-[380px] md:h-[420px] scale-75 md:scale-100 origin-center">
                {products.slice(0, 5).map((product, idx) => {
                  const pos = positions[idx];
                  const sz = sizeMap[pos.size as keyof typeof sizeMap];
                  const floatClass = floatClasses[idx];

                  return (
                    <button
                      key={product.id}
                      onClick={() => openModal(product)}
                      className={`${floatClass} absolute group cursor-pointer ${pos.size === 'small' ? 'hidden md:block' : ''}`}
                      style={pos.style}
                      title={product.name}
                    >
                      <div
                        className="relative rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl"
                        style={{ width: sz.w, height: sz.h }}
                      >
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-contain mix-blend-multiply drop-shadow-xl"
                            unoptimized
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center font-serif font-black text-sm"
                            style={{
                              background: 'linear-gradient(145deg, #1B2A4A, #2D4172)',
                              color: '#C9A96E',
                            }}
                          >
                            {product.name.substring(0, 2)}
                          </div>
                        )}
                        {/* Hover label */}
                        <div
                          className="absolute inset-0 flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                          style={{ background: 'linear-gradient(to top, rgba(27,42,74,0.8), transparent)' }}
                        >
                          <span className="text-[10px] font-bold text-center px-1 line-clamp-1" style={{ color: '#C9A96E' }}>
                            {product.name}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* Fallback if no products */}
                {products.length === 0 && (
                  <div className="float-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-28 h-48 rounded-2xl flex items-center justify-center font-serif font-black text-2xl" style={{ background: 'linear-gradient(145deg, #1B2A4A, #2D4172)', color: '#C9A96E' }}>A</div>
                  </div>
                )}

                {/* Sparkles */}
                <div className="absolute top-12 left-1/3 w-2 h-2 rounded-full opacity-60 animate-pulse" style={{ backgroundColor: '#C9A96E' }} />
                <div className="absolute bottom-20 right-1/4 w-1.5 h-1.5 rounded-full opacity-50 animate-pulse" style={{ backgroundColor: '#1B2A4A', animationDelay: '0.8s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F5EFE6" />
          </svg>
        </div>
      </section>
    </>
  );
}
