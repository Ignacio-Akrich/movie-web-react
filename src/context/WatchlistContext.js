import React, { createContext, useContext } from 'react';
import useWatchlist from '../hooks/useWatchlist';

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const watchlist = useWatchlist();
  return (
    <WatchlistContext.Provider value={watchlist}>
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlistContext = () => useContext(WatchlistContext);
