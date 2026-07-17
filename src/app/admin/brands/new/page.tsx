'use client';

import { createBrand } from '@/actions/brand';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { ArrowRight, Save, Upload } from 'lucide-react';
import Link from 'next/link';

export default function NewBrandPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Extract form data before any async operations
    const formData = new FormData(e.currentTarget);

    try {
      let logoUrl = '';

      if (file) {
        const uploadData = new FormData();
        uploadData.append('file', file);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });
        
        const uploadResult = await uploadRes.json();
        
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'فشل رفع الشعار');
        }
        logoUrl = uploadResult.url;
      }

      if (logoUrl) {
        formData.set('logoUrl', logoUrl);
      }
      
      const result = await createBrand(formData);
      
      if (result.success) {
        router.push('/admin/brands');
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
    <div className="max-w-2xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/brands" className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-800">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold text-gray-800">إضافة شركة جديدة</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اسم الشركة</label>
            <input 
              type="text" 
              name="name" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none"
              placeholder="مثال: لافيرن، شانيل..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الوصف (اختياري)</label>
            <textarea 
              name="description" 
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none"
              placeholder="نبذة عن الشركة..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">شعار الشركة (اختياري)</label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl px-4 py-6 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setFile(e.target.files?.[0] || null)} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              />
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600 font-medium">
                {file ? file.name : 'اضغط هنا أو اسحب الشعار لرفعه'}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-50">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gold-600 hover:bg-gold-700 text-white font-medium py-4 rounded-xl flex justify-center items-center gap-2 transition-colors disabled:opacity-70 shadow-lg shadow-gold-500/30 text-lg"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  حفظ الشركة
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
