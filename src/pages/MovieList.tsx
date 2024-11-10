import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';
import { fetchPopularMovies } from '../api/tmdbApi';

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchPopularMovies();
      setMovies(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-8 mt-16">
        {movies &&
          movies.map(movie => (
            <Link to={`/details/${movie.id}`} key={movie.id}>
              <MovieCard
                title={movie.title}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
              />
            </Link>
          ))}
      </div>
    </>
  );
};

export default MovieList;
