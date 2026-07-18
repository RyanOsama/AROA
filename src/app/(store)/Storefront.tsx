'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ChevronLeft, Percent, Gift } from 'lucide-react';
import { Product as PrismaProduct, Brand } from '@prisma/client';
import ProductCarousel from '@/components/ProductCarousel';

type Product = PrismaProduct & { originalPrice: any; price: any; brand?: { name: string } | null; isPackage?: boolean };
type StorefrontProps = {
  initialProducts: any[];
  brands: any[];
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

  const renderProductGrid = (productList: any[], emptyMessage: string) => {
    if (!productList || productList.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <ShoppingBag className="w-12 h-12 text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">{emptyMessage}</p>
        </div>
      );
    }

    return <ProductCarousel products={productList} />;
  };

  return (
    <div className="bg-white">
      {/* Best Sellers Section */}
      <section id="best-sellers" className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-12">
            <p className="text-xs tracking-widest font-bold uppercase mb-2 text-gray-500">مميز</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">الأكثر مبيعاً</h2>
            <div className="w-12 h-1 bg-black mt-4 rounded-full"></div>
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
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-800">
                <Gift className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">مجموعات العروض</h2>
              <div className="w-12 h-1 bg-black mt-4 rounded-full"></div>
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
              style={{ background: 'linear-gradient(135deg, #000000, #333333)' }}
            >
              <h3 className="text-3xl font-black text-white relative z-10">عطور رجالية</h3>
              <div className="absolute -bottom-10 -right-10 opacity-10 text-9xl">👨</div>
            </button>
            <button 
              onClick={() => setSelectedGender(selectedGender === 'نسائي' ? null : 'نسائي')}
              className={`relative overflow-hidden rounded-[2rem] p-12 text-center transition-all duration-300 ${selectedGender === 'نسائي' ? 'ring-4 ring-gray-400' : 'hover:shadow-lg'}`}
              style={{ background: 'linear-gradient(135deg, #F9FAFB, #E5E7EB)' }}
            >
              <h3 className="text-3xl font-black text-black relative z-10">عطور نسائية</h3>
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
            <div className="w-12 h-1 bg-black mt-4 rounded-full"></div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveBrandId(null)}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 border-2 
                ${!activeBrandId 
                  ? 'bg-black text-white border-black shadow-lg scale-105' 
                  : 'bg-white text-gray-600 border-gray-100 hover:border-black hover:text-black'}`}
            >
              الكل
            </button>
            {brands.map(brand => (
              <button
                key={brand.id}
                onClick={() => setActiveBrandId(brand.id)}
                className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 border-2 
                  ${activeBrandId === brand.id 
                    ? 'bg-black text-white border-black shadow-lg scale-105' 
                    : 'bg-white text-gray-600 border-gray-100 hover:border-black hover:text-black'}`}
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
