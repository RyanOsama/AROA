'use client';

import { updateProduct, getProductById } from '@/actions/product';
import { getBrands } from '@/actions/brand';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { uploadImageDirectly } from '@/utils/uploadImage';
import { ArrowRight, Save, Upload } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);
  const [brands, setBrands] = useState<any[]>([]);
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    Promise.all([getBrands(), getProductById(params.id)]).then(([brandsRes, productRes]) => {
      if (brandsRes.success && brandsRes.brands) {
        setBrands(brandsRes.brands);
      }
      if (productRes.success && productRes.product) {
        setInitialData(productRes.product);
      } else {
        setError(productRes.error || 'عطر غير موجود');
      }
      setFetching(false);
    });
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      // Only upload main image if changed
      if (file) {
        const imageUrl = await uploadImageDirectly(file);
        if (imageUrl) {
          formData.set('imageUrl', imageUrl);
        } else {
          throw new Error('فشل رفع الصورة الأساسية');
        }
      } else if (initialData?.imageUrl) {
        formData.set('imageUrl', initialData.imageUrl);
      }

      // Handle gallery files if any
      if (galleryFiles && galleryFiles.length > 0) {
        const galleryUrls: string[] = [];
        for (let i = 0; i < galleryFiles.length; i++) {
          const gUrl = await uploadImageDirectly(galleryFiles[i]);
          if (gUrl) galleryUrls.push(gUrl);
        }
        if (galleryUrls.length > 0) {
          formData.set('galleryUrls', galleryUrls.join(','));
        }
      } else if (initialData?.galleryUrls) {
        formData.set('galleryUrls', initialData.galleryUrls);
      }
      
      const result = await updateProduct(params.id, formData);
      
      if (result.success) {
        router.push('/admin/products');
        router.refresh();
      } else {
        throw new Error(result.error || 'حدث خطأ في التحديث');
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير معروف');
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return <div className="text-center py-20 text-gray-500">جاري تحميل البيانات...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-800">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold text-gray-800">تعديل العطر</h2>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">المعلومات الأساسية</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم العطر</label>
                <input type="text" name="name" defaultValue={initialData?.name} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الشركة (Brand)</label>
                <select name="brandId" defaultValue={initialData?.brandId || ''} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none bg-white">
                  <option value="">اختر الشركة...</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
              <textarea name="description" defaultValue={initialData?.description} rows={3} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">السعر الحالي (ر.س)</label>
                <input type="number" name="price" defaultValue={initialData?.price} step="0.01" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">السعر السابق (ر.س) - اختياري</label>
                <input type="number" name="originalPrice" defaultValue={initialData?.originalPrice} step="0.01" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تحديث صورة العطر</label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-xl px-4 py-6 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center cursor-pointer">
                  <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600 font-medium text-center">{file ? file.name : (initialData?.imageUrl ? 'اضغط لتغيير الصورة الحالية' : 'اضغط لاختيار صورة')}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تحديث صور إضافية</label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-xl px-4 py-6 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center cursor-pointer">
                  <input type="file" accept="image/*" multiple onChange={(e) => setGalleryFiles(e.target.files)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600 font-medium text-center">{galleryFiles && galleryFiles.length > 0 ? `تم اختيار ${galleryFiles.length} صور` : 'اضغط لاختيار صور بديلة'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">المكونات العطرية</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الافتتاحية</label>
              <input type="text" name="topNotes" defaultValue={initialData?.topNotes} placeholder="برغموت، يوسفي..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">القلب</label>
              <input type="text" name="heartNotes" defaultValue={initialData?.heartNotes} placeholder="ورد، ياسمين..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">القاعدة</label>
              <input type="text" name="baseNotes" defaultValue={initialData?.baseNotes} placeholder="مسك، عنبر..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">مواصفات العطر</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">بلد المنشأ</label>
              <input type="text" name="originCountry" defaultValue={initialData?.originCountry || "المملكة العربية السعودية"} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
              <select name="gender" defaultValue={initialData?.gender || "للجنسين"} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none bg-white">
                <option value="رجالي">رجالي</option>
                <option value="نسائي">نسائي</option>
                <option value="للجنسين">للجنسين</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الحجم</label>
              <input type="text" name="size" defaultValue={initialData?.size || "100 مل"} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">النوع</label>
              <input type="text" name="perfumeType" defaultValue={initialData?.perfumeType || "عطر فرنسي"} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">رقم الموديل (SKU)</label>
              <input type="text" defaultValue={initialData?.sku} disabled className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed outline-none" />
            </div>
          </div>
        </div>

        {/* Package Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">إعدادات البكج / العروض</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="isPackage" value="true" defaultChecked={initialData?.isPackage} className="w-5 h-5 rounded border-gray-300 text-gold-600 focus:ring-gold-500" />
            <span className="text-gray-700 font-medium">هذا المنتج عبارة عن مجموعة عروض (بكج) ويجب أن يظهر في قسم التخفيضات والعروض.</span>
          </label>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-gold-600 hover:bg-gold-700 text-white font-medium py-4 rounded-xl flex justify-center items-center gap-2 transition-colors disabled:opacity-70 shadow-lg shadow-gold-500/30 text-lg">
          {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save className="w-5 h-5" /> حفظ التعديلات</>}
        </button>
      </form>
    </div>
  );
}
