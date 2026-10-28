import { getProducts } from '@/actions/product';
import { getBrands } from '@/actions/brand';
import { getHeroSettings } from '@/actions/hero';
import Storefront from './Storefront';
import HeroSection from './HeroSection';

export default async function StorePage() {
  const { products } = await getProducts();
  const { brands } = await getBrands();
  const heroSettings = await getHeroSettings();

  return (
    <div>
      <HeroSection heroSettings={heroSettings} />
      <div id="brands">
        <Storefront initialProducts={products || []} brands={brands || []} />
      </div>
    </div>
  );
}
