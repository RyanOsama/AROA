'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductCarousel({ products }: { products: any[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      align: 'start', 
      loop: false, 
      direction: 'rtl',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 640px)': { slidesToScroll: 2 },
        '(min-width: 768px)': { slidesToScroll: 3 },
        '(min-width: 1024px)': { slidesToScroll: 4 }
      }
    }
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  if (!products || products.length === 0) {
    return <div className="text-center text-gray-500 py-12">لا توجد منتجات حالياً</div>;
  }

  return (
    <div className="relative group max-w-7xl mx-auto" dir="rtl">
      <div className="overflow-hidden py-4" ref={emblaRef}>
        <div className="flex -ml-4">
          {products.map((product) => {
            const originalPrice = product.originalPrice ? Number(product.originalPrice) : null;
            const currentPrice = Number(product.price);
            const discountPercentage = originalPrice && originalPrice > currentPrice
              ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
              : null;

            return (
              <div key={product.id} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] pl-4">
                <Link
                  href={`/product/${product.id}`}
                  className="flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 group relative"
                >
                  <div
                    className="relative w-full aspect-[4/5] flex items-center justify-center p-8 transition-colors duration-500 bg-white"
                  >
                    {discountPercentage && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold z-10 bg-black text-white">
                        خصم {discountPercentage}%
                      </div>
                    )}
                    {product.isPackage && !discountPercentage && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold z-10 bg-gray-800 text-white">
                        عرض خاص
                      </div>
                    )}

                    {product.imageUrl ? (
                      <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-contain p-6"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-50">
                        <ShoppingBag className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-grow bg-white border-t border-gray-50" dir="rtl">
                    {product.brand && (
                      <p className="text-[10px] tracking-widest font-bold uppercase mb-1 text-gray-500">
                        {product.brand.name}
                      </p>
                    )}
                    <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-grow leading-relaxed">{product.description}</p>

                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-xl font-black text-gray-900">{Number(product.price)}</span>
                        <span className="text-xs text-gray-500 mr-1"> ر.س</span>
                        {product.originalPrice && (
                          <div className="text-xs text-gray-400 line-through mt-0.5">{Number(product.originalPrice)} ر.س</div>
                        )}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors text-gray-700">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-4 w-12 h-12 flex items-center justify-center bg-white text-black rounded-full shadow-xl border border-gray-100 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0 hover:bg-gray-50"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        aria-label="السابق"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <button
        className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-4 w-12 h-12 flex items-center justify-center bg-white text-black rounded-full shadow-xl border border-gray-100 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0 hover:bg-gray-50"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        aria-label="التالي"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`transition-all duration-300 rounded-full ${
              index === selectedIndex
                ? 'w-8 h-2 bg-black'
                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
