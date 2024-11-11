import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { fetchPopularMovies } from '../api/tmdbApi';
import MovieCard from '../components/MovieCard';

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
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
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
