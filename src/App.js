import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WatchlistProvider } from "./context/WatchlistContext";
import Navbar from "./components/Navbar/Navbar";

import Home         from "./pages/home";
import NewMovies    from "./pages/new-movies";
import PopularMovies from "./pages/popular-movies";
import Search       from "./pages/search";
import Movie        from "./pages/movie";
import Watchlist    from "./pages/watchlist";
import Error404     from "./pages/error404/error404";

export default function App() {
  return (
    <Router>
      <WatchlistProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/"               element={<Home />} />
            <Route path="/new-movies"     element={<NewMovies />} />
            <Route path="/popular-movies" element={<PopularMovies />} />
            <Route path="/search"         element={<Search />} />
            <Route path="/movie/:id"      element={<Movie />} />
            <Route path="/watchlist"      element={<Watchlist />} />
            <Route path="*"              element={<Error404 />} />
          </Routes>
        </main>
      </WatchlistProvider>
    </Router>
  );
}
