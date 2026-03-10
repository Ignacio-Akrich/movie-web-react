import React, { memo } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import SkeletonCard from '../Skeleton/SkeletonCard';
import './MovieRow.scss';

const MovieRow = memo(function MovieRow({ title, movies, loading }) {
  return (
    <section className="movie-row">
      <h2 className="movie-row__title">{title}</h2>
      <div className="movie-row__scroll">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
        }
      </div>
    </section>
  );
});

export default MovieRow;
