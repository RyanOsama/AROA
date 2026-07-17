'use client';

import { useState } from 'react';
import { Eye } from 'lucide-react';
import ProductPreviewModal from './ProductPreviewModal';

export default function ProductPreviewButton({ product }: { product: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
        title="عرض التفاصيل"
      >
        <Eye className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <ProductPreviewModal 
          product={product} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
}
