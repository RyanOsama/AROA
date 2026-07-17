'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, X, ChevronDown, Package, Percent } from 'lucide-react';
import HeaderActions from './HeaderActions';
import { useRouter } from 'next/navigation';

export default function StoreHeader({ brands }: { brands: any[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          
          {/* Mobile Menu & Search toggles */}
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 md:mr-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <img src="/logo/شعار.jpg" alt="الشعار" className="w-full h-full object-contain drop-shadow-md" />
            </div>
            <div className="flex-col leading-none hidden sm:flex">
              <span className="text-xl font-black tracking-[0.2em] text-[#1B2A4A]">AROA</span>
              <span className="text-[9px] tracking-[0.45em] font-medium text-[#8B7355]">PERFUMES</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-bold text-gray-800 hover:text-gold-600 transition-colors">الرئيسية</Link>
            
            <div className="relative group">
              <Link href="/#brands" className="text-sm font-bold text-gray-800 hover:text-gold-600 transition-colors flex items-center gap-1 py-4">
                الشركات <ChevronDown className="w-4 h-4" />
              </Link>
              <div className="absolute top-full right-0 w-64 bg-white border border-gray-100 shadow-xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100 p-2 z-50">
                {brands.map(brand => (
                  <Link key={brand.id} href={`/search?brand=${brand.id}`} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gold-600 rounded-xl transition-colors">
                    {brand.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/#discounts" className="text-sm font-bold text-gray-800 hover:text-gold-600 transition-colors flex items-center gap-1">
              التخفيضات <Percent className="w-4 h-4 text-red-500" />
            </Link>
            <Link href="/#packages" className="text-sm font-bold text-gray-800 hover:text-gold-600 transition-colors flex items-center gap-1">
              البكجات <Package className="w-4 h-4 text-gold-600" />
            </Link>
          </nav>

          {/* Actions & Search */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:block relative">
              <form onSubmit={handleSearch}>
                <input 
                  type="text" 
                  placeholder="ابحث عن عطر أو ماركة..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                />
                <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gold-600">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>
            <HeaderActions />
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {isSearchOpen && (
          <div className="md:hidden p-4 bg-white border-t border-gray-100 animate-in slide-in-from-top-2">
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="ابحث عن عطر أو ماركة..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
              />
              <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl animate-in slide-in-from-right flex flex-col">
            <div className="p-6 flex items-center justify-between border-b border-gray-100">
              <span className="text-xl font-black text-[#1B2A4A] tracking-widest">AROA</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 flex-grow overflow-y-auto">
              <div className="space-y-2">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
                  الرئيسية
                </Link>
                
                <div className="border-t border-gray-100 my-2"></div>
                
                <button 
                  onClick={() => setIsBrandsOpen(!isBrandsOpen)} 
                  className="w-full px-4 py-3 flex items-center justify-between text-base font-bold text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  الشركات <ChevronDown className={`w-5 h-5 transition-transform ${isBrandsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isBrandsOpen && (
                  <div className="pl-4 pr-6 py-2 space-y-1 bg-gray-50 rounded-xl mb-2">
                    {brands.map(brand => (
                      <Link 
                        key={brand.id} 
                        href={`/search?brand=${brand.id}`} 
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gold-600 transition-colors"
                      >
                        {brand.name}
                      </Link>
                    ))}
                  </div>
                )}
                  <div className="pt-4 border-t border-gray-100">
                  <div className="text-xs font-bold text-gray-400 mb-3 px-4">تسوق سريع</div>
                  <Link href="/#discounts" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                      <Percent className="w-4 h-4" />
                    </div>
                    التخفيضات
                  </Link>
                  <Link href="/#packages" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#FDFBF7] text-gold-600 flex items-center justify-center">
                      <Package className="w-4 h-4" />
                    </div>
                    بكجات العروض
                  </Link>
                  <Link href="/#brands" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                    الشركات
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
