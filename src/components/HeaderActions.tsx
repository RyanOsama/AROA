'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useFavoriteStore } from '@/store/useFavoriteStore';

export default function HeaderActions() {
  const [isMounted, setIsMounted] = useState(false);
  const openCart = useCartStore((state) => state.openCart);
  const cartTotalItems = useCartStore((state) => state.getTotalItems());
  
  const openFavorite = useFavoriteStore((state) => state.openFavorite);
  const favoriteItems = useFavoriteStore((state) => state.items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex items-center gap-4">
      {/* Favorite Icon */}
      <button 
        onClick={openFavorite}
        className="p-2.5 text-gray-700 bg-white shadow-sm border border-gray-100 rounded-full hover:border-gold-300 hover:text-gold-600 hover:shadow-md transition-all relative group"
      >
        <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
        {isMounted && favoriteItems.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            {favoriteItems.length}
          </span>
        )}
      </button>

      {/* Cart Icon */}
      <button 
        onClick={openCart}
        className="p-2.5 text-gray-700 bg-white shadow-sm border border-gray-100 rounded-full hover:border-gold-300 hover:text-gold-600 hover:shadow-md transition-all relative group"
      >
        <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
        {isMounted && cartTotalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            {cartTotalItems}
          </span>
        )}
      </button>
    </div>
  );
}
