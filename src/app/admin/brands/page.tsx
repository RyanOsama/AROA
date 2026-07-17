import { getBrands, deleteBrand } from '@/actions/brand';
import Link from 'next/link';
import Image from 'next/image';
import { PlusCircle, Trash2, Building2, PackageOpen } from 'lucide-react';
import { revalidatePath } from 'next/cache';

type Product = {
  id: string;
  name: string;
  price: any;
  imageUrl: string | null;
};

type Brand = {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  products: Product[];
};


export default async function AdminBrandsPage() {
  const { brands, success, error } = await getBrands();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex justify-between items-center mb-8 border-b pb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-gold-600" />
            الشركات (الماركات)
          </h2>
          <p className="text-gray-500 text-sm mt-2">إدارة الشركات واستعراض العطور التابعة لكل شركة</p>
        </div>
        <Link 
          href="/admin/brands/new" 
          className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-3 rounded-xl flex items-center transition-colors shadow-lg shadow-gold-500/20 font-medium"
        >
          <PlusCircle className="w-5 h-5 ml-2" />
          إضافة شركة جديدة
        </Link>
      </div>

      {!success ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">{error}</div>
      ) : brands?.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">لم يتم إضافة أي شركات بعد.</p>
          <p className="text-sm mt-2 mb-6">ابدأ بإضافة أول شركة لعرضها هنا.</p>
          <Link href="/admin/brands/new" className="text-gold-600 font-medium hover:underline">
            إضافة شركة الآن
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {brands?.map((brand: Brand) => (
            <div key={brand.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow bg-gray-50/50">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  {brand.logoUrl ? (
                    <div className="w-16 h-16 relative bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center p-2">
                      <Image src={brand.logoUrl} alt={brand.name} fill className="object-contain" unoptimized />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center text-gray-400">
                      <Building2 className="w-8 h-8" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{brand.name}</h3>
                    {brand.description && <p className="text-sm text-gray-500">{brand.description}</p>}
                  </div>
                </div>
                <form action={async () => {
                  'use server';
                  await deleteBrand(brand.id);
                  revalidatePath('/admin/brands');
                }}>
                  <button type="submit" className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </form>
              </div>

              {/* Brand Products */}
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2 border-b pb-2">
                  <PackageOpen className="w-4 h-4 text-gray-400" />
                  عطور الشركة ({brand.products.length})
                </h4>
                
                {brand.products.length === 0 ? (
                  <div className="text-sm text-gray-400 text-center py-4">لا يوجد عطور تابعة لهذه الشركة حتى الآن</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {brand.products.map((product: Product) => (
                      <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-50 hover:bg-gray-50 transition-colors">
                        {product.imageUrl ? (
                          <div className="w-10 h-10 relative bg-gray-100 rounded-md overflow-hidden">
                            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" unoptimized />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                            <PackageOpen className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                          <p className="text-xs text-gold-600 font-bold">{Number(product.price)} ر.س</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
