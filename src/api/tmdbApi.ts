import axios from 'axios';

const tmdbApi = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'ko-KR',
  },
});

export const fetchPopularMovies = async () => {
  try {
    const response = await tmdbApi.get('/movie/popular');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies: ', error);
    return [];
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await tmdbApi.get('/movie/top_rated');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top rated movies: ', error);
    return [];
  }
};

export const fetchMovieDetail = async (movieId: string | undefined) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies detail: ', error);
    return [];
  }
};

export const fetchSearchMovie = async (query: string) => {
  try {
    const response = await tmdbApi.get(`/search/movie`, {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching search movies: ');
    return [];
  }
};
