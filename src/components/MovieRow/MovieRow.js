import React, { memo, useRef, useState, useCallback } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import MovieCard from '../MovieCard/MovieCard';
import SkeletonCard from '../Skeleton/SkeletonCard';
import './MovieRow.scss';

const SCROLL_AMOUNT = 600;

const MovieRow = memo(function MovieRow({ title, movies, loading }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft]   = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * SCROLL_AMOUNT, behavior: 'smooth' });
    // Update arrows after animation
    setTimeout(updateArrows, 350);
  };

  return (
    <section className="movie-row">
      <div className="movie-row__header">
        <h2 className="movie-row__title">{title}</h2>
        {!loading && movies.length > 0 && (
          <div className="movie-row__arrows">
            <button
              className="movie-row__arrow"
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              aria-label="Anterior"
            >
              <LeftOutlined />
            </button>
            <button
              className="movie-row__arrow"
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              aria-label="Siguiente"
            >
              <RightOutlined />
            </button>
          </div>
        )}
      </div>

      <div className="movie-row__track">
        <div
          className="movie-row__scroll"
          ref={scrollRef}
          onScroll={updateArrows}
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
          }
        </div>
        <div className="movie-row__fade movie-row__fade--left"  aria-hidden="true" />
        <div className="movie-row__fade movie-row__fade--right" aria-hidden="true" />
      </div>
    </section>
  );
});

export default MovieRow;
