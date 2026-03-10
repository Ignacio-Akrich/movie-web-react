import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import queryString from "query-string";
import MovieCatalog from "../../components/MovieCatalog";
import Footer from "../../components/Footer";
import { URL_API, API_KEY } from "../../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import "./search.scss";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    (async () => {
      const { query: { s } } = queryString.parseUrl(location.search);
      const term = s || "trending";
      const response = await fetch(
        `${URL_API}/search/movie?api_key=${API_KEY}&language=es-ES&query=${term}&page=1`
      );
      const movies = await response.json();
      setSearchValue(typeof s === "undefined" ? "" : s);
      setMovieList(movies);
    })();
  }, [location.search]);

  const onChangeSearch = (e) => {
    const val = e.target.value;
    const urlParams = queryString.parse(location.search);
    urlParams.s = val;
    navigate(`?${queryString.stringify(urlParams)}`);
    setSearchValue(val);
  };

  return (
    <div className="search-page">
      <div className="search-page__hero">
        <h1>Busca tu película</h1>
        <div className="search-page__input-wrap">
          <SearchOutlined className="search-page__icon" />
          <input
            className="search-page__input"
            value={searchValue}
            onChange={onChangeSearch}
            placeholder="Título, director, género…"
            autoFocus
          />
        </div>
        {searchValue && (
          <p className="search-page__hint">
            Resultados para <strong>"{searchValue}"</strong>
          </p>
        )}
      </div>

      {movieList.results && movieList.results.length > 0 && (
        <div className="search-page__results">
          <MovieCatalog movies={movieList} />
        </div>
      )}

      {movieList.results && movieList.results.length === 0 && (
        <p className="search-page__empty">No se encontraron resultados.</p>
      )}

      <Footer />
    </div>
  );
}
