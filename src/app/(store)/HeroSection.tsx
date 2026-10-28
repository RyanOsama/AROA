'use client';

import Link from 'next/link';
import { HeroSettingsData } from '@/actions/hero';

interface HeroSectionProps {
  heroSettings: HeroSettingsData;
}

export default function HeroSection({ heroSettings }: HeroSectionProps) {
  const linkedProduct = heroSettings.product;
  const productHref = linkedProduct?.id 
    ? `/product/${linkedProduct.id}` 
    : (heroSettings.productId ? `/product/${heroSettings.productId}` : '#brands');

  // Button coordinates
  const posY = heroSettings.buttonPosY ?? 80;
  const posX = heroSettings.buttonPosX ?? 50;

  // Button Color Styles
  const colorStyles: Record<string, string> = {
    white: 'bg-white text-zinc-950 hover:bg-zinc-100 shadow-[0_10px_35px_rgba(0,0,0,0.4)] border border-white/80',
    black: 'bg-zinc-950 text-white hover:bg-black shadow-[0_10px_35px_rgba(0,0,0,0.6)] border border-white/20',
    gold: 'bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 text-zinc-950 hover:opacity-95 shadow-[0_10px_35px_rgba(217,119,6,0.35)] font-black',
    glass: 'bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/30 shadow-[0_10px_35px_rgba(0,0,0,0.5)]',
  };

  // Button Size Styles
  const sizeStyles: Record<string, string> = {
    sm: 'px-5 py-2 text-xs md:text-sm',
    md: 'px-8 py-3 text-sm md:text-base',
    lg: 'px-11 py-3.5 text-base md:text-lg',
  };

  const selectedColor = colorStyles[heroSettings.buttonColor || 'glass'] || colorStyles.glass;
  const selectedSize = sizeStyles[heroSettings.buttonSize || 'sm'] || sizeStyles.sm;

  return (
    <section className="relative w-full overflow-hidden select-none bg-[#0a0a0a] p-0 m-0">
      
      {/* 1. Fully Proportional Banner (Zero Zoom, Zero Crop, 100% Full Width) */}
      <div className="relative w-full overflow-hidden">
        <img
          src={heroSettings.imageUrl || '/hero/featured-amber.png'}
          alt="عطر الموسم"
          className="w-full h-auto block select-none"
        />

        {/* 2. Interactive Precision Positioned Button (Calculated Exactly on Image Coordinates) */}
        <div 
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
          style={{
            top: `${posY}%`,
            left: `${posX}%`,
          }}
        >
          <Link
            href={productHref}
            className={`group inline-flex items-center gap-2.5 rounded-full font-bold tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 ${selectedColor} ${selectedSize}`}
          >
            <span>{heroSettings.buttonText || 'عرض العطر'}</span>
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 rotate-180" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

    </section>
  );
}
