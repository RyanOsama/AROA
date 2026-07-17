import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const perfumeNames = [
  { name: "عطر السحر الفاخر", gender: "نسائي" },
  { name: "عطر الجاذبية المطلقة", gender: "رجالي" },
  { name: "عطر ليلة شتاء", gender: "للجنسين" },
  { name: "عطر أسرار الطبيعة", gender: "نسائي" },
  { name: "عطر العود الملكي", gender: "رجالي" },
  { name: "عطر زهور الربيع", gender: "نسائي" },
  { name: "عطر نسمات الصباح", gender: "للجنسين" },
  { name: "عطر العنبر الأصيل", gender: "رجالي" },
  { name: "عطر سحر الشرق", gender: "للجنسين" },
  { name: "عطر لمسة حرير", gender: "نسائي" },
  { name: "عطر النخبة", gender: "رجالي" },
  { name: "عطر الفخامة", gender: "للجنسين" }
];

// Using 4 guaranteed Unsplash images that worked + 8 others
// Actually, using loremflickr ensures we get 12 different perfume images reliably.
const getImageUrl = (i) => `https://loremflickr.com/600/800/perfume,bottle/all?lock=${i + 10}`;

async function main() {
  console.log("Cleaning database products...");
  
  await prisma.product.deleteMany({});
  
  console.log("Fetching brands...");
  const brands = await prisma.brand.findMany();
  
  let imgIndex = 0;

  console.log("Adding new realistic perfumes with Men/Women/Unisex varieties...");
  for (const brand of brands) {
    for (let i = 0; i < 2; i++) {
      const perfume = perfumeNames[imgIndex % perfumeNames.length];
      const imageUrl = getImageUrl(imgIndex);
      const price = Math.floor(Math.random() * 400) + 150; 
      
      const hasDiscount = Math.random() > 0.5;
      const originalPrice = hasDiscount ? price + Math.floor(Math.random() * 200) + 50 : null;

      await prisma.product.create({
        data: {
          name: perfume.name,
          description: `عطر ${perfume.name} من شركة ${brand.name}، يتميز بتركيبة عطرية فريدة ورائحة تدوم طويلاً، مناسب لجميع المناسبات السعيدة.`,
          price: price,
          originalPrice: originalPrice,
          imageUrl: imageUrl,
          brandId: brand.id,
          isAvailable: true,
          gender: perfume.gender,
          size: "100 مل",
          isPackage: false
        }
      });
      imgIndex++;
      console.log(`Added: ${perfume.name} to ${brand.name}`);
    }
  }

  console.log("Done! Cleaned up the database and added 12 realistic perfumes.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
