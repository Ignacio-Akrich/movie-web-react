import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import './MovieCatalog.scss';

export default function MovieCatalog({ movies: { results } }) {
  return (
    <div className="movie-catalog-grid">
      {results.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
