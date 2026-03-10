import React, { useState, useEffect } from "react";
import { URL_API, API_KEY } from "../utils/constants";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import MovieCatalog from "../components/MovieCatalog";
import Pagination from "../components/Pagination";
import './catalog-page.scss';

export default function NewMovies() {
  const [moviesList, setMoviesList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${URL_API}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=${page}`);
      const json = await response.json();
      setMoviesList(json);
    })();
  }, [page]);

  return (
    <div className="catalog-page">
      <h1 className="catalog-page__title">Últimos Estrenos</h1>
      {moviesList.results ? (
        <>
          <Pagination
            currentPage={moviesList.page}
            totalItems={moviesList.total_results}
            onChangePage={setPage}
          />
          <MovieCatalog movies={moviesList} />
          <Pagination
            currentPage={moviesList.page}
            totalItems={moviesList.total_results}
            onChangePage={setPage}
          />
        </>
      ) : (
        <Loading />
      )}
      <Footer />
    </div>
  );
}
