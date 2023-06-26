import React, {useState} from "react";
import { Row, Col, Button } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import useFetch from "../../hooks/useFetch";
import { URL_API, API_KEY } from "../../utils/constants";
import Loading from "../../components/Loading";
import ModalVideo from "../../components/ModalVideo";
import { PlayCircleOutlined } from '@ant-design/icons';


import "./movie.scss";

export default function Movie() {
    const { id } = useParams();
    const movieInfo = useFetch(`${URL_API}/movie/${id}?api_key=${API_KEY}&language=es-ES`);

    if(movieInfo.loading || !movieInfo.data) {
        return <Loading />;
    }


    return <RenderMovie movieInfo={movieInfo.data}/>;
    }

    function RenderMovie(props) {
        const { movieInfo:{ backdrop_path, poster_path} } = props;
        const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

        return (
            <div className="movie" style={{backgroundImage: `url('${backdropPath}')`}}>
                <div className="movie__dark"/>
                <Row>
                    <Col span={8} offset={3} className='movie__poster'>
                        <PosterMovie image={poster_path}/>
                    </Col>
                    <Col span={10} className='movie__info'>
                        <MovieInfo movieInfo={props.movieInfo}/>
                    </Col>
                </Row>

            </div>
        );
    }

    function PosterMovie(props){
        const {image} = props;
        const posterPath = `https://image.tmdb.org/t/p/original${image}`;

        return <div style={{backgroundImage: `url('${posterPath}')`}}/>
    }

    function MovieInfo(props){
        const {movieInfo:{id,title, overview, release_date, genres}} = props;
        const [isVisibleModal, setIsVisibleModal] = useState(false);
        const videoMovie = useFetch(`${URL_API}/movie/${id}/videos?api_key=${API_KEY}&language=es-ES`);

        const openModal = () => setIsVisibleModal(true);
        const closeModal = () => setIsVisibleModal(false);

        const renderVideo = () => {
            if(videoMovie.data){
                if(videoMovie.data.results.length > 0){
                    return (
                        <div>
                            <Button icon="" onClick={openModal}><PlayCircleOutlined />Trailer</Button>
                            <ModalVideo
                                videoKey={videoMovie.data.results[0].key}
                                videoPlataform={videoMovie.data.results[0].site}
                                isOpen={isVisibleModal}
                                close={closeModal}
                            />
                        </div>
                        
                    )
                }
            }
        }

        return (
            <div>
                <div className="movie__info-header">
                    <h1>{title} <span>{moment(release_date, 'YYYY-MM-DD').format('YYYY')}</span></h1>
                    {renderVideo()}
                </div>
                <div className="movie__info-overview">
                    <h3>Sinopsis</h3>
                    <p>{overview}</p>
                    <h3>Generos</h3>
                    <ul>
                        {genres.map(genre => (
                            <li key={genre.id}>{genre.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }