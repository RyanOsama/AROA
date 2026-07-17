import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FavoriteItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
};

interface FavoriteState {
  items: FavoriteItem[]; 
  isOpen: boolean;
  openFavorite: () => void;
  closeFavorite: () => void;
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openFavorite: () => set({ isOpen: true }),
      closeFavorite: () => set({ isOpen: false }),
      toggleFavorite: (item) => {
        const currentItems = get().items;
        const exists = currentItems.some((i) => i.id === item.id);
        
        if (exists) {
          set({ items: currentItems.filter((i) => i.id !== item.id) });
        } else {
          set({ items: [...currentItems, item] });
        }
      },
      isFavorite: (id) => get().items.some((i) => i.id === id),
    }),
    {
      name: 'favorite-storage',
    }
  )
);
