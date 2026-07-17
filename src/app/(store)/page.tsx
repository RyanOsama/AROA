import { getProducts } from '@/actions/product';
import { getBrands } from '@/actions/brand';
import Storefront from './Storefront';
import HeroSection from './HeroSection';

export default async function StorePage() {
  const { products } = await getProducts();
  const { brands } = await getBrands();

  // Take first 5 products for hero display
  const heroProducts = (products || []).slice(0, 5);

  return (
    <div>
      <HeroSection 
        products={heroProducts} 
        stats={{ 
          products: products?.length || 0, 
          brands: brands?.length || 0,
          clients: 120 // Realistic initial number
        }} 
      />
      <div id="brands">
        <Storefront initialProducts={products || []} brands={brands || []} />
      </div>
    </div>
  );
}
