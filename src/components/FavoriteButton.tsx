'use client';

import { Heart } from 'lucide-react';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import { useToastStore } from '@/store/useToastStore';

type FavoriteButtonProps = {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
  };
};

export default function FavoriteButton({ product }: FavoriteButtonProps) {
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const isFavorite = useFavoriteStore((state) => state.isFavorite(product.id));
  const addToast = useToastStore((state) => state.addToast);

  const handleToggle = () => {
    toggleFavorite(product);
    if (!isFavorite) {
      addToast('تمت إضافة المنتج إلى المفضلة', 'success');
    } else {
      addToast('تمت إزالة المنتج من المفضلة', 'info');
    }
  };

  return (
    <button 
      onClick={handleToggle}
      className={`p-2 border rounded-full transition-colors ${
        isFavorite 
          ? 'bg-red-50 border-red-200 text-red-500' 
          : 'border-gray-200 hover:bg-gray-50 text-gray-400 hover:text-red-500'
      }`}
    >
      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
    </button>
  );
}
