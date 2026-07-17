import { getProducts, deleteProduct } from '@/actions/product';
import { getBrands } from '@/actions/brand';
import AdminBrandFilter from '@/components/AdminBrandFilter';
import Link from 'next/link';
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import ProductPreviewButton from '@/components/admin/ProductPreviewButton';

type Product = {
  id: string;
  name: string;
  description: string;
  price: any;
  imageUrl: string | null;
  createdAt: Date;
  brand?: { name: string } | null;
  isPackage?: boolean;
};

export default async function AdminProductsPage({ searchParams }: { searchParams: { brand?: string } }) {
  const brandId = searchParams.brand || '';
  const { products, success, error } = await getProducts(brandId || undefined);
  const { brands } = await getBrands();
  
  // Exclude packages from the products list
  const normalProducts = products?.filter((p: any) => !p.isPackage) || [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">العطور المتوفرة</h2>
        
        <div className="flex items-center gap-4">
          <AdminBrandFilter brands={brands || []} currentBrandId={brandId} />

          <Link 
            href="/admin/products/new" 
            className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-2 rounded-lg flex items-center transition-colors shadow-md shadow-gold-500/20"
          >
            <PlusCircle className="w-5 h-5 ml-2" />
            إضافة عطر جديد
          </Link>
        </div>
      </div>

      {!success ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
      ) : normalProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          لا توجد عطور حالياً (أو لم يتم العثور على عطور لهذه الشركة).
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
              <tr>
                <th className="py-4 px-4 rounded-tr-lg">الاسم</th>
                <th className="py-4 px-4">الشركة</th>
                <th className="py-4 px-4">السعر</th>
                <th className="py-4 px-4">تاريخ الإضافة</th>
                <th className="py-4 px-4 rounded-tl-lg">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {normalProducts.map((product: Product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4 font-medium text-gray-800">{product.name}</td>
                  <td className="py-4 px-4 text-gray-600 text-sm">{product.brand?.name || '-'}</td>
                  <td className="py-4 px-4 text-gold-600 font-bold">{Number(product.price)} ر.س</td>
                  <td className="py-4 px-4 text-gray-500 text-sm">
                    {new Date(product.createdAt).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <ProductPreviewButton product={product} />
                      <Link href={`/admin/products/edit/${product.id}`} className="text-blue-500 hover:text-blue-700 transition-colors p-2 hover:bg-blue-50 rounded-lg" title="تعديل">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={async () => {
                        'use server';
                        await deleteProduct(product.id);
                      }}>
                        <button type="submit" className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg">
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
  );
}
