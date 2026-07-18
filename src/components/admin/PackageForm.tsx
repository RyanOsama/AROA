'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/actions/product';
import { Save, Plus, Trash2, Search, Package, Upload } from 'lucide-react';
import Image from 'next/image';

export default function PackageForm({ perfumes, brands, initialData }: { perfumes: any[], brands: any[], initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Package Selection State
  const [selectedPerfumes, setSelectedPerfumes] = useState<any[]>(initialData?.packageItems || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  
  // Image Upload State
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter available perfumes
  const availablePerfumes = perfumes.filter(p => 
    !selectedPerfumes.find(sp => sp.id === p.id) &&
    (searchQuery ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
    (selectedBrand ? p.brandId === selectedBrand : true)
  );

  const handleAddPerfume = (perfume: any) => {
    setSelectedPerfumes([...selectedPerfumes, perfume]);
  };

  const handleRemovePerfume = (id: string) => {
    setSelectedPerfumes(selectedPerfumes.filter(p => p.id !== id));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) setImageUrl(data.url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    formData.set('isPackage', 'true');
    formData.set('perfumeType', 'مجموعة عروض');
    
    // Add selected items as JSON string
    formData.set('packageItems', JSON.stringify(selectedPerfumes.map(p => p.id)));
    
    if (imageUrl) {
      formData.set('imageUrl', imageUrl);
    }

    try {
      const result = initialData
        ? await updateProduct(initialData.id, formData)
        : await createProduct(formData);

      if (result.success) {
        router.push('/admin/products');
      } else {
        setError(result.error || 'حدث خطأ غير معروف');
      }
    } catch (err) {
      setError('حدث خطأ أثناء الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-2">
          <span>{error}</span>
        </div>
      )}

      {/* Basic Package Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6">
        <h3 className="text-base font-bold text-gray-800 mb-4 border-b pb-3">معلومات البكج</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">اسم البكج (مجموعة العرض) *</label>
            <input type="text" name="name" required defaultValue={initialData?.name} placeholder="مثال: مجموعة كأس العالم" className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">وصف مختصر (اختياري)</label>
            <input type="text" name="description" defaultValue={initialData?.description} placeholder="وصف جذاب للمجموعة..." className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">السعر الإجمالي للبكج (ر.س) *</label>
            <input type="number" step="0.01" name="price" required defaultValue={initialData?.price} placeholder="266" className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">السعر قبل الخصم (ر.س)</label>
            <input type="number" step="0.01" name="originalPrice" defaultValue={initialData?.originalPrice} placeholder="1009" className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">صورة البكج</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gold-400 transition-all bg-white relative overflow-hidden"
          >
            {imageUrl ? (
              <Image src={imageUrl} alt="Package Image" fill className="object-contain p-2" unoptimized />
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-500">
                  {uploadingImage ? 'جاري الرفع...' : 'اضغط هنا لرفع صورة البكج (يفضل خلفية بيضاء)'}
                </span>
              </>
            )}
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
          </div>
        </div>
      </div>

      {/* Package Items Builder - Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Right Side: Available Perfumes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col h-[400px]">
          <h3 className="text-base font-bold text-gray-800 mb-3 border-b pb-2 flex items-center gap-2">
            <Search className="w-4 h-4 text-gold-600" />
            البحث عن العطور لإضافتها
          </h3>
          
          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              placeholder="ابحث بالاسم..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-xs focus:outline-none focus:border-gold-500"
            />
            <select 
              value={selectedBrand}
              onChange={e => setSelectedBrand(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-xs focus:outline-none focus:border-gold-500"
            >
              <option value="">كل الشركات</option>
              {brands.map((b: any) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-2">
            {availablePerfumes.length === 0 ? (
              <div className="text-center py-10 text-gray-400">لا توجد عطور متوفرة مطابقة لبحثك</div>
            ) : (
              availablePerfumes.map(perfume => (
                <div key={perfume.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 hover:border-gold-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg border border-gray-100 flex items-center justify-center p-1 relative">
                      {perfume.imageUrl ? (
                         <Image src={perfume.imageUrl} alt={perfume.name} fill className="object-contain" unoptimized />
                      ) : (
                        <Package className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-800">{perfume.name}</div>
                      <div className="text-xs text-gray-500">{perfume.brand?.name} - {perfume.size}</div>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleAddPerfume(perfume)}
                    className="p-1.5 rounded-full text-gold-600 bg-gold-50 hover:bg-gold-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Left Side: Selected Perfumes */}
        <div className="bg-white rounded-xl shadow-sm border border-gold-200 p-4 flex flex-col h-[400px] ring-1 ring-gold-100">
          <h3 className="text-base font-bold text-gray-800 mb-3 border-b border-gold-100 pb-2 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gold-600" />
              محتويات البكج المحددة
            </span>
            <span className="bg-gold-100 text-gold-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
              {selectedPerfumes.length} عطور
            </span>
          </h3>

          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            {selectedPerfumes.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <Package className="w-12 h-12 mb-3 text-gold-200" />
                <p>لم تقم باختيار أي عطور للبكج بعد.</p>
                <p className="text-sm mt-1">اضغط على (+) من القائمة الجانبية لإضافة العطور.</p>
              </div>
            ) : (
              selectedPerfumes.map((perfume, index) => (
                <div key={perfume.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-l from-white to-gold-50/30 border border-gold-100 shadow-sm relative">
                  <div className="absolute top-2 right-2 text-gold-300 font-black text-2xl opacity-20">{index + 1}</div>
                  <div className="flex items-center gap-4 z-10">
                    <div className="w-12 h-12 bg-white rounded-lg border border-gray-100 flex items-center justify-center p-1 relative shadow-sm">
                      {perfume.imageUrl ? (
                         <Image src={perfume.imageUrl} alt={perfume.name} fill className="object-contain" unoptimized />
                      ) : (
                        <Package className="w-6 h-6 text-gray-300" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">{perfume.name}</div>
                      <div className="text-xs text-gray-600 mt-1 flex gap-2">
                        <span>{perfume.brand?.name}</span>
                        <span className="text-gray-300">|</span>
                        <span>{Number(perfume.price)} ر.س</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleRemovePerfume(perfume.id)}
                    className="p-1.5 rounded-full text-red-500 hover:bg-red-50 transition-colors z-10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading || selectedPerfumes.length === 0} 
        className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 transition-colors disabled:opacity-50 shadow-md text-sm"
      >
        {loading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <><Save className="w-5 h-5" /> {initialData ? 'حفظ التعديلات' : 'إنشاء البكج ونشره'}</>
        )}
      </button>
    </form>
  );
}
