'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HeroSettingsData, updateHeroSettings } from '@/actions/hero';
import { uploadImageDirectly } from '@/utils/uploadImage';
import { Sparkles, Upload, Check, ExternalLink, Move, Palette, MousePointerClick } from 'lucide-react';

interface HeroSettingsFormProps {
  initialSettings: HeroSettingsData;
  products: any[];
}

export default function HeroSettingsForm({ initialSettings, products }: HeroSettingsFormProps) {
  const [buttonText, setButtonText] = useState(initialSettings.buttonText || 'عرض العطر');
  const [imageUrl, setImageUrl] = useState(initialSettings.imageUrl || '/hero/featured-amber.png');
  const [productId, setProductId] = useState(initialSettings.productId || (products[0]?.id || ''));
  
  // Custom Button Controls (Position, Color, Size)
  const [buttonPosY, setButtonPosY] = useState<number>(initialSettings.buttonPosY ?? 80);
  const [buttonPosX, setButtonPosX] = useState<number>(initialSettings.buttonPosX ?? 50);
  const [buttonColor, setButtonColor] = useState<'white' | 'black' | 'gold' | 'glass'>(
    initialSettings.buttonColor || 'glass'
  );
  const [buttonSize, setButtonSize] = useState<'sm' | 'md' | 'lg'>(
    initialSettings.buttonSize || 'sm'
  );

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const selectedProduct = products.find(p => p.id === productId);

  // Click on preview image to position button with 100% precision
  const handlePreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const pctX = Math.round((clickX / rect.width) * 100);
    const pctY = Math.round((clickY / rect.height) * 100);

    setButtonPosX(Math.max(5, Math.min(95, pctX)));
    setButtonPosY(Math.max(5, Math.min(95, pctY)));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImageDirectly(file);
      if (url) {
        setImageUrl(url);
      }
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء رفع الصورة');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(false);

    try {
      const res = await updateHeroSettings({
        buttonText,
        imageUrl,
        productId: productId || null,
        buttonPosY,
        buttonPosX,
        buttonColor,
        buttonSize,
        imageFit: 'cover',
      });

      if (res.success) {
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), 4000);
      } else {
        alert(res.error || 'حدث خطأ أثناء الحفظ');
      }
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء حفظ الإعدادات');
    } finally {
      setSaving(false);
    }
  };

  // Preview button styles
  const previewColors: Record<string, string> = {
    white: 'bg-white text-zinc-950 shadow-2xl border border-white',
    black: 'bg-zinc-950 text-white shadow-2xl border border-white/20',
    gold: 'bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 text-zinc-950 font-black shadow-xl',
    glass: 'bg-black/60 text-white backdrop-blur-md border border-white/40 shadow-xl',
  };

  const previewSizes: Record<string, string> = {
    sm: 'px-5 py-2 text-xs',
    md: 'px-7 py-2.5 text-sm',
    lg: 'px-9 py-3 text-base',
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
            <span>تخصيص الواجهة الرئيسية</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900">إدارة وموقع زر العطر</h1>
          <p className="text-sm text-gray-500 mt-1">
            انقر على الصورة مباشرة في المعاينة لتحديد مكان الزر بدقة، أو استخدم المؤشرات.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold transition-colors"
        >
          <span>مشاهدة المتجر الآن</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 animate-fadeIn">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-sm">تم حفظ التعديلات بنجاح!</p>
            <p className="text-xs text-emerald-700">تم تحديث موقع الزر وشكل البانر في واجهة المتجر فوراً.</p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Controls Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-5 space-y-6">
          
          {/* Card 1: Target Perfume */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
              <span className="w-2.5 h-2.5 rounded-full bg-black" />
              1. اختر العطر المرتبط
            </h2>

            <div>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-black focus:bg-white transition-colors"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} · {p.price} ر.ي {p.brand?.name ? `(${p.brand.name})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {selectedProduct && (
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3">
                {selectedProduct.imageUrl && (
                  <div className="relative w-12 h-12 bg-white rounded-lg p-1 border border-gray-100 shrink-0">
                    <Image
                      src={selectedProduct.imageUrl}
                      alt={selectedProduct.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">{selectedProduct.name}</p>
                  <p className="text-xs text-emerald-600 font-bold mt-0.5">{selectedProduct.price} ر.ي</p>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Button Placement & Coordinates */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Move className="w-4 h-4 text-gray-700" />
                2. إحداثيات موقع الزر
              </h2>
              <span className="text-xs font-mono bg-zinc-100 px-2.5 py-1 rounded-md text-zinc-800 font-bold">
                {buttonPosY}% عمودي · {buttonPosX}% أفقي
              </span>
            </div>

            {/* Vertical Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-2">
                <span>الارتفاع الرأسي (أعلى / أسفل):</span>
                <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-900">{buttonPosY}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="95"
                step="1"
                value={buttonPosY}
                onChange={(e) => setButtonPosY(Number(e.target.value))}
                className="w-full accent-black cursor-pointer h-2 bg-gray-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>أعلى الصورة (5%)</span>
                <span>المنتصف (50%)</span>
                <span>أسفل الصورة / القاعدة (80% - 90%)</span>
              </div>
            </div>

            {/* Horizontal Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-2">
                <span>الموقع الأفقي (يمين / يسار):</span>
                <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-900">{buttonPosX}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="95"
                step="1"
                value={buttonPosX}
                onChange={(e) => setButtonPosX(Number(e.target.value))}
                className="w-full accent-black cursor-pointer h-2 bg-gray-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>اليمين (5%)</span>
                <span>المنتصف (50%)</span>
                <span>اليسار (95%)</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => { setButtonPosX(50); setButtonPosY(80); }}
                className="text-xs bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg text-zinc-800 font-semibold transition-colors"
              >
                أسفل زجاجة العطر (القاعدة: 80%)
              </button>
              <button
                type="button"
                onClick={() => { setButtonPosX(50); setButtonPosY(30); }}
                className="text-xs bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg text-zinc-800 font-semibold transition-colors"
              >
                أعلى غطاء العطر (30%)
              </button>
            </div>
          </div>

          {/* Card 3: Button Appearance */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
              <Palette className="w-4 h-4 text-gray-700" />
              3. مظهر الزر ونصه
            </h2>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                النص المكتوب داخل الزر:
              </label>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="مثال: عرض العطر أو اكتشف العطر"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-black focus:bg-white transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                لون وخامة الزر:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'glass', label: 'زجاجي بلوري', preview: 'bg-black/60 border border-white text-white' },
                  { id: 'black', label: 'أسود فخم', preview: 'bg-black text-white' },
                  { id: 'white', label: 'أبيض ناصع', preview: 'bg-white border text-black' },
                  { id: 'gold', label: 'ذهبي ملوكي', preview: 'bg-amber-400 text-black font-bold' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setButtonColor(c.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      buttonColor === c.id
                        ? 'border-black ring-2 ring-black/10 bg-gray-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-full py-1.5 rounded-lg text-xs mb-1.5 shadow-sm ${c.preview}`}>
                      نموذج
                    </div>
                    <span className="text-xs font-bold text-gray-800">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                حجم الزر:
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'sm', label: 'صغير' },
                  { id: 'md', label: 'متوسط' },
                  { id: 'lg', label: 'كبير وبارز' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setButtonSize(s.id as any)}
                    className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                      buttonSize === s.id
                        ? 'border-black bg-zinc-900 text-white shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card 4: Upload Custom Image */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
              <span className="w-2.5 h-2.5 rounded-full bg-black" />
              4. رفع صورة جديدة
            </h2>

            <div className="relative border-2 border-dashed border-gray-200 hover:border-black rounded-xl p-4 text-center transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600 font-semibold">
                {uploading ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                <span>{uploading ? 'جاري رفع صورتك...' : 'اضغط لاختيار صورة من جهازك'}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving || uploading}
            className="w-full py-4 bg-zinc-950 hover:bg-black text-white font-bold rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>جاري الحفظ...</span>
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                <span>حفظ التعديلات ونشرها فوراً</span>
              </>
            )}
          </button>
        </form>

        {/* Live Visual Preview with 1:1 Aspect Ratio & Direct Click-To-Position */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <MousePointerClick className="w-4 h-4 text-gray-700" />
                <span>انقر مباشرة على الصورة لوضع الزر في أي مكان</span>
              </h3>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                انقر لتحديد الموقع
              </span>
            </div>

            {/* 1:1 Aspect Ratio Interactive Preview Container */}
            <div 
              onClick={handlePreviewClick}
              className="relative w-full rounded-xl overflow-hidden shadow-lg border-2 border-zinc-300 select-none cursor-crosshair group bg-zinc-950"
              title="انقر في أي مكان لوضع الزر هنا"
            >
              {/* Full Image */}
              <img
                src={imageUrl || '/hero/featured-amber.png'}
                alt="Banner Preview"
                className="w-full h-auto block pointer-events-none"
              />

              {/* Dynamic Button Positioned Live */}
              <div
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 pointer-events-none"
                style={{
                  top: `${buttonPosY}%`,
                  left: `${buttonPosX}%`,
                }}
              >
                <div
                  className={`inline-flex items-center gap-2 rounded-full font-bold tracking-wider ${
                    previewColors[buttonColor] || previewColors.glass
                  } ${previewSizes[buttonSize] || previewSizes.sm}`}
                >
                  <span>{buttonText || 'عرض العطر'}</span>
                  <span>←</span>
                </div>
              </div>

              {/* Helper overlay on hover */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                <span className="bg-black/80 text-white text-xs px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                  انقر هنا لوضع الزر في هذه النقطة
                </span>
              </div>

              {/* Position helper badge */}
              <div className="absolute top-3 left-3 bg-black/75 text-white text-[11px] font-mono px-2.5 py-1 rounded-md backdrop-blur-sm pointer-events-none shadow-md">
                موقع الزر: {buttonPosY}% عمودي · {buttonPosX}% أفقي
              </div>
            </div>

            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-600 mt-3 flex items-center gap-2">
              <span className="text-base">💡</span>
              <span>
                <strong>طريقة سهلة:</strong> حرك الماوس وانقر مباشرة على حجر القاعدة في الصورة أعلاه، وسيقفز الزر فوراً إلى نفس المكان ويظهر في المتجر بنسبة تطابق 100%!
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
