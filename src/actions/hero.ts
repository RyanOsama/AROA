'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

export interface HeroSettingsData {
  id: string;
  title?: string | null;
  subtitle?: string | null;
  buttonText: string;
  imageUrl: string;
  productId: string | null;
  buttonPosY?: number; // 5 to 95 (%)
  buttonPosX?: number; // 5 to 95 (%)
  buttonColor?: 'white' | 'black' | 'gold' | 'glass';
  buttonSize?: 'sm' | 'md' | 'lg';
  imageFit?: 'contain' | 'cover';
  product?: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string | null;
  } | null;
}

const SETTINGS_FILE = path.join(process.cwd(), 'hero-settings.json');

const DEFAULT_SETTINGS: HeroSettingsData = {
  id: 'default-hero',
  title: '',
  subtitle: '',
  buttonText: 'اكتشف العطر',
  imageUrl: '/hero/featured-roots.png',
  productId: null,
  buttonPosY: 30,
  buttonPosX: 50,
  buttonColor: 'black',
  buttonSize: 'md',
  imageFit: 'contain',
};

function readSettingsFile(): Partial<HeroSettingsData> {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const content = fs.readFileSync(SETTINGS_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading hero-settings.json:', err);
  }
  return {};
}

function writeSettingsFile(data: any) {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing hero-settings.json:', err);
  }
}

export async function getHeroSettings(): Promise<HeroSettingsData> {
  const fileSettings = readSettingsFile();
  let dbSettings: any = null;

  try {
    const db: any = prisma;
    if (db?.heroSettings && typeof db.heroSettings.findFirst === 'function') {
      dbSettings = await db.heroSettings.findFirst();
    }
  } catch (err) {
    console.warn('Could not read heroSettings from Prisma:', err);
  }

  const currentSettings = {
    ...DEFAULT_SETTINGS,
    ...(dbSettings || {}),
    ...fileSettings,
  };

  let targetProductId = currentSettings.productId;
  let product = null;

  try {
    if (!targetProductId) {
      const firstProduct = await prisma.product.findFirst({
        orderBy: { createdAt: 'desc' },
      });
      targetProductId = firstProduct?.id || null;
    }

    if (targetProductId) {
      const p = await prisma.product.findUnique({
        where: { id: targetProductId },
        select: { id: true, name: true, price: true, imageUrl: true },
      });
      if (p) {
        product = {
          ...p,
          price: Number(p.price),
        };
      }
    }
  } catch (err) {
    console.error('Error fetching linked product:', err);
  }

  return {
    id: currentSettings.id || 'default-hero',
    title: currentSettings.title || '',
    subtitle: currentSettings.subtitle || '',
    buttonText: currentSettings.buttonText || 'اكتشف العطر',
    imageUrl: currentSettings.imageUrl || '/hero/featured-roots.png',
    productId: targetProductId,
    buttonPosY: Number(currentSettings.buttonPosY ?? 30),
    buttonPosX: Number(currentSettings.buttonPosX ?? 50),
    buttonColor: (currentSettings.buttonColor as any) || 'black',
    buttonSize: (currentSettings.buttonSize as any) || 'md',
    imageFit: (currentSettings.imageFit as any) || 'contain',
    product,
  };
}

export async function updateHeroSettings(data: {
  title?: string;
  subtitle?: string;
  buttonText: string;
  imageUrl: string;
  productId?: string | null;
  buttonPosY?: number;
  buttonPosX?: number;
  buttonColor?: 'white' | 'black' | 'gold' | 'glass';
  buttonSize?: 'sm' | 'md' | 'lg';
  imageFit?: 'contain' | 'cover';
}) {
  try {
    const payload = {
      id: 'default-hero',
      title: data.title || '',
      subtitle: data.subtitle || '',
      buttonText: data.buttonText || 'اكتشف العطر',
      imageUrl: data.imageUrl,
      productId: data.productId || null,
      buttonPosY: Number(data.buttonPosY ?? 30),
      buttonPosX: Number(data.buttonPosX ?? 50),
      buttonColor: data.buttonColor || 'black',
      buttonSize: data.buttonSize || 'md',
      imageFit: data.imageFit || 'contain',
      updatedAt: new Date().toISOString(),
    };

    // 1. Save to JSON file
    writeSettingsFile(payload);

    // 2. Save to database if available
    try {
      const db: any = prisma;
      if (db?.heroSettings) {
        await db.heroSettings.upsert({
          where: { id: 'default-hero' },
          create: payload,
          update: payload,
        });
      }
    } catch (dbErr) {
      console.warn('Prisma DB update warning:', dbErr);
    }

    revalidatePath('/');
    revalidatePath('/admin/hero');

    return { success: true };
  } catch (error: any) {
    console.error('Error in updateHeroSettings:', error);
    return { success: false, error: error.message || 'فشل تحديث إعدادات الواجهة' };
  }
}
