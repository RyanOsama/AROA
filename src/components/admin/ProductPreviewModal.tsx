'use client';

import { X, Package, Star } from 'lucide-react';
import Image from 'next/image';

export default function ProductPreviewModal({ product, onClose }: { product: any, onClose: () => void }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            {product.isPackage ? <Package className="w-5 h-5 text-gold-600" /> : <Star className="w-5 h-5 text-gold-600" />}
            {product.isPackage ? 'تفاصيل البكج' : 'تفاصيل العطر'}
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" dir="rtl">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Image */}
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="w-full aspect-[4/5] bg-gray-50 rounded-2xl border border-gray-100 relative overflow-hidden flex items-center justify-center">
                {product.imageUrl ? (
                  <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-4" unoptimized />
                ) : (
                  <Package className="w-12 h-12 text-gray-300" />
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col">
              <div className="text-xs font-bold text-gold-600 mb-1">{product.brand?.name || 'بدون شركة'}</div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">{product.name}</h2>
              
              <div className="flex items-end gap-3 mb-6">
                <span className="text-3xl font-black text-gray-900">{product.price} <span className="text-sm text-gray-500">ر.س</span></span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through mb-1">{product.originalPrice} ر.س</span>
                )}
              </div>

              <div className="prose prose-sm text-gray-600 mb-6 leading-relaxed">
                {product.description || 'لا يوجد وصف متاح.'}
              </div>

              {/* Perfume specific data */}
              {!product.isPackage && (product.topNotes || product.heartNotes || product.baseNotes) && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2 mt-auto">
                  {product.topNotes && <div className="text-sm"><span className="font-bold text-gray-800">الافتتاحية: </span><span className="text-gray-600">{product.topNotes}</span></div>}
                  {product.heartNotes && <div className="text-sm"><span className="font-bold text-gray-800">القلب: </span><span className="text-gray-600">{product.heartNotes}</span></div>}
                  {product.baseNotes && <div className="text-sm"><span className="font-bold text-gray-800">القاعدة: </span><span className="text-gray-600">{product.baseNotes}</span></div>}
                  <div className="pt-2 border-t border-gray-200 mt-2 text-xs text-gray-500 flex justify-between">
                    <span>{product.gender || 'غير محدد'}</span>
                    <span>{product.size || 'غير محدد'}</span>
                    <span>{product.originCountry || 'غير محدد'}</span>
                  </div>
                </div>
              )}

              {/* Package specific data */}
              {product.isPackage && product.packageItems && product.packageItems.length > 0 && (
                <div className="bg-gold-50/30 p-4 rounded-xl border border-gold-100 mt-auto">
                  <h4 className="font-bold text-gray-800 mb-3 text-sm">محتويات المجموعة:</h4>
                  <ul className="space-y-2">
                    {product.packageItems.map((item: any, i: number) => (
                      <li key={item.id} className="text-sm flex gap-2 text-gray-700">
                        <span className="font-bold text-gold-600">{i + 1}.</span>
                        {item.name} <span className="text-gray-400 text-xs">({item.brand?.name})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
