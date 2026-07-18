'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import { ShoppingBag, Heart, X, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Drawers() {
  const [isMounted, setIsMounted] = useState(false);
  const isCartOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const cartItems = useCartStore((state) => state.items);
  const cartTotalPrice = useCartStore((state) => state.getTotalPrice());
  const removeCartItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  
  const isFavoriteOpen = useFavoriteStore((state) => state.isOpen);
  const closeFavorite = useFavoriteStore((state) => state.closeFavorite);
  const favoriteItems = useFavoriteStore((state) => state.items);
  const removeFavorite = useFavoriteStore((state) => state.toggleFavorite); 

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let message = "مرحباً، أود إتمام طلب هذه المنتجات:\n\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - الكمية: ${item.quantity} - السعر: ${item.price * item.quantity} ر.س\n`;
    });
    
    message += `\nالمجموع الإجمالي: ${cartTotalPrice} ر.س`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/967780791584?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={closeCart} />
          <div className="relative w-full max-w-md shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300 bg-white">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold flex items-center gap-2 text-black">
                <ShoppingBag className="w-6 h-6 text-black" />
                سلة المشتريات
              </h2>
              <button onClick={closeCart} className="p-2 rounded-full transition-colors bg-gray-100 text-black hover:bg-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-5">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                  <ShoppingBag className="w-16 h-16 opacity-20 text-black" />
                  <p className="text-gray-500 font-medium">السلة فارغة حالياً</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                    <div className="w-20 h-20 rounded-xl relative overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100">
                      {item.imageUrl ? (
                        <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-2" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                          <ShoppingBag className="w-6 h-6 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <Link href={`/product/${item.id}`} onClick={closeCart} className="font-bold line-clamp-1 text-sm transition-opacity hover:opacity-70 text-black">{item.name}</Link>
                        <button onClick={() => removeCartItem(item.id)} className="text-gray-400 hover:text-red-500 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <span className="font-bold text-sm text-black">{item.price} ر.س</span>
                        <div className="flex items-center rounded-lg overflow-hidden border border-gray-200">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 transition-colors text-black bg-gray-100 hover:bg-gray-200">-</button>
                          <span className="px-2 text-sm font-bold w-8 text-center text-black bg-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 transition-colors text-black bg-gray-100 hover:bg-gray-200">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-medium text-gray-500">المجموع</span>
                  <span className="text-2xl font-black text-black">{cartTotalPrice} ر.س</span>
                </div>
                <button 
                  onClick={handleWhatsAppCheckout}
                  className="w-full font-bold py-4 rounded-xl transition-colors flex justify-center items-center gap-2 bg-black text-white hover:bg-neutral-800"
                >
                  إتمام الطلب
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Favorite Sidebar */}
      {isFavoriteOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={closeFavorite} />
          <div className="relative w-full max-w-md shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300 bg-white">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold flex items-center gap-2 text-black">
                <Heart className="w-6 h-6 text-black" />
                المفضلة
              </h2>
              <button onClick={closeFavorite} className="p-2 rounded-full transition-colors bg-gray-100 text-black hover:bg-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
              {favoriteItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                  <Heart className="w-16 h-16 opacity-20 text-black" />
                  <p className="text-gray-500 font-medium">قائمة المفضلة فارغة</p>
                </div>
              ) : (
                favoriteItems.map((item) => {
                  if (typeof item === 'string') {
                    return (
                      <div key={item} className="flex gap-4 border-b border-gray-100 pb-4 items-center">
                        <div className="flex-grow text-gray-400 text-sm">
                          منتج قديم (يرجى إزالته وإضافته من جديد)
                        </div>
                        <button onClick={() => removeFavorite(item as any)} className="text-gray-400 hover:text-red-500 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  }

                  return (
                    <Link 
                      href={`/product/${item.id}`} 
                      key={item.id} 
                      onClick={closeFavorite}
                      className="flex gap-4 border border-gray-100 hover:border-gray-300 transition-all rounded-2xl p-3 items-center group cursor-pointer bg-white shadow-sm hover:shadow-md"
                    >
                      <div className="w-16 h-16 rounded-xl relative overflow-hidden flex-shrink-0 transition-colors bg-gray-50">
                        {item.imageUrl ? (
                          <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-1 group-hover:scale-110 transition-transform" unoptimized />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <Heart className="w-5 h-5 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow flex flex-col justify-center">
                        <span className="font-bold line-clamp-1 mb-1 transition-colors text-black">
                          {item.name}
                        </span>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-sm text-black">{item.price} ر.س</span>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeFavorite(item);
                            }} 
                            className="text-gray-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
