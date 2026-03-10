import React from 'react';
import Hero from '../components/Hero/Hero';
import MovieRow from '../components/MovieRow/MovieRow';
import Footer from '../components/Footer';
import { getNowPlaying, getPopular, getTopRated, getUpcoming } from '../services/api';
import useMovies from '../hooks/useMovies';
import './home.scss';

export default function Home() {
  const nowPlaying = useMovies(() => getNowPlaying());
  const popular    = useMovies(() => getPopular());
  const topRated   = useMovies(() => getTopRated());
  const upcoming   = useMovies(() => getUpcoming());

  return (
    <div className="home">
      <Hero movie={nowPlaying.movies[0]} />
      <div className="home__content">
        <MovieRow title="Últimos Estrenos"  movies={nowPlaying.movies} loading={nowPlaying.loading} />
        <MovieRow title="Populares"         movies={popular.movies}    loading={popular.loading}    />
        <MovieRow title="Mejor Valoradas"   movies={topRated.movies}   loading={topRated.loading}   />
        <MovieRow title="Próximos Estrenos" movies={upcoming.movies}   loading={upcoming.loading}   />
      </div>
      <Footer />
    </div>
  );
}
