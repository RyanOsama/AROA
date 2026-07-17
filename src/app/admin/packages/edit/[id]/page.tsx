import { getProducts, getProductById } from '@/actions/product';
import { getBrands } from '@/actions/brand';
import PackageForm from '@/components/admin/PackageForm';
import { notFound } from 'next/navigation';

export default async function EditPackagePage({ params }: { params: { id: string } }) {
  const { product } = await getProductById(params.id);
  
  if (!product || !product.isPackage) {
    notFound();
  }

  const { products } = await getProducts();
  const { brands } = await getBrands();

  // Filter out products that are packages
  const perfumes = products?.filter(p => !p.isPackage) || [];

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-800">تعديل بكج: {product.name}</h1>
      </div>
      <PackageForm perfumes={perfumes} brands={brands || []} initialData={product} />
    </div>
  );
}
