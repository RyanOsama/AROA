'use client';

import { Share2 } from 'lucide-react';

export default function ShareButton() {
  const handleShare = async () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
        return;
      } catch (err) {}
    }
    
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        alert('تم نسخ رابط المنتج بنجاح! يمكنك مشاركته الآن.');
      } catch (err) {
        prompt('انسخ الرابط التالي للمشاركة:', url);
      }
    } else {
      prompt('انسخ الرابط التالي للمشاركة:', url);
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-gray-400"
      title="مشاركة المنتج"
    >
      <Share2 className="w-5 h-5" />
    </button>
  );
}
