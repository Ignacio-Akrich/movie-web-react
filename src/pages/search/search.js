import React, { useState, useEffect } from "react";
import { Row, Col, Input } from "antd";
import queryString from "query-string";
import MovieCatalog from "../../components/MovieCatalog";
import Footer from "../../components/Footer";
import { URL_API, API_KEY } from "../../utils/constants";
import {useLocation, useNavigate, useParams} from "react-router-dom";

import "./search.scss";


function Search(props) {
  let location = useLocation();
  let navigate = useNavigate();
  let params = useParams();
  const [movieList, setMovieList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    (async () => {
      const searchValue = queryString.parseUrl(location.search);
      const { s } = searchValue.query;
      const response = await fetch(
        `${URL_API}/search/movie?api_key=${API_KEY}&language=es-ES&query=${typeof s == "undefined" ? "star wars": s}&page=1`
      );
      const movies = await response.json();

      setSearchValue(s);
      setMovieList(movies);
    })();
  }, [location.search]);

  const onChangeSerach = e => {
    const urlParams = queryString.parse(location.search);
    urlParams.s = e.target.value;
    navigate(`?${queryString.stringify(urlParams)}`);
    setSearchValue(e.target.value);
  };
  return (
    <Row>
      <Col span={12} offset={6} className="search">
        <h1>Busca tu película</h1>
        <Input value={searchValue} onChange={onChangeSerach} />
      </Col>
      {movieList.results && (
        
        <Col span={24}>
          <Row>
            <MovieCatalog movies={movieList}  />
          </Row>
        </Col>
      )}
      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  );

}

export default Search;