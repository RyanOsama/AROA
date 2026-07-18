import Link from 'next/link';
import { Package, PlusCircle, Home, LogOut, Building2, Gift } from 'lucide-react';
import { logoutAction } from '@/actions/auth';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen text-right bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col z-20 border-l border-gray-100">
        <div className="p-6 border-b border-gray-100 flex flex-col items-center justify-center gap-3">
          <img src="/logo/agora-white.png" alt="شعار المتجر" className="w-20 h-20 object-contain drop-shadow-md invert opacity-90" />
          <h1 className="text-xl font-bold tracking-widest text-gray-800">لوحة الإدارة</h1>
        </div>
        <nav className="mt-6 flex-1">
          <Link href="/admin/products" className="flex items-center px-4 py-3 mx-2 my-1 rounded-lg transition-all text-gray-700 hover:bg-gold-50 hover:text-gold-700 hover:translate-x-1">
            <Package className="w-5 h-5 ml-3" />
            <span className="font-medium">المنتجات</span>
          </Link>
          <Link href="/admin/brands" className="flex items-center px-4 py-3 mx-2 my-1 rounded-lg transition-all text-gray-700 hover:bg-gold-50 hover:text-gold-700 hover:translate-x-1">
            <Building2 className="w-5 h-5 ml-3" />
            <span className="font-medium">الشركات (الماركات)</span>
          </Link>
          <Link href="/admin/products/new" className="flex items-center px-4 py-3 mx-2 my-1 rounded-lg transition-all text-gray-700 hover:bg-gold-50 hover:text-gold-700 hover:translate-x-1">
            <PlusCircle className="w-5 h-5 ml-3" />
            <span className="font-medium">إضافة عطر</span>
          </Link>
          <Link href="/admin/packages" className="flex items-center px-4 py-3 mx-2 my-1 rounded-lg transition-all text-gray-700 hover:bg-gold-50 hover:text-gold-700 hover:translate-x-1">
            <Gift className="w-5 h-5 ml-3" />
            <span className="font-medium">البكجات</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
          <Link href="/" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Home className="w-5 h-5 ml-3" />
            <span>العودة للمتجر</span>
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-right">
              <LogOut className="w-5 h-5 ml-3" />
              <span>تسجيل خروج</span>
            </button>
          </form>
        </div>

      </aside>

      <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
