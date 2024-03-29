import React from "react";
import { Link } from "react-router-dom";
import { List, Avatar, Button } from "antd";
import Loading from "../Loading";
import { InfoCircleOutlined } from '@ant-design/icons';

import './MovieList.scss';

export default function MovieList(props) {
    const { movies, title } = props;

    if (movies.loading || !movies.data) {
        return <Loading />
    }

    return ( 
        <List 
            className="movie-list"
            size="default"
            header={<h2>{title}</h2>}
            borderded
            dataSource={movies.data.results}
            renderItem={movie =>  <RenderMovie movie={movie} />}
        />
     );
}


function RenderMovie(props){
    const {movie:{id,title,poster_path}} = props;
    const posterPath = `https://image.tmdb.org/t/p/original${poster_path}`;

    return (
        <List.Item className="movie-list__movie">
            <List.Item.Meta
                avatar={<Avatar src={posterPath} />}
                title={<Link to={`/movie/${id}`}>{title}</Link>}
            />
            <Link to={`/movie/${id}`}>
                <Button type="primary" shape="circle" ><InfoCircleOutlined /></Button>
            </Link>
        </List.Item>    
    )
}