'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Fetch all products
export async function getProducts(brandId?: string) {
  try {
    const products = await prisma.product.findMany({
      where: brandId ? { brandId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { 
        brand: true,
        // @ts-ignore
        packageItems: {
          include: { brand: true }
        }
      },
    });
    const serializedProducts = products.map(p => ({
      ...p,
      price: Number(p.price),
      originalPrice: p.originalPrice ? Number(p.originalPrice) : null,
      packageItems: (p as any).packageItems?.map((pi: any) => ({
        ...pi,
        price: Number(pi.price),
        originalPrice: pi.originalPrice ? Number(pi.originalPrice) : null,
      }))
    }));
    return { success: true, products: serializedProducts };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, error: 'حدث خطأ أثناء جلب المنتجات' };
  }
}

// Fetch single product
export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { 
        brand: true,
        // @ts-ignore
        packageItems: true
      },
    });
    
    if (!product) throw new Error('Product not found');

    const serializedProduct = {
      ...product,
      price: Number(product.price),
      originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
      packageItems: (product as any).packageItems?.map((pi: any) => ({
        ...pi,
        price: Number(pi.price),
        originalPrice: pi.originalPrice ? Number(pi.originalPrice) : null,
      }))
    };
    return { success: true, product: serializedProduct };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, error: 'حدث خطأ أثناء جلب تفاصيل العطر' };
  }
}

// Create a new product
export async function createProduct(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const originalPriceStr = formData.get('originalPrice') as string;
    const originalPrice = originalPriceStr ? parseFloat(originalPriceStr) : null;
    const imageUrl = formData.get('imageUrl') as string;
    const galleryUrls = formData.get('galleryUrls') as string;
    const isAvailable = formData.get('isAvailable') === 'true';
    
    // Ingredients
    const topNotes = formData.get('topNotes') as string;
    const heartNotes = formData.get('heartNotes') as string;
    const baseNotes = formData.get('baseNotes') as string;

    // Specs
    const originCountry = formData.get('originCountry') as string;
    const gender = formData.get('gender') as string;
    const size = formData.get('size') as string;
    const perfumeType = formData.get('perfumeType') as string;
    
    // Auto-generate SKU if not provided or just force it:
    const sku = 'AORA-' + Math.random().toString(36).substring(2, 8).toUpperCase() + Date.now().toString().slice(-4);

    const brandId = formData.get('brandId') as string;
    const isPackage = formData.get('isPackage') === 'true';
    
    // Package Items (array of IDs passed as JSON string)
    const packageItemsStr = formData.get('packageItems') as string;
    let packageItemIds: string[] = [];
    if (packageItemsStr) {
      try {
        packageItemIds = JSON.parse(packageItemsStr);
      } catch (e) {
        console.error("Error parsing package items", e);
      }
    }

    if (!name || isNaN(price)) {
      return { success: false, error: 'الرجاء تعبئة الحقول الأساسية بشكل صحيح' };
    }

    await prisma.product.create({
      data: {
        name,
        description: description || '',
        price,
        originalPrice,
        imageUrl: imageUrl || null,
        galleryUrls: galleryUrls || null,
        isAvailable,
        brandId: brandId || null,
        topNotes,
        heartNotes,
        baseNotes,
        originCountry,
        gender,
        size,
        perfumeType,
        sku,
        // @ts-ignore
        isPackage,
        // @ts-ignore
        ...(packageItemIds.length > 0 ? { packageItems: { connect: packageItemIds.map(id => ({ id })) } } : {})
      },
    });

    revalidatePath('/');
    revalidatePath('/admin/products');
    
    return { success: true };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: 'حدث خطأ أثناء إضافة العطر' };
  }
}

// Update a product
export async function updateProduct(id: string, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const priceStr = formData.get('price') as string;
    const price = priceStr ? parseFloat(priceStr) : NaN;
    const originalPriceStr = formData.get('originalPrice') as string;
    const originalPrice = originalPriceStr ? parseFloat(originalPriceStr) : null;
    const imageUrl = formData.get('imageUrl') as string;
    const galleryUrls = formData.get('galleryUrls') as string;
    
    const topNotes = formData.get('topNotes') as string;
    const heartNotes = formData.get('heartNotes') as string;
    const baseNotes = formData.get('baseNotes') as string;
    const originCountry = formData.get('originCountry') as string;
    const gender = formData.get('gender') as string;
    const size = formData.get('size') as string;
    const perfumeType = formData.get('perfumeType') as string;
    const brandId = formData.get('brandId') as string;
    const isPackage = formData.get('isPackage') === 'true';

    const packageItemsStr = formData.get('packageItems') as string;
    let packageItemIds: string[] = [];
    if (packageItemsStr) {
      try {
        packageItemIds = JSON.parse(packageItemsStr);
      } catch (e) {
        console.error("Error parsing package items", e);
      }
    }

    if (!name || isNaN(price)) {
      return { success: false, error: 'الرجاء تعبئة الحقول الأساسية بشكل صحيح' };
    }

    const updateData: any = {
      name, description: description || '', price, originalPrice, topNotes, heartNotes, baseNotes, originCountry, gender, size, perfumeType, isPackage
    };
    if (imageUrl) updateData.imageUrl = imageUrl;
    if (galleryUrls) updateData.galleryUrls = galleryUrls;
    if (brandId) updateData.brand = { connect: { id: brandId } };
    if (packageItemIds.length > 0) {
      updateData.packageItems = { set: packageItemIds.map(id => ({ id })) };
    } else if (isPackage) {
      updateData.packageItems = { set: [] }; // clear them if empty but still a package
    }

    await prisma.product.update({
      where: { id },
      data: updateData,
    });

    revalidatePath('/');
    revalidatePath('/admin/products');
    
    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: 'حدث خطأ أثناء تحديث العطر' };
  }
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    
    revalidatePath('/');
    revalidatePath('/admin/products');

    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: 'حدث خطأ أثناء حذف العطر' };
  }
}
