import React from "react";
import {Row , Col} from "antd";
import useFetch from "../hooks/useFetch";
import { URL_API, API_KEY} from '../utils/constants';
import SliderMovies from "../components/SliderMovies";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";

export default function Home() {
  const newMovies = useFetch(`${URL_API}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`);
  const popularMovies = useFetch(`${URL_API}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`);
  const topMovies = useFetch(`${URL_API}/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`);
  
  return (
    <div>
      <SliderMovies movies={newMovies}/>
      <Row>
        <Col span={12}>
          <MovieList movies={popularMovies} title="Peliculas Populares" />
        </Col>
        <Col span={12}>
          <MovieList movies={topMovies} title="Top Mejores Peliculas" />
        </Col>        
      </Row>
      <Footer />
    </div>
  );
}