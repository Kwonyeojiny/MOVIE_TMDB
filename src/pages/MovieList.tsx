import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';
import { fetchPopularMovies } from '../api/tmdbApi';

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
    <>
      <div className="flex flex-wrap justify-center items-center gap-8 mt-24 mb-8">
        {moviesToDisplay.map(movie => (
          <Link to={`/details/${movie.id}`} key={movie.id}>
            <MovieCard title={movie.title} poster_path={movie.poster_path} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default MovieList;
