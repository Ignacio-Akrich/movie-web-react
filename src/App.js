import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import MenuTop from "./components/MenuTop";

//Pages
import Home from "./pages/home";
import NewMovies from "./pages/new-movies";
import Search from "./pages/search";
import Movie from "./pages/movie";
import Error404 from "./pages/error404/error404";
import PopularMovies from "./pages/popular-movies";

export default function App() {
  const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      <Router>
        
        <Header style={{zIndex: 1}}> 
          <MenuTop />
        </Header>

        <Content>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/new-movies" element={<NewMovies />} />
            <Route exact path="/popular-movies" element={<PopularMovies />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/movie/:id" element={<Movie />} />
            <Route exact path="*" element={<Error404 />} />
          </Routes>
        </Content>
      </Router>
    </Layout>
  );
}


