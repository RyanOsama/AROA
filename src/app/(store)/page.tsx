import { getProducts } from '@/actions/product';
import { getBrands } from '@/actions/brand';
import Storefront from './Storefront';
import HeroSection from './HeroSection';

export default async function StorePage() {
  const { products } = await getProducts();
  const { brands } = await getBrands();

  const heroProducts = (products || []).slice(0, 5);

  return (
    <div>
      <HeroSection 
        products={heroProducts} 
        stats={{ 
          products: products?.length || 0, 
          brands: brands?.length || 0,
          clients: 120
        }} 
      />
      <div id="brands">
        <Storefront initialProducts={products || []} brands={brands || []} />
      </div>
    </div>
  );
}
