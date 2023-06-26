import React, {useState, useEffect} from "react";
import { Row, Col } from "antd";
import { URL_API, API_KEY } from "../utils/constants";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import MovieCatalog from "../components/MovieCatalog";
import Pagination from "../components/Pagination";

export default function NewMovies() {
    const [moviesList, setMoviesList] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${URL_API}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=${page}`);
            const json = await response.json();
            setMoviesList(json);
        })()    
    }, [page]);

    const onChangePage = (page) => {
        setPage(page);
    }

    return (
        <Row>
            <Col span='24' style={{textAlign: 'center', marginTop: 25}}>
                <h1 style={{fontSize: 35, fontWeight: 'blod'}}>
                    Ultimos lanzamientos
                </h1>
            </Col>
            {moviesList.results ? (
                <div>
                    <Col span='24'>
                        <Pagination 
                        currentPage={moviesList.page}
                        totalItems={moviesList.total_pages}
                        onChangePage={onChangePage}
                        />
                    </Col>
                    <Row span='24'>
                        <MovieCatalog movies={moviesList} />
                    </Row>
                    <Col span='24'>
                        <Pagination 
                        currentPage={moviesList.page}
                        totalItems={moviesList.total_pages}
                        onChangePage={onChangePage}
                        />
                    </Col>
                </div>
                ) : (
                <Col span='24'>
                    <Loading />
                </Col>
            )}

            <Col span='24'>
                <Footer/>
            </Col>
        </Row>
    );
}