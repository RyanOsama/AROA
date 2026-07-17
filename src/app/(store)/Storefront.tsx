'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ChevronLeft, Percent, Gift } from 'lucide-react';
import { Product as PrismaProduct, Brand } from '@prisma/client';

type Product = PrismaProduct & { originalPrice: any; price: any; brand?: { name: string } | null; isPackage?: boolean };
type StorefrontProps = {
  initialProducts: Product[];
  brands: (Brand & { products: Product[] })[];
};

export default function Storefront({ initialProducts, brands }: StorefrontProps) {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [activeBrandId, setActiveBrandId] = useState<string | null>(null);

  // Filter products for different sections
  const discountedProducts = initialProducts.filter(p => !p.isPackage && p.originalPrice && Number(p.originalPrice) > Number(p.price));
  const packages = initialProducts.filter(p => p.isPackage);
  // Best sellers can just be all products (excluding packages if we want) or we can slice it
  const bestSellers = initialProducts.filter(p => !p.isPackage).slice(0, 8);
  
  const genderProducts = selectedGender 
    ? initialProducts.filter(p => p.gender === selectedGender) 
    : [];

  const brandProducts = activeBrandId
    ? initialProducts.filter(p => p.brandId === activeBrandId)
    : initialProducts;

  const renderProductGrid = (products: Product[], emptyMessage: string) => {
    if (!products || products.length === 0) {
      return (
        <div className="text-center py-20 rounded-3xl border-2 border-dashed border-gray-200 text-gray-400">
          <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="font-medium">{emptyMessage}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
              {/* Image Container */}
              <div
                className="relative overflow-hidden flex items-center justify-center bg-white"
                style={{ aspectRatio: '4/5' }}
              >
                {discountPercentage && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold z-10 bg-[#1B2A4A] text-[#C9A96E]">
                    خصم {discountPercentage}%
                  </div>
                )}
                {product.isPackage && !discountPercentage && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold z-10 bg-[#8B7355] text-white">
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

              {/* Content Container */}
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
    );
  };

  return (
    <div className="bg-white">
      {/* Best Sellers Section */}
      <section id="best-sellers" className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-12">
            <p className="text-xs tracking-widest font-bold uppercase mb-2 text-[#C9A96E]">مميز</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">الأكثر مبيعاً</h2>
            <div className="w-12 h-1 bg-[#C9A96E] mt-4 rounded-full"></div>
          </div>
          {renderProductGrid(bestSellers, "لا توجد منتجات حالياً")}
        </div>
      </section>

        <section id="discounts" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center mb-12">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
                <Percent className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">التخفيضات</h2>
              <div className="w-12 h-1 bg-red-600 mt-4 rounded-full"></div>
            </div>
            {renderProductGrid(discountedProducts, "لا توجد تخفيضات حالياً")}
          </div>
        </section>

        <section id="packages" className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center mb-12">
              <div className="w-12 h-12 bg-[#F5EFE6] rounded-full flex items-center justify-center mb-4 text-[#8B7355]">
                <Gift className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">مجموعات العروض</h2>
              <div className="w-12 h-1 bg-[#8B7355] mt-4 rounded-full"></div>
            </div>
            {renderProductGrid(packages, "لا توجد مجموعات عروض حالياً")}
          </div>
        </section>

      {/* Shop by Gender Section */}
      <section id="categories" className="py-16 md:py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">تسوق حسب الفئة</h2>
            <div className="w-12 h-1 bg-gray-900 mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <button 
              onClick={() => setSelectedGender(selectedGender === 'رجالي' ? null : 'رجالي')}
              className={`relative overflow-hidden rounded-[2rem] p-12 text-center transition-all duration-300 ${selectedGender === 'رجالي' ? 'ring-4 ring-gray-900' : 'hover:shadow-lg'}`}
              style={{ background: 'linear-gradient(135deg, #1B2A4A, #2D4172)' }}
            >
              <h3 className="text-3xl font-black text-white relative z-10">عطور رجالية</h3>
              <div className="absolute -bottom-10 -right-10 opacity-10 text-9xl">👨</div>
            </button>
            <button 
              onClick={() => setSelectedGender(selectedGender === 'نسائي' ? null : 'نسائي')}
              className={`relative overflow-hidden rounded-[2rem] p-12 text-center transition-all duration-300 ${selectedGender === 'نسائي' ? 'ring-4 ring-[#C9A96E]' : 'hover:shadow-lg'}`}
              style={{ background: 'linear-gradient(135deg, #FDFBF7, #F5EFE6)' }}
            >
              <h3 className="text-3xl font-black text-[#8B7355] relative z-10">عطور نسائية</h3>
              <div className="absolute -bottom-10 -right-10 opacity-10 text-9xl">👩</div>
            </button>
          </div>

          {selectedGender && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedGender === 'رجالي' ? 'العطور الرجالية' : 'العطور النسائية'}
                </h3>
                <button 
                  onClick={() => setSelectedGender(null)}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> العودة
                </button>
              </div>
              {renderProductGrid(genderProducts, "لا توجد عطور متوفرة في هذه الفئة")}
            </div>
          )}
        </div>
      </section>

      {/* Shop by Brand Section */}
      <section id="brands" className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">تسوق حسب الماركة</h2>
            <div className="w-12 h-1 bg-[#1B2A4A] mt-4 rounded-full"></div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveBrandId(null)}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 border-2 
                ${!activeBrandId 
                  ? 'bg-[#1B2A4A] text-white border-[#1B2A4A] shadow-lg scale-105' 
                  : 'bg-white text-gray-600 border-gray-100 hover:border-[#1B2A4A] hover:text-[#1B2A4A]'}`}
            >
              الكل
            </button>
            {brands.map(brand => (
              <button
                key={brand.id}
                onClick={() => setActiveBrandId(brand.id)}
                className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 border-2 
                  ${activeBrandId === brand.id 
                    ? 'bg-[#1B2A4A] text-white border-[#1B2A4A] shadow-lg scale-105' 
                    : 'bg-white text-gray-600 border-gray-100 hover:border-[#1B2A4A] hover:text-[#1B2A4A]'}`}
              >
                {brand.name}
              </button>
            ))}
          </div>

          <div className="animate-in fade-in duration-500">
            {renderProductGrid(brandProducts, "لا توجد منتجات لهذه الماركة حالياً")}
          </div>
        </div>
      </section>
    </div>
  );
}
