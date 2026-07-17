import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 30 diverse and luxurious perfume images
const perfumeImages = [
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80",
  "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&q=80",
  "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=600&q=80",
  "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80",
  "https://images.unsplash.com/photo-1523293115678-d2906198d3b4?w=600&q=80",
  "https://images.unsplash.com/photo-1595532542520-50d440dbce84?w=600&q=80",
  "https://images.unsplash.com/photo-1616949755610-8c9bac08f9f8?w=600&q=80",
  "https://images.unsplash.com/photo-1557170332-a4b3f114ea02?w=600&q=80",
  "https://images.unsplash.com/photo-1605615715831-299d2551bf32?w=600&q=80",
  "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=600&q=80",
  "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=600&q=80",
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
  "https://images.unsplash.com/photo-1592945403405-b3fbafd7f540?w=600&q=80",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
  "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&q=80",
  "https://images.unsplash.com/photo-1551221775-68ff3f1246b3?w=600&q=80",
  "https://images.unsplash.com/photo-1587515152843-078ce016ed25?w=600&q=80",
  "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80",
  "https://images.unsplash.com/photo-1601009117621-0a63af0edc55?w=600&q=80",
  "https://images.unsplash.com/photo-1600857500586-b4a1bba69e12?w=600&q=80",
  "https://images.unsplash.com/photo-1545622119-a9a3b680795c?w=600&q=80",
  "https://images.unsplash.com/photo-1579294247514-6ccfb564ceb8?w=600&q=80",
  "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600&q=80",
  "https://images.unsplash.com/photo-1605330368142-b67db6f244af?w=600&q=80",
  "https://images.unsplash.com/photo-1608688463953-b24cd51de9b4?w=600&q=80",
  "https://images.unsplash.com/photo-1551446591-142875a901a1?w=600&q=80",
  "https://images.unsplash.com/photo-1630137353982-f04bf4a0058a?w=600&q=80",
  "https://images.unsplash.com/photo-1631558556855-4089c1626f1c?w=600&q=80",
  "https://images.unsplash.com/photo-1631628108426-17b5e32607e0?w=600&q=80",
  "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80"
];

// Diverse elegant logos
const brandLogos = [
  "https://images.unsplash.com/photo-1616949755610-8c9bac08f9f8?w=200&q=80",
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200&q=80",
  "https://images.unsplash.com/photo-1523293115678-d2906198d3b4?w=200&q=80",
  "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=200&q=80",
  "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=200&q=80",
  "https://images.unsplash.com/photo-1587515152843-078ce016ed25?w=200&q=80",
  "https://images.unsplash.com/photo-1605615715831-299d2551bf32?w=200&q=80",
  "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=200&q=80"
];

async function main() {
  console.log("Seeding new random images (replacing old ones)...");

  // update products
  const products = await prisma.product.findMany();
  
  // Shuffle array for randomness
  const shuffledImages = [...perfumeImages].sort(() => Math.random() - 0.5);

  for (let i = 0; i < products.length; i++) {
    // We update every product to have a new random image from our large array
    await prisma.product.update({
      where: { id: products[i].id },
      data: { imageUrl: shuffledImages[i % shuffledImages.length] }
    });
    console.log(`Updated product ${products[i].name} with a new image`);
  }

  // update brands
  const brands = await prisma.brand.findMany();
  const shuffledLogos = [...brandLogos].sort(() => Math.random() - 0.5);

  for (let i = 0; i < brands.length; i++) {
    await prisma.brand.update({
      where: { id: brands[i].id },
      data: { logoUrl: shuffledLogos[i % shuffledLogos.length] }
    });
    console.log(`Updated brand ${brands[i].name} with a new logo`);
  }

  console.log("Done! All products now have unique random images.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
