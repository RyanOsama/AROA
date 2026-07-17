import { getProductById } from '@/actions/product';
import Image from 'next/image';
import { Star, CheckCircle2, ShoppingCart, Info, Check } from 'lucide-react';
import AddToCartSection from '@/components/AddToCartSection';
import FavoriteButton from '@/components/FavoriteButton';
import ShareButton from './ShareButton';
import { notFound } from 'next/navigation';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { product } = await getProductById(params.id);
  
  if (!product) {
    notFound();
  }

  const discountPercentage = product.originalPrice && Number(product.originalPrice) > Number(product.price)
    ? Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100)
    : null;

  return (
    <div className="bg-white min-h-screen pt-10 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row-reverse gap-12 lg:gap-20">
          {/* Image Section - Right side visually in RTL */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-[4/5] bg-gray-50 flex items-center justify-center rounded-3xl overflow-hidden border border-gray-100">
              {discountPercentage && (
                <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full text-sm font-black z-10 text-white" style={{ backgroundColor: '#8B7355' }}>
                  عرض لفترة محدودة
                </div>
              )}
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-8 drop-shadow-2xl"
                  unoptimized
                />
              ) : (
                <div className="w-32 h-32 rounded-3xl flex items-center justify-center text-5xl font-serif font-black text-gray-300 bg-gray-100">
                  A
                </div>
              )}
            </div>
          </div>

          {/* Details Section - Left side visually in RTL */}
          <div className="w-full md:w-1/2 flex flex-col justify-center" dir="rtl">
            <div className="mb-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-3">
                {product.name}
              </h1>
              {product.isPackage && (
                <div className="text-sm font-bold text-gray-500 mb-2">التصنيف: <span style={{ color: '#8B7355' }}>مجموعات العروض</span></div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <div className="flex gap-1 text-gold-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span>(3 تقييمات)</span>
              </div>
            </div>

            <div className="flex items-end gap-3 mb-4">
              <span className="text-4xl font-black text-red-600">
                {Number(product.price)} <span className="text-xl">ر.س</span>
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through mb-1">
                  {Number(product.originalPrice)} ر.س
                </span>
              )}
            </div>

            {product.isAvailable ? (
              <div className="flex items-center gap-2 text-sm font-bold text-green-600 mb-8">
                <div className="w-2 h-2 rounded-full bg-green-600"></div>
                متوفر
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm font-bold text-red-500 mb-8">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                غير متوفر
              </div>
            )}

            <div className="text-xs text-gray-500 mb-6">السعر شامل الضريبة</div>

            {/* Description or Package contents */}
            {product.isPackage && product.packageItems && product.packageItems.length > 0 ? (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">تحتوي المجموعة على:</h3>
                <div className="space-y-6">
                  {product.packageItems.map((item: any, index: number) => (
                    <div key={item.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="font-bold text-gray-800 mb-2">
                        {index + 1}- عطر {item.name} {item.size} :
                      </div>
                      {(item.topNotes || item.heartNotes || item.baseNotes) && (
                        <div className="text-sm text-gray-600 leading-relaxed">
                          <span className="font-bold text-gray-700">الروائح البارزة: </span>
                          {[item.topNotes, item.heartNotes, item.baseNotes].filter(Boolean).join(' و ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="prose prose-sm md:prose-base text-gray-700 leading-relaxed mb-8">
                {product.description?.split('\n').map((line, i) => (
                  <p key={i} className="mb-2">{line}</p>
                ))}
              </div>
            )}

            {/* Notes if any (for standard perfumes) */}
            {!product.isPackage && (product.topNotes || product.heartNotes || product.baseNotes) && (
              <div className="mb-8 space-y-3 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                {product.topNotes && <div className="text-sm"><span className="font-bold text-gray-900">الافتتاحية: </span><span className="text-gray-600">{product.topNotes}</span></div>}
                {product.heartNotes && <div className="text-sm"><span className="font-bold text-gray-900">القلب: </span><span className="text-gray-600">{product.heartNotes}</span></div>}
                {product.baseNotes && <div className="text-sm"><span className="font-bold text-gray-900">القاعدة: </span><span className="text-gray-600">{product.baseNotes}</span></div>}
              </div>
            )}

            {/* Specs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.sku && <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-800">رقم الموديل: {product.sku}</span>}
              {product.gender && <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-800">{product.gender}</span>}
              {product.size && <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-800">{product.size}</span>}
              {product.perfumeType && <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-800">{product.perfumeType}</span>}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <AddToCartSection product={{ id: product.id, name: product.name, price: Number(product.price), imageUrl: product.imageUrl }} />
              
              <div className="flex items-center gap-4 mt-2">
                <FavoriteButton product={{ id: product.id, name: product.name, price: Number(product.price), imageUrl: product.imageUrl }} />
                <ShareButton />
              </div>
            </div>

            {/* Policies */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-gray-400" />
                ملاحظات هامة:
              </h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></div>
                  لا يمكن استرجاع عناصر المجموعة إلا بحالة كان المنتج تعرض لخلل/عيب مصنعي.
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></div>
                  يتم الاستبدال أو الاسترجاع خلال 48 ساعة من استلام الطلب فقط.
                </li>
              </ul>
            </div>

            <div className="mt-8 text-sm text-gray-400">
              رقم الموديل: {product.sku}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
