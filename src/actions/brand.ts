'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        products: true
      },
      orderBy: { createdAt: 'desc' }
    });
    const serializedBrands = brands.map(brand => ({
      ...brand,
      products: brand.products.map(p => ({
        ...p,
        price: Number(p.price),
        originalPrice: p.originalPrice ? Number(p.originalPrice) : null,
      }))
    }));
    return { success: true, brands: serializedBrands };
  } catch (error: any) {
    return { success: false, error: error.message || 'فشل في جلب الشركات' };
  }
}

export async function createBrand(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const logoUrl = formData.get('logoUrl') as string;

    if (!name) {
      return { success: false, error: 'اسم الشركة مطلوب' };
    }

    await prisma.brand.create({
      data: {
        name,
        description: description || null,
        logoUrl: logoUrl || null,
      },
    });

    revalidatePath('/admin/brands');
    revalidatePath('/admin/products/new');
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, error: 'اسم الشركة موجود مسبقاً' };
    }
    return { success: false, error: error.message || 'فشل في إنشاء الشركة' };
  }
}

export async function deleteBrand(id: string) {
  try {
    // First, disconnect or delete products. Since products might need a brand,
    // we can either delete them or set brandId to null. 
    // Prisma relation allows null for brandId, so we can just let it set to null,
    // or we delete the brand and let the products lose their brand.
    // Wait, the default relation action is restrict or set null.
    // Let's explicitly set products' brandId to null first to be safe.
    
    await prisma.product.updateMany({
      where: { brandId: id },
      data: { brandId: null }
    });

    await prisma.brand.delete({
      where: { id },
    });

    revalidatePath('/admin/brands');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'فشل في حذف الشركة' };
  }
}
