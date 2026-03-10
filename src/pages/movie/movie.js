import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import useFetch from "../../hooks/useFetch";
import { URL_API, API_KEY } from "../../utils/constants";
import { useWatchlistContext } from "../../context/WatchlistContext";
import Loading from "../../components/Loading";
import ModalVideo from "../../components/ModalVideo";
import { PlayCircleOutlined, HeartOutlined, CheckOutlined } from '@ant-design/icons';
import "./movie.scss";

export default function Movie() {
  const { id } = useParams();
  const movieInfo = useFetch(`${URL_API}/movie/${id}?api_key=${API_KEY}&language=es-ES`);

  if (movieInfo.loading || !movieInfo.data) return <Loading />;
  return <RenderMovie movieInfo={movieInfo.data} />;
}

function RenderMovie({ movieInfo }) {
  const { backdrop_path, poster_path } = movieInfo;
  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div className="movie" style={{ backgroundImage: `url('${backdropPath}')` }}>
      <div className="movie__dark" />
      <Row>
        <Col span={8} offset={3} className="movie__poster">
          <PosterMovie image={poster_path} />
        </Col>
        <Col span={10} className="movie__info">
          <MovieInfo movieInfo={movieInfo} />
        </Col>
      </Row>
    </div>
  );
}

function PosterMovie({ image }) {
  const posterPath = `https://image.tmdb.org/t/p/original${image}`;
  return <div style={{ backgroundImage: `url('${posterPath}')` }} />;
}

function MovieInfo({ movieInfo }) {
  const { id, title, overview, release_date, genres, vote_average } = movieInfo;
  const { toggle, isInWatchlist } = useWatchlistContext();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const videoMovie = useFetch(`${URL_API}/movie/${id}/videos?api_key=${API_KEY}&language=es-ES`);

  const inList = isInWatchlist(id);

  const renderVideo = () => {
    if (videoMovie.data?.results?.length > 0) {
      const video = videoMovie.data.results[0];
      return (
        <>
          <Button className="movie__trailer-btn" onClick={() => setIsVisibleModal(true)}>
            <PlayCircleOutlined /> Trailer
          </Button>
          <ModalVideo
            videoKey={video.key}
            videoPlataform={video.site}
            isOpen={isVisibleModal}
            close={() => setIsVisibleModal(false)}
          />
        </>
      );
    }
  };

  return (
    <div>
      <div className="movie__info-header">
        <h1>
          {title}
          <span>{moment(release_date, 'YYYY-MM-DD').format('YYYY')}</span>
        </h1>
        <div className="movie__info-actions">
          {renderVideo()}
          <button
            className={`movie__watchlist-btn ${inList ? 'active' : ''}`}
            onClick={() => toggle(movieInfo)}
            title={inList ? 'Quitar de watchlist' : 'Guardar en watchlist'}
          >
            {inList ? <CheckOutlined /> : <HeartOutlined />}
            {inList ? 'Guardada' : 'Watchlist'}
          </button>
        </div>
      </div>

      {vote_average && (
        <p className="movie__rating">⭐ {vote_average.toFixed(1)} / 10</p>
      )}

      <div className="movie__info-overview">
        <h3>Sinopsis</h3>
        <p>{overview}</p>
        <h3>Géneros</h3>
        <ul>
          {genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
        </ul>
      </div>
    </div>
  );
}
