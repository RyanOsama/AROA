import { getProducts } from '@/actions/product';
import { getBrands } from '@/actions/brand';
import PackageForm from '@/components/admin/PackageForm';

export default async function NewPackagePage() {
  const { products } = await getProducts();
  const { brands } = await getBrands();

  // Filter out products that are packages, we only want normal perfumes
  const perfumes = products?.filter(p => !p.isPackage) || [];

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-800">إضافة بكج جديد (تجميع منتجات)</h1>
      </div>
      <PackageForm perfumes={perfumes} brands={brands || []} />
    </div>
  );
}
