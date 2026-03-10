import React from 'react';
import { Link } from 'react-router-dom';
import { useWatchlistContext } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard/MovieCard';
import Footer from '../components/Footer';
import './watchlist.scss';

export default function Watchlist() {
  const { watchlist } = useWatchlistContext();

  return (
    <div className="watchlist-page">
      <div className="watchlist-page__header">
        <h1>Mi Watchlist</h1>
        <span className="watchlist-page__count">{watchlist.length} película{watchlist.length !== 1 ? 's' : ''}</span>
      </div>

      {watchlist.length === 0 ? (
        <div className="watchlist-page__empty">
          <p>Todavía no has guardado ninguna película.</p>
          <Link to="/" className="watchlist-page__cta">Explorar películas</Link>
        </div>
      ) : (
        <div className="watchlist-page__grid">
          {watchlist.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}
