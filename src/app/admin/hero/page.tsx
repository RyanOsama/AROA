import { getHeroSettings } from '@/actions/hero';
import { getProducts } from '@/actions/product';
import HeroSettingsForm from '@/components/admin/HeroSettingsForm';

export const dynamic = 'force-dynamic';

export default async function AdminHeroPage() {
  const [initialSettings, productsResult] = await Promise.all([
    getHeroSettings(),
    getProducts(),
  ]);

  return (
    <div className="max-w-6xl mx-auto py-6">
      <HeroSettingsForm 
        initialSettings={initialSettings} 
        products={productsResult.products || []} 
      />
    </div>
  );
}
