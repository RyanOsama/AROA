'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@prisma/client';
import ProductCarousel from '@/components/ProductCarousel';

export default function RecommendedSection({ products }: { products: any[] }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-black text-gray-900">عطور قد تعجبك</h2>
          <div className="w-12 h-1 bg-black mt-4 rounded-full"></div>
        </div>

        <ProductCarousel products={products} />
      </div>
    </section>
  );
}
