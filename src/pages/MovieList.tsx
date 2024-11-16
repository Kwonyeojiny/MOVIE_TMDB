import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { fetchPopularMovies } from '../api/tmdbApi';
import MovieCard from '../components/MovieCard';
import MovieTopRated from '../components/MovieTopRated';

interface MovieListProps {
  searchResults: any[];
}

const MovieList: React.FC<MovieListProps> = ({ searchResults }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (searchResults.length === 0) {
        const data = await fetchPopularMovies();
        setMovies(data);
      }
      setLoading(false);
    };
    fetchData();
  }, [searchResults]);

  const moviesToDisplay = searchResults.length > 0 ? searchResults : movies;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 mt-24 mb-8">
      <MovieTopRated />

      <div className="underline my-4 text-2xl sm:text-3xl text-white text-shadow drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        Popular
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {moviesToDisplay.map(movie => (
          <Link to={`/details/${movie.id}`} key={movie.id} className="flex justify-center">
            <MovieCard title={movie.title} poster_path={movie.poster_path} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
