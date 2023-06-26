import React from "react";
import { Col, Card, Icon} from "antd";
import { Link } from "react-router-dom";
import {EyeOutlined} from "@ant-design/icons";

import './MovieCatalog.scss';

export default function MovieCatalog(props) {
    const { movies: { results } } = props;

    return results.map(movie => (
        <Col key={movie.id} className='movie-catalog' xs={24} sm={12} md={8} lg={6} xl={4}>
            <MovieCard movie={movie} />
        </Col>
    ));
}

function MovieCard(props){
    const {movie:{id, title, poster_path}} = props;
    const { Meta } = Card;
    const posterPath = `https://image.tmdb.org/t/p/original${poster_path}`;

    return (
        <Link to={`/movie/${id}`}>
            <Card 
                hoverable
                style={{ width: 200 }}
                cover={<img alt={title} src={posterPath} />}
                actions={[<EyeOutlined />]}
            >
                <Meta title={title} />
            </Card>
        </Link>
    );
}