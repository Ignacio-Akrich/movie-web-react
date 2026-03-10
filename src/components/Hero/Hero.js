import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { IMG_BASE } from '../../services/api';
import { useWatchlistContext } from '../../context/WatchlistContext';
import './Hero.scss';

export default function Hero({ movie }) {
  const { toggle, isInWatchlist } = useWatchlistContext();

  if (!movie) return <div className="hero hero--empty" />;

  const backdrop = `${IMG_BASE}/original${movie.backdrop_path}`;
  const year     = movie.release_date?.slice(0, 4);
  const rating   = movie.vote_average?.toFixed(1);
  const inList   = isInWatchlist(movie.id);

  return (
    <div className="hero" style={{ backgroundImage: `url(${backdrop})` }}>
      <div className="hero__overlay" />
      <div className="hero__content">
        <div className="hero__meta">
          <span className="hero__rating">⭐ {rating}</span>
          <span className="hero__year">{year}</span>
        </div>
        <h1 className="hero__title">{movie.title}</h1>
        <p className="hero__overview">{movie.overview}</p>
        <div className="hero__actions">
          <Link to={`/movie/${movie.id}`}>
            <button className="hero__btn hero__btn--primary">
              <PlayCircleOutlined /> Ver trailer
            </button>
          </Link>
          <Link to={`/movie/${movie.id}`}>
            <button className="hero__btn hero__btn--secondary">
              <InfoCircleOutlined /> Más info
            </button>
          </Link>
          <button
            className={`hero__btn hero__btn--icon ${inList ? 'active' : ''}`}
            onClick={() => toggle(movie)}
            title={inList ? 'Quitar de watchlist' : 'Agregar a watchlist'}
          >
            {inList ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
}
