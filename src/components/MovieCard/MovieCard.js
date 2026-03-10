import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';
import { IMG_BASE } from '../../services/api';
import { useWatchlistContext } from '../../context/WatchlistContext';
import './MovieCard.scss';

const MovieCard = memo(function MovieCard({ movie }) {
  const { toggle, isInWatchlist } = useWatchlistContext();
  const { id, title, poster_path, vote_average, release_date } = movie;

  const poster = poster_path ? `${IMG_BASE}/w342${poster_path}` : null;
  const year   = release_date?.slice(0, 4);
  const rating = vote_average?.toFixed(1);
  const inList = isInWatchlist(id);

  return (
    <div className="movie-card">
      <Link to={`/movie/${id}`}>
        <div className="movie-card__poster">
          {poster
            ? <img src={poster} alt={title} loading="lazy" />
            : <div className="movie-card__no-poster"><span>{title}</span></div>
          }
          <div className="movie-card__overlay">
            <div className="movie-card__info">
              <p className="movie-card__title">{title}</p>
              <div className="movie-card__meta">
                <span className="movie-card__rating"><StarFilled /> {rating}</span>
                <span className="movie-card__year">{year}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <button
        className={`movie-card__watchlist-btn ${inList ? 'active' : ''}`}
        onClick={() => toggle(movie)}
        title={inList ? 'Quitar de watchlist' : 'Guardar en watchlist'}
      >
        {inList ? '✓' : '+'}
      </button>
    </div>
  );
});

export default MovieCard;
