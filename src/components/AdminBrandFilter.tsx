'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminBrandFilter({ brands, currentBrandId }: { brands: any[], currentBrandId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brandId = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (brandId) {
      params.set('brand', brandId);
    } else {
      params.delete('brand');
    }
    router.push(`/admin/products?${params.toString()}`);
  };

  return (
    <select 
      className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:border-gold-500 cursor-pointer"
      value={currentBrandId}
      onChange={handleChange}
    >
      <option value="">جميع الشركات</option>
      {brands?.map((b: any) => (
        <option key={b.id} value={b.id}>{b.name}</option>
      ))}
    </select>
  );
}
