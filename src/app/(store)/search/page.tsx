import { getProducts } from '@/actions/product';
import { getBrands } from '@/actions/brand';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ChevronRight } from 'lucide-react';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; brand?: string; offers?: string; packages?: string };
}) {
  const { products } = await getProducts();
  const { brands } = await getBrands();

  let filteredProducts: any[] = products || [];
  let pageTitle = "نتائج البحث";

  if (searchParams.q) {
    const q = searchParams.q.toLowerCase();
    filteredProducts = filteredProducts.filter(
      p => p.name.toLowerCase().includes(q) || (p.brand?.name && p.brand.name.toLowerCase().includes(q))
    );
    pageTitle = `البحث عن: ${searchParams.q}`;
  } else if (searchParams.brand) {
    filteredProducts = filteredProducts.filter(p => p.brandId === searchParams.brand);
    const brandName = brands?.find(b => b.id === searchParams.brand)?.name;
    pageTitle = brandName ? `عطور ${brandName}` : "نتائج الماركة";
  } else if (searchParams.offers) {
    filteredProducts = filteredProducts.filter(p => p.originalPrice && Number(p.originalPrice) > Number(p.price));
    pageTitle = "عروض التخفيضات";
  } else if (searchParams.packages) {
    filteredProducts = filteredProducts.filter(p => p.isPackage);
    pageTitle = "مجموعات العروض (بكجات)";
  }

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 mb-10">
          <Link href="/" className="text-gray-500 hover:text-gray-900">
            <ChevronRight className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900">{pageTitle}</h1>
          <span className="text-sm font-medium text-gray-500 mr-2 bg-gray-100 px-3 py-1 rounded-full">
            {filteredProducts.length} نتيجة
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-32 rounded-[2rem] border-2 border-dashed border-gray-200">
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-gray-300" />
            <p className="text-xl font-bold text-gray-400">لم يتم العثور على نتائج تطابق بحثك</p>
            <Link href="/" className="inline-block mt-6 px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-gold-600 transition-colors">
              العودة للرئيسية
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => {
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
        )}
      </div>
    </div>
  );
}
