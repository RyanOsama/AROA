'use client';

import { loginAction } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    
    const result = await loginAction(formData);
    
    if (result.success) {
      router.push('/admin/products');
      router.refresh();
    } else {
      setError(result.error || 'حدث خطأ في الدخول');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#EDE3D6' }} dir="rtl">
      <div className="max-w-md w-full rounded-2xl shadow-2xl p-8 border" style={{ backgroundColor: '#F5EFE6', borderColor: '#D4C5B0' }}>
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <img src="/logo/agora-white.png" alt="الشعار" className="w-full h-full object-contain drop-shadow-xl invert opacity-90" onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }} />
          </div>
          <h2 className="text-2xl font-black mb-2 text-black">تسجيل الدخول للإدارة</h2>
          <p className="text-sm font-medium" style={{ color: '#8B7355' }}>يرجى إدخال البيانات للوصول إلى لوحة التحكم</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl text-sm border text-center font-bold" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
            {error}
          </div>
        )}

        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await handleSubmit(formData);
        }} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-bold mb-2 text-black">اسم المستخدم</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all bg-white text-black"
              placeholder="admin"
              dir="ltr"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold mb-2 text-black">كلمة المرور</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all bg-white text-black"
              placeholder="••••••••"
              dir="ltr"
            />
          </div>

          <button
            type="submit" 
            disabled={loading}
            className="w-full font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 bg-black text-white hover:bg-neutral-800"
          >
            {loading ? (
              <img src="/logo/agora-white.png" alt="جاري التحميل..." className="w-6 h-6 object-contain invert animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                دخول
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
