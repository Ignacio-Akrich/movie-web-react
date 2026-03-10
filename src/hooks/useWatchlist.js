import { useState, useCallback } from 'react';

const STORAGE_KEY = 'movie_watchlist';

const getStored = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
};

export default function useWatchlist() {
  const [watchlist, setWatchlist] = useState(getStored);

  const toggle = useCallback((movie) => {
    setWatchlist(prev => {
      const exists = prev.find(m => m.id === movie.id);
      const updated = exists
        ? prev.filter(m => m.id !== movie.id)
        : [...prev, movie];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const remove = useCallback((id) => {
    setWatchlist(prev => {
      const updated = prev.filter(m => m.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isInWatchlist = useCallback(
    (id) => watchlist.some(m => m.id === id),
    [watchlist]
  );

  return { watchlist, toggle, remove, isInWatchlist };
}
