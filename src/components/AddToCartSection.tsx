'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useToastStore } from '@/store/useToastStore';

type AddToCartSectionProps = {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
  };
};

export default function AddToCartSection({ product }: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const addToast = useToastStore((state) => state.addToast);

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
    });
    addToast('تمت إضافة المنتج إلى السلة بنجاح!', 'success');
  };

  return (
    <div className="flex flex-col gap-4 border-t pt-8">
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-700">الكمية</span>
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button 
            onClick={handleDecrement}
            className="px-4 py-2 hover:bg-gray-50 text-gray-600"
          >
            -
          </button>
          <span className="px-4 py-2 border-x border-gray-200 font-medium w-12 text-center">
            {quantity}
          </span>
          <button 
            onClick={handleIncrement}
            className="px-4 py-2 hover:bg-gray-50 text-gray-600"
          >
            +
          </button>
        </div>
      </div>

      <button 
        onClick={handleAddToCart}
        className="w-full bg-black text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors font-bold text-lg"
      >
        <ShoppingCart className="w-5 h-5" />
        إضافة للسلة
      </button>
    </div>
  );
}
