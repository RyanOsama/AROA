import sqlite3 from 'sqlite3';
import { PrismaClient } from '@prisma/client';

const db = new sqlite3.Database('./prisma/dev.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Error opening local dev.db', err);
    process.exit(1);
  }
});

const prisma = new PrismaClient(); // connects to PostgreSQL

async function migrateData() {
  console.log('🔄 جاري نقل عطورك الأصلية من جهازك إلى الاستضافة...');

  // Read Brands
  db.all('SELECT * FROM Brand', async (err, brands) => {
    if (err) throw err;
    console.log(`تم العثور على ${brands.length} ماركة محلية.`);

    // Read Products
    db.all('SELECT * FROM Product', async (err, products) => {
      if (err) throw err;
      console.log(`تم العثور على ${products.length} عطر محلي.`);

      // 1. Delete the fake data we added earlier
      await prisma.product.deleteMany({});
      await prisma.brand.deleteMany({});
      console.log('🧹 تم مسح العطور التجريبية من الاستضافة.');

      // 2. Insert Brands to Supabase
      for (const brand of brands) {
        await prisma.brand.create({
          data: {
            id: brand.id,
            name: brand.name,
            description: brand.description,
            logoUrl: brand.logoUrl,
            createdAt: new Date(brand.createdAt),
            updatedAt: new Date(brand.updatedAt)
          }
        });
      }

      // 3. Insert Products to Supabase
      for (const p of products) {
        await prisma.product.create({
          data: {
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.price,
            originalPrice: p.originalPrice,
            stock: p.stock,
            categoryId: p.categoryId,
            brandId: p.brandId,
            imageUrl: p.imageUrl,
            isAvailable: p.isAvailable === 1,
            isFeatured: p.isFeatured === 1,
            isPackage: p.isPackage === 1,
            sku: p.sku,
            barcode: p.barcode,
            gender: p.gender,
            size: p.size,
            perfumeType: p.perfumeType,
            topNotes: p.topNotes,
            heartNotes: p.heartNotes,
            baseNotes: p.baseNotes,
            salesCount: p.salesCount,
            createdAt: new Date(p.createdAt),
            updatedAt: new Date(p.updatedAt)
          }
        });
      }

      console.log('✅ تم نسخ جميع عطورك وصورك الأصلية بنجاح إلى الاستضافة!');
      process.exit(0);
    });
  });
}

migrateData();
