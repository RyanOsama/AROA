'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@prisma/client';

export default function RecommendedSection({ products }: { products: any[] }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-black text-gray-900">عطور قد تعجبك</h2>
          <div className="w-12 h-1 bg-[#1B2A4A] mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => {
            const discountPercentage = product.originalPrice && Number(product.originalPrice) > Number(product.price)
              ? Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100)
              : null;

            return (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="group flex flex-col rounded-[2rem] overflow-hidden text-right w-full bg-white border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div
                  className="relative overflow-hidden flex items-center justify-center bg-white"
                  style={{ aspectRatio: '4/5' }}
                >
                  {discountPercentage && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold z-10 bg-[#1B2A4A] text-[#C9A96E]">
                      خصم {discountPercentage}%
                    </div>
                  )}
                  {product.imageUrl ? (
                    <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
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
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-[#1B2A4A] group-hover:text-white transition-colors text-gray-700">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
