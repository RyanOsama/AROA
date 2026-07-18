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
          box-shadow: 0 24px 60px rgba(0,0,0,0.18);
        }
        .btn-shimmer {
          background: linear-gradient(90deg, #000000 0%, #333333 40%, #666666 60%, #000000 100%);
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
      <footer className="py-20" style={{ backgroundColor: '#000000' }}>
        <div className="container mx-auto px-6 text-center">
          <div className="w-24 h-24 mx-auto mb-6">
            <img src="/logo/agora-white.png" alt="الشعار" className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity drop-shadow-md" />
          </div>
          <p className="font-black text-2xl tracking-[0.3em] mb-2" style={{ color: '#ffffff' }}>AROA PERFUMES</p>
          <p className="text-sm tracking-widest mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>Luxury Scents · Timeless Elegance</p>
          
          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-10">
            <a href="https://wa.me/967780791584" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-white/15 group-hover:bg-[#25D366] group-hover:border-[#25D366] group-hover:scale-110 text-white/50 group-hover:text-white">
                <svg className="w-5 h-5 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </div>
              <span className="text-xs text-white/30 group-hover:text-[#25D366] transition-colors" dir="ltr">+967780791584</span>
            </a>

            <a href="https://instagram.com/aroa_perfumes" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-white/15 group-hover:bg-[#E1306C] group-hover:border-[#E1306C] group-hover:scale-110 text-white/50 group-hover:text-white">
                <svg className="w-5 h-5 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
              <span className="text-xs text-white/30 group-hover:text-[#E1306C] transition-colors" dir="ltr">@aroa_perfumes</span>
            </a>

            <a href="https://snapchat.com/add/aroa_perfumes" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-white/15 group-hover:bg-[#FFFC00] group-hover:border-[#FFFC00] group-hover:scale-110 text-white/50 group-hover:text-black">
                <svg className="w-5 h-5 transition-colors" viewBox="0 0 496 512" fill="currentColor"><path d="M247.9 3.1c-14.7 9.8-23.7 20-33 34.1-13 19.6-18.7 34.6-26.1 68.6-4.6 20.9-4.8 28.5-1.5 35.8 4.1 9.1 14.8 17.6 27.6 21.8 11.8 3.9 14.6 4.2 24.3 2.7 8.5-1.3 9.4-1.3 22-1.3 15.5 0 20.3 1.1 27.2 6.1 7.4 5.3 11 12 11.4 20.8.4 9.1-3 15.6-11.4 21.8-8.2 6-12.8 7.3-30.7 8.9-19.4 1.7-27.1 1.2-46.7-3.2-10.7-2.3-22.9-4-27.2-3.8-13.6.5-22.1 6-25.2 16.3-1.8 5.7-1.3 16.1 1 20.7 1.4 2.8 3.1 3.5 12 5.1 12.3 2.2 19 3.5 25.4 4.9 22.8 5.1 27.4 6.7 36 12.3 8.3 5.4 14.2 13 16.2 20.8 1.4 5.4 1.3 11.9-.3 15.6-3 6.9-11 14.2-18.7 17.2-4.1 1.6-10.5 2.1-23.1 1.8-12.2-.3-21.2.2-26.3 1.4-8 1.9-15 6.6-18.7 12.6-4.9 7.9-5.1 16.4-.6 24 3.7 6.4 12.9 13.5 22.7 17.6 6 2.5 12.1 3.8 26.2 5.5 14.6 1.7 18.9 2.5 23.3 4.2 5.6 2.1 11.1 5.9 14.5 10.1 6.5 8 5.3 20.7-2.8 29.8-5 5.6-10.5 8.9-20.1 12.2-4.1 1.4-15 3.3-24.3 4.2-19.2 1.9-22.2 2.4-27.2 4.6-6.6 2.8-14.7 10-18.7 16.6-5.8 9.5-6.5 21.6-1.8 31.4 3 6.1 9.8 13.8 16.4 18.5 7.7 5.5 20.5 10 32.8 11.5 8.7 1.1 29.2 1.4 37.1.5 18.1-2 29.9-5.1 41.2-10.8 11.1-5.6 24.3-14.7 31.4-21.6 3-2.9 6.2-5.3 7.2-5.3 1 0 4.2 2.4 7.2 5.3 7.1 6.9 20.3 16 31.4 21.6 11.3 5.7 23.1 8.8 41.2 10.8 7.9.9 28.4.6 37.1-.5 12.3-1.5 25.1-6 32.8-11.5 6.6-4.7 13.4-12.4 16.4-18.5 4.7-9.8 4-21.9-1.8-31.4-4-6.6-12.1-13.8-18.7-16.6-5-2.2-8-2.7-27.2-4.6-9.3-.9-20.2-2.8-24.3-4.2-9.6-3.3-15.1-6.6-20.1-12.2-8.1-9.1-9.3-21.8-2.8-29.8 3.4-4.2 8.9-8 14.5-10.1 4.4-1.7 8.7-2.5 23.3-4.2 14.1-1.7 20.2-3 26.2-5.5 9.8-4.1 19-11.2 22.7-17.6 4.5-7.6 4.3-16.1-.6-24-3.7-6-10.7-10.7-18.7-12.6-5.1-1.2-14.1-1.7-26.3-1.4-12.6.3-19-.2-23.1-1.8-7.7-3-15.7-10.3-18.7-17.2-1.6-3.7-1.7-10.2-.3-15.6 2-7.8 7.9-15.4 16.2-20.8 8.6-5.6 13.2-7.2 36-12.3 6.4-1.4 13.1-2.7 25.4-4.9 8.9-1.6 10.6-2.3 12-5.1 2.3-4.6 2.8-15 1-20.7-3.1-10.3-11.6-15.8-25.2-16.3-4.3-.2-16.5 1.5-27.2 3.8-19.6 4.4-27.3 4.9-46.7 3.2-17.9-1.6-22.5-2.9-30.7-8.9-8.4-6.2-11.8-12.7-11.4-21.8.4-8.8 4-15.5 11.4-20.8 6.9-5 11.7-6.1 27.2-6.1 12.6 0 13.5 0 22 1.3 9.7 1.5 12.5 1.2 24.3-2.7 12.8-4.2 23.5-12.7 27.6-21.8 3.3-7.3 3.1-14.9-1.5-35.8-7.4-34-13.1-49-26.1-68.6-9.3-14.1-18.3-24.3-33-34.1C279.7-1 262.3-1 247.9 3.1z"/></svg>
              </div>
              <span className="text-xs text-white/30 group-hover:text-[#FFFC00] transition-colors" dir="ltr">@aroa_perfumes</span>
            </a>

            <a href="https://twitter.com/aroa_perfumes" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-white/15 group-hover:bg-white group-hover:border-white group-hover:scale-110 text-white/50 group-hover:text-black">
                <svg className="w-5 h-5 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </div>
              <span className="text-xs text-white/30 group-hover:text-white transition-colors" dir="ltr">@aroa_perfumes</span>
            </a>

            <a href="https://facebook.com/aroa_perfumes" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-white/15 group-hover:bg-[#1877F2] group-hover:border-[#1877F2] group-hover:scale-110 text-white/50 group-hover:text-white">
                <svg className="w-5 h-5 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
              <span className="text-xs text-white/30 group-hover:text-[#1877F2] transition-colors" dir="ltr">@aroa_perfumes</span>
            </a>
          </div>

          <div className="w-32 h-px mx-auto mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }} />
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>© {new Date().getFullYear()} AROA Perfumes. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
