import { getProducts, deleteProduct } from '@/actions/product';
import Link from 'next/link';
import { Package, Plus, Edit, Trash2 } from 'lucide-react';
import ProductPreviewButton from '@/components/admin/ProductPreviewButton';
import Image from 'next/image';

export default async function PackagesPage() {
  const { products } = await getProducts();
  
  // Filter only packages
  const packages = products?.filter(p => p.isPackage) || [];

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">إدارة البكجات</h1>
          <p className="text-sm text-gray-500 mt-1">عرض وتعديل مجموعات العروض والبكجات</p>
        </div>
        <Link 
          href="/admin/packages/new" 
          className="bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          إضافة بكج جديد
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {packages.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Package className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">لا توجد بكجات حالياً</h3>
            <p className="text-gray-500 mb-6">قم بإضافة مجموعات عروض جديدة لزيادة مبيعاتك.</p>
            <Link 
              href="/admin/packages/new" 
              className="bg-gold-50 text-gold-600 hover:bg-gold-100 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              إضافة أول بكج
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                  <th className="px-6 py-4 font-semibold w-16">صورة</th>
                  <th className="px-6 py-4 font-semibold">اسم البكج</th>
                  <th className="px-6 py-4 font-semibold">السعر</th>
                  <th className="px-6 py-4 font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => (
                  <tr key={pkg.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 bg-white rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden relative">
                        {pkg.imageUrl ? (
                          <Image src={pkg.imageUrl} alt={pkg.name} fill className="object-contain p-1" unoptimized />
                        ) : (
                          <Package className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{pkg.name}</div>
                      {pkg.description && <div className="text-xs text-gray-500 mt-1 line-clamp-1">{pkg.description}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{Number(pkg.price)} ر.س</div>
                      {pkg.originalPrice && <div className="text-xs text-gray-400 line-through">{Number(pkg.originalPrice)} ر.س</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <ProductPreviewButton product={pkg} />
                        <Link 
                          href={`/admin/packages/edit/${pkg.id}`}
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <form action={async () => {
                          'use server';
                          await deleteProduct(pkg.id);
                        }}>
                          <button type="submit" className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" title="حذف">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
