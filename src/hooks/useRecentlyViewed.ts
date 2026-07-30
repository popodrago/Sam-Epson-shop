import { useState, useEffect } from 'react';

const STORAGE_KEY = 'avenue_recently_viewed_ids';

export function useRecentlyViewed() {
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentIds));
    } catch (e) {
      console.error('Error saving recent products to localStorage:', e);
    }
  }, [recentIds]);

  const addRecentlyViewed = (productId: string) => {
    setRecentIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 10); // Keep max 10
    });
  };

  return { recentIds, addRecentlyViewed };
}
