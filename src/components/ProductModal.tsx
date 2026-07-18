'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, CheckCircle2, ShoppingCart, Heart, Share2 } from 'lucide-react';
import AddToCartSection from '@/components/AddToCartSection';
import FavoriteButton from '@/components/FavoriteButton';

type ProductModalProps = {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    originalPrice: number | null;
    imageUrl: string | null;
    isAvailable: boolean;
    topNotes: string | null;
    heartNotes: string | null;
    baseNotes: string | null;
    originCountry: string | null;
    gender: string | null;
    size: string | null;
    perfumeType: string | null;
    brand?: { name: string } | null;
  };
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const discountPercentage = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-6"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div
        className="relative w-full md:max-w-4xl max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col md:flex-row rounded-t-3xl md:rounded-3xl shadow-2xl bg-white"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-black text-white shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image */}
        <div className="relative flex-shrink-0 w-full md:w-[42%] flex items-center justify-center p-10 bg-gray-50">
          {discountPercentage && (
            <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full text-xs font-black z-10 bg-black text-white shadow-sm">
              خصم {discountPercentage}%
            </div>
          )}
          {product.imageUrl ? (
            <div className="float-1 relative w-full" style={{ aspectRatio: '3/4' }}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain drop-shadow-2xl mix-blend-multiply"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-28 h-28 rounded-3xl flex items-center justify-center text-4xl font-serif font-black bg-black text-white">
              A
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="flex-grow overflow-y-auto p-7 flex flex-col" dir="rtl">
          {/* Brand */}
          {product.brand && (
            <p className="text-xs tracking-[0.3em] font-bold uppercase mb-2 text-gray-500">
              {product.brand.name}
            </p>
          )}

          {/* Name */}
          <h2 className="text-2xl md:text-3xl font-black mb-3 leading-tight text-black">
            {product.name}
          </h2>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current text-black" />
            ))}
            <span className="text-xs mr-2 text-gray-500">(21 تقييم)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-3xl font-black text-black">
              {Number(product.price)} <span className="text-base font-bold">ر.س</span>
            </span>
            {product.originalPrice && (
              <span className="text-lg line-through text-gray-400">
                {Number(product.originalPrice)} ر.س
              </span>
            )}
          </div>

          {product.isAvailable && (
            <div className="flex items-center gap-1.5 text-sm font-semibold mb-5 text-green-600">
              <CheckCircle2 className="w-4 h-4" />
              متوفر في المخزن
            </div>
          )}

          {/* Description */}
          {product.description && (
            <p className="text-sm leading-relaxed mb-5 text-gray-600">
              {product.description}
            </p>
          )}

          {/* Notes */}
          {(product.topNotes || product.heartNotes || product.baseNotes) && (
            <div className="rounded-2xl p-4 mb-5 bg-gray-50">
              <p className="text-xs font-bold tracking-widest mb-3 uppercase text-gray-500">مكونات العطر</p>
              <div className="space-y-1.5 text-sm">
                {product.topNotes && <div><span className="font-bold text-black">افتتاحية: </span><span className="text-gray-600">{product.topNotes}</span></div>}
                {product.heartNotes && <div><span className="font-bold text-black">قلب: </span><span className="text-gray-600">{product.heartNotes}</span></div>}
                {product.baseNotes && <div><span className="font-bold text-black">قاعدة: </span><span className="text-gray-600">{product.baseNotes}</span></div>}
              </div>
            </div>
          )}

          {/* Specs */}
          {(product.gender || product.size || product.perfumeType) && (
            <div className="flex flex-wrap gap-2 mb-5">
              {product.gender && <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-black">{product.gender}</span>}
              {product.size && <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-black">{product.size}</span>}
              {product.perfumeType && <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-black">{product.perfumeType}</span>}
              {product.originCountry && <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-black">{product.originCountry}</span>}
            </div>
          )}

          {/* Actions */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <AddToCartSection product={{ id: product.id, name: product.name, price: Number(product.price), imageUrl: product.imageUrl }} />
            <div className="flex items-center gap-3 mt-3 w-full">
              <div className="w-full">
                <FavoriteButton product={{ id: product.id, name: product.name, price: Number(product.price), imageUrl: product.imageUrl }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
