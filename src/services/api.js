const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '35c5418dfa726e04dc02de080b7ae9d6';
const LANG = 'es-ES';

export const IMG_BASE = 'https://image.tmdb.org/t/p';

const get = (endpoint, params = {}) => {
  const qs = new URLSearchParams({ api_key: API_KEY, language: LANG, ...params }).toString();
  return fetch(`${BASE_URL}${endpoint}?${qs}`).then(r => r.json());
};

export const getNowPlaying = (page = 1) => get('/movie/now_playing', { page });
export const getPopular    = (page = 1) => get('/movie/popular', { page });
export const getTopRated   = (page = 1) => get('/movie/top_rated', { page });
export const getUpcoming   = (page = 1) => get('/movie/upcoming', { page });
export const searchMovies  = (query, page = 1) => get('/search/movie', { query, page });
export const getMovieById  = (id) => get(`/movie/${id}`);
export const getMovieVideos = (id) => get(`/movie/${id}/videos`);
