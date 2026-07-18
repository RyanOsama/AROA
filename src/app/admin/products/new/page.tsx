'use client';

import { createProduct } from '@/actions/product';
import { getBrands } from '@/actions/brand';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { uploadImageDirectly } from '@/utils/uploadImage';
import { ArrowRight, Save, Upload } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);
  const [brands, setBrands] = useState<any[]>([]);

  useEffect(() => {
    getBrands().then((res) => {
      if (res.success && res.brands) {
        setBrands(res.brands);
      }
    });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Extract form data before any async operations
    const formData = new FormData(e.currentTarget);
    
    if (!file) {
      setError('الرجاء اختيار صورة للعطر');
      setLoading(false);
      return;
    }

    try {
      // Upload main image
      const imageUrl = await uploadImageDirectly(file);
      if (imageUrl) {
        formData.set('imageUrl', imageUrl);
      } else {
        throw new Error('فشل رفع الصورة الأساسية');
      }

      // Upload gallery images if any
      if (galleryFiles && galleryFiles.length > 0) {
        const galleryUrls: string[] = [];
        for (let i = 0; i < galleryFiles.length; i++) {
          const gUrl = await uploadImageDirectly(galleryFiles[i]);
          if (gUrl) galleryUrls.push(gUrl);
        }
        if (galleryUrls.length > 0) {
          formData.set('galleryUrls', galleryUrls.join(','));
        }
      }
      
      const result = await createProduct(formData);
      
      if (result.success) {
        router.push('/admin/products');
        router.refresh();
      } else {
        throw new Error(result.error || 'حدث خطأ في الحفظ');
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير معروف');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-800">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold text-gray-800">إضافة عطر جديد</h2>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        {/* Basic Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">المعلومات الأساسية</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم العطر</label>
                <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الشركة (Brand)</label>
                <select name="brandId" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none bg-white">
                  <option value="">اختر الشركة...</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
              <textarea name="description" rows={3} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">السعر الحالي (ر.س)</label>
                <input type="number" name="price" step="0.01" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">السعر السابق (ر.س) - في حال وجود خصم</label>
                <input type="number" name="originalPrice" step="0.01" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">صورة العطر الرئيسية</label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-xl px-4 py-6 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center cursor-pointer">
                  <input type="file" accept="image/*" required onChange={(e) => setFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600 font-medium">{file ? file.name : 'اضغط هنا أو اسحب الصورة لرفعها'}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">صور إضافية (اختياري)</label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-xl px-4 py-6 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center cursor-pointer">
                  <input type="file" accept="image/*" multiple onChange={(e) => setGalleryFiles(e.target.files)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600 font-medium">{galleryFiles && galleryFiles.length > 0 ? `تم اختيار ${galleryFiles.length} صور` : 'اضغط لاختيار صور إضافية للعطر'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">المكونات العطرية</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الافتتاحية</label>
              <input type="text" name="topNotes" placeholder="برغموت، يوسفي..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">القلب</label>
              <input type="text" name="heartNotes" placeholder="ورد، ياسمين..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">القاعدة</label>
              <input type="text" name="baseNotes" placeholder="مسك، عنبر..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">مواصفات العطر</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">بلد المنشأ</label>
              <input type="text" name="originCountry" defaultValue="المملكة العربية السعودية" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
              <select name="gender" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none bg-white">
                <option value="رجالي">رجالي</option>
                <option value="نسائي">نسائي</option>
                <option value="للجنسين">للجنسين</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الحجم</label>
              <input type="text" name="size" defaultValue="100 مل" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">النوع</label>
              <input type="text" name="perfumeType" defaultValue="عطر فرنسي" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">رقم الموديل (SKU)</label>
              <input type="text" disabled placeholder="يتم توليده تلقائياً" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed outline-none" />
            </div>
          </div>
        </div>

        {/* Package Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">إعدادات البكج / العروض</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="isPackage" value="true" className="w-5 h-5 rounded border-gray-300 text-gold-600 focus:ring-gold-500" />
            <span className="text-gray-700 font-medium">هذا المنتج عبارة عن مجموعة عروض (بكج) ويجب أن يظهر في قسم التخفيضات والعروض.</span>
          </label>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-gold-600 hover:bg-gold-700 text-white font-medium py-4 rounded-xl flex justify-center items-center gap-2 transition-colors disabled:opacity-70 shadow-lg shadow-gold-500/30 text-lg">
          {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save className="w-5 h-5" /> حفظ ونشر العطر</>}
        </button>
      </form>
    </div>
  );
}
