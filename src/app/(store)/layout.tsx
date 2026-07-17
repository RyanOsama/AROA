import Link from 'next/link';
import StoreHeader from '@/components/StoreHeader';
import { getProducts } from '@/actions/product';
import { getBrands } from '@/actions/brand';
import { Instagram, Twitter, Facebook, MessageCircle, Link2, Ghost } from 'lucide-react';
import RecommendedSection from '@/components/RecommendedSection';

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { brands } = await getBrands();
  const { products } = await getProducts();
  
  // Get 4 random products for recommendations
  const recommendedProducts = products ? [...products].sort(() => 0.5 - Math.random()).slice(0, 4) : [];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", backgroundColor: '#FFFFFF' }}>
      <StoreHeader brands={brands || []} />

      {/* Global animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(1.5deg); }
          66% { transform: translateY(-8px) rotate(-1deg); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-22px) rotate(-2deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .float-1 { animation: float 5s ease-in-out infinite; }
        .float-2 { animation: floatSlow 7s ease-in-out infinite 0.5s; }
        .float-3 { animation: float 6s ease-in-out infinite 1s; }
        .float-4 { animation: floatSlow 8s ease-in-out infinite 1.5s; }
        .float-5 { animation: float 5.5s ease-in-out infinite 2s; }
        .fade-up-1 { animation: fadeInUp 0.7s ease both 0.1s; }
        .fade-up-2 { animation: fadeInUp 0.7s ease both 0.3s; }
        .fade-up-3 { animation: fadeInUp 0.7s ease both 0.5s; }
        .fade-up-4 { animation: fadeInUp 0.7s ease both 0.7s; }
        .scale-in { animation: scaleIn 0.6s ease both; }
        .card-hover {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 24px 60px rgba(27,42,74,0.18);
        }
        .btn-shimmer {
          background: linear-gradient(90deg, #1B2A4A 0%, #2D4172 40%, #4A6FA8 60%, #1B2A4A 100%);
          background-size: 200% auto;
          animation: shimmer 2.5s linear infinite;
        }
        .brand-card {
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .brand-card:hover {
          transform: translateY(-8px) scale(1.08);
        }
      `}</style>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Recommended Section (You might like) */}
      <RecommendedSection products={recommendedProducts} />

      {/* Footer */}
      <footer className="py-20" style={{ backgroundColor: '#1B2A4A' }}>
        <div className="container mx-auto px-6 text-center">
          <div className="w-24 h-24 mx-auto mb-6">
            <img src="/logo/شعار.jpg" alt="الشعار" className="w-full h-full object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
          </div>
          <p className="font-black text-2xl tracking-[0.3em] mb-2" style={{ color: '#F5EFE6' }}>AROA PERFUMES</p>
          <p className="text-sm tracking-widest mb-8" style={{ color: '#C9A96E' }}>Luxury Scents · Timeless Elegance</p>
          
          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <a href="https://wa.me/967780791584" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#C9A96E] flex items-center justify-center transition-all duration-300 group">
              <MessageCircle className="w-5 h-5 text-gray-300 group-hover:text-white" />
            </a>
            <a href="https://instagram.com/aroa_perfumes" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#C9A96E] flex items-center justify-center transition-all duration-300 group">
              <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white" />
            </a>
            <a href="https://snapchat.com/add/aroa_perfumes" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#C9A96E] flex items-center justify-center transition-all duration-300 group">
              <Ghost className="w-5 h-5 text-gray-300 group-hover:text-white" />
            </a>
            <a href="https://twitter.com/aroa_perfumes" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#C9A96E] flex items-center justify-center transition-all duration-300 group">
              <Twitter className="w-5 h-5 text-gray-300 group-hover:text-white" />
            </a>
            <a href="https://facebook.com/aroa_perfumes" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#C9A96E] flex items-center justify-center transition-all duration-300 group">
              <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white" />
            </a>
          </div>

          <div className="w-32 h-px mx-auto mb-8" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />
          <p className="text-sm" style={{ color: '#4A6FA8' }}>© {new Date().getFullYear()} AROA Perfumes. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
